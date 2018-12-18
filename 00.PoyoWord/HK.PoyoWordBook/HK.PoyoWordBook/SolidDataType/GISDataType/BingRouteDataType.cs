﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Runtime.Serialization;

namespace SolidDataType
{
	[DataContract]
	public class Address
	{
		[DataMember(Name = "addressLine", EmitDefaultValue = false)]
		public string AddressLine { get; set; }

		[DataMember(Name = "adminDistrict", EmitDefaultValue = false)]
		public string AdminDistrict { get; set; }

		[DataMember(Name = "adminDistrict2", EmitDefaultValue = false)]
		public string AdminDistrict2 { get; set; }

		[DataMember(Name = "countryRegion", EmitDefaultValue = false)]
		public string CountryRegion { get; set; }

		[DataMember(Name = "locality", EmitDefaultValue = false)]
		public string Locality { get; set; }

		[DataMember(Name = "postalCode", EmitDefaultValue = false)]
		public string PostalCode { get; set; }

		[DataMember(Name = "countryRegionIso2", EmitDefaultValue = false)]
		public string CountryRegionIso2 { get; set; }

		[DataMember(Name = "formattedAddress", EmitDefaultValue = false)]
		public string FormattedAddress { get; set; }

		[DataMember(Name = "neighborhood", EmitDefaultValue = false)]
		public string Neighborhood { get; set; }

		[DataMember(Name = "landmark", EmitDefaultValue = false)]
		public string Landmark { get; set; }
	}

	[DataContract]
	public class CoverageArea
	{
		/// <summary>
		/// Bounding box of the coverage area. Structure [South Latitude, West Longitude, North Latitude, East Longitude]
		/// </summary>
		[DataMember(Name = "bbox", EmitDefaultValue = false)]
		public List<double> BoundingBox { get; set; }

		[DataMember(Name = "zoomMax", EmitDefaultValue = false)]
		public int ZoomMax { get; set; }

		[DataMember(Name = "zoomMin", EmitDefaultValue = false)]
		public int ZoomMin { get; set; }
	}

	[DataContract(Namespace = "http://schemas.microsoft.com/search/local/ws/rest/v1")]
	public class BirdseyeMetadata : ImageryMetadata
	{
		[DataMember(Name = "orientation", EmitDefaultValue = false)]
		public double Orientation { get; set; }

		[DataMember(Name = "tilesX", EmitDefaultValue = false)]
		public int TilesX { get; set; }

		[DataMember(Name = "tilesY", EmitDefaultValue = false)]
		public int TilesY { get; set; }
	}

	[DataContract]
	public class Detail
	{
		[DataMember(Name = "compassDegrees", EmitDefaultValue = false)]
		public int CompassDegrees { get; set; }

		[DataMember(Name = "maneuverType", EmitDefaultValue = false)]
		public string ManeuverType { get; set; }

		[DataMember(Name = "startPathIndices", EmitDefaultValue = false)]
		public List<int> StartPathIndices { get; set; }

		[DataMember(Name = "endPathIndices", EmitDefaultValue = false)]
		public List<int> EndPathIndices { get; set; }

		[DataMember(Name = "roadType", EmitDefaultValue = false)]
		public string RoadType { get; set; }

		[DataMember(Name = "locationCodes", EmitDefaultValue = false)]
		public List<string> LocationCodes { get; set; }

		[DataMember(Name = "names", EmitDefaultValue = false)]
		public List<string> Names { get; set; }

		[DataMember(Name = "mode", EmitDefaultValue = false)]
		public string Mode { get; set; }

		[DataMember(Name = "roadShieldRequestParameters", EmitDefaultValue = false)]
		public RoadShield roadShieldRequestParameters { get; set; }
	}

	[DataContract]
	public class Generalization
	{
		[DataMember(Name = "pathIndices", EmitDefaultValue = false)]
		public List<int> PathIndices { get; set; }

		[DataMember(Name = "latLongTolerance", EmitDefaultValue = false)]
		public double LatLongTolerance { get; set; }
	}

	[DataContract]
	public class Hint
	{
		[DataMember(Name = "hintType", EmitDefaultValue = false)]
		public string HintType { get; set; }

		[DataMember(Name = "text", EmitDefaultValue = false)]
		public string Text { get; set; }
	}

	[DataContract(Namespace = "http://schemas.microsoft.com/search/local/ws/rest/v1")]
	[KnownType(typeof(StaticMapMetadata))]
	[KnownType(typeof(BirdseyeMetadata))]
	public class ImageryMetadata : Resource
	{
		[DataMember(Name = "imageHeight", EmitDefaultValue = false)]
		public int ImageHeight { get; set; }

		[DataMember(Name = "imageWidth", EmitDefaultValue = false)]
		public int ImageWidth { get; set; }

