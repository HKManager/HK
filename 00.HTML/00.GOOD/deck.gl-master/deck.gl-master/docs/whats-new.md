# What's New

This page contains highlights of each deck.gl release. Also check our [vis.gl blog](https://medium.com/vis-gl) for news about new releases and features in deck.gl.

## deck.gl v6.3

Release Date: Nov 19, 2018

### Prop Types System

Layers can now supply rich definitions to their default props. This enables prop validation in debug mode and aggressively blocks unnecessary layer update to boost rendering performance. Complex composite layers such as the GeoJsonLayer can be up to 2x faster in certain React applications. See [upgrade guide](/docs/upgrade-guide.md) if you are an author of custom layers.

### New Interaction Callbacks

`onDragStart`, `onDrag` and `onDragEnd` callback props are added to `Deck` and base `Layer` class.

### GPUAggregator Improvements

The experimental `GPUAggregator` class now supports Min/Max/Mean in addition to Sum. Also added the ability to specify multiple weights with custom aggregation operation.


## deck.gl v6.2

Release Date: Oct 15, 2018

<table style="border: 0;" align="center">
  <tbody>
    <tr>
      <td>
        <img height=200 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/new-projection-mode.gif" />
        <p><i>32-bit High-Precision Projection</i></p>
      </td>
      <td>
        <img height=200 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/mapbox-layers.jpg" />
        <p><i>Mixing Mapbox and deck.gl Layers</i></p>
      </td>
    </tr>
  </tbody>
</table>

### Mapbox Custom Layer API

A new experimental module ` @deck.gl/mapbox` makes deck.gl work with the custom layers API in the latest Mapbox release. Using this feature, mapbox and deck.gl layers can be freely "interleaved", enabling a number of layer mixing effects, such as drawing behind map labels, z-occlusion between deck.gl 3D objects and Mapbox buildings, etc. For usage and limitations, see [module documentation](/docs/api-reference/mapbox/overview.md).

### 32-bit High-Precision Projection

First introduced in v6.1 as `COORDINATE_SYSTEM.LNGLAT_EXPERIMENTAL`, the new projection system offers high-precision results similar to that of the old `fp64` mode without the compatibility issues or performance hit of running the much heavier 64-bit shader. Starting v6.2, this coordinate system becomes the default for all layers. See [upgrade guide](/docs/upgrade-guide.md) if you still need the old `fp64` mode.

### CPU/GPU Parity in Projection

The `layer.project()` method now supports all coordinate systems including METER_OFFSETS, LNGLAT_OFFSETS and IDENTITY.


## deck.gl v6.1

Release date: Sep 7, 2018

<table style="border: 0;" align="center">
  <tbody>
    <tr>
      <td>
        <img height=200 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/json-layers-thumb.gif" />
        <p><i>JSON API</i></p>
      </td>
      <td>
        <img height=200 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/minimap-thumb.gif" />
        <p><i>Enhanced Multi-View API</i></p>
      </td>
      <td>
        <img height=200 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/contour-layer-cell-resize.gif" />
        <p><i>ContourLayer</i></p>
      </td>
    </tr>
  </tbody>
</table>


### High-Precision Geospatial Projection (Experimental)

The projection algorithm used for geospatial coordinates (layers with `coordinateSystem: COORDINATE_SYSTEM.LNGLAT`) has supplemented with a "hybrid" projection/offset based implementation (`COORDINATE_SYSTEM.LNGLAT_EXPERIMENTAL`) that rivals 64-bit precision at 32-bit speeds. This mode is expected to make the use of `fp64` precision unnecessary for most applications, which in turn should increase application performance and avoid issues on untested graphics drivers.


### Dynamic Meridian

`LNGLAT` projection modes can automatically wrap coordinates over the 180th meridian for the best placement in the current viewport. Set the `wrapLongitude` prop in a layer to `true` to enable this behavior. This mode will be helpful when visualizing data close to the ante-meridian (e.g. New Zealand, Australia etc).


### JSON API (Experimental)

A new experimental module `@deck.gl/json` provides a set of classes that allows deck.gl layers and views to be specified using JSON-formatted text files. To facilitate experimentation, a JSON layer browser is available on [http://deck.gl/json](http://deck.gl/json).


### Enhanced Multiview Support

deck.gl's multiview support has been significantly enhanced. New `View` properties give applications more control over rendering, making it possible to implement e.g. overlapping views, partially synchronized views (share some but not all view state props), views with different background colors etc.


### ContourLayer

deck.gl's layer catalog is extended by adding new `ContourLayer`, this layer can be used to render contours, also called iso-lines for given set of threshold values. `ContourLayer` supports both WebMercator projection (geospatial applications) and Orthographic projection (infovis applications).


### IconLayer

When the `mask` of the icon is `false`, the opacity of the icon can be controlled by `getColor` while still keeping the pixel color from image. When `mask` is `true`, user defined color is applied.


### GPU Aggregation Enhancements (Experimental)

Several under the hood changes in GPU Aggregation flow to support multiple layer coordinate systems (LNGLAT and IDENTITY).


## deck.gl v6.0

Release date: July 18, 2018

<table style="border: 0;" align="center">
  <tbody>
    <tr>
      <td>
        <img height=200 src="https://raw.github.com/uber-common/deck.gl-data/master/images/attribute-transition.gif" />
        <p><i>GeoJson Transition</i></p>
      </td>
      <td>
        <img height=200 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/viewstateTransitionsFlyTo.gif" />
        <p><i>ViewState flyTo Transitions</i></p>
      </td>
      <td>
        <img height=200 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/GPUAcceleratedScreenGridAggregation.gif" />
        <p><i>GPU Accelerated ScreenGrid Layer</i></p>
      </td>
    </tr>
  </tbody>
</table>


#### Attribute Transitions (WebGL2-compatible browsers only)

Attribute transitions enable applications to simultaneously animate changes in positions, colors and other attributes of all objects in a layer. GPU acceleration to  All core deck.gl layers now support attribute transitions, including `HexagonLayer`, `GridLayer` and `GeoJsonLayer`. GPU Accelerations allow millions of objects to be animated. Transition settings also support `enter` callback to customize instance entrance behavior. See documentation of the [transitions prop](/docs/api-reference/layer.md).


#### View State Transitions

View State Transitions (aka Viewport Transitions) are now officially supported. Transitions are provided through the `DeckGL.viewState` prop. For more details check [ViewState Transitions](/docs/api-reference/view-state-transitions.md) documentation.


#### ScreenGridLayer: GPU accelerated aggregation

ScreenGridLayer is updated to support aggregation on GPU. GPU aggregation can be 10x faster and is capable of aggregating large data sets (millions of points). Two new props `gpuAggregation` for selecting CPU or GPU aggregation and `cellMarginPixels` to control cell margin size have been added. Finally, picking information now contains aggregated details.


#### Controllers: Simplified Usage

deck.gl can now infer appropriate `Controller` types from the types of your `View`. For example, when using the default geospatial view (`MapView`), a `MapController` can now be requested simply by setting the view's `controller` props to `true`. You may also pass an object with additional controller options to this prop, for example `controller={{doubleClickZoom: false}}`. See documentation of [View](/docs/api-reference/view.md).


#### Pixel Sizes aligned with HTML/CSS

deck.gl pixel sizes (e.g. in `LineLayer`, `IconLayer` and `TextLayer`) now match their HTML/SVG counterparts.


#### WebGL parameters can now be set declaratively

It is now possible to set global WebGL parameters (controlling how the GPU renders) by supplying a `Deck.parameters` property object. This gives applications a simple declarative way to control things like blend modes and depth testing, without having to define an `onWebGLInitialized()` callback. Note that `parameters` can still be supplied to individual layers, overriding any global parameters for that layer only.


#### React API Enhancements

The `DeckGL` React component now provides a more powerful API to create sophisticated visualizations, highlights including:

* `DeckGL` can be used as a "stateful" component providing automatic interactivity
* You can now specify deck.gl views (in addition to layers) directly using JSX
* Adds "render callbacks" for dynamically rendering React children based on deck.gl view states, providing more control over synchronization of positions and sizes between deck.gl's WebGL view layouts and React's DOM components.

See [Use with React](/docs/get-started/using-with-react.md) for more details.


## deck.gl v5.3

Release date: June 01, 2018

<table style="border: 0;" align="center">
  <tbody>
    <tr>
      <td>
        <img height=150 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/orthographic.gif" />
        <p><i>Orthographic Mode</i></p>
      </td>
    </tr>
  </tbody>
</table>


#### Automatic Interactivity

A new `Deck.initialViewState` property allows the application to enable map or view interactivity simply by supplying an initial view state, e.g. `{longitude, latitude, zoom}`. deck.gl will automatically initialize a Controller class and listen to view state changes, without the application having to implement callbacks to track the view state.


#### Automatic Data Loading

The `Layer.data` prop now accepts URLs (i.e. strings). deck.gl will automatically start loading such URLs, parse them as JSON and once loaded, use the resulting data to render the layer. This can e.g. remove the need for applications to set up callbacks to handle load completion.


#### Deep Picking

deck.gl can now pick occluded objects using the new `Deck.pickMultipleObjects` method, which returns a list of all objects under the mouse, instead of just the top-most object.


#### Switch between Perspective and Orthographic mode

The [`View`](/docs/api-reference/view.md) classes can now build an orthographic projection matrix from the same "field of view" parameter it uses to create perspective mode (rather than requiring a separate set of parameters). This makes switching between perspective and orhtographic projection modes easier then ever (simply set the new `View.orthographic` prop to `true` to activate orthographic projection).


#### Per-instance stroke width in LineLayer and ArcLayer

LineLayer and ArcLayer added a new accessor `getStrokeWidth` to replace the old `strokeWidth` prop. When specified with a function, you can control the width of each arc/line segment dynamically.


#### Constant Accessors

Many layer accessor props now accept constant values. For example, when constructing a ScatterplotLayer, what used to be `getColor: d => [255, 200, 0]` can now be written as `getColor: [255, 200, 0]`. This is not only a convenience: constant values of accessors don't use GPU memory and can be updated very quickly and thus do not require an `updateTrigger`. Consult the documentation for each layer to see which accessors are supported.


#### @deck.gl/layers submodule

Core layers are broken out from ` @deck.gl/core` to a new submodule ` @deck.gl/layers`. Users of `deck.gl` are not affected by this change.


## deck.gl v5.2

Release date: April 24, 2018

<table style="border: 0;" align="center">
  <tbody>
    <tr>
      <td>
        <img height=150 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/text-layer.gif" />
        <p><i>New TextLayer</i></p>
      </td>
      <td>
        <img height=150 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/screenGrid-colorRangeDomain.gif" />
        <p><i>ScreenGridLayer Color Scale</i></p>
      </td>
      <td>
        <img height=150 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/test-utils.gif" />
        <p><i>Automated Render Tests</i></p>
      </td>
    </tr>
  </tbody>
</table>


### Use deck.gl without React

deck.gl can now be used in non-React applications. A new top-level JavaScript class [`Deck`](/docs/api-reference/deck.md) is provided as an alternative to the traditional top-level `DeckGL` React component, and the core deck.gl npm module no longer has any React dependencies. This allows deck.gl to be used in any JavaScript application or framework.

The new non-React API is officially supported, however since it is not yet extensively battle-tested in applications there may be some rough corners, so to help developers set expectations we are labeling this as a "pre release" intended for early adopters.


### Scripting Support

deck.gl now publishes a bundle that can be imported using a simple `<script>` statement in HTML to give access to the deck.gl API. This makes deck.gl easy to use in e.g. "codepens" and for casual programming and visualizations.

See our [scripting blog post](https://medium.com/vis-gl/start-scripting-with-deck-gl-c9036d7a6011).


### Multiple Modules

deck.gl is now published as multiple npm modules allowing applications to choose which features to import. The basic modules are:

* [`@deck.gl/core`](https://www.npmjs.com/package/@deck.gl/core) - the core deck.gl API (JavaScript classes, including the `Deck` top-level class).
* [`@deck.gl/react`](https://www.npmjs.com/package/@deck.gl/react) - React bindings for deck.gl (i.e. the top-level `DeckGL` React class).
* [`deck.gl`](https://www.npmjs.com/package/deck.gl) - The classic module is still supported for backwards compatibility with React applications.


### Multi-Viewport Support

deck.gl allows you to divide your screen into multiple viewports and render layers from different perspectives. It is e.g. possible to render a top-down map view next to a first person view and allow your users to "walk around" in the city onto which your data is overlaid.

The [`Deck.views`](/docs/developer-guide/views.md) property accepts instances of [`View`](/docs/api-reference/view.md) classes, such as [`MapView`](/docs/api-reference/view.md) and [`FirstPersonView`](/docs/api-reference/first-person-view.md):

```jsx
<DeckGL
  views=[
    new MapView({id: 'map', width: '50%'}),
    new FirstPersonView({x: '50%', width: '50%'})
  ]
/>
```


### MapController

It is now possible to specify a `MapController` as a `controller` for the `Deck` or `DeckGL` classes, instead of relying on e.g. `react-map-gl` or experimental classes to drive event handling.


### Automatic Resize Handling

It is no longer necessary for deck.gl applications to track screen size and manage the exact `width` and `height` of the `Deck` or `DeckGL` components. `width` and `height` can now be specified using CSS descriptors (e.g. `width = 100%`):

```jsx
<DeckGL width='100%' height='100%'/>
```


### Layers

#### TextLayer (New)

A [TextLayer](/docs/layers/text-layer.md) has been added to the core layer catalog for rendering labels with WebGL.


#### ScreenGridLayer

**Color Scale Support** (Experimental) - New experimental props `colorRange` and `colorDomain` are added to ScreenGridLayer. These props provide more fine tune control over how grid cells are colored, and brings the ScreenGridLayer into parity with other aggregation layers (i.e. HexagonLayer and GridLayer).


#### Experimental Layers

A number of experimental deck.gl layers are published in a new module [@deck.gl/experimental-layers](https://www.npmjs.com/package/@deck.gl/experimental-layers). Be aware that use of these layers come with caveats and are mainly intended for early adopters. Please refer to [roadmap](/docs/roadmap.md) for more information.


### Test Utilities

deck.gl now provides a suite of [test utilities](/docs/developer-guide/testing) that make it easy to test both layers and applications. The utilities support visual regression testing against "golden" images, as well as utilities for traditional unit testing of layers. The utilities come pre-integrated with tools that help automate the running of browser based render tests from the console. To start using the utilities, install the new ([@deck.gl/test-utils](https://www.npmjs.com/package/@deck.gl/test-utils)) module.


### Dist Size Reduction

Work on bundle size reduction continues. In this release, the focus has been on leveraging the tree-shaking abilities of the Babel 7 and Webpack 4 combination. In addition, new article about [Application Bundling and Tree Shaking](/docs/developer-guide/building-apps.md) has been added to the docs.


### Shader Modules

#### project32 (New)

**Unified 32/64-bit projection** - A new common API for projection is implemented in both the `project64` shader module and a new `project32` shader module allowing the same vertex shader can be used for both 32-bit and 64-bit projection. This simplifies adding fp64 support to layers and reduces bundle size. See [docs](/docs/shader-modules/project32.md) for more details.



## deck.gl v5.1

Release date: Feb 16, 2018

<table style="border: 0;" align="center">
  <tbody>
    <tr>
      <td>
        <img height=150 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/transitions.gif" />
        <p><i>Layer Transitions</i></p>
      </td>
      <td>
        <img height=150 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/jsx-layers.png" />
        <p><i>JSX Layers</i></p>
      </td>
    </tr>
  </tbody>
</table>


### Layer Improvements

#### Layer Transitions

Many layers now support smooth visual transitions of e.g. positions and colors of layer elements, animating the update of the layers element to match a new data set. The animations are done on the GPU and can thus support very large number of elements. Use the new [`transitions`](/docs/api-reference/layer.md) prop on the `Layer` class to specify things like *transition duration*, *easing function* and *callbacks*.

> Transitions are only supported on WebGL2-capable browsers such as Chrome and Firefox. The `transitions` prop will simply be ignored on WebGL1 browsers.


### React Improvements

#### Use JSX to render deck.gl Layers

It is now possible to use JSX syntax to create (or "render") deck.gl layers. Many React users feel that this results in a more natural coding style.

```jsx
  <DeckGL {...viewport}>
    <LineLayer data={data} />
  <DeckGL />
```

> There are limitations (deck.gl layers are **not** React components), for more information see [Using deck.gl with React](/docs/get-started/using-with-react.md).


## deck.gl v5

Release date: Dec 21, 2017

<table style="border: 0;" align="center">
  <tbody>
    <tr>
      <td>
        <img height=150 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/object-highlighting.gif" />
        <p><i>GPU-based Highlighting</i></p>
      </td>
      <td>
        <img height=150 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/path-dashes.png" />
        <p><i>Dashes in GeoJson</i></p>
      </td>
      <td>
        <img height=150 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/react-16.png" />
        <p><i>React 16 Support</i></p>
      </td>
    </tr>
  </tbody>
</table>


All new additions to the official deck.gl 5.0 API are listed here. Note that in addition to the official new features in this release, deck.gl 5.0 also contains a number of significant under the hoods changes to prepare for new features and optimizations. Some of these are available as experimental APIs, see below.

As always, for information on deprecations and how to update your code in response to any API changes, please read the deck.gl [upgrade Guide](/docs/upgrade-guide.md).


### DeckGL Component

#### DeckGL: Control over DevicePixelRatio

The new `useDevicePixels` prop on the `DeckGL` React component can be used to disable usage of full resolution on retina/HD displays. Disabling deck.gl's default behavior of always rendering at maximum device resolution can reduce the render buffer size with a factor of 4x on retina devices and lead to significant performance improvements on typical fragment shader bound rendering. This option can be especially interesting on "retina" type mobile phone displays where pixels are so small that the visual quality loss may be largely imperceptible.

#### DeckGL: Layer Filtering

A new `DeckGL` prop `layerFilter` gives the application an opportunity to filter out layers from the layer list during rendering and/or picking. Filtering can be done per layer or per viewport (experimental) or both. This enables techniques like adding helper layers that work as masks during picking but do not show up during rendering, or rendering different additional information in different viewports (experimental).

#### DeckGL: Allow overriding canvas component style

Users can now override the canvas size, position and offset via the style prop passed to the DeckGL component.


### Layer Improvements

#### Layer: Automatic Highlighting of Hovered Elements

Three new `Layer` props (`autoHighlight`, `highlightColor` and `highlightedObjectIndex`) have been added to enable simple and efficient highlighting of a single object in a layer. Highlighting is either automatic on hover, or programmatically controlled through specifying the index of the selected object. The actual highlighting is done on the GPU and this feature is thus very performant, in particular as it lets applications avoid cumbersome techniques like modifying data or using a secondary layer for highlighting.

See our [blog post](https://medium.com/vis-gl/automatic-gpu-based-object-highlighting-in-deck-gl-layers-7fe3def44c89)

#### CompositeLayer: Property Forwarding Support

A new method `CompositeLayer.getSubLayerProps()` simplifies forwarding base layer props to sub layers, removing code clutter and reducing the risk of forgetting to forward an important base layer property.


#### PathLayer & GeoJsonLayer: Dashed Line Support

Added new props (`getDashArray` and `dashJustified`) enabling you render paths as dashed lines. Naturally these props are also accessible in composite layers built on top of the `PathLayer`, such as the `GeoJsonLayer`.

#### PolygonLayer & GeoJsonLayer: Elevation Scale

Added new prop `elevationScale` to enable fast scaling elevation of all extruded polygons.

#### HexagonLayer / GridLayer: Elevation by Value Support

Add `getElevationValue` to `HexagonLayer` and `GridLayer` to enable elevation aggregation by value. This allow both color and elevation to be calculated based on customized aggregation function.


### Seer Improvements

The [Seer](https://chrome.google.com/webstore/detail/seer/eogckabefmgphfgngjdmmlfbddmonfdh?hl=en) Chrome Debug Extension now remembers its "on/off" setting across application reloads. This is significant because it means that the Seer extension can be left installed even in heavy deck.gl applications with lots of layers, and turned on only during debugging, without any performance impact during normal usage.


### Shader Modules

Note: This change is mainly relevant to developers who write custom deck.gl layers.

* Shader module documentation is much improved, both in deck.gl and luma.gl. In the deck.gl docs, shader modules are listed in the "API Reference" section, after the JavaScript classes.
* The `project` module provides a new function `project_pixel_to_clipspace` for screen space calculations that takes variables like `useDevicePixels` and "focal distance" into account, making pixel space calculation simpler and less prone to fail when parameters change.
* The core deck.gl shader modules (`project` etc) now conform to the luma.gl shadertools conventions for naming uniforms and functions, making this module easier to describe and use. In spite of these changes, backwards compatible uniforms are provided to ensure that existing layers do not break.


### React Integration

#### React 16 Support

deck.gl v5 now supports React 16 and the `package.json` dependencies of all React-based examples have updated to React 16.


### Experimental Features

As usual, deck.gl 5.0 contains a number of experimental features, e.g. "multi viewport", "first person viewport" and "viewport transitions". These features are still being finalized and the APIs have not been frozen, but can still be accessed by early adopters. See the roadmap article for more information on these.


## deck.gl v4.1

Release date: July 27th, 2017

<table style="border: 0;" align="center">
  <tbody>
    <tr>
      <td>
        <img height=150 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/webgl2.jpg" />
        <p><i>WebGL 2</i></p>
      </td>
      <td>
        <img height=150 src="https://raw.github.com/uber-common/deck.gl-data/master/images/whats-new/seer.png" />
        <p><i>Seer Extension</i></p>
      </td>
    </tr>
  </tbody>
</table>


### WebGL2 Support (provided by luma.gl v4)

deck.gl v4.1 is based on luma.gl v4, a major release that adds full WebGL2 support as well as powerful features like WebGL state management and an improve GLSL shader module system. On all browsers that supports WebGL2 (e.g. recent Chrome and Firefox browsers), deck.gl will obtain WebGL2 context and utilize WebGL2 functionalities. To know more about WebGL2, please check [here](https://www.khronos.org/registry/webgl/specs/latest/2.0/).


### Query Methods

Two new functions - `DeckGL.queryObject` and `DeckGL.queryVisibleObjects` allow developers to directly query the picking results, in addition to handling picking via built-in click and hover callbacks. This allows applications to build more advanced event handling and makes deck.gl easier to integrate with existing applications that have already implemented their own event handling.

In addition, the `queryObject` offers a much requested `radius` parameter, allowing the application to specify how close an object needs to be to the specified coordinate to be considered a match (in deck.gl v4.0, picking will only trigger if an object is actually visible on the queried pixel, making it hard for users to select small features and thin lines).

### Shader Assembly

For developers that write their own custom layers, the `shadertools` shader assembly system is now in place to replace the existing `assembleShaders` function in deck.gl. The new shader assembler system supports organizing shader code into modules and is integrated with luma.gl's [`Model`](http://uber.github.io/luma.gl/#/documentation/api-reference/model) so users no longer need to call `assembleShaders` before creating the `Model` for the layer.

### Per-Layer Control of WebGL Parameters

The base `Layer` class (which is inherited by all layers) supports a new property `parameters` that allows applications to specify the state of WebGL parameters such as blending mode, depth testing etc. This provides applications with significant control over the detailed rendering of layers. Note that the new `parameters` prop directly leverages the luma.gl v4 [setParameters](http://uber.github.io/luma.gl/#/documentation/api-reference/get-parameter) API, which allows all WebGL parameters to be specified as keys in a single parameter object.


### Layer Attribute Control

Pre-calculated "Vertex Attributes" can now be passed as props, meaning that developers that are willing to learn how a deck.gl layer's vertex attributes are structured can pass in typed arrays as props to the layer and have these directly passed to the GPU. This prevents the layer's internal `AttributeManager` from generating the attributes from your data, allowing you to optimize by e.g. directly passing in binary data from calculations or a binary file load without having deck.gl do any transformation on your data.


### CompositeLayer

Composite layers, which were introduced in v4.0, have received some polish and performance improvements. In subclassed `CompositeLayer`s, the `renderLayers` function can now return a nested array that could contain `null` values, and deck.gl will automatically flatten, filter and render all layers in the array. This is a small convenience that can make your `renderLayers` methods in complex composite layers a little more readable.

```js
   renderLayers() {
      return [
         setting1 && new ScatterplotLayer(...),
         setting2 && new LineLayer(...),
         this._renderAdditionalLayerList()
      ];
   }
```

Also, as a performance improvements, deck.gl now avoids "rerendering" sublayers of `CompositeLayer` whose props haven't changed.

### New Examples

Several new examples have been added to illustrate the wide applicability of deck.gl. To name a few:

* Wind visualization in US. This example is featured on [OpenVIS 2017 by @philogb](https://www.youtube.com/watch?v=KPiONdmNOuI). This example shows how new features in WebGL2 can be used to accelerate compute intensive tasks through GPU computing right in the browsers
* Tagmap - This example by @rivulet-zhang shows some novel approching in placing and rendering text symbols in deck.gl
* Point cloud example - The point cloud example shows how deck.gl could be used to render large amount of 3D point cloud data without any basemap context.
* Node-link Graph - This is another example showing how deck.gl could be extended to the info-vis domain.


### Touch Support

deck.gl's default event handling now includes support for multitouch gestures to zoom and rotate the view. In addition, a new `EventManager` class solidifies deck.gl's support for event handling.


### Seer Integration

deck.gl is now integrated with the new [Seer Chrome extension](https://chrome.google.com/webstore/detail/seer/eogckabefmgphfgngjdmmlfbddmonfdh?hl=en). Simply installing Seer and rerunning your application opens up a new tab in the Chrome developer tools, providing you with the ability to see all your deck.gl layers, inspect (and edit) their properties and attributes and check per layer timings, such as the latest GPU draw calls or attribute updates.

And note that since luma.gl v4 also has a Seer integration, it is possible to follow links from deck.gl layer to luma.gl models inside Seer, enabling you to further drill down and understand what data is ultimately being generated and processed by the GPU.


## deck.gl v4.0

Release date: March 31, 2017

### Highlights

* **New Geospatial Layers** GeoJsonLayer, PathLayer, PolygonLayer, IconLayer, GridCellLayer, HexagonCellLayer, PointCloudLayer.
* **New Aggregating Layers** GridLayer and HexagonLayer now join the ScreenGridLayer in a growing family of layers that automatically "bin" your point data, in this case into grid cells or hexagons.
* **New Examples** deck.gl now provides multiple stand-alone examples, with minimal configuration files (`package.json`, `webpack.config.js` etc) intended to make it easy to just copy an example folder and get an app up and running in minutes.
* **Unified 64-bit Layers** - 64-bit Layers are now unified with 32-bit layers, controlled via a new `fp64` prop.
* **Library Size Reduction** - A number of npm package dependencies have been trimmed from deck.gl, and the distribution has initial support for "tree-shaking" bundlers like webpack2 and rollup.
* **Performance** A number of improvements across the core library and layers improves rendering and picking performance.
* **Model Matrix Support** - Model matrix support for the `METER_OFFSET` projection mode enables arbitrary coordinate transforms (translations, rotations, scaling etc) to be applied on individual layer enabling scene graph like layer composition and animation.
* **Documentation** Improved and reorganized in response to user feedback.
* **Experimental Features** Experimental support for non-Mercator projections and rendering effects (e.g. Reflections)

### New Layers

#### GeoJsonLayer

A layer that parses and renders GeoJson. Supports all GeoJson primitives (polygons, lines and points).
The GeoJsonLayer is an example of a composite layer that instantiates other layers (in this case `PathLayer`, `PolygonLayer` and `ScatterplotLayer`) to do the actual rendering. This layer replaces the now deprecated family of `ChoroplethLayer`s.

#### PathLayer

Takes a sequence of coordinates and renders them as a thick line with mitered or rounded end caps.

#### PolygonLayer

Each object in data is expected to provide a "closed" sequence of coordinates and renders them as a polygon, optionally extruded or in wireframe mode. Supports polygons with holes.

#### IconLayer

Allows the user to provide a texture atlas and a JSON configuration specifying where icons are located in the atlas.

#### GridLayer

A layer that draws rectangular, optionally elevated cells. A typical grid based heatmap layer. Differs from the `ScreenGridLayer` in that the cells are in world coordinates and pre aggregated.

#### HexagonLayer

A layer that draws hexagonal, optionally elevated cells.

#### Point Cloud Layer

Draws a LiDAR point cloud. Supports point position/normal/color.

### Improvements to all Layers

#### Support for Per-Layer Model Matrix

Each layer now supports a `modelMatrix` property that can be used to specify a local coordinate system for the data in that layer:

* Model matrices can dramatically simplify working with data in different coordinate systems, as the data does not need to be pre-transformed into a common coordinate system.

* Model matrices also enable interesting layer animation and composition possibilities as individual layers can be scaled, rotated, translated etc with very low computational cost (i.e. without modifying the data).

#### UpdateTriggers now accept Accessor Names

`updateTriggers` now accept Accessor Names.

The `updateTriggers` mechanism in deck.gl v3 required the user to know the name of the vertex attribute controlled by an accessor. It is now possible to supply names of `accessors`.

#### More intuitive mouse events

* `onHover` is now only fired on entering/exiting an object instead of on mouse move.
* `onClick` is now only fired on the picked layer instead of all pickable layers.

### New Features for Layer Subclassing

#### Overridable Shaders

All layers now have a `getShaders` method that can be overriden by subclasses, enables reuse of all layer code while just replacing one or both shaders, often dramatically reducing the amount of code needed to add a small feature or change to en existing layers.

### New Features for Layer Writers

#### `defaultProps`

Layers are now encouraged to define a `defaultProps` static member listing their props and default values, rather than programmatically declaring the props in constructor parameters etc. Using `defaultProps` means that many layer classes no longer need a constructor.

#### AttributeManager now accepts new `accessor` field

Can be a string or a an array of strings. Will be used to match `updateTriggers` accessor names with instance attributes.

#### `getPickingInfo()`

This method replaces the old `pick()` method and is expected to return an info object. Layers can block the execution of callback functions by returning `null`.

### Performance

A number of performance improvements and fixes have been gradually introduced since deck.gl v3.0 was launched. While many are not new in v4.0, cumulatively they enable noticeably better framerates and a lighter footprint when big data sets are loaded, compared to the initial v3.0.0 version.

The `AttributeManager` class now supports default logging of timings for attribute updates. This logging can be activated by simply setting `deck.log.priority=2` in the console (levels 1 and 2 provide different amounts of detail). This can be very helpful in verifying that your application is not triggering unnecessary attribute updates.

In addition, the new function `AttributeManager.setDefaultLogFunctions` allows the app to install its own custom logging functions to take even more control over logging of attribute updates.

### Library Improvements

JavaScript build tooling continues to evolve and efforts have been made to ensure deck.gl supports several popular new tooling setups:

* **Dependency Reduction** The number of npm dependencies (both in `deck.gl`, `luma.gl` and `react-map-gl`) have been reduced considerably, meaning that installing deck.gl and related modules will bring in less additional JavaScript code into your app, and your app will build and run faster.
* **Tree-shaking support**: deck.gl and related libraries now publish a "module" entry point in package.json which points to a parallel distribution (`deck.gl/dist-es6`) that preserves the `import` and `export` statements. This should allow tree shaking bundlers such as webpack 2 and rollup to further reduce bundle size.
* **Pure ES6 source code**: With few exceptions (e.g some JSX usage in examples), the source code of deck.gl and related modules are now all restricted to conformant ES6 (i.e. no ES2016 or ES2017, flow or similar syntax is used). This means that the source code can run directly (ie. without transpilation) in Node.js and modern browsers. You could potentially import code directly from `deck.gl/src` to experiment with this.
* **Buble support** in examples. [Buble](https://buble.surge.sh/guide/) is a nice alternative to babel if you have a simple app and don't need all the power of babel. Many of the examples now use buble for faster and smaller builds.

### Examples

Code examples have been improved in several ways:

* **Multiple Examples** deck.gl now provides multiple different examples in an `examples` folder, showing various interesting uses of deck.gl.
* **Stand Alone Examples** Examples are now stand alone, each with its own minimal `package.json` and configuration files, enabling them to be easily copied and modified.
* **Hello World Examples** Minimal examples for building with webpack 2 and browserify (previously called "exhibits") are still provided, and have been further simplified.
* **Layer Browser** The main `layer-browser` example has been expanded into a full "layer and property browser" allowing for easy testing of layers.

### Deprecations

The various Choropleth layers have been deprecated since deck.gl has new and better layers (`GeoJsonLayer`, `PathLayer`, `PolygonLayer`) that fill the same roles. The choropleth layers are still available but will not be maintained beyond critical bug fixes and will likely be removed in the next major version of deck.gl.

A careful API audit has also been done to align property names between old and
new layers. While this will makes the layers more consistent and the combined API easier to learn and work with, it does mean that some properties have been renamed, with the old name being deprecated, and in some very few cases, default values have changed.

For more information on deprecations and how to update your code in response to these changes, please consult the deck.gl [Upgrade Guide](/docs/upgrade-guide.md).

## deck.gl v3.0

Release date: November, 2016

### Highlights

* New website
* Comprehensive documentation
* All Core Layers updated (API, features, performance)
* 64-bit Layers (High Precision)
* METERS projection mode (High Precision)
* Multi-Primitive Layer Support
* Composite Layer Support

### React Integration

* `DeckGL` (`DeckGLOverlay` in v2) component now requires a separate import (`import DeckGL from 'deck.gl/react'`). This allows the core deck.gl library to be imported by non-React applications without pulling in React.
* Adds `onLayerClick` and `onLayerHover` props to the `DeckGL` React component.
* The `DeckGL` component now cancels animation loop on unmount, important when repeatedly creating/destroying deck.gl components.
* The `DeckGL` component no longer manages WebGL blending modes, as this is better done directly by layers.

### Layers

* All layers now support accessors, removing the need for applications to transform data before passing it to deck.gl.
* Layer props and accessors now always expect arrays (e.g. colors are expected as `[r,g,b,a]` instead of `{r,g,b,a}` etc).
* line widths now takes device pixel ratio into account for more consistent look between displays
* METERS projection mode allows specifying positions in meter offsets in addition to longitude/latitude.
* Layers now receive viewport information from the `DeckGL` component. This implies that apps no longer need to pass the `width`, `height`, `longitude`, `latitude`, `zoom`, `pitch`, `bearing` and `bearing` props to each layer. These properties only need to be passed to the `DeckGL` react component.

#### Base Layer

* `deepCompare` prop replaced with more flexible `dataComparator`

#### ArcLayer

* Specify separate start and end color for each arc.
* Renders smoother arcs, especially for bottom arc segments close to map
* Fixes flickering last segments

#### ScatterplotLayer

* Adds drawOutline option.

##### ScreenGridLayer

* New name for deck.gl v2 GridLayer
* Now have accessors (getPosition, getWeight)
* Custom color ramps (minColor, maxColor)

##### ChoroplethLayer

* Now renders MultiPolygons and Polygons with holes

##### HexagonLayer (REMOVED)

* The v2 HexagonLayer has not yet been ported to v3.

#### 64bit layers

A set of new high precision layers that support extreme zoom levels

##### ArcLayer64 (NEW)

##### ChoroplethLayer64 (NEW)

##### ScatterplotLayer64 (NEW)

##### 64 bit ExtrudedChoroplethLayer (NEW)

* Great for rendering 3D buildings on top of maps
* Includes a basic shading model

##### GeoJsonLayer (NEW, EXPERIMENTAL)

* Initial composite layer, only Polygons for now.

#### Sample Layers

Sample layers now available through `import 'deck.gl/samples';`

### Changes affecting Custom Layers

#### Streamlined life cycle methods

* The Layer life cycle methods are now optimized for deck.gl's needs and no longer try to mimic React.
* Limited compatibility with deck.gl v2 is provided but it is strongly recommended to update layers to the new methods

#### Optimizations

* `Uint8Array` encoding is now supported for color and picking color attributes, which provides significant GPU memory savings.

#### GLSL package manager and modules

* All layers now use `assembleShaders` to inject GLSL packages and platform
  fixes
* GLSL `project` package
  + GLSL `fp64` emulated double precision floating point package
  + GLSL `fp32` package - 32bit improved precision library
    - Adds high precision version of trigonometry functions and `tan`
    - Especially for Intel GPUs

## deck.gl v2

Release date: May 2016

### Highlights

* 3D Perspective Mode
* Performance: Huge under the hood refactor of layer update logic
* Automatic attribute management (`AttributeManager` class)
* Linux fixes - deck.gl and luma.gl now work on Linux.
* Adopts [luma.gl](https://github.com/uber/luma.gl) as default WebGL framework.
* Retina display support
* Support for disabling mercator project (experimental)

### React Integration

* Ability to specify canvas ID and customize styles

### Layers

* Added data deep comparison support

#### ScatterplotLayer

* Add per point radius support for the scatterplot-layer
* Added per point color support for the scatterplot-layer
* Fixed primitive distortion bug

#### LineLayer (NEW)

## deck.gl v1

Original release date: December 2015

Initial open-source version of deck.gl, with five sample layers.
