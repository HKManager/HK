/* global window */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Stats from 'stats.js';

import {updateMapState, updateMapSize, setHeaderOpacity} from '../actions/app-actions';
import DemoLauncher from './demo-launcher';
import TWEEN from '@tweenjs/tween.js';
import HomeDemo from './demos/home-demo';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    const viewport = {...HomeDemo.viewport};

    TWEEN.removeAll();
    this.cameraAnimation = new TWEEN.Tween(viewport).to(
      {...viewport, bearing: -15},
      29000
    ).easing(TWEEN.Easing.Sinusoidal.InOut)
    .onUpdate(function tweenUpdate() {
      props.updateMapState({...viewport}); // eslint-disable-line
    })
    .repeat(Infinity)
    .yoyo(true);
  }

  componentDidMount() {
    window.onscroll = this._onScroll.bind(this);
    window.onresize = this._resizeMap.bind(this);
    this._onScroll();
    this._resizeMap();

    this._stats = new Stats();
    this._stats.showPanel(0);
    this.refs.fps.appendChild(this._stats.dom);

    const calcFPS = () => {
      TWEEN.update();
      this._stats.begin();
      this._stats.end();
      this._animateRef = window.requestAnimationFrame(calcFPS);
    };

    this._animateRef = window.requestAnimationFrame(calcFPS);

    this.cameraAnimation.start();
  }

  componentWillUnmount() {
    window.onscroll = null;
    window.onresize = null;
    this.cameraAnimation.stop();
    window.cancelAnimationFrame(this._animateRef);
  }

  _resizeMap() {
    const container = this.refs.banner;
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.props.updateMapSize({width, height});
  }

  _onScroll() {
    const y = window.pageYOffset;
    const opacity = Math.max(0, Math.min(1, (y - 168) / 20));
    this.props.setHeaderOpacity(opacity);
  }

  render() {
    const {atTop} = this.state;
    return (
      <div className={`home-wrapper ${atTop ? 'top' : ''}`}>

        <section ref="banner" id="banner">
          <div className="hero">
            <DemoLauncher key="home-demo" demo="HomeDemo" isInteractive={false} />
          </div>
          <div className="container soft-left">
            <h1>deck.gl</h1>
            <p>Large-scale WebGL-powered Data Visualization</p>
            <a href="#/documentation/getting-started" className="btn">Get started</a>
          </div>
          <div ref="fps" className="fps" />
        </section>

        <section id="features">
          <div className="image" />
          <div className="container soft-left texts">
            <div>
              <h2>
                deck.gl is a WebGL-powered framework for visual exploratory
                data analysis of large datasets.
              </h2>
              <hr className="short" />

              <h3>
                <img src="images/icon-layers.svg" />
                A Layered Approach to Data Visualization
              </h3>
              <p>
              deck.gl allows complex visualizations to be constructed by
              composing existing layers, and makes it easy to package and
              share new visualizations as reusable layers. We already offer
              a <a href="#/documentation/layer-catalog">catalog of proven layers</a> and
              we have many more in the works.
              </p>

              <h3>
                <img src="images/icon-high-precision.svg" />
                High-Precision Computations in the GPU
              </h3>
              <p>
              By emulating 64 bit floating point computations in the GPU,
              deck.gl renders datasets with unparalleled accuracy and
              performance.
              </p>

              <h3>
                <img src="images/icon-react.svg" />
                React and Mapbox GL Integrations
              </h3>
              <p>
              deck.gl is a great match with React, supporting
              efficient WebGL rendering under the Reactive programming
              paradigm. And when used with Mapbox GL it automatically
              coordinates with the Mapbox camera system to provide
              compelling 2D and 3D visualizations on top of your Mapbox
              based maps.
              </p>
            </div>
          </div>
        </section>

        <hr />

        <section id="footer">
          <div className="container soft-left">
            <h4>Made by</h4>
            <i className="icon icon-uber-logo" />
          </div>
        </section>

      </div>
    );
  }
}

export default connect(
  state => ({}),
  {updateMapState, updateMapSize, setHeaderOpacity}
)(Home);