		[DataMember(Name = "imageryProviders", EmitDefaultValue = false)]
		public List<ImageryProvider> ImageryProviders { get; set; }

		[DataMember(Name = "imageUrl", EmitDefaultValue = false)]
		public string ImageUrl { get; set; }

		[DataMember(Name = "imageUrlSubdomains", EmitDefaultValue = false)]
		public List<string> ImageUrlSubdomains { get; set; }

		[DataMember(Name = "vintageEnd", EmitDefaultValue = false)]
		public string VintageEnd { get; set; }

		[DataMember(Name = "vintageStart", EmitDefaultValue = false)]
		public string VintageStart { get; set; }

		[DataMember(Name = "zoomMax", EmitDefaultValue = false)]
		public int ZoomMax { get; set; }

		[DataMember(Name = "zoomMin", EmitDefaultValue = false)]
		public int ZoomMin { get; set; }
	}

	[DataContract]
	public class ImageryProvider
	{
		[DataMember(Name = "attribution", EmitDefaultValue = false)]
		public string Attribution { get; set; }

		[DataMember(Name = "coverageAreas", EmitDefaultValue = false)]
		public List<CoverageArea> CoverageAreas { get; set; }
	}

	[DataContract]
	public class Instruction
	{
		[DataMember(Name = "maneuverType", EmitDefaultValue = false)]
		public string ManeuverType { get; set; }

		[DataMember(Name = "text", EmitDefaultValue = false)]
		public string Text { get; set; }

		[DataMember(Name = "formattedText", EmitDefaultValue = false)]
		public string FormattedText { get; set; }
	}

	[DataContract]
	public class ItineraryItem
	{
		[DataMember(Name = "childItineraryItems", EmitDefaultValue = false)]
		public List<ItineraryItem> ChildItineraryItems { get; set; }

		[DataMember(Name = "compassDirection", EmitDefaultValue = false)]
		public string CompassDirection { get; set; }

		[DataMember(Name = "details", EmitDefaultValue = false)]
		public List<Detail>Details { get; set; }

		[DataMember(Name = "exit", EmitDefaultValue = false)]
		public string Exit { get; set; }

		[DataMember(Name = "hints", EmitDefaultValue = false)]
		public List<Hint> Hints { get; set; }

		[DataMember(Name = "iconType", EmitDefaultValue = false)]
		public string IconType { get; set; }

		[DataMember(Name = "instruction", EmitDefaultValue = false)]
		public Instruction Instruction { get; set; }

		[DataMember(Name = "maneuverPoint", EmitDefaultValue = false)]
		public Point ManeuverPoint { get; set; }

		[DataMember(Name = "sideOfStreet", EmitDefaultValue = false)]
		public string SideOfStreet { get; set; }

		[DataMember(Name = "signs", EmitDefaultValue = false)]
		public List<string> Signs { get; set; }

		[DataMember(Name = "time", EmitDefaultValue = false)]
		public string Time { get; set; }

		public DateTime TimeUtc
		{
			get
			{
				if (string.IsNullOrEmpty(Time))
				{
					return DateTime.Now;
				}
				else
				{
					return DateTimeHelper.FromOdataJson(Time);
				}
			}
			set
			{
				if (value == null)
				{
					Time = string.Empty;
				}
				else
				{
					var v = DateTimeHelper.ToOdataJson(value);

					if (v != null)
					{
						Time = v;
					}
					else
					{
						Time = string.Empty;
					}
				}
			}
		}

		[DataMember(Name = "tollZone", EmitDefaultValue = false)]
		public string TollZone { get; set; }

		[DataMember(Name = "towardsRoadName", EmitDefaultValue = false)]
		public string TowardsRoadName { get; set; }

		[DataMember(Name = "transitLine", EmitDefaultValue = false)]
		public TransitLine TransitLine { get; set; }

		[DataMember(Name = "transitStopId", EmitDefaultValue = false)]
		public int TransitStopId { get; set; }

		[DataMember(Name = "transitTerminus", EmitDefaultValue = false)]
		public string TransitTerminus { get; set; }

		[DataMember(Name = "travelDistance", EmitDefaultValue = false)]
		public double TravelDistance { get; set; }

		[DataMember(Name = "travelDuration", EmitDefaultValue = false)]
		public double TravelDuration { get; set; }

		[DataMember(Name = "travelMode", EmitDefaultValue = false)]
		public string TravelMode { get; set; }

		[DataMember(Name = "warning", EmitDefaultValue = false)]
		public List<Warning> Warning { get; set; }
	}

	[DataContract]
	public class Line
	{
		[DataMember(Name = "type", EmitDefaultValue = false)]
		public string Type { get; set; }

		[DataMember(Name = "coordinates", EmitDefaultValue = false)]
		public double[][] Coordinates { get; set; }
	}

