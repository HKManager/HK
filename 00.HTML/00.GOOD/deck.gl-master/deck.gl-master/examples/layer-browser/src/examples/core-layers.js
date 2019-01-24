import {
  COORDINATE_SYSTEM,
  ScatterplotLayer,
  ArcLayer,
  LineLayer,
  // PointCloudLayer,
  ScreenGridLayer,
  IconLayer,
  GridCellLayer,
  GridLayer,
  HexagonCellLayer,
  HexagonLayer,
  GeoJsonLayer,
  PolygonLayer,
  PathLayer,
  TextLayer,
  experimental
  //  ContourLayer
} from 'deck.gl';
const {flattenVertices} = experimental;

import ContourLayer from '@deck.gl/layers/contour-layer/contour-layer';

// Demonstrate immutable support
import * as dataSamples from '../data-samples';
import {parseColor, setOpacity} from '../utils/color';

const LIGHT_SETTINGS = {
  lightsPosition: [-122.45, 37.66, 8000, -122.0, 38.0, 8000],
  ambientRatio: 0.3,
  diffuseRatio: 0.6,
  specularRatio: 0.4,
  lightsStrength: [1, 0.0, 0.8, 0.0],
  numberOfLights: 2
};

const MARKER_SIZE_MAP = {
  small: 200,
  medium: 500,
  large: 1000
};

const ArcLayerExample = {
  layer: ArcLayer,
  getData: () => dataSamples.routes,
  props: {
    id: 'arcLayer',
    getSourcePosition: d => d.START,
    getTargetPosition: d => d.END,
    getSourceColor: d => [64, 255, 0],
    getTargetColor: d => [0, 128, 200],
    pickable: true
  }
};

const IconLayerExample = {
  layer: IconLayer,
  getData: () => dataSamples.points,
  props: {
    iconAtlas: 'data/icon-atlas.png',
    iconMapping: dataSamples.iconAtlas,
    sizeScale: 24,
    getPosition: d => d.COORDINATES,
    getColor: d => [64, 64, 72],
    getIcon: d => (d.PLACEMENT === 'SW' ? 'marker' : 'marker-warning'),
    getSize: d => (d.RACKS > 2 ? 2 : 1),
    opacity: 0.8,
    pickable: true
  }
};

const IconLayerAutoPackingExample = {
  layer: IconLayer,
  getData: () => dataSamples.points,
  props: {
    id: 'icon-layer-experimental',
    sizeScale: 24,
    getPosition: d => d.COORDINATES,
    getColor: d => [64, 64, 72],
    getIcon: d => {
      if (d.PLACEMENT === 'SW') {
        return {
          url: 'data/icon-marker.png',
          width: 64,
          height: 64,
          anchorY: 64,
          mask: true
        };
      }
      return {
        url: 'data/icon-warning.png',
        width: 128,
        height: 128,
        anchorY: 128,
        mask: false
      };
    },
    getSize: d => {
      return d.RACKS > 2 ? 2 : 1;
    },
    opacity: 0.8,
    pickable: true
  }
};

const GeoJsonLayerExample = {
  layer: GeoJsonLayer,
  getData: () => dataSamples.geojson,
  propTypes: {
    getLineDashArray: {type: 'compound', elements: ['lineDashSizeLine']},
    lineDashSizeLine: {
      type: 'number',
      max: 20,
      onUpdate: (newValue, newSettings, change) => {
        change('getLineDashArray', [newValue, 20 - newValue]);
      }
    }
  },
  props: {
    id: 'geojsonLayer',
    getRadius: f => MARKER_SIZE_MAP[f.properties['marker-size']],
    getFillColor: f => {
      const color = parseColor(f.properties.fill || f.properties['marker-color']);
      const opacity = (f.properties['fill-opacity'] || 1) * 255;
      return setOpacity(color, opacity);
    },
    getLineColor: f => {
      const color = parseColor(f.properties.stroke);
      const opacity = (f.properties['stroke-opacity'] || 1) * 255;
      return setOpacity(color, opacity);
    },
    getLineDashArray: f => [20, 0],
    getLineWidth: f => f.properties['stroke-width'],
    getElevation: f => 500,
    lineWidthScale: 10,
    lineWidthMinPixels: 1,
    pickable: true,
    fp64: true,
    lightSettings: LIGHT_SETTINGS
  }
};

const GeoJsonLayerExtrudedExample = {
  layer: GeoJsonLayer,
  getData: () => dataSamples.choropleths,
  props: {
    id: 'geojsonLayer-extruded',
    getElevation: f => ((f.properties.ZIP_CODE * 10) % 127) * 10,
    getFillColor: f => [0, 100, (f.properties.ZIP_CODE * 55) % 255],
    getLineColor: f => [200, 0, 80],
    extruded: true,
    wireframe: true,
    pickable: true,
    lightSettings: LIGHT_SETTINGS
  }
};

