# MapController

Inherits from [Base Controller](/docs/api-reference/controller.md).

The `MapController` class can be passed to the `Deck.controller` or `View.controller` prop to specify that map interaction should be enabled.

`MapController` is the default controller for `MapView`.

## Usage

Use with the default view:

```jsx
import DeckGL, {MapController} from 'deck.gl';

<DeckGL
controller={{type: MapController, dragRotate: false}}
viewState={viewState}
onViewportChange={v => this.setState({viewport: v})}
/>
```

Use with multiple views:

```jsx
import DeckGL, {MapView} from 'deck.gl';

<DeckGL
views={[
  new MapView({
    controller: {doubleClickZoom: false}
  })
]}
viewState={viewState}
onViewportChange={v => this.setState({viewport: v})}
/>
```

For a list of supported options, see [Controller](/docs/api-reference/controller.md).

## Source

[modules/core/src/core/controllers/map-controller.js](https://github.com/uber/deck.gl/blob/master/modules/core/src/controllers/map-controller.js)