	[DataContract(Namespace = "http://schemas.microsoft.com/search/local/ws/rest/v1")]
	public class Location : Resource
	{
		[DataMember(Name = "name", EmitDefaultValue = false)]
		public string Name { get; set; }

		[DataMember(Name = "point", EmitDefaultValue = false)]
		public Point Point { get; set; }

		[DataMember(Name = "entityType", EmitDefaultValue = false)]
		public string EntityType { get; set; }

		[DataMember(Name = "address", EmitDefaultValue = false)]
		public Address Address { get; set; }

		[DataMember(Name = "confidence", EmitDefaultValue = false)]
		public string Confidence { get; set; }

		[DataMember(Name = "matchCodes", EmitDefaultValue = false)]
		public List<string> MatchCodes { get; set; }

		[DataMember(Name = "geocodePoints", EmitDefaultValue = false)]
		public List<Point> GeocodePoints { get; set; }

		[DataMember(Name = "queryParseValues", EmitDefaultValue = false)]
		public List<QueryParseValue> QueryParseValues { get; set; }
	}

	[DataContract]
	public class QueryParseValue
	{
		[DataMember(Name = "property", EmitDefaultValue = false)]
		public string Property { get; set; }

		[DataMember(Name = "value", EmitDefaultValue = false)]
		public string Value { get; set; }
	}

	[DataContract(Namespace = "http://schemas.microsoft.com/search/local/ws/rest/v1")]
	public class PushpinMetdata
	{
		[DataMember(Name = "anchor", EmitDefaultValue = false)]
		public Pixel Anchor { get; set; }

		[DataMember(Name = "bottomRightOffset", EmitDefaultValue = false)]
		public Pixel BottomRightOffset { get; set; }

		[DataMember(Name = "topLeftOffset", EmitDefaultValue = false)]
		public Pixel TopLeftOffset { get; set; }

		[DataMember(Name = "point", EmitDefaultValue = false)]
		public Point Point { get; set; }
	}

	[DataContract(Namespace = "http://schemas.microsoft.com/search/local/ws/rest/v1")]
	public class Pixel
	{
		[DataMember(Name = "x", EmitDefaultValue = false)]
		public string X { get; set; }

		[DataMember(Name = "y", EmitDefaultValue = false)]
		public string Y { get; set; }
	}

	[DataContract]
	public class Point : Shape
	{
		[DataMember(Name = "type", EmitDefaultValue = false)]
		public string Type { get; set; }

		/// <summary>
		/// Latitude,Longitude
		/// </summary>
		[DataMember(Name = "coordinates", EmitDefaultValue = false)]
		public List<double> Coordinates { get; set; }

		[DataMember(Name = "calculationMethod", EmitDefaultValue = false)]
		public string CalculationMethod { get; set; }

		[DataMember(Name = "usageTypes", EmitDefaultValue = false)]
		public List<string> UsageTypes { get; set; }

		public Coordinate GetCoordinate()
		{
			if (Coordinates.Count >= 2)
			{
				return new Coordinate(Coordinates[0], Coordinates[1]);
			}

			return null;
		}
	}

	[DataContract]
	[KnownType(typeof(Location))]
	[KnownType(typeof(Route))]
	[KnownType(typeof(TrafficIncident))]
	[KnownType(typeof(ImageryMetadata))]
	[KnownType(typeof(ElevationData))]
	[KnownType(typeof(SeaLevelData))]
	[KnownType(typeof(CompressedPointList))]
	[KnownType(typeof(GeospatialEndpointResponse))]
	public class Resource
	{
		/// <summary>
		/// Bounding box of the response. Structure [South Latitude, West Longitude, North Latitude, East Longitude]
		/// </summary>
		[DataMember(Name = "bbox", EmitDefaultValue = false)]
		public List<double> BoundingBox { get; set; }

		[DataMember(Name = "__type", EmitDefaultValue = false)]
		public string Type { get; set; }

		[DataMember(Name = "id", EmitDefaultValue = false)]
		public string Id { get; set; }

		[DataMember(Name = "distanceUnit", EmitDefaultValue = false)]
		public string DistanceUnit { get; set; }

		[DataMember(Name = "durationUnit", EmitDefaultValue = false)]
		public string DurationUnit { get; set; }

		[DataMember(Name = "travelDistance", EmitDefaultValue = false)]
		public double TravelDistance { get; set; }

		[DataMember(Name = "travelDuration", EmitDefaultValue = false)]
		public double TravelDuration { get; set; }

		[DataMember(Name = "travelDurationTraffic", EmitDefaultValue = false)]
		public double TravelDurationTraffic { get; set; }

		[DataMember(Name = "trafficCongestion", EmitDefaultValue = false)]
		public string TrafficCongestion { get; set; }

