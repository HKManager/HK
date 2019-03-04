/* global window */
import * as dataSamples from '../../examples/layer-browser/src/data-samples';
import {parseColor, setOpacity} from '../../examples/layer-browser/src/utils/color';
import {GPUGridLayer} from '@deck.gl/experimental-layers';
import GL from '@luma.gl/constants';
import {OrbitView, OrthographicView, FirstPersonView} from '@deck.gl/core';

const ICON_ATLAS = './test/render/icon-atlas.png';

import {BezierCurveLayer, PathOutlineLayer} from '@deck.gl/experimental-layers';

import {
  COORDINATE_SYSTEM,
  ScatterplotLayer,
  PolygonLayer,
  PathLayer,
  ArcLayer,
  LineLayer,
  IconLayer,
  GeoJsonLayer,
  GridCellLayer,
  GridLayer,
  ScreenGridLayer,
  HexagonCellLayer,
  HexagonLayer,
  PointCloudLayer,
  TextLayer
} from 'deck.gl';
import ContourLayer from '@deck.gl/layers/contour-layer/contour-layer';

const IS_HEADLESS = Boolean(window.browserTestDriver_isHeadless);

const MARKER_SIZE_MAP = {
  small: 200,
  medium: 500,
  large: 1000
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

function getColorValue(points) {
  return getMean(points, 'SPACES');
}

function getElevationValue(points) {
  return getMax(points, 'SPACES');
}

export const WIDTH = 800;
export const HEIGHT = 450;

// Max color delta in the YIQ difference metric for two pixels to be considered the same
export const COLOR_DELTA_THRESHOLD = 255 * 0.05;
// Percentage of pixels that must be the same for the test to pass
export const TEST_PASS_THRESHOLD = 0.99;
const screenSpaceData = [
  [0, -100],
  [0, -110],
  [0, -115],
  [10, -100],
  [0, 100],
  [0, 105],
  [-100, -100],
  [-100, -100],
  [100, 10],
  [100, 12],
  [100, 100],
  [110, 90]
];

export const TEST_CASES = [
  // First person
  {
    name: 'first-person',
    views: [
      new FirstPersonView({
        fovy: 75,
        near: 10,
        far: 100000,
        focalDistance: 10
      })
    ],
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      altitude: 20,
      bearing: 270
    },
    layers: [
      new GeoJsonLayer({
        id: 'geojson-lnglat',
        data: dataSamples.geojson,
        getRadius: f => MARKER_SIZE_MAP[f.properties['marker-size']],
        getFillColor: f => parseColor(f.properties.fill || f.properties['marker-color']),
        getLineColor: f => parseColor(f.properties.stroke),
        extruded: true,
        wireframe: true,
        getElevation: 500,
        lineWidthScale: 10,
        lineWidthMinPixels: 1
      })
    ],
    goldenImage: './test/render/golden-images/first-person.png'
  },
  // INFOVIS
  {
    name: 'bezier-curve-2d',
    views: [new OrthographicView()],
    viewState: {
      zoom: 1
    },
    layers: [
      new BezierCurveLayer({
        id: 'bezier-curve-2d',
        data: [
          {sourcePosition: [0, -100], targetPosition: [0, 100], controlPoint: [50, 0]},
          {sourcePosition: [0, -100], targetPosition: [0, 100], controlPoint: [-50, 0]},
          {sourcePosition: [0, -100], targetPosition: [0, 100], controlPoint: [100, 0]},
          {sourcePosition: [0, -100], targetPosition: [0, 100], controlPoint: [-100, 0]},
          {sourcePosition: [0, -100], targetPosition: [0, 100], controlPoint: [150, 0]},
          {sourcePosition: [0, -100], targetPosition: [0, 100], controlPoint: [-150, 0]}
        ],
        coordinateSystem: COORDINATE_SYSTEM.IDENTITY,
        getColor: d => [255, 255, 0, 128],
        strokeWidth: 5
      })
    ],
    goldenImage: './test/render/golden-images/bezier-curve-2d.png'
  },
  {
    name: 'pointcloud-identity',
    views: [
      new OrbitView({
        fov: 30,
        near: 0.001,
        far: 100
      })
    ],
    viewState: {
      lookAt: [0, 0, 0],
      distance: 1,
      rotationX: 15,
      rotationOrbit: 30,
      orbitAxis: 'Y'
    },
    layers: [
      new PointCloudLayer({
        id: 'pointcloud-identity',
        data: [{position: [0, 0.2, 0]}, {position: [-0.2, -0.2, 0]}, {position: [0.2, -0.2, 0]}],
        coordinateSystem: COORDINATE_SYSTEM.IDENTITY,
        getPosition: d => d.position,
        getNormal: d => [0, 0.5, 0.2],
        getColor: d => [255, 255, 0, 128],
        radiusPixels: 50
      })
    ],
    goldenImage: './test/render/golden-images/pointcloud-identity.png'
  },
  {
    name: 'screengrid-infoviz',
    views: [new OrthographicView()],
    viewState: {
      left: -WIDTH / 2,
      top: -HEIGHT / 2,
      right: WIDTH / 2,
      bottom: HEIGHT / 2
    },
    layers: [
      new ScreenGridLayer({
        id: 'screengrid-infoviz',
        data: screenSpaceData,
        coordinateSystem: COORDINATE_SYSTEM.IDENTITY,
        getPosition: d => d,
        cellSizePixels: 40,
        minColor: [0, 0, 0, 0],
        maxColor: [0, 255, 0, 255],
        pickable: false
      })
    ],
    goldenImage: './test/render/golden-images/screengrid-infoviz.png'
  },
  {
    name: 'contour-infoviz',
    views: [new OrthographicView()],
    viewState: {
      left: -WIDTH / 2,
      top: -HEIGHT / 2,
      right: WIDTH / 2,
      bottom: HEIGHT / 2,
      zoom: 0.1
    },
    layers: [
      new ContourLayer({
        id: 'contour-infoviz',
        data: screenSpaceData,
        getPosition: d => d,
        coordinateSystem: COORDINATE_SYSTEM.IDENTITY,
        cellSize: 40,
        opacity: 1,
        contours: [
          {threshold: 1, color: [50, 50, 50]},
          {threshold: 2, color: [100, 100, 100]},
          {threshold: 3, color: [150, 150, 150]}
        ],
        gpuAggregation: true
      })
    ],
    goldenImage: './test/render/golden-images/contour-infoviz.png'
  },
  {
    name: 'contour-isobands-infoviz',
    views: [new OrthographicView()],
    viewState: {
      left: -WIDTH / 2,
      top: -HEIGHT / 2,
      right: WIDTH / 2,
      bottom: HEIGHT / 2
    },
    layers: [
      new ContourLayer({
        id: 'contour-isobands-infoviz',
        data: screenSpaceData,
        getPosition: d => d,
        coordinateSystem: COORDINATE_SYSTEM.IDENTITY,
        cellSize: 40,
        opacity: 1,
        contours: [
          {threshold: [1, 2], color: [150, 0, 0]},
          {threshold: [2, 5], color: [0, 150, 0]}
        ],
        gpuAggregation: false
      })
    ],
    goldenImage: './test/render/golden-images/contour-infoviz_border_ref.png'
  },

  // GEOSPATIAL
  {
    name: 'polygon-lnglat',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new PolygonLayer({
        id: 'polygon-lnglat',
        data: dataSamples.polygons,
        getPolygon: f => f,
        getFillColor: [200, 0, 0],
        getLineColor: [0, 0, 0],
        getLineDashArray: [20, 0],
        getWidth: f => 20,
        opacity: 0.8,
        pickable: true,
        lineWidthMinPixels: 1,
        lineDashJustified: true
      })
    ],
    goldenImage: './test/render/golden-images/polygon-lnglat.png'
  },
  {
    name: 'polygon-lnglat-64',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new PolygonLayer({
        id: 'polygon-lnglat-64',
        data: dataSamples.polygons,
        getPolygon: f => f,
        getFillColor: [200, 0, 0],
        getLineColor: [0, 0, 0],
        getLineDashArray: [20, 0],
        getWidth: f => 20,
        opacity: 0.8,
        pickable: true,
        lineWidthMinPixels: 1,
        lineDashJustified: true
      })
    ],
    goldenImage: './test/render/golden-images/polygon-lnglat.png'
  },
  {
    name: 'path-lnglat',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new PathLayer({
        id: 'path-lnglat',
        data: dataSamples.zigzag,
        opacity: 0.6,
        getPath: f => f.path,
        getColor: f => [128, 0, 0],
        getWidth: f => 100,
        widthMinPixels: 1,
        pickable: true
      })
    ],
    goldenImage: './test/render/golden-images/path-lnglat.png'
  },
  {
    name: 'path-lnglat-64',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new PathLayer({
        id: 'path-lnglat-64',
        data: dataSamples.zigzag,
        coordinateSystem: COORDINATE_SYSTEM.LNGLAT_DEPRECATED,
        fp64: true,
        opacity: 0.6,
        getPath: f => f.path,
        getColor: f => [128, 0, 0],
        getWidth: f => 100,
        widthMinPixels: 1,
        pickable: true
      })
    ],
    goldenImage: './test/render/golden-images/path-lnglat.png'
  },
  {
    name: 'scatterplot-lnglat',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new ScatterplotLayer({
        id: 'scatterplot-lnglat',
        data: dataSamples.points,
        getPosition: d => d.COORDINATES,
        getColor: d => [255, 128, 0],
        getRadius: d => d.SPACES,
        opacity: 1,
        pickable: true,
        radiusScale: 30,
        radiusMinPixels: 1,
        radiusMaxPixels: 30
      })
    ],
    goldenImage: './test/render/golden-images/scatterplot-lnglat.png'
  },
  {
    name: 'scatterplot-lnglat-64',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new ScatterplotLayer({
        id: 'scatterplot-lnglat-64',
        data: dataSamples.points,
        coordinateSystem: COORDINATE_SYSTEM.LNGLAT_DEPRECATED,
        fp64: true,
        getPosition: d => d.COORDINATES,
        getColor: d => [255, 128, 0],
        getRadius: d => d.SPACES,
        opacity: 1,
        pickable: true,
        radiusScale: 30,
        radiusMinPixels: 1,
        radiusMaxPixels: 30
      })
    ],
    goldenImage: './test/render/golden-images/scatterplot-lnglat.png'
  },
  {
    name: 'arc-lnglat',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 20,
      bearing: 0
    },
    layers: [
      new ArcLayer({
        id: 'arc-lnglat',
        data: dataSamples.routes,
        strokeWidth: 2,
        getSourcePosition: d => d.START,
        getTargetPosition: d => d.END,
        getSourceColor: d => [64, 255, 0],
        getTargetColor: d => [0, 128, 200],
        pickable: true
      })
    ],
    goldenImage: './test/render/golden-images/arc-lnglat.png',
    imageDiffOptions: !IS_HEADLESS && {
      threshold: 0.985
    }
  },
  {
    name: 'arc-lnglat-64',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 20,
      bearing: 0
    },
    layers: [
      new ArcLayer({
        id: 'arc-lnglat-64',
        data: dataSamples.routes,
        strokeWidth: 2,
        coordinateSystem: COORDINATE_SYSTEM.LNGLAT_DEPRECATED,
        fp64: true,
        getSourcePosition: d => d.START,
        getTargetPosition: d => d.END,
        getSourceColor: d => [64, 255, 0],
        getTargetColor: d => [0, 128, 200],
        pickable: true
      })
    ],
    goldenImage: './test/render/golden-images/arc-lnglat-64.png',
    imageDiffOptions: !IS_HEADLESS && {
      threshold: 0.985
    }
  },
  {
    name: 'line-lnglat',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new LineLayer({
        id: 'line-lnglat',
        data: dataSamples.routes,
        strokeWidth: 2,
        getSourcePosition: d => d.START,
        getTargetPosition: d => d.END,
        getColor: d => (d.SERVICE === 'WEEKDAY' ? [255, 64, 0] : [255, 200, 0]),
        pickable: true
      })
    ],
    goldenImage: './test/render/golden-images/line-lnglat.png'
  },
  {
    name: 'line-lnglat-64',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new LineLayer({
        id: 'line-lnglat-64',
        data: dataSamples.routes,
        strokeWidth: 2,
        coordinateSystem: COORDINATE_SYSTEM.LNGLAT_DEPRECATED,
        fp64: true,
        getSourcePosition: d => d.START,
        getTargetPosition: d => d.END,
        getColor: d => (d.SERVICE === 'WEEKDAY' ? [255, 64, 0] : [255, 200, 0]),
        pickable: true
      })
    ],
    goldenImage: './test/render/golden-images/line-lnglat-64.png'
  },
  {
    name: 'icon-lnglat',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    // rendering times
    renderingTimes: 2,
    layers: [
      new IconLayer({
        id: 'icon-lnglat',
        data: dataSamples.points,
        iconAtlas: ICON_ATLAS,
        iconMapping: dataSamples.iconAtlas,
        sizeScale: 12,
        getPosition: d => d.COORDINATES,
        getColor: d => [64, 64, 72],
        getIcon: d => (d.PLACEMENT === 'SW' ? 'marker' : 'marker-warning'),
        getSize: d => (d.RACKS > 2 ? 2 : 1),
        opacity: 0.8,
        pickable: true
      })
    ],
    goldenImage: './test/render/golden-images/icon-lnglat.png'
  },
  {
    name: 'icon-lnglat-64',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    // rendering times
    renderingTimes: 2,
    layers: [
      new IconLayer({
        id: 'icon-lnglat-64',
        data: dataSamples.points,
        iconAtlas: ICON_ATLAS,
        iconMapping: dataSamples.iconAtlas,
        sizeScale: 12,
        coordinateSystem: COORDINATE_SYSTEM.LNGLAT_DEPRECATED,
        fp64: true,
        getPosition: d => d.COORDINATES,
        getColor: d => [64, 64, 72],
        getIcon: d => (d.PLACEMENT === 'SW' ? 'marker' : 'marker-warning'),
        getSize: d => (d.RACKS > 2 ? 2 : 1),
        opacity: 0.8,
        pickable: true
      })
    ],
    goldenImage: './test/render/golden-images/icon-lnglat.png'
  },
  {
    name: 'geojson-lnglat',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new GeoJsonLayer({
        id: 'geojson-lnglat',
        data: dataSamples.geojson,
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
        getLineWidth: f => f.properties['stroke-width'],
        getElevation: f => 500,
        lineWidthScale: 10,
        lineWidthMinPixels: 1,
        pickable: true
      })
    ],
    goldenImage: './test/render/golden-images/geojson-lnglat.png'
  },
  {
    name: 'geojson-extruded-lnglat',
    viewState: {
      latitude: 37.78,
      longitude: -122.45,
      zoom: 12,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new GeoJsonLayer({
        id: 'geojson-extruded-lnglat',
        data: dataSamples.geojson,
        extruded: true,
        wireframe: true,
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
        getLineWidth: f => f.properties['stroke-width'],
        getElevation: f => 500,
        lineWidthScale: 10,
        lineWidthMinPixels: 1,
        pickable: true
      })
    ],
    goldenImage: './test/render/golden-images/geojson-extruded-lnglat.png'
  },
  {
    name: 'gridcell-lnglat',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new GridCellLayer({
        id: 'gridcell-lnglat',
        data: dataSamples.worldGrid.data,
        cellSize: dataSamples.worldGrid.cellSize,
        extruded: true,
        pickable: true,
        opacity: 1,
        getColor: g => [245, 166, g.value * 255, 255],
        getElevation: h => h.value * 5000
      })
    ],
    goldenImage: './test/render/golden-images/gridcell-lnglat.png'
  },
  {
    name: 'gridcell-lnglat-64',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new GridCellLayer({
        id: 'gridcell-lnglat-64',
        data: dataSamples.worldGrid.data,
        cellSize: dataSamples.worldGrid.cellSize,
        extruded: true,
        coordinateSystem: COORDINATE_SYSTEM.LNGLAT_DEPRECATED,
        fp64: true,
        pickable: true,
        opacity: 1,
        getColor: g => [245, 166, g.value * 255, 255],
        getElevation: h => h.value * 5000
      })
    ],
    goldenImage: './test/render/golden-images/gridcell-lnglat.png'
  },
  {
    name: 'grid-lnglat',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new GridLayer({
        id: 'grid-lnglat',
        data: dataSamples.points,
        cellSize: 200,
        opacity: 1,
        extruded: true,
        pickable: true,
        getPosition: d => d.COORDINATES,
        getColorValue,
        getElevationValue
      })
    ],
    goldenImage: './test/render/golden-images/grid-lnglat.png'
  },
  {
    name: 'screengrid-lnglat',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new ScreenGridLayer({
        id: 'screengrid-lnglat',
        data: dataSamples.points,
        getPosition: d => d.COORDINATES,
        cellSizePixels: 40,
        minColor: [0, 0, 80, 0],
        maxColor: [100, 255, 0, 128],
        pickable: false
      })
    ],
    goldenImage: './test/render/golden-images/screengrid-lnglat.png'
  },
  {
    name: 'screengrid-lnglat-cpu-aggregation',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new ScreenGridLayer({
        id: 'screengrid-lnglat-cpu-aggregation',
        data: dataSamples.points,
        getPosition: d => d.COORDINATES,
        cellSizePixels: 40,
        minColor: [0, 0, 80, 0],
        maxColor: [100, 255, 0, 128],
        pickable: false,
        gpuAggregation: false
      })
    ],
    goldenImage: './test/render/golden-images/screengrid-lnglat.png'
  },
  {
    name: 'screengrid-lnglat-colorRange',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new ScreenGridLayer({
        id: 'screengrid-lnglat-colorRange',
        data: dataSamples.points,
        getPosition: d => d.COORDINATES,
        cellSizePixels: 40,
        pickable: false
      })
    ],
    goldenImage: './test/render/golden-images/screengrid-lnglat-colorRange.png'
  },
  {
    name: 'hexagoncell-lnglat',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0,
      orthographic: true
    },
    layers: [
      new HexagonCellLayer({
        id: 'hexagoncell-lnglat',
        data: dataSamples.hexagons,
        hexagonVertices: dataSamples.hexagons[0].vertices,
        coverage: 1,
        extruded: true,
        pickable: true,
        opacity: 1,
        getColor: h => [48, 128, h.value * 255, 255],
        getElevation: h => h.value * 5000
      })
    ],
    goldenImage: './test/render/golden-images/hexagoncell-lnglat.png'
  },
  {
    name: 'hexagoncell-lnglat-64',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new HexagonCellLayer({
        id: 'hexagoncell-lnglat-64',
        data: dataSamples.hexagons,
        coordinateSystem: COORDINATE_SYSTEM.LNGLAT_DEPRECATED,
        fp64: true,
        hexagonVertices: dataSamples.hexagons[0].vertices,
        coverage: 1,
        extruded: true,
        pickable: true,
        opacity: 1,
        getColor: h => [48, 128, h.value * 255, 255],
        getElevation: h => h.value * 5000
      })
    ],
    goldenImage: './test/render/golden-images/hexagoncell-lnglat-64.png'
  },
  {
    name: 'hexagon-lnglat',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new HexagonLayer({
        id: 'hexagon-lnglat',
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
        getElevationValue
      })
    ],
    goldenImage: './test/render/golden-images/hexagon-lnglat.png'
  },
  {
    name: 'pointcloud-lnglat',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 13,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new PointCloudLayer({
        id: 'pointcloud-lnglat',
        data: dataSamples.getPointCloud(),
        coordinateSystem: COORDINATE_SYSTEM.LNGLAT_OFFSETS,
        coordinateOrigin: dataSamples.positionOrigin,
        getPosition: d => [d.position[0] * 1e-5, d.position[1] * 1e-5, d.position[2]],
        getNormal: d => d.normal,
        getColor: d => d.color,
        opacity: 1,
        radiusPixels: 2,
        pickable: true
      })
    ],
    goldenImage: './test/render/golden-images/pointcloud-lnglat.png'
  },
  {
    name: 'pointcloud-lnglat-64',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 13,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new PointCloudLayer({
        id: 'pointcloud-lnglat-64',
        data: dataSamples.getPointCloud(),
        coordinateSystem: COORDINATE_SYSTEM.LNGLAT_DEPRECATED,
        coordinateOrigin: dataSamples.positionOrigin,
        fp64: true,
        getPosition: d => [
          d.position[0] * 1e-5 - 122.42694203247012,
          d.position[1] * 1e-5 + 37.751537058389985,
          d.position[2]
        ],
        getNormal: d => d.normal,
        getColor: d => d.color,
        opacity: 1,
        radiusPixels: 2,
        pickable: true
      })
    ],
    goldenImage: './test/render/golden-images/pointcloud-lnglat-64.png'
  },
  {
    name: 'pointcloud-meter',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 13,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new PointCloudLayer({
        id: 'pointcloud-meter',
        data: dataSamples.getPointCloud(),
        coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
        coordinateOrigin: dataSamples.positionOrigin,
        getPosition: d => d.position,
        getNormal: d => d.normal,
        getColor: d => d.color,
        opacity: 1,
        radiusPixels: 2,
        pickable: true
      })
    ],
    goldenImage: './test/render/golden-images/pointcloud-meter.png'
  },
  {
    name: 'path-meter',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new PathLayer({
        id: 'path-meter',
        data: dataSamples.meterPaths,
        opacity: 1.0,
        getColor: f => [255, 0, 0],
        getWidth: f => 10,
        widthMinPixels: 1,
        pickable: false,
        strokeWidth: 5,
        widthScale: 100,
        autoHighlight: false,
        highlightColor: [255, 255, 255, 255],
        sizeScale: 200,
        rounded: false,
        getMarkerPercentages: () => [],
        coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
        coordinateOrigin: dataSamples.positionOrigin
      })
    ],
    goldenImage: './test/render/golden-images/path-meter.png'
  },
  {
    name: 'path-outline',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new PathOutlineLayer({
        id: 'path-outline',
        data: dataSamples.routes,
        opacity: 0.6,
        getPath: f => [f.START, f.END],
        getColor: f => [128, 0, 0],
        getZLevel: f => 125,
        getWidth: f => 10,
        widthMinPixels: 1,
        pickable: true,
        strokeWidth: 5,
        widthScale: 10,
        autoHighlight: true,
        highlightColor: [255, 255, 255, 255],
        parameters: {
          blendEquation: GL.MAX
        }
      })
    ],
    goldenImage: './test/render/golden-images/path-outline.png'
  },
  {
    name: 'path-outline-64',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new PathOutlineLayer({
        id: 'path-outline-64',
        data: dataSamples.routes,
        coordinateSystem: COORDINATE_SYSTEM.LNGLAT_DEPRECATED,
        fp64: true,
        opacity: 0.6,
        getPath: f => [f.START, f.END],
        getColor: f => [128, 0, 0],
        getZLevel: f => 125,
        getWidth: f => 10,
        widthMinPixels: 1,
        pickable: true,
        strokeWidth: 5,
        widthScale: 10,
        autoHighlight: true,
        highlightColor: [255, 255, 255, 255],
        parameters: {
          blendEquation: GL.MAX
        }
      })
    ],
    goldenImage: './test/render/golden-images/path-outline-64.png'
  },
  // Chrome 65 can't render this case correctly
  /* {
    name: 'path-marker',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new PathMarkerLayer({
        id: 'path-marker',
        data: dataSamples.routes,
        opacity: 0.6,
        getPath: f => [f.START, f.END],
        getColor: f => [230, 230, 230],
        getZLevel: f => 125,
        getWidth: f => 10,
        widthMinPixels: 1,
        pickable: true,
        strokeWidth: 5,
        widthScale: 10,
        autoHighlight: true,
        highlightColor: [255, 255, 255, 255],
        parameters: {
          blendEquation: GL.MAX
        },
        sizeScale: 200
      })
    ],
    goldenImage: './test/render/golden-images/path-maker.png'
  }, */
  {
    name: 'text-layer',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new TextLayer({
        id: 'text-layer',
        data: dataSamples.points.slice(0, 50),
        fontFamily: 'Arial',
        getText: x => `${x.PLACEMENT}-${x.YR_INSTALLED}`,
        getPosition: x => x.COORDINATES,
        getColor: x => [153, 0, 0],
        getSize: x => 16,
        getAngle: x => 0,
        sizeScale: 1,
        getTextAnchor: x => 'start',
        getAlignmentBaseline: x => 'center',
        getPixelOffset: x => [10, 0]
      })
    ],
    goldenImage: './test/render/golden-images/text-layer.png'
  },
  {
    name: 'text-layer-64',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new TextLayer({
        id: 'text-layer-64',
        data: dataSamples.points.slice(0, 50),
        fontFamily: 'Arial',
        coordinateSystem: COORDINATE_SYSTEM.LNGLAT_DEPRECATED,
        fp64: true,
        getText: x => `${x.PLACEMENT}-${x.YR_INSTALLED}`,
        getPosition: x => x.COORDINATES,
        getColor: x => [153, 0, 0],
        getSize: x => 16,
        getAngle: x => 0,
        sizeScale: 1,
        getTextAnchor: x => 'start',
        getAlignmentBaseline: x => 'center',
        getPixelOffset: x => [10, 0]
      })
    ],
    goldenImage: './test/render/golden-images/text-layer.png'
  },
  {
    name: 'gpu-grid-lnglat',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new GPUGridLayer({
        id: 'gpu-grid-lnglat',
        data: dataSamples.points,
        cellSize: 200,
        opacity: 1,
        extruded: true,
        pickable: true,
        getPosition: d => d.COORDINATES,
        gpuAggregation: true
      })
    ],
    goldenImage: './test/render/golden-images/gpu-grid-lnglat.png'
  },
  {
    name: 'gpu-grid-lnglat-cpu-aggregation',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new GPUGridLayer({
        id: 'gpu-grid-lnglat-cpu-aggregation',
        data: dataSamples.points,
        cellSize: 200,
        opacity: 1,
        extruded: true,
        pickable: false,
        getPosition: d => d.COORDINATES,
        gpuAggregation: false
      })
    ],
    goldenImage: './test/render/golden-images/gpu-grid-lnglat.png'
  },
  {
    name: 'contour-lnglat-cpu-aggregation',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new ContourLayer({
        id: 'contour-lnglat-cpu-aggregation',
        data: dataSamples.points,
        cellSize: 200,
        opacity: 1,
        getPosition: d => d.COORDINATES,
        contours: [
          {threshold: 1, color: [255, 0, 0], strokeWidth: 6},
          {threshold: 5, color: [0, 255, 0], strokeWidth: 3},
          {threshold: 15, color: [0, 0, 255]}
        ],
        gpuAggregation: false
      })
    ],
    goldenImage: './test/render/golden-images/contour-lnglat.png'
  },
  {
    name: 'contour-lnglat',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new ContourLayer({
        id: 'contour-lnglat',
        data: dataSamples.points,
        cellSize: 200,
        opacity: 1,
        getPosition: d => d.COORDINATES,
        contours: [
          {threshold: 1, color: [255, 0, 0], strokeWidth: 6},
          {threshold: 5, color: [0, 255, 0], strokeWidth: 3},
          {threshold: 15, color: [0, 0, 255]}
        ],
        gpuAggregation: true
      })
    ],
    goldenImage: './test/render/golden-images/contour-lnglat.png'
  },
  {
    name: 'contour-isobands-lnglat',
    viewState: {
      latitude: 37.751537058389985,
      longitude: -122.42694203247012,
      zoom: 11.5,
      pitch: 0,
      bearing: 0
    },
    layers: [
      new ContourLayer({
        id: 'contour-isobands-lnglat',
        data: dataSamples.points,
        cellSize: 200,
        opacity: 1,
        getPosition: d => d.COORDINATES,
        contours: [
          {threshold: [1, 5], color: [255, 0, 0], strokeWidth: 6},
          {threshold: [5, 15], color: [0, 255, 0], strokeWidth: 3},
          {threshold: [15, 1000], color: [0, 0, 255]}
        ],
        gpuAggregation: true
      })
    ],
    goldenImage: './test/render/golden-images/contour-isobands-lnglat.png'
  }
];
