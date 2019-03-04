import {
  getDeckInstance,
  addLayer,
  removeLayer,
  updateLayer,
  drawLayer,
  getViewState
} from './deck-utils';

export default class MapboxLayer {
  /* eslint-disable no-this-before-super */
  constructor(props) {
    if (!props.id) {
      throw new Error('Layer must have an unique id');
    }

    this.id = props.id;
    this.type = 'custom';
    this.renderingMode = props.renderingMode || '3d';
    this.map = null;
    this.deck = null;
    this.props = props;
  }

  /* Mapbox custom layer methods */

  onAdd(map, gl) {
    this.map = map;
    this.deck = getDeckInstance({map, gl, deck: this.props.deck});
    addLayer(this.deck, this);
  }

  onRemove() {
    removeLayer(this.deck, this);
  }

  setProps(props) {
    // id cannot be changed
    Object.assign(this.props, props, {id: this.id});
    // safe guard in case setProps is called before onAdd
    if (this.deck) {
      updateLayer(this.deck, this);
    }
  }

  render(gl, matrix) {
    this.deck.setProps({
      viewState: this._getViewState()
    });
    drawLayer(this.deck, this);
  }

  /* Private API */

  _getViewState() {
    const {map, deck} = this;
    return getViewState(map, {
      nearZMultiplier: deck.height ? 1 / deck.height : 1,
      farZMultiplier: 1
    });
  }
}