		[DataMember(Name = "trafficDataUsed", EmitDefaultValue = false)]
		public string TrafficDataUsed { get; set; }

		[DataMember(Name = "routeLegs", EmitDefaultValue = false)]
		public List<RouteLeg> RouteLegs { get; set; }

		[DataMember(Name = "routePath", EmitDefaultValue = false)]
		public RoutePath RoutePath { get; set; }
	}

	[DataContract]
	public class ResourceSet
	{
		[DataMember(Name = "estimatedTotal", EmitDefaultValue = false)]
		public long EstimatedTotal { get; set; }

		[DataMember(Name = "resources", EmitDefaultValue = false)]
		public List<Resource> Resources { get; set; }
	}

	[DataContract]
	public class Response
	{
		[DataMember(Name = "copyright", EmitDefaultValue = false)]
		public string Copyright { get; set; }

		[DataMember(Name = "brandLogoUri", EmitDefaultValue = false)]
		public string BrandLogoUri { get; set; }

		[DataMember(Name = "statusCode", EmitDefaultValue = false)]
		public int StatusCode { get; set; }

		[DataMember(Name = "statusDescription", EmitDefaultValue = false)]
		public string StatusDescription { get; set; }

		[DataMember(Name = "authenticationResultCode", EmitDefaultValue = false)]
		public string AuthenticationResultCode { get; set; }

		[DataMember(Name = "errorDetails", EmitDefaultValue = false)]
		public List<string> errorDetails { get; set; }

		[DataMember(Name = "traceId", EmitDefaultValue = false)]
		public string TraceId { get; set; }

		[DataMember(Name = "resourceSets", EmitDefaultValue = false)]
		public List<ResourceSet> ResourceSets { get; set; }
	}

	[DataContract]
	public class RoadShield
	{
		[DataMember(Name = "bucket", EmitDefaultValue = false)]
		public int Bucket { get; set; }

		[DataMember(Name = "shields", EmitDefaultValue = false)]
		public List<Shield> Shields { get; set; }
	}

	[DataContract(Namespace = "http://schemas.microsoft.com/search/local/ws/rest/v1")]
	public class Route : Resource
	{
		[DataMember(Name = "id", EmitDefaultValue = false)]
		public string Id { get; set; }

		[DataMember(Name = "distanceUnit", EmitDefaultValue = false)]
		public string DistanceUnit { get; set; }

		[DataMember(Name = "durationUnit", EmitDefaultValue = false)]
		public string DurationUnit { get; set; }

		[DataMember(Name = "travelDistance", EmitDefaultValue = false)]
		public double TravelDistance { get; set; }

		[DataMember(Name = "travelDuration", EmitDefaultValue = false)]
		public double TravelDuration { get; set; }

		[DataMember(Name = "travelDurationTraffic", EmitDefaultValue = false)]
		public double TravelDurationTraffic { get; set; }

		[DataMember(Name = "trafficCongestion", EmitDefaultValue = false)]
		public string TrafficCongestion { get; set; }

		[DataMember(Name = "trafficDataUsed", EmitDefaultValue = false)]
		public string TrafficDataUsed { get; set; }

		[DataMember(Name = "routeLegs", EmitDefaultValue = false)]
		public List<RouteLeg> RouteLegs { get; set; }

		[DataMember(Name = "routePath", EmitDefaultValue = false)]
		public RoutePath RoutePath { get; set; }
	}

	[DataContract]
	public class RouteLeg
	{
		[DataMember(Name = "travelDistance", EmitDefaultValue = false)]
		public double TravelDistance { get; set; }

		[DataMember(Name = "travelDuration", EmitDefaultValue = false)]
		public double TravelDuration { get; set; }

		[DataMember(Name = "cost", EmitDefaultValue = false)]
		public double Cost { get; set; }

		[DataMember(Name = "description", EmitDefaultValue = false)]
		public string Description { get; set; }

		[DataMember(Name = "actualStart", EmitDefaultValue = false)]
		public Point ActualStart { get; set; }

		[DataMember(Name = "actualEnd", EmitDefaultValue = false)]
		public Point ActualEnd { get; set; }

		[DataMember(Name = "startLocation", EmitDefaultValue = false)]
		public Location StartLocation { get; set; }

		[DataMember(Name = "endLocation", EmitDefaultValue = false)]
		public Location EndLocation { get; set; }

		[DataMember(Name = "itineraryItems", EmitDefaultValue = false)]
		public List<ItineraryItem> ItineraryItems { get; set; }

		[DataMember(Name = "routeRegion", EmitDefaultValue = false)]
		public string RouteRegion { get; set; }

		[DataMember(Name = "routeSubLegs", EmitDefaultValue = false)]
		public List<RouteSubLeg> RouteSubLegs { get; set; }