const PolygonLayerExample = {
  layer: PolygonLayer,
  getData: () => dataSamples.polygons,
  propTypes: {
    getLineDashArray: {type: 'compound', elements: ['lineDashSizeLine']},
    lineDashSizeLine: {
      type: 'number',
      max: 20,
      onUpdate: (newValue, newSettings, change) => {
        change('getLineDashArray', [newValue, 20 - newValue]);
      }
    }
  },
  props: {
    getPolygon: f => f,
    getFillColor: f => [200 + Math.random() * 55, 0, 0],
    getLineColor: f => [0, 0, 0, 255],
    getLineDashArray: f => [20, 0],
    getLineWidth: f => 20,
    getElevation: f => Math.random() * 1000,
    opacity: 0.8,
    pickable: true,
    lineDashJustified: true,
    lightSettings: LIGHT_SETTINGS,
    elevationScale: 0.6
  }
};

const PolygonLayerBinaryExample = {
  ...PolygonLayerExample,
  getData: () =>
    dataSamples.polygons.map(polygon => {
      // Convert each polygon from an array of points to an array of numbers
      return flattenVertices(polygon, {dimensions: 2});
    }),
  props: {
    ...PolygonLayerExample.props,
    getPolygon: d => d,
    positionFormat: 'XY'
  }
};

const PathLayerExample = {
  layer: PathLayer,
  getData: () => dataSamples.zigzag,
  propTypes: {
    getDashArray: {type: 'compound', elements: ['dashSizeLine']},
    dashSizeLine: {
      type: 'number',
      max: 20,
      onUpdate: (newValue, newSettings, change) => {
        change('getDashArray', [newValue, 20 - newValue]);
      }
    }
  },
  props: {
    id: 'pathLayer',
    opacity: 0.6,
    getPath: f => f.path,
    getColor: f => [128, 0, 0],
    getWidth: f => 10,
    getDashArray: f => [20, 0],
    widthMinPixels: 1,
    pickable: true
  }
};

const PathLayerBinaryExample = {
  ...PathLayerExample,
  getData: () =>
    dataSamples.zigzag.map(({path}) => {
      // Convert each path from an array of points to an array of numbers
      return flattenVertices(path, {dimensions: 2});
    }),
  props: {
    ...PathLayerExample.props,
    getPath: d => d,
    positionFormat: 'XY'
  }
};

const ScreenGridLayerExample = {
  layer: ScreenGridLayer,
  getData: () => dataSamples.points,
  props: {
    id: 'screenGridLayer',
    getPosition: d => d.COORDINATES,
    cellSizePixels: 40,
    minColor: [0, 0, 80, 0],
    maxColor: [100, 255, 0, 128],
    pickable: false
  }
};

const LineLayerExample = {
  layer: LineLayer,
  getData: () => dataSamples.routes,
  props: {
    id: 'lineLayer',
    getSourcePosition: d => d.START,
    getTargetPosition: d => d.END,
    getColor: d => (d.SERVICE === 'WEEKDAY' ? [255, 64, 0] : [255, 200, 0]),
    pickable: true
  }
};

const LineLayerExampleNewCoords = {
  layer: LineLayer,
  getData: () => dataSamples.routes,
  props: {
    id: 'lineLayer',
    getSourcePosition: d => d.START,
    getTargetPosition: d => d.END,
    getColor: d => (d.SERVICE === 'WEEKDAY' ? [255, 64, 0] : [255, 200, 0]),
    pickable: true,
    coordinateSystem: COORDINATE_SYSTEM.LNGLAT_EXPERIMENTAL
  }
};

const ScatterplotLayerExample = {
  layer: ScatterplotLayer,
  getData: () => dataSamples.points,
  props: {
    id: 'scatterplotLayer',
    getPosition: d => d.COORDINATES,
    getFillColor: d => [255, 128, 0],
    getLineColor: d => [0, 128, 255],
    getRadius: d => d.SPACES,
    opacity: 1,
    pickable: true,
    radiusScale: 30,
    radiusMinPixels: 1,
    radiusMaxPixels: 30
  }
};

const GridCellLayerExample = {
  layer: GridCellLayer,
  props: {
    id: 'gridCellLayer',
    data: dataSamples.worldGrid.data,
    cellSize: dataSamples.worldGrid.cellSize,
    extruded: true,
    pickable: true,
    opacity: 1,
    getColor: d => [245, 166, d.value * 255, 255],
    getElevation: d => d.value * 5000,
    lightSettings: LIGHT_SETTINGS
  }
};

const ContourLayerExample = {
  layer: ContourLayer,
  getData: () => dataSamples.points,
  props: {
    id: 'contourLayer',
    cellSize: 200,
    getPosition: d => d.COORDINATES,
    gpuAggregation: true,
    contours: [
      {threshold: 1, color: [255, 0, 0], strokeWidth: 4},
      {threshold: 5, color: [0, 255, 0], strokeWidth: 2},
      {threshold: 15, color: [0, 0, 255]}
    ]
  }
};

