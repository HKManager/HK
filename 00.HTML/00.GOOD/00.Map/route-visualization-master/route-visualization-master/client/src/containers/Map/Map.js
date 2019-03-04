import React, {Component} from 'react';
import {StaticMap} from 'react-map-gl';
import DeckGL from 'deck.gl';
import TripsLayer from '../../components/trips-layer';
import {connect} from 'react-redux'
import { fetchRoutes } from '../../actions/routesActions'
import ROUTES from '../../trips.json'

// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoianNpbmdsZXRvbiIsImEiOiJjamYzZmVsM2kwOXE0MnhvMXY5cWg5Zzh0In0.IH74ycvB5n__ZAo00GUw8Q'; // eslint-disable-line

const TEST_ROUTES = ROUTES;

export const INITIAL_VIEW_STATE = {
    longitude: -122.4194,
    latitude: 37.7749,
    zoom: 11,
    maxZoom: 16,
    bearing: 0
};

export class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
        time: 0
        };
    }

    componentDidMount() {
        //this.props.fetchRoutes();
        this._animate();
    }

    componentWillUnmount() {
        if (this._animationFrame) {
        window.cancelAnimationFrame(this._animationFrame);
        }
    }

    _animate() {
        const {
        loopLength = 1800, // unit corresponds to the timestamp in source data
        animationSpeed = 100 // unit time per second
        } = this.props;
        const timestamp = Date.now() / 1000;
        const loopTime = loopLength / animationSpeed;

        this.setState({
        time: ((timestamp % loopTime) / loopTime) * loopLength
        });
        this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
    }

    _renderLayers() {
        const {trailLength = 180, routes, test = TEST_ROUTES} = this.props;
        
        return [
        new TripsLayer({
            id: 'trips',
            data: test,
            getPath: d => d.segments,
            getColor: d => ([206, 40, 18]),
            opacity: 0.3,
            strokeWidth: 2,
            trailLength,
            currentTime: this.state.time
        }),

        ];
    }

    render() {
        const {viewState, controller = true, baseMap = true, routes} = this.props;

        return (
            <div>
                <DeckGL
                    layers={this._renderLayers()}
                    initialViewState={INITIAL_VIEW_STATE}
                    viewState={viewState}
                    controller={controller}
                >
                    {baseMap && (
                    <StaticMap
                        reuseMaps
                        mapStyle="mapbox://styles/mapbox/dark-v9"
                        preventStyleDiffing={true}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                    />
                    )}
                </DeckGL>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    routes: state.routes
})

export default connect(mapStateToProps, {fetchRoutes})(Map);