		[DataMember(Name = "startTime", EmitDefaultValue = false)]
		public string StartTime { get; set; }

		public DateTime StartTimeUtc
		{
			get
			{
				if (string.IsNullOrEmpty(StartTime))
				{
					return DateTime.Now;
				}
				else
				{
					return DateTimeHelper.FromOdataJson(StartTime);
				}
			}
			set
			{
				if (value == null)
				{
					StartTime = string.Empty;
				}
				else
				{
					var v = DateTimeHelper.ToOdataJson(value);

					if (v != null)
					{
						StartTime = v;
					}
					else
					{
						StartTime = string.Empty;
					}
				}
			}
		}

		[DataMember(Name = "endTime", EmitDefaultValue = false)]
		public string EndTime { get; set; }

		public DateTime EndTimeUtc
		{
			get
			{
				if (string.IsNullOrEmpty(EndTime))
				{
					return DateTime.Now;
				}
				else
				{
					return DateTimeHelper.FromOdataJson(EndTime);
				}
			}
			set
			{
				if (value == null)
				{
					EndTime = string.Empty;
				}
				else
				{
					var v = DateTimeHelper.ToOdataJson(value);

					if (v != null)
					{
						EndTime = v;
					}
					else
					{
						EndTime = string.Empty;
					}
				}
			}
		}

		//TODO: What is the base class?
		[DataMember(Name = "alternateVias", EmitDefaultValue = false)]
		public List<object> AlternateVias { get; set; }
	}

	[DataContract]
	public class RouteSubLeg
	{
		[DataMember(Name = "endWaypoint", EmitDefaultValue = false)]
		public Waypoint EndWaypoint { get; set; }

		[DataMember(Name = "startWaypoint", EmitDefaultValue = false)]
		public Waypoint StartWaypoint { get; set; }

		[DataMember(Name = "travelDistance", EmitDefaultValue = false)]
		public double TravelDistance { get; set; }

		[DataMember(Name = "travelDuration", EmitDefaultValue = false)]
		public double TravelDuration { get; set; }

		[DataMember(Name = "travelDurationTraffic", EmitDefaultValue = false)]
		public double TravelDurationTraffic { get; set; }
	}

	[DataContract]
	public class Waypoint : Point
	{
		[DataMember(Name = "description", EmitDefaultValue = false)]
		public string Description { get; set; }

		[DataMember(Name = "isVia", EmitDefaultValue = false)]
		public bool IsVia { get; set; }

		[DataMember(Name = "locationIdentifier", EmitDefaultValue = false)]
		public string LocationIdentifier { get; set; }

		[DataMember(Name = "routePathIndex", EmitDefaultValue = false)]
		public int RoutePathIndex { get; set; }
	}

	[DataContract]
	public class RoutePath
	{
		[DataMember(Name = "line", EmitDefaultValue = false)]
		public Line Line { get; set; }

		[DataMember(Name = "generalizations", EmitDefaultValue = false)]
		public List<Generalization> Generalizations { get; set; }
	}

	[DataContract]
	[KnownType(typeof(Point))]
	public class Shape
	{
		[DataMember(Name = "boundingBox", EmitDefaultValue = false)]
		public List<double> BoundingBox { get; set; }
	}

	[DataContract]
	public class Shield
	{
		[DataMember(Name = "labels", EmitDefaultValue = false)]
		public List<string> Labels { get; set; }

		[DataMember(Name = "roadShieldType", EmitDefaultValue = false)]
		public int RoadShieldType { get; set; }
	}

	[DataContract(Namespace = "http://schemas.microsoft.com/search/local/ws/rest/v1")]
	public class StaticMapMetadata : ImageryMetadata
	{
		[DataMember(Name = "mapCenter", EmitDefaultValue = false)]
		public Point MapCenter { get; set; }

		[DataMember(Name = "pushpins", EmitDefaultValue = false)]
		public List<PushpinMetdata> Pushpins { get; set; }

		[DataMember(Name = "zoom", EmitDefaultValue = false)]
		public string Zoom { get; set; }
	}

	[DataContract(Namespace = "http://schemas.microsoft.com/search/local/ws/rest/v1")]
	public class TrafficIncident : Resource
	{
		[DataMember(Name = "point", EmitDefaultValue = false)]
		public Point Point { get; set; }

		[DataMember(Name = "congestion", EmitDefaultValue = false)]
		public string Congestion { get; set; }

		[DataMember(Name = "description", EmitDefaultValue = false)]
		public string Description { get; set; }

		[DataMember(Name = "detour", EmitDefaultValue = false)]
		public string Detour { get; set; }

		[DataMember(Name = "start", EmitDefaultValue = false)]
		public string Start { get; set; }

