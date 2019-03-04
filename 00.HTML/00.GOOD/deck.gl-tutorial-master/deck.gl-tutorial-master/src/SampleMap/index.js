import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay';

// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2FscGFsaXUiLCJhIjoiY2o3MWk4Yzh6MDE3ZjMzbnptNWo0OGlnaSJ9.hJcfS-eBH4p0BbAty5YjwQ';  // eslint-disable-line

const latitude = 22.337706;
const longitude = 114.262974;

const defaultViewport = {
  latitude,
  longitude,
  zoom: 16,
  maxZoom: 18,
  bearing: 0,
  pitch: 0,
};


const handleClick = (event) => {
  console.log(event.lngLat);
};

class SampleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...defaultViewport,
        width: 500,
        height: 500,
      },
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize.bind(this));
  }

  onViewportChange(newViewport) {
    this.setState((prevState) => {
      const { zoom, maxZoom } = prevState.viewport;
      let currentZoom = zoom;

      // Increase zoom
      if (zoom + 0.01 > maxZoom) {
        currentZoom = 16;
      } else {
        currentZoom += 0.01;
      }

      return {
        viewport: { ...prevState.viewport, ...newViewport, zoom: currentZoom },
      };
    });
  }

  resize(e) {
    console.log(e);
    this.onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  render() {
    const { viewport } = this.state;

    return (
      <MapGL
        {...viewport}
        onViewportChange={e => this.resize(e)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onClick={handleClick}
      >
        <DeckGLOverlay viewport={viewport} width={viewport.width} height={viewport.height} />
      </MapGL>
    );
  }
}

export default SampleMap;
