using System;
using Android.Graphics;
using Android.Graphics.Drawables;
using Android.Util;
using Android.Content;
using Android.Widget;
using Android.Views;

namespace Solidroid
{
public class ImageViewer : ImageView
	{
		// We can be in one of these 3 states
		private const int MAP_STATE_NONE = 0;
		private const int MAP_STATE_DRAG = 1;
		private const int MAP_STATE_ZOOM = 2;

		// These matrices will be used to move and zoom image
		private Matrix mMatrix = new Matrix();
		private Matrix mSavedMatrix = new Matrix();
		public bool isFirst = true;

		private int mode = MAP_STATE_NONE;

		// Remember some things for zooming
		private PointF mStart = new PointF();
		private PointF mid = new PointF();
		float mOldDist = 1f;

		//private List<WifiPointView> _SensorPoints;

		private int lotationGood = 0;
		private int lotationSoSo = 0;
		private int lotationBad = 0;
		private int lotationWorst = 0;
		private int _bitMapDrawble;

		private Canvas _canvas;
		public string FireBeaconKey = string.Empty;

		public ImageViewer(Context context, IAttributeSet attrs) : base(context, attrs)
		{
			//_SensorPoints = new List<WifiPointView> ();
		}

		public void SetScale()
		{
			if (Drawable == null)
				return;

			mMatrix.Reset();
			var imgWidth = Drawable.Bounds.Right;
			var imgHeight = Drawable.Bounds.Bottom;
			float scale_x = (float)_canvas.Width / (float)imgWidth;
			float scale_y = (float)_canvas.Height / (float)imgHeight;
			mMatrix.PostTranslate(0, 0);
			mMatrix.PostScale(scale_x, scale_y, mid.X, mid.Y);
			ImageMatrix = mMatrix;
		}

		//		public void SetNetworkMap()
		//		{
		//			mMatrix.Reset ();
		//			mMatrix.PostTranslate(0, 0);
		//			mMatrix.PostScale (3.2f, 3.2f, mid.X, mid.Y);
		//			ImageMatrix = mMatrix;
		//		}
		//
		//		public void SetGuideMap()
		//		{
		//			mMatrix.Reset ();
		//			mMatrix.PostTranslate(0, -40);
		//			mMatrix.PostScale (3.2f, 3.2f, mid.X, mid.Y);
		//			ImageMatrix = mMatrix;
		//		}
		//
		//		public void SetAirportMap()
		//		{
		//			mMatrix.Reset ();
		//			mMatrix.PostTranslate(0, 40);
		//			mMatrix.PostScale (1.79f, 1.79f, mid.X, mid.Y);
		//			ImageMatrix = mMatrix;
		//		}

		public void ClearSensorPoint()
		{
			//_SensorPoints.Clear ();
		}

		protected override void OnDraw(Canvas canvas)
		{
			base.OnDraw(canvas);

			_canvas = canvas;

			if (isFirst)
			{
				SetScale();
				isFirst = false;
			}

			// draw all visible "fingerprints"
			SetBeaconImage();
		}

		public void SetBeaconImage()
		{
			try
			{
				int size = 0;

				if (lotationGood < 3) lotationGood++;
				else lotationGood = 0;

				if (lotationSoSo < 7) lotationSoSo++;
				else lotationSoSo = 0;

				if (lotationBad < 9) lotationBad++;
				else lotationBad = 0;

				if (lotationWorst < 12) lotationWorst++;
				else lotationWorst = 0;

				float[] values = new float[9];
				ImageMatrix.GetValues(values);
			}
			catch (Exception ex)
			{
			}
		}

		//		public override bool OnTouchEvent(MotionEvent pEvent)
		//		{
		//			base.OnTouchEvent(pEvent);
		//
		//			switch (pEvent.Action & MotionEventActions.Mask) {
		//			case MotionEventActions.Down: 
		//				OnTouchStart (pEvent);
		//				break;
		//			case MotionEventActions.PointerDown: 
		//				OnMultiTouchStart (pEvent);
		//				break;
		//			case MotionEventActions.Up: 
		//				OnTouchEnd (pEvent);
		//				break;
		//			case MotionEventActions.PointerUp:
		//				OnMultiTouchEnd (pEvent);
		//				break;
		//			case MotionEventActions.Move:
		//				OnTouchMove (pEvent);
		//				break;
		//			}
		//
		//			SetScaleType (Android.Widget.ImageView.ScaleType.Matrix);
		//			return true;
		//		}