		public DateTime StartDateTimeUtc
		{
			get
			{
				if (string.IsNullOrEmpty(Start))
				{
					return DateTime.Now;
				}
				else
				{
					return DateTimeHelper.FromOdataJson(Start);
				}
			}
			set
			{
				if (value == null)
				{
					Start = string.Empty;
				}
				else
				{
					var v = DateTimeHelper.ToOdataJson(value);

					if (v != null)
					{
						Start = v;
					}
					else
					{
						Start = string.Empty;
					}
				}
			}
		}

		[DataMember(Name = "end", EmitDefaultValue = false)]
		public string End { get; set; }

		public DateTime EndDateTimeUtc
		{
			get
			{
				if (string.IsNullOrEmpty(End))
				{
					return DateTime.Now;
				}
				else
				{
					return DateTimeHelper.FromOdataJson(End);
				}
			}
			set
			{
				if (value == null)
				{
					End = string.Empty;
				}
				else
				{
					var v = DateTimeHelper.ToOdataJson(value);

					if (v != null)
					{
						End = v;
					}
					else
					{
						End = string.Empty;
					}
				}
			}
		}

		[DataMember(Name = "incidentId", EmitDefaultValue = false)]
		public long IncidentId { get; set; }

		[DataMember(Name = "lane", EmitDefaultValue = false)]
		public string Lane { get; set; }

		[DataMember(Name = "lastModified", EmitDefaultValue = false)]
		public string LastModified { get; set; }

		public DateTime LastModifiedDateTimeUtc
		{
			get
			{
				if (string.IsNullOrEmpty(LastModified))
				{
					return DateTime.Now;
				}
				else
				{
					return DateTimeHelper.FromOdataJson(LastModified);
				}
			}
			set
			{
				if (value == null)
				{
					LastModified = string.Empty;
				}
				else
				{
					var v = DateTimeHelper.ToOdataJson(value);

					if (v != null)
					{
						LastModified = v;
					}
					else
					{
						LastModified = string.Empty;
					}
				}
			}
		}

		[DataMember(Name = "roadClosed", EmitDefaultValue = false)]
		public bool RoadClosed { get; set; }

		[DataMember(Name = "severity", EmitDefaultValue = false)]
		public int Severity { get; set; }

		[DataMember(Name = "toPoint", EmitDefaultValue = false)]
		public Point ToPoint { get; set; }

		[DataMember(Name = "locationCodes", EmitDefaultValue = false)]
		public List<string> LocationCodes { get; set; }

		[DataMember(Name = "type", EmitDefaultValue = false)]
		public new int Type { get; set; }

		[DataMember(Name = "verified", EmitDefaultValue = false)]
		public bool Verified { get; set; }
	}

	[DataContract]
	public class TransitLine
	{
		[DataMember(Name = "verboseName", EmitDefaultValue = false)]
		public string VerboseName { get; set; }

		[DataMember(Name = "abbreviatedName", EmitDefaultValue = false)]
		public string AbbreviatedName { get; set; }

		[DataMember(Name = "agencyId", EmitDefaultValue = false)]
		public long AgencyId { get; set; }

		[DataMember(Name = "agencyName", EmitDefaultValue = false)]
		public string AgencyName { get; set; }

		[DataMember(Name = "lineColor", EmitDefaultValue = false)]
		public long LineColor { get; set; }

		[DataMember(Name = "lineTextColor", EmitDefaultValue = false)]
		public long LineTextColor { get; set; }

		[DataMember(Name = "uri", EmitDefaultValue = false)]
		public string Uri { get; set; }

		[DataMember(Name = "phoneNumber", EmitDefaultValue = false)]
		public string PhoneNumber { get; set; }

		[DataMember(Name = "providerInfo", EmitDefaultValue = false)]
		public string ProviderInfo { get; set; }
	}

	[DataContract]
	public class Warning
	{
		[DataMember(Name = "origin", EmitDefaultValue = false)]
		public string Origin { get; set; }

		public Coordinate OriginCoordinate
		{
			get
			{
				if (string.IsNullOrEmpty(Origin))
				{
					return null;
				}
				else
				{
					var latLng = Origin.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
					double lat, lon;

					if (latLng.Length >= 2 && double.TryParse(latLng[0], out lat) && double.TryParse(latLng[1], out lon))
					{
						return new Coordinate(lat, lon);
					}

					return null;
				}
			}
			set
			{
				if (value == null)
				{
					Origin = string.Empty;
				}
				else
				{
					Origin = string.Format("{0},{1}", value.Latitude, value.Longitude);
				}
			}
		}

		[DataMember(Name = "severity", EmitDefaultValue = false)]
		public string Severity { get; set; }

		[DataMember(Name = "text", EmitDefaultValue = false)]
		public string Text { get; set; }