const ContourLayerBandsExample = {
  layer: ContourLayer,
  getData: () => dataSamples.points,
  props: {
    id: 'contourLayer',
    cellSize: 200,
    getPosition: d => d.COORDINATES,
    gpuAggregation: true,
    contours: [
      {threshold: [1, 5], color: [255, 0, 0]},
      {threshold: [5, 15], color: [0, 255, 0]},
      {threshold: [15, 1000], color: [0, 0, 255]}
    ]
  }
};

function getMean(pts, key) {
  const filtered = pts.filter(pt => Number.isFinite(pt[key]));

  return filtered.length
    ? filtered.reduce((accu, curr) => accu + curr[key], 0) / filtered.length
    : null;
}

function getMax(pts, key) {
  const filtered = pts.filter(pt => Number.isFinite(pt[key]));

  return filtered.length
    ? filtered.reduce((accu, curr) => (curr[key] > accu ? curr[key] : accu), -Infinity)
    : null;
}

// hexagon/grid layer compares whether getColorValue / getElevationValue has changed to
// call out bin sorting. Here we pass in the function defined
// outside props, so it doesn't create a new function on
// every rendering pass
function getColorValue(points) {
  return getMean(points, 'SPACES');
}

function getElevationValue(points) {
  return getMax(points, 'SPACES');
}

const GridLayerExample = {
  layer: GridLayer,
  props: {
    id: 'gridLayer',
    data: dataSamples.points,
    cellSize: 200,
    opacity: 1,
    extruded: true,
    pickable: true,
    getPosition: d => d.COORDINATES,
    getColorValue,
    getElevationValue,
    lightSettings: LIGHT_SETTINGS
  }
};

const HexagonCellLayerExample = {
  layer: HexagonCellLayer,
  props: {
    id: 'hexagonCellLayer',
    data: dataSamples.hexagons,
    hexagonVertices: dataSamples.hexagons[0].vertices,
    coverage: 1,
    extruded: true,
    pickable: true,
    opacity: 1,
    getColor: d => [48, 128, d.value * 255, 255],
    getElevation: d => d.value * 5000,
    lightSettings: LIGHT_SETTINGS
  }
};

const HexagonLayerExample = {
  layer: HexagonLayer,
  props: {
    id: 'HexagonLayer',
    data: dataSamples.points,
    extruded: true,
    pickable: true,
    radius: 1000,
    opacity: 1,
    elevationScale: 1,
    elevationRange: [0, 3000],
    coverage: 1,
    getPosition: d => d.COORDINATES,
    getColorValue,
    getElevationValue,
    lightSettings: LIGHT_SETTINGS
  }
};

const TextLayerExample = {
  layer: TextLayer,
  getData: () => dataSamples.texts,
  propTypes: {
    fontFamily: {
      name: 'fontFamily',
      type: 'category',
      value: ['Monaco', 'Helvetica', 'Garamond', 'Palatino', 'Courier', 'Courier New']
    }
  },
  props: {
    id: 'textgetAnchorX-layer',
    sizeScale: 1,
    fontFamily: 'Monaco',
    getText: x => x.LOCATION_NAME,
    getPosition: x => x.COORDINATES,
    getColor: x => [153, 0, 0],
    getAngle: x => 30,
    getTextAnchor: x => 'start',
    getAlignmentBaseline: x => 'center',
    getPixelOffset: x => [10, 0]
  }
};

/* eslint-disable quote-props */
export default {
  'Core Layers - LngLat': {
    GeoJsonLayer: GeoJsonLayerExample,
    'GeoJsonLayer (Extruded)': GeoJsonLayerExtrudedExample,
    PolygonLayer: PolygonLayerExample,
    'PolygonLayer (Flat)': PolygonLayerBinaryExample,
    PathLayer: PathLayerExample,
    'PathLayer (Flat)': PathLayerBinaryExample,
    ScatterplotLayer: ScatterplotLayerExample,
    ArcLayer: ArcLayerExample,
    LineLayer: LineLayerExample,
    LineLayerNewCoords: LineLayerExampleNewCoords,
    IconLayer: IconLayerExample,
    'IconLayer (auto packing)': IconLayerAutoPackingExample,
    GridCellLayer: GridCellLayerExample,
    GridLayer: GridLayerExample,
    ScreenGridLayer: ScreenGridLayerExample,
    HexagonCellLayer: HexagonCellLayerExample,
    HexagonLayer: HexagonLayerExample,
    TextLayer: TextLayerExample,
    ContourLayer: ContourLayerExample,
    'ContourLayer (Bands)': ContourLayerBandsExample
  }
};
