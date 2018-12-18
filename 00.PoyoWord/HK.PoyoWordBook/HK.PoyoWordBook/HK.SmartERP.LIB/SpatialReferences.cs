using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HK.SmartERP.LIB
{
    public static class SpatialReferences
    {
        private static List<KeyValuePair<string, string>> _SpatialCodes;
        public static List<string> SpatialCodes
        {
            get
            {
                if (_SpatialCodes == null)
                    InitSpatialCodes();

                return _SpatialCodes.Select(x => x.Key).ToList();
            }
        }

        private static void InitSpatialCodes()
        {
            _SpatialCodes = new List<KeyValuePair<string, string>>();

            //*WGS84 경위도: GPS가 사용하는 좌표계
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:4326, EPSG:4166", "+ proj = longlat + ellps = WGS84 + datum = WGS84 + no_defs"));

            //*Bessel 1841 경위도: 한국과 일본에 잘 맞는 지역타원체를 사용한 좌표계
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:4004, EPSG:4162", "+proj=longlat +ellps=bessel +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"));

            //*GRS80 경위도: WGS84와 거의 유사
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:4019, EPSG:4737", "+proj=longlat +ellps=GRS80 +no_defs"));

            //*Google Mercator: 구글지도/빙지도/야후지도/OSM 등 에서 사용중인 좌표계
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:3857, EPSG:900913", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"));

            //*UTM52N (WGS84): 경도 120~126도 사이에서 사용
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:32652", "+proj=utm +zone=52 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"));

            //*UTM51N(WGS84)
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:32651", "+proj=utm +zone=51 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"));

            //*동부원점(Bessel): 강원도 등 동부지역
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:2096", "+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"));

            //*중부원점(Bessel): 서울 등 중부지역
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:2097", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"));

            //*서부원점(Bessel): 서해5도 등 서부지역
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:2098", "+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"));

            //*보정된 서부원점(Bessel) - KLIS에서 서부지역에 사용중
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:5173", "+proj=tmerc +lat_0=38 +lon_0=125.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"));

            //*보정된 중부원점(Bessel): KLIS에서 중부지역에 사용중
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:5174", "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"));

            //*보정된 제주원점(Bessel): KLIS에서 제주지역에 사용중
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:5175", "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=550000 +ellps=bessel +units=m +no_defs  +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"));

            //*보정된 동부원점(Bessel): KLIS에서 동부지역에 사용중
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:5176", "+proj=tmerc +lat_0=38 +lon_0=129.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"));

            //*보정된 동해(울릉)원점(Bessel): KLIS에서 울릉지역에 사용중
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:5177", "+proj=tmerc +lat_0=38 +lon_0=131.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs  +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"));

            //*UTM-K (Bessel): 새주소지도에서 사용 중
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:5178", "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"));

            //*UTM-K (GRS80): 네이버지도에서 사용중인 좌표계
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:5179", "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"));

            //*서부원점(GRS80)-falseY:50000
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:5180", "+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"));

            //*중부원점(GRS80)-falseY:50000: 다음지도에서 사용중인 좌표계
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:5181", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"));

            //*제주원점(GRS80) - falseY:55000
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:5182", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=550000 +ellps=GRS80 +units=m +no_defs"));

            //*동부원점(GRS80) - falseY:50000
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:5183", "+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"));

            //*동해(울릉)원점(GRS80)-falseY:50000
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:5184", "+proj=tmerc +lat_0=38 +lon_0=131 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"));

            //*서부원점(GRS80)-falseY:60000
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:5185", "+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs"));

            //*중부원점(GRS80)-falseY:60000
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:5186", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs"));

            //*동부원점(GRS80)-falseY:60000
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:5187", "+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs"));

            //*동해(울릉)원점(GRS80)-falseY:60000
            _SpatialCodes.Add(new KeyValuePair<string, string>("EPSG:5188", "+proj=tmerc +lat_0=38 +lon_0=131 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs"));
        }

        private static string GetProj4String(string spetailCode)
        {
            if (_SpatialCodes == null)
                InitSpatialCodes();

            return _SpatialCodes.Where(x => x.Key == spetailCode).Select(x => x.Value).SingleOrDefault();
        }

        public static SpatialReferencePoint TransSpatialReference(string srcSpetailCode, SpatialReferencePoint location, string targetSpetailCode = "EPSG:4326, EPSG:4166")
        {
            double[] xy = new double[2] { location.Longitude, location.Latitude };   //Sets up a array to contain the x and y coordinates
            double[] z = new double[1] { 1 }; //An array for the z coordinate

            DotSpatial.Projections.ProjectionInfo src = DotSpatial.Projections.ProjectionInfo.FromProj4String(GetProj4String(srcSpetailCode));
            DotSpatial.Projections.ProjectionInfo trg = DotSpatial.Projections.ProjectionInfo.FromProj4String(GetProj4String(targetSpetailCode));

            DotSpatial.Projections.Reproject.ReprojectPoints(xy, z, src, trg, 0, 1);

            return new SpatialReferencePoint { Latitude = xy[1], Longitude = xy[0] };
        }
    }

    public class SpatialReferencePoint
    {
        public double Latitude { set; get; }
        public double Longitude { set; get; }
    }
}