		[DataMember(Name = "to", EmitDefaultValue = false)]
		public string To { get; set; }

		public Coordinate ToCoordinate
		{
			get
			{
				if (string.IsNullOrEmpty(To))
				{
					return null;
				}
				else
				{
					var latLng = To.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
					double lat, lon;

					if (latLng.Length >= 2 && double.TryParse(latLng[0], out lat) && double.TryParse(latLng[1], out lon))
					{
						return new Coordinate(lat, lon);
					}

					return null;
				}
			}
			set
			{
				if (value == null)
				{
					To = string.Empty;
				}
				else
				{
					To = string.Format("{0},{1}", value.Latitude, value.Longitude);
				}
			}
		}

		[DataMember(Name = "warningType", EmitDefaultValue = false)]
		public string WarningType { get; set; }
	}

	[DataContract(Namespace = "http://schemas.microsoft.com/search/local/ws/rest/v1")]
	public class CompressedPointList : Resource
	{
		[DataMember(Name = "value", EmitDefaultValue = false)]
		public string Value { get; set; }
	}

	[DataContract(Namespace = "http://schemas.microsoft.com/search/local/ws/rest/v1")]
	public class ElevationData : Resource
	{
		[DataMember(Name = "elevations", EmitDefaultValue = false)]
		public List<int> Elevations { get; set; }

		[DataMember(Name = "zoomLevel", EmitDefaultValue = false)]
		public int ZoomLevel { get; set; }
	}

	[DataContract(Namespace = "http://schemas.microsoft.com/search/local/ws/rest/v1")]
	public class SeaLevelData : Resource
	{
		[DataMember(Name = "offsets", EmitDefaultValue = false)]
		public List<int> Offsets { get; set; }

		[DataMember(Name = "zoomLevel", EmitDefaultValue = false)]
		public int ZoomLevel { get; set; }
	}

	/// <summary>
	/// This response specifies:
	///  - Whether this is a politically disputed area, such as an area claimed by more than one country.
	///  - Whether services are available in the user’s region.
	///  - A list of available geospatial services including endpoints and language support for each service.
	/// </summary>
	[DataContract(Namespace = "http://schemas.microsoft.com/search/local/ws/rest/v1")]
	public class GeospatialEndpointResponse : Resource
	{
		/// <summary>
		/// Specifies if this area in the request is claimed by more than one country. 
		/// </summary>
		[DataMember(Name = "isDisputedArea", EmitDefaultValue = false)]
		public bool IsDisputedArea { get; set; }

		/// <summary>
		/// Specifies if Geospatial Platform services are available in the country or region. Microsoft does not support services in embargoed areas.
		/// </summary>
		[DataMember(Name = "isSupported", EmitDefaultValue = false)]
		public bool IsSupported { get; set; }

		/// <summary>
		/// The country or region that was used to determine service support. If you specified a User Location in 
		/// the request that is in a non-disputed country or region, this country or region is returned in the response.
		/// </summary>
		[DataMember(Name = "ur", EmitDefaultValue = false)]
		public string UserRegion { get; set; }

		/// <summary>
		/// Information for each geospatial service that is available in the country or region and language specified in the request.
		/// </summary>
		[DataMember(Name = "services", EmitDefaultValue = false)]
		public List<GeospatialService> Services { get; set; }
	}

	/// <summary>
	/// Information for a geospatial service that is available in the country or region and language specified in the request.
	/// </summary>
	[DataContract]
	public class GeospatialService
	{
		/// <summary>
		/// The URL service endpoint to use in this region. Note that to use the service, you must typically add parameters specific to 
		/// the service. These parameters are not described in this documentation.
		/// </summary>
		[DataMember(Name = "endpoint", EmitDefaultValue = false)]
		public string Endpoint { get; set; }

		/// <summary>
		/// Set to true if the service supports the language in the request for the region. If the language is supported, then the 
		/// service endpoint will return responses using this language. If it is not supported, then the service will use the fallback language.
		/// </summary>
		[DataMember(Name = "fallbackLanguage", EmitDefaultValue = false)]
		public string FallbackLanguage { get; set; }

		/// <summary>
		/// Specifies the secondary or fallback language in this region or country. If the requested language is not supported 
		/// and a fallback language is not available, United States English (en-us) is used.
		/// </summary>
		[DataMember(Name = "languageSupported", EmitDefaultValue = false)]
		public bool LanguageSupported { get; set; }

		/// <summary>
		/// An abbreviated name for the service.
		/// </summary>
		[DataMember(Name = "serviceName", EmitDefaultValue = false)]
		public string ServiceName { get; set; }
	}







	#region Coordinate

	/// <summary>
	/// A class that defines location coordinate value.
	/// </summary>
	[DataContract]
	public class Coordinate
	{
		#region Private Properties