		public void OnTouchStart(MotionEvent pEvent)
		{
			mSavedMatrix = mMatrix;
			mStart.Set(new PointF(pEvent.GetX(), pEvent.GetY())); // save the location where touch started
			mode = MAP_STATE_DRAG;
		}

		public void OnTouchEnd(MotionEvent pEvent)
		{
			mode = MAP_STATE_NONE;
		}

		public void OnMultiTouchStart(MotionEvent pEvent)
		{
			mOldDist = Spacing(pEvent);

			// start zoom mode if touch points are spread far enough from each other
			if (mOldDist > 10f)
			{
				mSavedMatrix.Set(mMatrix);
				MidPoint(mid, pEvent);
				mode = MAP_STATE_ZOOM;
			}
		}

		public void OnMultiTouchEnd(MotionEvent pEvent)
		{
			mSavedMatrix.Set(mMatrix);
			mode = MAP_STATE_DRAG;
		}

		public void OnTouchMove(MotionEvent pEvent)
		{
			if (mode == MAP_STATE_DRAG)
			{
				MapMove(pEvent);
			}
			else if (mode == MAP_STATE_ZOOM)
			{
				MapZoom(pEvent);
			}
		}

		public void MapMove(MotionEvent pEvent)
		{
			mMatrix.Set(mSavedMatrix);
			float X = pEvent.GetX() - mStart.X;
			float Y = pEvent.GetY() - mStart.Y;

			float[] values = new float[9];
			mMatrix.GetValues(values);

			if (X > 110 || X < -110)
				return;
			if (Y > 110 || Y < -110)
				return;

			mMatrix.PostTranslate(X, Y); // translates map
			ImageMatrix = mMatrix;
		}

		public void MapZoom(MotionEvent pEvent, float zoom = 0.0f)
		{
			//			float[] values = new float[9];
			//			mMatrix.GetValues(values);
			//			var zoomValue = values[0];
			//			if (zoom == 1.2f &&zoomValue > 4.0f || zoom == 0.8f && zoomValue < 1.8f)
			//				return;

			if (pEvent == null)
			{
				mMatrix.PostScale(zoom, zoom, mid.X, mid.Y); // zoom in/out
			}
			else {
				float newDist = Spacing(pEvent);

				// zoom in/out if touch points are spread far enough from each other
				if (newDist > 10f)
				{
					mMatrix.Set(mSavedMatrix);
					float scale = newDist / mOldDist;

					if (scale > 1.5f)
						return;

					if (scale < 0.8f)
						return;

					mMatrix.PostScale(scale, scale, mid.X, mid.Y); // zoom in/out
				}
			}

			ImageMatrix = mMatrix;
		}




		#region Helper methods for zoom functionality
		/** Determine the space between the first two fingers */
		private float Spacing(MotionEvent pEvent)
		{
			float x = pEvent.GetX(0) - pEvent.GetX(1);
			float y = pEvent.GetY(0) - pEvent.GetY(1);
			return FloatMath.Sqrt(x * x + y * y);
		}

		/** Calculate the mid point of the first two fingers */
		private void MidPoint(PointF point, MotionEvent pEvent)
		{
			float x = pEvent.GetX(0) + pEvent.GetX(1);
			float y = pEvent.GetY(0) + pEvent.GetY(1);
			point.Set(x / 2, y / 2);
		}
		#endregion


		#region Functions for creating new WifiPointViews
		/** create new WifiPointView to given location */
		//		public WifiPointView CreateNewWifiPointOnMap(PointF location, string key)
		//		{
		//			WifiPointView wpView = new WifiPointView (this.Context);
		//			float[] values = new float[9];
		//			mMatrix.GetValues (values);
		//
		//			location.Set(location.X, location.Y);
		//			wpView.key = key;
		//			wpView.mLocation = location;
		//			_SensorPoints.Add (wpView);
		//			return wpView;
		//		}
		#endregion
		//	}
	}
}