		private double _latitude, _longitude;

		#endregion

		#region Constructor

		/// <summary>
		/// A location coordinate.
		/// </summary>
		public Coordinate()
		{
		}

		/// <summary>
		/// A location coordinate.
		/// </summary>
		/// <param name="latitude">Latitude coordinate vlaue.</param>
		/// <param name="longitude">Longitude coordinate value.</param>
		public Coordinate(double latitude, double longitude)
		{
			Latitude = latitude;
			Longitude = longitude;
		}

		#endregion

		#region Public Properties

		/// <summary>
		/// Latitude coordinate.
		/// </summary>
		[DataMember(Name = "lat", EmitDefaultValue = false)]
		public double Latitude
		{
			get
			{
				return _latitude;
			}
			set
			{
				if (!double.IsNaN(value) && value <= 90 && value >= -90)
				{
					//Only need to keep the first 5 decimal places. Any more just adds more data being passed around.
					_latitude = Math.Round(value, 5, MidpointRounding.AwayFromZero);
				}
			}
		}

		/// <summary>
		/// Longitude coordinate.
		/// </summary>
		[DataMember(Name = "lon", EmitDefaultValue = false)]
		public double Longitude
		{
			get
			{
				return _longitude;
			}
			set
			{
				if (!double.IsNaN(value) && value <= 180 && value >= -180)
				{
					//Only need to keep the first 5 decimal places. Any more just adds more data being passed around.
					_longitude = Math.Round(value, 5, MidpointRounding.AwayFromZero);
				}
			}
		}

		public override string ToString()
		{
			return string.Format(CultureInfo.InvariantCulture, "{0:0.#####},{1:0.#####}", Latitude, Longitude);
		}

		#endregion
	}
	#endregion






	#region DateTimeHelper
	/// <summary>
	/// A helper class for working iwth OData Dates.
	/// </summary>
	internal static class DateTimeHelper
	{
		/// <summary>
		/// Converts a DateTime object into an OData date.
		/// </summary>
		/// <param name="dateTime">The DateTime to convert.</param>
		/// <returns>An OData version of the DateTime.</returns>
		public static string ToOdataJson(DateTime dateTime)
		{
			DateTime d1 = new DateTime(1970, 1, 1);
			DateTime d2 = dateTime.ToUniversalTime();
			TimeSpan ts = new TimeSpan(d2.Ticks - d1.Ticks);
			return "\\/Date(" + ts.TotalMilliseconds.ToString("#") + ")\\/";
		}

		/// <summary>
		/// Converts an OData Date into a DateTime object.
		/// </summary>
		/// <param name="jsonDate">OData Date to convert.</param>
		/// <returns>The converted DateTime object.</returns>
		public static DateTime FromOdataJson(string jsonDate)
		{
			//  /Date(1235764800000)/
			//  /Date(1467298867000-0700)/

			jsonDate = jsonDate.Replace("/Date(", "").Replace(")/", "");

			long ms = 0;    // number of milliseconds since midnight Jan 1, 1970
			long hours = 0;

			int pIdx = jsonDate.IndexOf("+");
			int mIdx = jsonDate.IndexOf("-");

			if (pIdx > 0)
			{
				ms = long.Parse(jsonDate.Substring(0, pIdx));

				//Hack: The offset is meant to be in minutes, but for some reason the response from the REST services uses 700 which is meant to be 7 hours.
				hours = long.Parse(jsonDate.Substring(mIdx)) / 100;
			}
			else if (mIdx > 0)
			{
				ms = long.Parse(jsonDate.Substring(0, mIdx));

				//Hack: The offset is meant to be in minutes, but for some reason the response from the REST services uses 700 which is meant to be 7 hours.
				hours = long.Parse(jsonDate.Substring(mIdx)) / 100;
			}
			else
			{
				ms = long.Parse(jsonDate);
			}

			return new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddMilliseconds(ms).AddHours(hours);
		}
	}
	#endregion









	#region Custom BingResponse
	public class Custom_ItineraryItem
	{
		public string Time { get; set; }
		public DateTime TimeUtc
		{
			get
			{
				if (string.IsNullOrEmpty(Time))
				{
					return DateTime.Now;
				}
				else
				{
					return DateTimeHelper.FromOdataJson(Time);
				}
			}
			set
			{
				if (value == null)
				{
					Time = string.Empty;
				}
				else
				{
					var v = DateTimeHelper.ToOdataJson(value);

					if (v != null)
					{
						Time = v;
					}
					else
					{
						Time = string.Empty;
					}
				}
			}
		}
		public Instruction Instruction { get; set; }
		public string TowardsRoadName { get; set; }
		public double TravelDistance { get; set; }
		public double TravelDuration { get; set; }
		public string TravelMode { get; set; }
	}
	#endregion
}

