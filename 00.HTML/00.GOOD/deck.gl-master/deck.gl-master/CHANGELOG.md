# Change Log

All notable changes to deck.gl will be documented in this file.

<!--
Each version should:
  List its release date in the above format.
  Group changes to describe their impact on the project, as follows:
  Added for new features.
  Changed for changes in existing functionality.
  Deprecated for once-stable features removed in upcoming releases.
  Removed for deprecated features removed in this release.
  Fixed for any bug fixes.
  Security to invite users to upgrade in case of vulnerabilities.
Ref: http://keepachangelog.com/en/0.3.0/
-->

## deck.gl v6.3

### deck.gl v7.0 Prereleases

#### deck.gl [v7.0.0-alpha.3] - Jan 23 2019
- Update import path for TileLayer (#2594)
- Update composite layer customization RFC (#2600)
- Document the sublayers of all composite layers (#2599)
- Fix occasional picking failure in mapbox layer (#2606)
- Fix gallery in Firefox (#2608)
- remove module.exports (#2607)
- Fix HexagonLayer constructors (#2590)
- Fix AttributeTransitionManager crash when data is empty (#2605)
- Fix json react example (#2596)
- remove loggoing fontAlas time (#2601)
- Generate layer attributes on a worker (PR 3/3) (#2576)
- Generate layer attributes on a worker (PR 2/3) (#2575)
- Generate layer attributes on a worker (PR 1/3) (#2490)
- Fix Scatterplot example on website (#2595)
- Fix multiple argument support in ScatterplotLayer (#2593)
- fix render test by bumping luma (#2592)
- Pass the missing startZoomPosition into Orthographic Controller interactiveState (#2587)
- In docs, "renderSubLayer" -> "renderSubLayers" (#2591)
- Support flat data input to polygon layer (#2581)
- Add deprecated flag to prop types (#2586)
- support dynamically load icons (#2526)
- allow ScatterplotLayer to draw both stroke and fill (#2573)
- PathLayer shader: 2-dimensional vPathPosition (#2515)
- Update BitmapLayer README.md (#2582)
- Fix layer.clone bug (#2583)
- Update dev docs (#2578)
- Flat path data proposal (#2522)
- Apply TinySDF to TextLayer (#2549)
- reset blend params after mapbox render
- update the format of doc (#2572)
- Multiple issue templates (#2562)
- Documentation Updates (#2567)
- update webpack versions (#2559)
- ScreenGridLayer: fix picking under WebGL1 (#2557)
- ScreenGridLayer: add support Min/Max/Mean aggregation (#2560)
- GPUAggregator: fixes for Min and Mean aggregation (#2554)
- update readme for bezier curve layer (#2542)
- Update copy and blit methods (#2528)
- add IconManager RFC (#2510)
- fix anchor bugs (#2539)
- ContourLayer: zOffsetScale -> zOffset (#2543)
- Documentation updates (#2536)
- modify clearPickingColor in solid-polygon-layer (#2538)
- Fix handling for event callback function return values (#2535)
- specify types for defaultProps in mesh layer (#2520)
- fix pickMultipleObjects in pathLayer (#2532)
- Add RFC for Layer Intersections. (#2076)
- add picking test (#2514)

#### deck.gl [v7.0.0-alpha.2] - Dec 20 2018

- Refactor PolygonTesselator (#2494)
- PathTesselator class (#2493)
- Strip glsl comments (#2517)
- specify types for defaultProps in gpu grid layer (#2518)
- specify types for defaultProps in bitmap layer (#2516)
- specify types for defaultProps in bezier curve layer (#2505)
- [POC] Debug layer shaders with @luma.gl/debug (#2277)
- UnitTests: for path layer shaders (#2503)
- fix RFC Readme table formatting (#2512)
- Fix fp64 shader tests (#2506)
- Fix info-viz render tests (#2502)
- Fallback to gl.canvas.height when gl.canvas.clientHeight are not available (#2421)
- Reverse zoom in Orthographic controller (#2466)

#### deck.gl [v7.0.0-alpha.1] - Dec 10 2018

- PathLayer: fix various precision issues (#2495)
- Docs/RFC directory minor cleanup (#2491)
- Add callback function onDataLoaded in TileLayer (#2487)
- IsoBands Part-2: Add support in Contour Layer. (#2434)
- Swap base map Mapbox style from custom uber style to default mapbox light style in layer-browser and attribute-transition test app. (#2481)
fe8bb099 fix updateTriggers not being called issue when transitioning between 0 and null (#2475)
- Use default Alpha for picking highlight color (#2479)
- Add bootstrap to publish script (#2476)
- (origin/tgorkin/test-branch) Add interaction test (#2407)
- Update layer docs regarding tooltip display (#2472)
- Call layer handler by the layer itself (#2471)
- do not override canvas size if using external gl context (#2465)
- [PolygonLayer] Pass getPolygon update trigger to sublayer (#2473)
- Replace gl packages with original gl-matrix (#2463)
- IsoBands Part-1: Add Marching Squares utility methods (#2429)
- Fix offset mode bug (#2464)
- Update PolygonLayer documentation (#2462)
- enable website examples to be copied out and run standalone (#2450)
- Give TileLayer GetPickingInfo Access Only to Its Relevant Tile (#2453)

### deck.gl v6.3 Prereleases

#### [6.3.0-alpha.2] - Nov 2 2018

- New event handling props
- Align build systems of all submodules
- GPUAggregator improvements

#### [6.3.0-alpha.1] - Oct 25 2018

- Prop types system

## deck.gl v6.2

### deck.gl v6.2 Prereleases

#### [6.2.0-beta.1] - Oct 5 2018

See what's new for major features additions.

## deck.gl v6.1

#### [6.1.1] - Sep 24 2018

- Fix broken link to documentation on some examples (#2257)
- Fix Multi-picking runtime error (#2271)

### deck.gl v6.1.0 Pre Releases

For Earlier Beta Releases see below

#### [6.1.0-rc.1] - Aug 31 2018

- Hexagon aggregation with valid viewport (#2239)
- Doc: remove deuplicate section
- Website fixes for Safari (#2251)
- Port #2247 from master
- Fix wrong closing tag in get-started examples (#2248)

#### [6.1.0-beta.2] - Aug 29 2018

- GPUAggregator: Return ArrayBuffer objects when aggregating on CPU (#2243)
- Safari fixes (#2244)
- change master in URLs to 6.1-release

#### [6.1.0-beta.1] - Aug 25 2018

- Bump luma to 6.1.0-beta.2
- Bump luma to 6.1.0-beta.1 (#2232)
- Undo Y-reversal hack for Mesh-Layer (#2229)
- Change Back Projection mode to the 6.0 default (#2225)
- remove hack due to webgl1 constant attribute bug (#2224)
- Fix lighting module under auto offset (#2231)
- Hexagon layer change revert (#2228)
- Clean up layer browser example order (#2219)
- 6.1 Docs : Misc changes (#2222)
- HexagonLayer: Aggregate data using valid viewport. (#2196)
- Docs and whats-new update (#2216)
- Separate shaderCoordinateSystem, make new projection mode default (#2211)
- fixed broken link to documentation of TripsLayer (#2214)
- Wrap longitudes over the 180th meridian (#2147)
- Doc Updates: FAQ and Animation (#2212)
- Improve docs around setting parameters (#2210)
- Remove stray references to global module (#2209)
- Small fixes (#2207)
- Update docs for new projection mode (#2206)
- RFC: JSON examples (#2188)
- RFC: View Class Extensions (#2161)
- Update babel (#2189)
- Pass through opts in _createAnimationLoop's onCreateContext (#2201)
- Contour stroke width (#2193)
- Fix pure-js-without-map example (#2197)
- Fix website build (#2195)
- RFC: @deck.gl/json module updates (#2187)
- lighting module initial roadmap (#2183)
- Add more .json examples (#2184)
- RFC: Property Animation (Experimental) (#2162)
- Move TripsLayer to experimental-layers (#2175)
- Doc fixes: colorRange and Readme.md (#2172)
- Cleanup What's New (#2176)
- Roadmap updates (#2164)

#### [6.1.0-alpha.2] - Aug 2018

- Bump dependency (#2174)
- Fix experimental layers: mesh layer Y-reversal issue (#2167)
- Fix Transform export, bump luma.gl version (#2170)
- Support iterables in grid and hexagonal aggregators (#2160)
- JSON Layers example #2 (of 2) (#2144)
- fix icon layer rendering test and avoid test report duplication (#2166)
- RFC/Roadmap Overhaul (#2163)
- JSON Layers RFC implementation #1 (of 2) (#2106)
- Make ArcLayer and PathLayer work with LNGLAT_EXPERIMENTAL mode (#2159)
- Consolidate module parameter handling (#2108)
- Buffer reuse in SolidPolygonLayer (#1821)
- Build fixes (#2157)
- Minor cleanup (#2156)
- RFC updates (#2153)
- Improve linting script (#2148)
- Update unit and render tests (#2149)

#### [6.1.0-alpha.1] - Aug 1 2018

- Remove module specific uniforms setting from Layer (#2124)
- [POC] Data filter shader module (#2107)
- Bump luma.gl and math.gl versions to latest alpha (#2146)
- fix examples (#2143)
- Fix: transition breaks map interaction (#2141)
- Fix onViewStateChange callback in standalone bundle (#2140)
- Minimal example of mapbox custom layers integration (#2134)
- Orthographic view controller (#2128)
- Fix solid-polygon-layer to work with new coordinate mode (#2135)
-  Enable drawing into external gl context, controlled by external software (#2133)
- Remove mapbox wrapper from pure-js example (#2137)
- Screen contour (#2130)
- GPUAggregation: Add support for Orthographic View (#2127)
- Update roadmaps, dist size doc, JSON Layers RFC (#2125)
- Upgrade guide improvements (#2118)
- Upgrade react-map-gl (#2116)
- JSON layer RFC (#2079)
- POC: Loading Mapbox vector tile data into DeckGL layer (#2022)


## deck.gl v6.0

#### [6.0.4] - August 30 2018
- Undo Y-reversal hack for Mesh-Layer (#2229)

#### [6.0.3] - August 8 2018
- Fix experimental layers: mesh layer Y-reversal issue (#2167)
- Bump probe.gl version to avoid issues with changed webpack behavior (#2158)
- Make ArcLayer and PathLayer work with LNGLAT_EXPERIMENTAL mode (#2159)

#### [6.0.1] - July 19 2018
- fix layerFilter in picking (#2104)
- Fix website link to github (#2094)

#### [6.0.0] - July 18 2018
- Avoid mutating source data (#2092)
- Bump dependency versions (#2093)
- Use constants for default props (#2091)
- fix constant accessors in safari (#2088)
- fix text rendering in FF and Safari (#2087)
- 3DSurfaceExplorer Demo: fix crash (#2082)
- Website minor bug fixes (#2064)
- Fix website in Firefox (#2081)
- fix ascii example (#2074)
- Controller upgrade guide (#2073)
- Fix bug with updating dashed lines for LineStrings (#2066)

### deck.gl v6.0.0 Pre Releases

#### [6.0.0-rc.1] - July 13 2018
- Update scripting examples (#2063)
- ScreenGridLayer: deprecate minColor and maxColor props (#2062)
- Fix crash in get vendor prefix (#2061)
- Add progress bar to website demos (#2060)
- Use custom colorRange for ScreenGridDemo (#2059)
- Update ScreenGrid website demo (#2056)
- Documentation minor fixes (#2058)
- Orbit examples clean up (#2054)
- Make ViewState Transitions API official (#2053)
- Website demos clean up (#2052)
- OrbitController: Add support for viewport transitions (#2047)
- add geojson transition example (#2048)
- Fix callback error on pointer leave (#2049)
- Multi-view picking perf: filter viewports by pointer position (#2043)
- Deck: Add onLoad callback (#2042)
- another round of link changes
- change 5.3-release to 6.0-release in readme
- change code links for docs
- change code links for showcases
- change doc and code links to 6.0-release
- add doc for OrbitView (#2045)
- Perf: skip draw call for composite layers (#2040)
- no attribute manager for composite layers (#2037)
- fix pointer leave callback (#2038)

#### [6.0.0-beta.4] - July 11 2018
- disable updateTrigger warning (#2036)
- Make doubleTap and keyboard transitions exlusive to MapController (#2033)
- fix rendering test (#2035)
- Fix getCursor bugs (#2034)
- Upgrade layer browser to v6 API (#2029)
- React: JSX view bug fixes (#2028)
- Delete controller when view is removed (#2026)
- Fix first-person and third-person viewports (#2025)
- Fix view state comparison (#2024)

#### [6.0.0-beta.1] - July 4 2018

- Attribute Transition bug fix (#1996)
- Upgrade to luma.gl 6.0.0-beta.1 (#1990)
- Replace ScreenGridLayer with GPUScreenGridLayer (#1988)
- More Flexible Controller API (#1984)
- Restore prop override for regular React children (#1983)
- Add enter parameter for transitions (#1982)
- ScreenGridLayer: Fix cell margin bug (#1977)
- Fix attribute transition (#1975)
- Fix aggregation in OrthoGraphicView (#1973)
- Implement React API RFC (#1971)
- Add padArray util for attribute transition (#1966)

#### [6.0.0-alpha.2] - June 27 2018

- Remove viewports (#1965)
- Add needs64bitPositions() to Layer (#1963)
- Update deck.js _pickAndCallback to discard invalid events (#1962)
- Add Contour Layer (#1958)
- Adding Marching-Squares utility methods (#1957)
- GridLayer: re-project points on prop change (#1953)
- Implement RFC: Improved 32-bit LNGLAT projection mode (#1951)
- GPUScreenGridLayer: Provide aggregated data as picking information (#1950)
- Initial layer prop type generator (#1943)
- Fix path-marker-layer property passing (#1939)
- GPUScreenGridLayer: Add colorRange and colorDomain support (#1932)
- Deprecate ViewportController and onViewportChange (#1930)
- Per-view controller (#1929)
- Upgrade to luma v6 (#1928)
- Move ViewManager out of LayerManager (#1926)
- Add experimental GPUGridLayer (#1925)
- GeoJsonLayer picking returns real feature (#1924)
- Add world-space aggregation support to GPUAggregator (#1923)
- Expose more internals (as experimental exports) (#1921)

#### [6.0.0-alpha.0] - June 15 2018
- 6.0.0-alpha.0 (Bump luma version to 6.0.0-apha.1)
- Bench fixes (#1915)
- Remove commented functions from layers (#1910)
- Data filter RFC (#1892)
- Add transition prop forwarding for composite layers; docs (#1900)
- Viewport transition example (#1909)
- attribute manager cleanup (#1901)
- Disable failing rendertests for Intel GPU (#1903)
- Add node 10 to travis (#1898)
- Update params per frame (#1897)
- Fix DeckGL 5.3 doesn't fire onHover event for last frame (#1882) (#1895)
- Update RFC catalog (#1891)
- Remove index.html from examples (#1890)
- Fix mapbox wrapper error when use viewState (#1885)
- Scripting Gallery (#1879)
- Make sure website examples start locally (#1884)
- Update issue_template.md
- Some example fixes (#1878)
- Add Deck.parameters prop to enable declarative setting of initial GL params (#1832)
- View Manager cleanup (#1864)


## deck.gl v5.3

####[5.3.3] - August 20 2018
- Pass through opts in _createAnimationLoop's onCreateContext (#2203)
- fix bad code links
- Make doubleTap and keyboard transitions exlusive to MapController (#2033)

####[5.3.2] - June 20 2018
- Fix path-marker-layer property passing, and remove moduleParameters to fix offset coordinates
- Add transition prop forwarding for composite layers; docs (#1900)

####[5.3.1] - June 08 2018
-  Fix DeckGL 5.3 doesn't fire onHover event for last frame (#1882) (#1895)
-  Fix mapbox wrapper error when use viewState (#1885)
-  Fix whats-new layer demo links (#1883)
-  5.3.0 website update (#1881)


### deck.gl v5.3 Pre Releases

#### [5.3.0-rc.1] - May 29 2018
-  update whats new (#1859)
-  Attribute transition bug fix (#1858)
-  Fix attribute transition manager tests (#1856)
-  Fix constant attribute transition (#1844)
-  Reduce React emphasisis in docs. Miminize top README, add congributing.md (#1851)
-  Use new Cylinder geometry API (#1848)
-  Attribute: Add support for custom Buffer setup. (#1846)
-  Rename core-layers to layers (#1845)
-  Core util exports audit (#1843)
-  Fix viewportChanged flag (#1841)
-  Update layer browser (#1834)
-  AttributeTransitionManager test (#1836)
-  Add deprecation guide and what's new polish (#1831)
-  Fix arc/line layer prop override (#1830)
-  Fix a typo in deck.js (#1827)
-  Update webpack version for examples (#1824)
-  Enable example testing for "experimental" and "get-started" folders (#1825)
-  Async Props #3: The Examples (#1818)
-  Unblock render tests (#1822)
-  Constant accessor implementation (#1814)
-  Implement attribute buffer RFC (#1794)
-  Async Props #2: Loading and shadowing in new ComponentState base class (#1779)
-  Async Props #1: Add ability to differentiate between actual and resolved values for async props. (#1777)
-  Light renaming in props handling code. Start introducing component. Better oldProps handling. (#1815)
-  GPUGridAggregator: Add position offset to fix Intel specific issue (#1817)
-  Add Transition class (#1806)
-  Use auto control in standalone version (#1813)
-  fix invert pan (#1811)
-  Add Whats new entry for auto interactivity (#1807)
-  Fix viewport resize issue (#1812)
-  debugging and z-fighting docs (#1809)
-  Remove default attribute updaters (#1582)
-  Break out ViewManager class from LayerManager. (#1787)
-  Move developer docs to developer-guide directory (#1790)
-  Move viewport transition into controller (#1799)
-  Bump example dependency versions (#1803)
-  fix assert import (#1804)
-  RFC catalog reorganization (#1791)
-  Fix table (#1800)
-  copy the actual props from the embedded demos to their markdowns (#1774)
-  bug fixes (#1798)
-  split core-layers into own module (#1796)
-  fix index type in webgl 2 context (#1789)
-  Attribute Buffer RFC (#1786)
-  Add rendering test for orthographic mode (#1785)
-  orthographic switch in layer-browser. (#1783)
-  fix the wrong blog link (#1781)
-  doc fixes (#1782)
-  Hook git push with browser based tests (#1778)
-  Controller cleanup (#1771)
-  Remove obsolete MapController and OrbitController "proxy" classes (#1769)
-  Orthographic support in WebMercatorViewport (#1640)
-  Move deprecated viewports to deprecated folder (#1763)
-  Deprecate the OrbitViewport class (#1765)
-  Fix prop name in TextLayer documentation (#1773)
-  Update deck.gl package.json files with missing BABEL_ENV (#1768)
-  Generic accessor micro-RFC (#1752)
-  Fix Deck class doc (#1761)
-  Reorganize Viewport code (#1766)
-  Auto Controls: Automatic Event Handling if no callback is specified (#1662)
-  Fix using default prop in module settings (#1754)
-  Remove React checks in controller classes (#1758)
-  bump lite module dependency manually

#### [5.3.0-alpha.2] - April 30 2018
-  use baseline:hanging if advanced text metrics is not supported (#1753)
-  Smaller viewState related fixes (#1750)
-  Picking overlapping objects RFC implementation (#1730)
-  Update example links in README.md (#1744)
-  Update picking RFC (#1747)
-  Fix standalone bundle inline version (#1746)
-  handle right button pan in MapControls (#1745)
-  update lite module dependency
-  Embedded layer demo fixes (#1741)
-  Test cleanup (#1739)
-  Update showcases links (#1738)
-  Make DeckGL doc refer to Deck docs (#1737)
-  More website link fixes (#1736)
-  Fix outdated source links (#1735)

#### [5.3.0-alpha.1] - April 23 2018
- Bump luma.gl to 5.3.0-alpha.1

## deck.gl v5.2


#### [5.2.1] - April 30 2018
-  use baseline:hanging if advanced text metrics is not supported (#1753)
-  Update example links in README.md (#1744)
-  Fix standalone bundle inline version (#1746)
-  handle right button pan in MapControls (#1745)
-  update dependency
-  Update release date in what's new
-  update lock file

#### [5.2.0] - April 24 2018
-  Embedded layer demo fixes (#1741)
-  Update showcases links (#1738)
-  Make DeckGL doc refer to Deck docs (#1737)
-  More website link fixes (#1736)
-  Fix outdated source links (#1735)
-  remove v6.0 section from whats new document point to 5.2-release docs
-  Fix bad links on website (#1734)
-  View documentation updates.  (#1731)
-  Website fixes and optimizations (#1732)
-  Update RFC master page
-  Update RFC catalog (#1721)
-  fix example test (#1727)
-  run lint to format code
-  fix vis academy page on website (#1726)
-  Upgrade point cloud LAZ to webpack 4 (#1725)
-  Move wind and graph examples to showcases (#1724)
-  fix bad yarn lock to handle test regression
-  Fix multi viewport example (#1723)
-  Documentation Formats (#1722)
-  Add AsciiLayer demo (#1715)
-  Add lint for docs (#1719)
-  more doc fix for test-utils (#1720)
-  Update scripting API docs (#1717)
-  Update test-utils website pages (#1718)
-  Clean up js examples (#1716)
-  v5.2 website changes (#1710)
-  Lighting module fixes (#1714)
-  Reorganize examples (#1700)
-  handle review feedback for useDevicePixels (#1713)
-  fix useDevicePixels bug (#1712)


### deck.gl v5.2 Pre Releases

#### [5.2.0-rc.1] - April 11 2018
- Bump math.gl (#1708)
- format code style
- Fix inverted FirstPersonView (#1707)
- fix version embedding (#1703)
- Prettier

#### [5.2.0-beta.3] - April 11 2018
- Fixes: disable babel-minify, check if stats object is provided (#1701)
- Fix font bounding box (#1698)
- remove missing import global (#1697)
- fix publish script typo (#1692)
- Support characterSet prop in TextLayer (#1693)
- update dependency versions
- update change log

#### [5.2.0-beta.2] - April 11 2018
-  Support Observable (#1690)
-  default width and height props (#1688)
-  fix plot example in website (#1685)

#### [5.2.0-beta.1] - April 11 2018
-  format changelog
-  Move "fragile" carto pure JS example to wip folder (#1674)
-  update whats new (#1682)
-  Clean up npm scripts (#1657)
-  replace deck.gl-layers with @deck.gl/experimental-layers (#1681)
-  Support non-monospace fonts in TextLayer (#1680)
-  use fetch instead of d3-request/json in examples (#1639)
-  add text-layer screenshot to what's new (#1678)
-  Publish standalone bundle with the main package (#1671)
-  Clean up cell layers code (#1675)
-  regenerate font atlas when fontFamily changed (#1669)
-  Expose MapController class and enable it to be used with `Deck.controller` prop (#1666)
-  ignore standalone module for now (#1670)
-  Fix auto resize and controller (#1656)
-  What's new update (#1667)
-  fix website dependencies (#1665)
-  fix example tests (#1644)
-  add linter to ci test (#1664)
-  fix bootstrap (#1663)
-  fix(docs): wdith to width typo (#1658)
-  Add TextLayer demo (#1646)
-  Module split PR1 (#1651)
-  Deck Component: auto resize handling (#1389)


#### [5.2.0-alpha.8] - April 5 2018
- Bump examples to 5.2 alpha versions (#1649)
- Bump example package.json to make it clear these are for future release (#1648)
- fix bench browser test (#1647)
- fix text layer issue on windows (#1645)
- Fix without-map (#1642)
- Initial commit of standalone js module (#1605)
- Clean up LayerManager context handling (#1628)
- remove wrong deck.gl version in tagmap
- Fix OrthographicView (#1638)
- Introduce babel 7 (#1636)
- Fix render tests by temporarily reverting orhtographic map support (#1635)
- Final immutable removal (#1634)
- Improve test script speed. Fix test-browser reliability (#1632)
- Remove polyfill. Update test scripts (#1633)
- Text layer audit (#1627)
- Add ScreenGrid Icon, fix doc link (#1622)
- Update examples using new View classes and Deck/Controller integration (#1616)
- fix attribute transition manager (#1621)
- Integrate controllers into Deck component (#1615)
- GpuScreenGridLayer : RFC and Fixes (#1617)
- tagmap layer example improvements (#1620)
- Update deck.gl whats new doc (#1589)
- Viewport improvements, orthographic projection support (#1614)
- View improvements (#1613)
- Make `View` and `Deck` classes into official exports (#1612)
- View doc updates (#1610)
- add 3d rotation to MeshLayer (#1602)
- Hotfix to plot layer and node tests (#1611)
- ScreenGrid GPU Aggregation (Part-3, Add GPU Aggregation) (#1603)
- ScreenGrid GPU Aggregation (Part-2, add support for UBO) (#1593)
- Bump luma.gl to 5.2.0-alpha.10
- fix website build (#1604)
- Merge experimental SolidPolygonLayer into core-layers (#1405)
- Move text-layer from experimental-layers to core-layers (#1590)
- fix text layer update triggers (#1598)
- unbold console output after test (#1596)
- Improve text layer perf (#1597)
- use unified projection in experimental layer shaders (#1595)
- Webpack 4 (#1594)
- Focal distance (#1588)
- Split out `Attribute` class from `AttributeManager` (#1578)
- Remove use of external asserts (#1567)
- Create advanced-text-layer in experimental-layers (#1573)
- bump luma.gl version to 5.2.0-alpha.9
- fallback luma.gl to 5.2.0-alpha.3
- Move docs
- Standalone JS RFC (#1565)
- Remove `prevLayers`,  move `oldProps` to layer internal state (#1553)
- Reorganize docs (#1514)
- ScreenGrid GPU Aggregation (Part-1, use Buffers) (#1584)
- Address audit comments (#1580)
- Test directory cleanup (#1577)
- Add esnext dist and test-size script (#1559)
- Remove invalid deprecation warning (#1575)
- Fix MeshLayer texture rendering (#1570)

#### [5.2.0-alpha.7] - Mar 23 2018
#### [5.2.0-alpha.6] - Mar 23 2018
#### [5.2.0-alpha.4] - Mar 23 2018
- Make new colorRange and colorDomain props experimental (#1569)
- bump probe.gl to 1.0.0-alpha.11
- fix memory leak by deleting unused models (#1561)
- Allow external buffer to be Buffer instead of typed array (#1527)
- Add TextLayer 100K test in layer browser (#1562)
- TextLayer: Fix horizontal padding (#1554)
- Implement unified 32 and 64 bit project interface (PR 2/2) (#1557)
- Fix sizeScale for text layer (experimental layers 0.0.25) (#1558)
- TextLayer: fix updateTriggers (#1555)
- fix memory leak via oldProps (#1549)
- verify MapboxAccessToken before build website (#1546)
- fix bug in testLayer (#1545)
- Hook up test-browser to npm test
- Create states in layerManager in case of undefined stats parameter
- bump probe.gl to 1.0.0-alpha.9
- Screen grid colorRange colorDomain (#1522)
- Fix bug in getMaxCount (#1539)
- Fix quantize scale (#1537)
- with-mapbox-map example fix (#1534)
- Fix max count issue in bin sorter (#1535)
- Add basic stats collection (#1529)
- Avoid importing `prop-types` module in non-React module. (#1430)
- Add lib dir to React submodule. (#1528)
- Example automation testing (#1477)
- Consolidate test scripts (#1523)
- Reorganize reflection effect (#1524)
- Implement unified 32 and 64 bit project interface (#1493)
- Fix test harness exit code on failure (#1520)
- Fix minor typo in constants.js (#1521)
- Update shader module docs (#1411)
- WindDemo: update using luma.gl Transform class (#1374)
- Update Attribute transitions to use new luma.gl `Transform` API (#1464)
- disable path-marker rendering test (#1518)

#### [5.2.0-alpha.3] - Mar 8 2018
- Fix deck.gl-test-utils dependency issues
- Probe.gl logging

#### [5.2.0-alpha.2] - Mar 8 2018
- Bump luma.gl dependency to v5.2.0-alpha.3
- deck.gl-test-utils v5.2.0-alpha.1 (#1515)
- Test documentation improvements (#1512)

#### [5.2.0-alpha.1] - Mar 4 2018


## deck.gl v5.1

#### deck.gl v5.1.4 March 23, 2018
- fix memory leak by deleting unused models (#1561)

#### deck.gl v5.1.3 March 19, 2018
- fix memory leak via oldProps (#1549)

#### deck.gl v5.1.2 March 13, 2018
- Add alpha for minColor to fix test (#1494)
- Fix bug in getMaxCount (#1539)
- Fix max count issue in bin sorter (#1535)
- Add validation to geojson layer (#1442)

#### deck.gl v5.1.1 March 01, 2018
- do not pick when dragging (#1475)
- [website] redirect to new blog (#1480)
- [Website] Update documentation hierarchy (#1483)
- [Website] Render nested categories in side bar (#1482)
- fix plot demo on website (#1472)
- fix link rewrite in website (#1469)
- Update docs for layer transitions.
- Change default 'extruded'  to be 'false' in hexagon-layer.md (#1463)
- Fix wrong image links in website (#1462)
- update yarn lock

#### deck.gl v5.1 Feb 15, 2018
- change "Attribute Transitions" to "Layer Transitions" (#1446)
- update using-with-react.md with workable example code (#1445)
- Shader module uniform cache (#1387) (#1443)
- Update getting started
- Update getting-started.md
- Fix hello-world examples


### deck.gl v5.1 Beta Releases

#### [5.1.0-beta.3] - Feb 09, 2018
- Fix Bezier-Curve layer rendering issues (#1409)
- Add more screenshots in Whats New (#1408)
- Fix image links in docs. (#1401)
- Update docs for 5.1 (#1392)
- hexagon layer always rerender (#1384)
- Fix: Workaround for React.Children.forEach (#1378)
- layers v0.1.0-beta.2

#### [5.1.0-beta.2] - Jan 31, 2018
- Fix: JSX layer extraction from nextProps (#1373)

#### [5.1.0-beta.1] - Jan 31, 2018
- Fix crash during pickVisibleObjects (#1365)
- Experiment: bezier curve layer (#1366)
- Add JSX support to DeckGL component and remove jsx-layers example (#1362)
- Update composite layers to use multiple prop objects (#1353)
- link to remote docs (#1364)
- Wind demo: update using newest luma.gl TF API (#1346)
- Prop code preparation/cleanup (#1357)
- Use latest luma.gl transform feedback features (#1318)
- Move fp64 viewport uniform generation to project64 module's getUniforms (#1292)
- Merge react-map-gl's map interaction (#1330)
- Travis CI fix: Reduced, but working set of test cases (#1355)
- Property Copy Reduction (#1341)
- Use Object.prototype to speed up default prop setting (#1336)
- fix experimental PolygonLayer (#1316)
- Upgrade react-map-gl and math.gl versions in examples (#1313)
- Fix text layer redraw flag clearing (#1314)
- [Doc] Fix of layer attribute typo (#1311)
- Attribute Transition: Initial Implementation (#981)



## deck.gl v5.0

#### deck.gl v5.0.3 - Feb 08
- hexagon layer always rerender (#1384)
- Fix crash during pickVisibleObjects (#1365)

#### deck.gl v5.0.3 - Jan 26
- allow overriding DeckGL canvas component styles (#1342)

#### deck.gl v5.0.2 - Jan 10
- Upgrade dependency modules to production versions (#1307)
- Add generic attribute support to attribute manager (#1298)
- Update remaining examples to React16 (#1304)
- Improve fp64ify perf (#1300)

#### deck.gl v5.0.1 - Jan 4
- fix doc links (#1277)
- Fix layer-browser missing package (#1287)
- Some 5.0 doc cleanup (#1274)
- Fix icon layer warnings.

#### deck.gl v5.0 - Dec 21
- Add links to new examples. (#1272)
- Address TODO in docs. (#1270)
- Use the deprecation support in shader modules (#1271)
- fix double model generation (#1268)
- Ortho zooming example (#1266)
- More precise offset projection (#1265)
- Examples start script (#1263)
- experimental-layers 0.0.16
- Fix examples with react-map-gl alpha (#1256)
- Linter (prettier) changes (#1262)
- Remove old uniforms (#1261)
- remove duplicate TextLayer code (#1258)
- enable lnglat_offset mode (#1245)
- Remove deprecated uniforms (#1257)


### deck.gl v5.0 Beta Releases

#### [5.0.0-beta.2] - Dec 19
- Fix pickingSelectedColor, fix mesh-layer regression (#1260)
- Fix test-dist (#1250)
- Add prettier (#1249)
- Upgrade to React 16, cleanup core deps (#1247)
- Bump probe.gl to include regression bench support (#1251)
- Merge normal projection fix into experimental polygon layer (#1248)

#### [5.0.0-beta.1] - Dec 18
- Improve perf of experimental SolidPolygonLayer (#1224)
- Fix polygon normals in meter offset mode (#1244)
- Remove deprecated API (#1240)
- Remove old Coordinate system props. (#1242)
- Add SolidPolygonLayer to experimental layers (#1233)
- Fix the normal direction of the hexagon layer and additional transform in the lighting module associated with it (#1039)
- Fix blending parameter (#1241)

## deck.gl v4.2

### deck.gl v4.2 Beta Releases

#### [4.2.0-alpha.31] - Dec 14
- API Audit: remove initWebGLParameters and move pure-js example  (#1235)
- Fix for invalid triggerName in attribute-manager.invalidate(triggerName) function (#1238)
- Add polygonLayer geojsonLayer elevationScale prop to whats-new.md (#1237)
- OrbitController pure-js support (#1234)

#### [4.2.0-alpha.30] - Dec 12
- DOCS: updates to clarify what is experimental in 4.2, in "What's New" and "API Reference".
- DOCS: New Roadmap doc, linking to RFCs.
- DOCS: List experimental 4.2 features in Roadmap doc.
- Remove deprecated Choropleth layers (#1231)
- Fix Picking Module object highlighting (#1230)
- Add initial CODE-GUIDELINES.md. Adjust RFC versions (#1232)
- Remove container support from core layers (#1227)
- Add '#or yarn' to README.md (#1220)
- Path Layer vertex shader cleanup (#1198)
- add "babel-loader" dependency for wind example (#1228)
- Fix `log.warn` usage (#1225)
- Add initial capability to show infovis layers in layer-browser (#1210)
- Fixes: global init, LayerBrowser drawPickingColors, experimental exports (#1209)
- Improve perf of picking with large `pickingRadius` (#1222)
- Experimental Layers 0.0.12 (#1223)
- Conditionally generate fp64 viewport uniforms (#1219)
- Make ViewportController and Transition exports experimental (#1218)
- Remove deprecated API usage (#1214)
- Clarify whats experimental in 4.2 (#1211)
- Merge pull request #1212 from KevinGrandon/fix_buildkite_badge
- Remove buildkite badge
- Merge pull request #1153 from KevinGrandon/buildkite
- Optimize building by building on warm machines
- Use buildkite and docker for CI
- Minify example bundle (#1206)

#### [4.2.0-alpha.29] - Dec 1
- Picking null color fix

#### [4.2.0-alpha.28] - Nov 30
- Add back experimental exports

#### [4.2.0-alpha.27] - Nov 30
- update sharp end fix for 64bits pathlayer shader (#1202)
- Fix spike issue in path layer (#1200)
- Move unaudited APIs to experimental (#1193)
- Reorganize file structure (#1192)
- add new blend mode to initWebGLParameters (#1188)
- Add support for old picking uniforms (#1191)
- Use Program 'varyings' option (#1190)
- Viewport transition tests (#1183)
- PathMarkerLayer: Support bi-directional arrows (#1181)
- add build command for point cloud example and change default settings of wind example (#1189)
- Example rename (#1182)

#### [4.2.0-alpha.26] - Nov 21
- Upgrade to viewport-mercator-project@5.0 (#1178)
- Transition interpolator class (#1154)
- Fix viewport projection topLeft option (#1174)

#### [4.2.0-alpha.25] - Nov 20
- Part-2 : 4.2 API changes as per Audit (#1170)
- Bump luma.gl peer dependency to '4.1.0-alpha.9'

#### [4.2.0-alpha.24] - Nov 17
-Fix log import errors (#1169)
-WindDemo: Display a warning when run on non webgl2 browsers. (#1166)

#### [4.2.0-alpha.23] - Nov 16
- Fix module import (#1168)
- Remove luma.gl dependency in package.json to avoid conflict with deck.gl (#1164)
- Fix the bug of distance calculation in orbit controller (#1163)
- Part-1 : 4.2 API changes as per Audit. (#1158)

#### [4.2.0-alpha.22] - Nov 15
- Fixes for updateTriggers

#### [4.2.0-alpha.21] - Nov 15
- Fix bug in layer.js
- Create and use getSubLayerProps()

#### [4.2.0-alpha.20] - Nov 13
Auto hide viewport base elements (#1134)

#### [4.2.0-alpha.19] - Nov 7
- Remove the y-flip scale and camera re-center logic for non-geospatial viewport (#1125)
- Add small "degenerate" PathLayer example (#1123)
- Fix the pan event handling of orbit controller (#1124)
- Fix issues in Orbit Viewport and update examples (#1119)
- Add flag for viewport transition updates (#1115)

#### [4.2.0-alpha.18] - Nov 2
- Viewport Transitions: Add transitionProps,
  fix bearing and longitude interpolation. (#1111)

#### [4.2.0-alpha.17] - Nov 1
- Use probe.gl instead of benchmark.js (#1110)
- Fix MapState constraints check (#1105)
- Fix attribute updates for composite layers (#1104)
- Fix typo (#1107)
- Fix path-marker-layer angle issue (#1100)

#### [4.2.0-alpha.16] - Oct 27
- MultiViewport Transitions: Add example, and fix `isMapSynced`.(#1099)
- path+mesh layer: Specify arrow colors (#1098)
- Add `layerFilter` prop (#1086)
- Use global version from webpack (#1091)
- Fix multi icon layer default props (#1094)
- ViewportTransitions: remove recursive children update, fix props update (#10
82)
- Fix multi icon layer default props (#1089)
- Move text layer to experimental layers (#1062)
- Handle IconLayer pixel size in first person viewports (#1084)
- core and deprecated layers only import from core/index.js (#1085)
- Quick fix of fitBounds API in orbit-viewport and examples (#1083)
    * Quick fix of fitBounds API in orbit-viewport and examples
- Clean up sub-module imports (#1081)
- Fix layer context update (#1072)
- refactoring on ortho- and perspective-viewports related files, exports and d
ocs (#1057)
- Correct brackets on `Complex polygon with holes` example (#1061)
    - The `polygon` property requires arrays of Polygons (i.e. `polygon: Polygon |
 Polygon[]`). Update the example to reflect this
- Fix MeshLayer fp64 mode (#1068)
- Separate common ViewState from FirstPersonState and MapState (#995)
- Transition manager improvements (#1063)
    - Fix incorrect timer, replace `setInterval` with `requestAnimationFrame`
    - Always use the transition settings from when the transition is triggered (
removes the burden from app: set and forget)
    - Use `onViewportChange` for transition update callback
    - Do not trigger transition on viewport size change
    - Do not compare viewports if there's no transition
    - Remove nested function definitions in utils
- Examples: set useDevicePixelRatio by default (#1060)
    * Layer-browser: set useDevicePixelRation by default
- Remove excessive nesting in picking code (#1036)
    * Remove excessive nesting in picking code
- Improved tracking and logging of redraw reason (#1037)
    - Experimental Layers: Set pickable to false for marker layer
- Apply default values for transition props (#1058)
- temporary fix for orthographic-viewport dependent apps (#1055)
    * have PerspectiveViewport extends Viewport
    * minor bug fix for the point-cloud-ply example
- ViewportTransition minor fixes (#1054)
- Viewport Transitions : add pure-js TransitionManager (#1038)
- Remove deck.gl picking module, use luma.gl's version. (#1045)
- Optimize prop diffing when using inline functions as accessors. (#1033)
- Move prop diffing from layer.js to props.js (#1035)
- Fix mesh layer (#1041)
- experimental `project64utils` (#1050)
    - Add new project64util shader module hat removes raw fp64 math from layer s
haders
- Add getLineDashArray and lineDashJustified in PolygonLayer
- Fix blending in ScatterplotLayer example (#1034)
- Fix Viewport import in OrbitViewport (#1044)
- Fix PolygonLayer issue with Data Accessors
- Fix plot layer (#1031)
- Add 3rd person viewport support (#1030)
- Improve Extruded Polygon Tesselation (#1011)
    - improve polygon tesselator perf
    - fix normal calculation
- Specify meter unit for getLineWidth in geojson layer (#1029)
- Publish work-in-progress layers in new `deck.gl-layers` module (#1003)
    - Includes PathMarkerLayer, PathOutlineLayer and MeshLayer
- RFC page, added 4.2 section (#1025)

#### [4.2.0-alpha.15] - Oct 11
- Pass useDevicePixelRatio to picking flow (#1021)
- Fix multi viewport update state (#1019)
- Bump luma.gl peer dependency to '4.1.0-alpha.6'

#### [4.2.0-alpha.14] - Oct 10
- Fix picking when rendereing pickable and non-pickable layers (#1018)
- Pass useDevicePixelRatio to picking flow. (#1016)
- Upgrade to new luma.gl API (#1014)

#### [4.2.0-alpha.13] - Oct 10
- Add experimental exports (#1010)
- Fix benchmark tests (#1005)
- Change the README.md, asking users to use the release branch and developers to use the master branch
- Fix useDevicePixelRatio prop usage (#1006)
- Update examples/README.md to fix broken links
- Fix point missing issue for 64 bits point cloud layer vertex shader (#1004)
- Fixes to drawlayers (#1002)
- Multi model fixes, OrbitController fix in plot layer (#996)
- fix WebMercatorViewport.addMetersToLngLat (#1001)
- Skip picking flow when no layer is pickable (#980)
- Fix modelMatrix in lnglat layers. Fixes separation slider in layer-browser. (#993)
- Add useDevicePixelRadius toggle to layer-browser (#989)
- Class name cleanup (#990)

#### [4.2.0-alpha.12] - Oct 5
- Fix picking and highlighting regressions. (#982)
- add viewMatrix back so users can access it in their own vertex shader (#984)
- Fix npm run bench (#978)
- Attribute Transition RFC (#961)
- Segment Layer Example Updates (#973)
- Update controller-architecture-rfc.md
- Layer browser updates (#965)
- Draw and pick refactor (#964)
- fix bug where layer does not update on updateTriggers change (#971)
-  [Hexagon/Grid] add no render when elevation < 0.0 to vertex-64 (#968)
- Viewport Animation: Adding flyTo style animation support. (#937)
- Minor fixes - after refactorings (#960)
- [GridLayer] Add getElevationValue to enable grid elevation by aggregation (#954)
- Fix test-dist

#### [4.2.0-alpha.11] - Oct 2
- Bump to luma.gl v4.1.0-alpha.4 - Framebuffer improvements
- Update segment layer example to latest luma.gl
- Layer browser updates (#965)
- Draw and pick refactor (#964)
- fix bug where layer does not update on updateTriggers change (#971)
- [Hexagon/Grid] add no render when elevation < 0.0 to vertex-64 (#968)
- Viewport Animation: Adding flyTo style animation support. (#937)
- Minor fixes - after refactorings (#960)

#### [4.2.0-alpha.10] - Sep 27
- SAMPLE: Outline shadow layer, first cut (#957)
- Update docs with missing layer props (#959)
- Simplify GL parameter initialization (#952)
- Split deck.gl into "package" directories (#948)
- [HexagonLayer] Add getElevationValue to calculate hexagon elevation by aggregation (#938)
- Pure js mapbox base map example (#947)
- Small example that loads a Carto Torque tile (#946)
- Multi viewport cleanup (#953)
- WindMap fix: use default useDevicePixelRatio = false (#956)
- Layer lifecycle log polish. Guard against corrupt picking buffer. RFC updates. (#958)

#### [4.2.0-alpha.9] - Sep 23
- React and JS implementations now share code
- Cleanup of exported symbols

#### [4.2.0-alpha.8] - Sep 21
- Fixes for pure-js example

#### [4.2.0-alpha.6] -

#### [4.2.0-alpha.6] -
- First person view merged to master

#### [4.2.0-alpha.5] -
- FIXES for First Person View

#### [4.2.0-alpha.4] -
- NEW: Automatic/custom highlighting using picking shader module.
- FIX: ScreenGridLayer `depthTest`
- FIX: CompositeLayer `parameters` forwarding
- FIX: S2Layer prop forwarding
- FIX: GridLayer crash: max call stack size
- NEW: Add `devicePixelRatio` prop
- NEW: RFCs
- DOCS: picking/event handling refresh
- DEMO: Wind demo fixes

#### [4.2.0-alpha.3] - Note: from 4.2-DEV

- Fixes for first person viewports in METER_OFFSET mode

#### [4.2.0-alpha.2] - Note: from 4.2-DEV

- Unifiy react controllers as `ViewportController`, export from react dir.
- Add FirstPersonState
- Add FirstPersonViewport, ThirdPersonViewport
- Move viewports and some utils out of `lib` folder.
- Add `start-es6` script to layer-browser
- Remove UTM_OFFSETS projection mode

#### [4.2.0-alpha.1]

- Add: UTM_OFFSETS projection mode


## deck.gl v4.1

#### [4.1.2] - Patch Release
- FIX: IconLayer texture filter and rotation:

#### [4.1.1] - Patch Release
- NEW: Automatic/custom highlighting using picking shader module.
- FIX: ScreenGridLayer `depthTest`
- FIX: CompositeLayer `parameters` forwarding
- FIX: S2Layer prop forwarding
- FIX: GridLayer crash: max call stack size
- NEW: Add `devicePixelRatio` prop
- NEW: RFCs
- DOCS: picking/event handling refresh
- DEMO: Wind demo fixes

#### [4.1.0] - 2017-7-27 Minor deck.gl Release

For details see [What's New](https://github.com/uber/deck.gl/blob/5.0-release/docs/whats-new.md)


### deck.gl v4.1 Beta Releases

#### deck.gl v4.1.0-beta.6
- Remove 'project' module in layer model creation as it's provided by default (#787)
- Fix `HexagonCellLayer` cell size changes while zomming (#785)
- Fix point projection in `GridCellLayer` (#784)

#### deck.gl v4.1.0-beta.5

- Fix `GridCellLayer` cellSize changing on zooming (#782)
- Add `getSubLayerClass`, `getSubLayerProps` methods to `GridLayer` and `HexagonLayer` for easy subclassing (#783)
- Add `pointRadiusScale`, `pointRadiusMinPixels` and `pointRadiusMaxPixels` props to GeoJsonLayer (#781)
- FIX: Fix the bug in shaders of LabelLayer that rotation angle is clamped to 0 - 180 degree (#780)
- Add the project module to the default module for our new shader system (#779)

#### deck.gl v4.1.0-beta.4
- Picking clean up (#774)
- Prevent picking when dragging (#775)
- Controllers bug fix (#777)
- Rename `settings` prop to `parameters`

#### deck.gl v4.1.0-beta.3
- WEBSITE update (#768)
- FIX: polygonOffset (#770)
- Use luma.gl shader modules (#772)
- DOC: Vis suite blog posts (#773)

#### deck.gl v4.1.0-beta.2
- NEW: `getUniformsFromViewport` refactored into `project` shader module's `getUniforms`.
- FIX: Update canvas size to match with device framebuffer size.
- WEBSITE: Links to other frameworks (#753)
- FIX: Avoid deep comparison error in compareProps when oldProp is empty (#754)
- FIX: Fix the fluctuation of the end cap for path layer 64bit (#755)
- MapController clean up (#757)
- SIZE: Remove gl-matrix (#759
- OrbitController clean up (#761)
- EXAMPLE: Fix updateState issue in TagMap: add shouldUpdateState function (#762)
- NEW: Replaced explicit calls to `assembleShaders` with `Model` parameters. (#764, #765, #767)

#### deck.gl v4.1.0-beta.1
- webpack configuration cleanup
- EXAMPLES: Experimental TagMap Layer (#735, @zhan1486)
- FIX: Use external buffers for layer attributes
- SEER integration upgrades (#744)
- Import luma.gl v4.0.0-beta.1 (#752)

#### deck.gl v4.1.0-alpha.15

- FIX: Tween.js import (#730, #734)
- Example config files cleaned up (#731, #732)
- queryVisibleObjects (renamed from queryObject) (#736)
- Event Management Refactor (#738)
- SEER integration upgrades (#740)
- Graph Layer example refactor (#742)
- New luma state management API
- WEBSITE: demo renamed to website

#### deck.gl v4.1.0-alpha.14

- "Stateless" picking (#717)
- Lifecycle performance tuning (#721)
- SEER performance badges (#720, #722)
- Custom "spy" class to fix test-browser
- FIX: Using external buffers for layer attributes
- FIX: Shadercache import (#727)

#### deck.gl v4.1.0-alpha.13
- Lifecycle tuning (#708)
- Seer performance badges (#709)
- Event Manager API Audit fixes (#710)
- FIX external buffers for layer attributes (#711)
- Travis CI fixes (#713)
- Examples now on react-map-gl v3 (#714)
- Stateless picking (uses new luma.gl features) (#715)
- Custom spy for tests (#716)

#### deck.gl v4.1.0-alpha.12
- Seer fix (#706)

#### deck.gl v4.1.0-alpha.11
- EXAMPLE: PlotLayer example improvement (#689)
- FIX: Fix 64-bit PathLayer (#704)
- TEST: EventManager tests (#705)

#### deck.gl v4.1.0-alpha.10
- FIX: fix point cloud examples bug (#680)
- FIX: fix modelMatrix in meter offset mode (#678)
- NEW: Add queryObjects api to DeckGL component (#673)
- Flatten CompositeLayer.renderLayer() output (#676)

#### deck.gl v4.1.0-alpha.9
- EXAMPLES: update the PlotLayer example with axis labels (#671)
- FIX: Fix radiusMinPixels and radiusMaxPixels for METER_OFFSETS in scatterplot (#607)
- TEST: Fix the rendering test (#672)
- FIX: Use luma.gl v4.0.0-alpha.7 to resolve the texture loading issue (#665)

#### deck.gl v4.1.0-alpha.8

- FIX: EventManager error in trackpad scroll
- FIX: `mousemove` is fired twice during drag
- FIX: drag events
- FIX: error when dragging outside of the canvas
- FIX: IconLayer does not rerender after texture is loaded

#### deck.gl v4.1.0-alpha.7

- FIX: Import in node

#### deck.gl v4.1.0-alpha.6

- FIX: Composite layers now pass `getPolygonOffset` prop to children
- FIX: `PolygonLayer` and `GeoJsonLayer` order sublayers dynamically for better blending behavior

#### deck.gl v4.1.0-alpha.5

- NEW: `getPolygonOffset` prop of the base Layer class (#649)
- NEW: Modularize support for raw and gestural input events (#636)

#### deck.gl v4.1.0-alpha.4
Versions 4.1.0 alpha 1, 2 and 3 have been unpublished due to a wrong tagging.

- PERFORMANCE: Optimize encodePickingColor by replacing the naive math with bit-wise operations (#631)
- FEAT: Add `pickingRadius` prop (#641)
- FEAT: Seer integration and performace improvements
- PERFORMANCE: Compiled are now cached for reuse so that same shaders are not recompiled for the same type of layers (#613)
- PERFORMANCE: getViewportUniforms optimization (#586)
- BREAKING: Only composite layers have `renderLayers` methods (#585)
- BREAKING: Only primitive layers' `draw` methods are called during render (#585)
- `GridLayer` add `coverage`, `lowerPercentile`, `upperPercentile` and `getColorValue` to layer prop (#614)
- `IconLayer` add `getAngle` for rotating each icon with a specific angles (in degrees) (#625)
- `HexagonLayer` add interval `getHexagons`, `getSortedCounts` `getUpdateTriggers` methods, make it easier to create layer subclass
- `HexagonLayer` add `getColorValue` (optional) prop, returns a value to base bin color on.
- `HexagonLayer` change default `hexagonAggregator` output to `{hexagons: [], hexagonVertices: []}`
- `HexagonLayer` add `getValue` to `BinSorter` to support color / elevation by value
- TEST: Implement code coverage with nyc and coverall report (#596)
- HOTFIX: fix `HexagonLayer` hex color calculation, use `bin.value` instead of `bin.points.count` to calculate color
- HOTFIX: Fix the bug that layer is finalized at every cycle due to an incorrect if check(#552)
- HOTFIX: Fix the bug that Model got regenerated every time data is changed for SolidPolygonLayer (#554)
- HOTFIX: Fix the bug that lighting is not working properly for 64-bit PolygonLayer on Intel Iris Pro GPU (#563)
- DEMO: Fix brushing layer demo (#603)
- DEMO: Fix the scrolling on iPhone (#546)
- DEMO: Reorganized the examples (#547)
- DEMO: Misc fixed form demo site (#548, #549)
- KNOWN ISSUES: the IconLayer example doesn't work if use with luma.gl v4.0.0-alpha.1


## deck.gl v4.0

#### [4.0.0] - 2017-4-6 Major deck.gl Release

For details see What's New



### v4.0 Beta Releases

#### [v4.0.0-rc.6]
- Fix: remove postinstall script

#### [v4.0.0-rc.5]
- `getPickingInfo()` methods receive an additional argument `sourceLayer` (#468)
- `HexagonLayer` add `lowerPercentile` and `higherPercentile` (#470)
- FIX: Fix the async loading issue #347 by not setting state of stale layers to null (#483)
- FIX: Fix the lightSettings prop transfer issue in composite layers (#484)
- FIX: Fix the attribute logger (#499)
- Demo site: Add IconLayer demo (#467, #487)
- Demo site: Refactor to make all demos available as standalone examples (#471, 477)
- Demo site: Add Hexagon layer demo (3d heatmap) (#478)
- Demo site: New data set for the GeoJsonLayer demo (#492)
- Demo site: Link directly to source code from examples (#497)
- Examples: Remove layers that are not in v4 release plan from LayerBrowser example (#475, #490)
- Examples: Add JSX wrapper example (#482)

#### [v4.0.0-rc.4]
- `GridCellLayer` `latOffset` and `lonOffset` => `cellSize`
- Picking improvement: consistently handle picking in composite layers and also simplied picking (#448, #450)
- FIX: Fix the projectionMode checks for point cloud layer (#454)
- FIX: Make extruded and non-extruded polygon layers using the same Uint8ClampedArray to process colors
- FIX: Make radiusPixels works for PointCloudLayer (#450)
- FIX: Fix the bug that several composite layer not transferring proper props to their underlying layers (#455, #464)
- FIX: Fix a bug causes active layers got invalidated in the middle of the picking info processing (#458)
- FIX: Fix the vertice generation for extruded polygons with holes (#447)
- FIX: Now deck.gl picking works properly for non-fullscreen apps (#455)
- FIX: `onHover` and `onClick` props now work on `GridLayer` and `HexagonLayer`
- Picking info from `GeoJsonLayer` and `PolygonLayer` now have `layer` property point to the
  composite layer instead of a sublayer
- FIX: `PointCloudLayer` use `radiusPixels` instead of `radius`
- Examples: Fix the hello-world examples (#461)
- Demo site: Add interactive demo for each core layers (#452)
- Demo site: Upgrade old demos to v4 (#453)
- Demo site: Various other bug fixes (#463)

#### [v4.0.0-rc.3]

- Disable implicit props forwarding between the composite layer and its underlying layers.
- `GeoJsonLayer` `getColor` => `getLineColor`
- `GeoJsonLayer` `getWidth` => `getLineWidth`
- `GeoJsonLayer` add `lineWidthScale`
- `GeoJsonLayer` add `lineWidthMinPixels`
- `GeoJsonLayer` add `lineWidthMaxPixels`
- `GeoJsonLayer` add `lineJointRounded`
- `GeoJsonLayer` add `lineMiterLimit`
- `PolygonLayer` `getColor` => `getLineColor`
- `PolygonLayer` `getWidth` => `getLineWidth`
- `PolygonLayer` add `lineWidthScale`
- `PolygonLayer` add `lineWidthMinPixels`
- `PolygonLayer` add `lineWidthMaxPixels`
- `PolygonLayer` add `lineJointRounded`
- `PolygonLayer` add `lineMiterLimit`
- FIX: `ScatterplotLayer` calls Layer.updateState() to invalidate all attributes when data changed
- FIX: Fix the `ExtrudedChoroplethLayer64` in deprecated layer examples
- Replace all readFileSync() calls with Javascript imports for all GLSL shaders

#### [v4.0.0-rc1]

- FIX: Composite layers now have a stub invalidateAttribute()
- FIX: GeoJsonLayer and PolygonLayer now transfer correct updateTriggers to its sublayers
- FIX: Fix the picking for PolygonLayer with and without extrusions
- FIX: update the data file and default values for GeoJsonLayer example so that it correctly shows all geometry features
- FIX: `GeoJsonLayer` now wireframe prop only affects extruded layer and stroked only affects non-extruded layer
- FIX: super.updateState() now get called appropriately so that data change can correctly popylate to GPUs
- Re-factored GeoJsonLayer and PolygonLayer to separate polygon wireframe and polygon outline
- Removed loader for glsl and use exported Javascript string to store all GLSL shaders

- `PointDensityGridLayer` => `GridLayer`
- `PointDensityHexagonLayer` => `HexagonLayer`
- `GridLayer` => `GridCellLayer`
- `HexagonLayer` => `HexagonCellLayer`
- `PolygonLayer` => `SolidPolygonLayer`
- `PolygonLayer` is now a new composite layer that could render solid polygons as well as polygon outlines
- `GridLayer` and `HexagonLayer` to use new quantizedScale utility function
- `GeoJsonLayer` remove `drawPoints`, `drawLines`, `drawPolygon`, `fillPolygon`
- `GeoJsonLayer` add `stroked`, `filled`, `extruded`, `wireframe`
- `GeoJsonLayer` `getPointSize` => `getRadius`
- `GeoJsonLayer` `getStrokeWidth` => `getWidth`
- `GeoJsonLayer` `getStrokerColor` => `getColor`
- `GeoJsonLayer` remove `getPointColor`, use `getFillColor` instead
- `PathLayer` `strokeWidthScale` => `widthScale`
- `PathLayer` `strokeWidthMinPixels` => `widthMinPixels`
- `PathLayer` `strokeWidthMaxPixels` => `widthMaxPixels`
- `PathLayer` `getStrokeWidth` => `getWidth`
- `ScatterplotLayer` change the default `radiusScale` to 1
- `ScreenGridLayer` change `unitWidth` and `unitHeight` to `cellSizePixels`

- Update tests to reflect the new layer names and props

#### [v4.0.0-beta.5]
- NEW: add `viewportSize`, `devicePixelRatio` and `modelViewMatrix` to default uniforms

#### [v4.0.0-beta.4]
- FIX: Make luma.gl peer dependency more flexible
- Dependencies: Bump to react-map-gl@2, remove viewport-mercator-project & lodash.flatten
- 64 bit layers additions and fixes
- IconLayer aspect ratio
- New sample layers

#### [v4.0.0-beta.3]
- Add PointCloudLayer
- FIX: `onHover` and `onClick` are no longer called on layers that are not affected
- BREAKING: `layer.pick()` is renamed to `layer.getPickingInfo()`, must return info object

#### [v4.0.0-beta.2]
- Bumps luma.gl with some hotfixes
- Remove unfinished example
- Doc improvements (upgrade guide)
- NEW: PointDensityGridLayer

#### [v4.0.0-beta.1]

API AUDIT CHANGES:
- `GeoJsonLayer` `getHeight` => `getElevation`
- `GeoJsonLayer` Docs: Clarified that elevation is always in `meters` for cartographic projection modes

- `PolygonLayer` `getHeight` => `getElevation`
- `PolygonLayer` Docs: Clarified that elevation is always in `meters` for cartographic projection modes
- `PolygonLayer` Docs: documented missing props
- `PolygonLayer` Docs: Marked `lightSettings` as experimental

- `PathLayer` `getWidth` => `getStrokeWidth`
- `PathLayer` `strokeWidth` => `strokeWidthScale`
- `PathLayer` `strokeMinPixels` => `strokeWidthMinPixels`
- `PathLayer` `strokeMaxPixels` => `strokeWidthMaxPixels`

- `HexagonLayer` Docs: Marked `lightSettings` as experimental
- `HexagonLayer` Docs: Marked `selectedPickingColor` as experimental
- `GridLayer` Docs: Marked `lightSettings` as experimental

- Cleanup: More layers now only imports the `get` utility function instead
  of the full `Container` object from utils - this provides most of the
  benefits with smaller impact on the code.

DOCS
  - Moved docs into 4.0 subfolder to support publishing multiple doc versions
    from a single tree.


## deck.gl v3.1

#### [3.1.3] - 2017-1-25

- HOTFIX: Fixed project_fp64 issue under linux + nvidia (#315)

#### [3.1.2] - 2017-1-19

- HOTFIX: Fixed some 64-bit math issue on some Nvidia GPUs (#286)
- HOTFIX: Fixed an issue in scatterplot64 that NaN got passed to GPU (#287)
- Disable blending when rendering to picking framebuffer (#288)

#### [3.1.1] - 2016-12-1

- FIX: ExtrudedChoroplethLayer64 - Now updates uniforms when props change
- HOTFIX ScatterplotLayer: Fix instancePositions regression in 3.1.0
- HOTFIX DeckGL: Fix PropType warning regression in 3.1.0 (layers/effects props)

#### [3.1.0] - 2016-11-30

- LineLayer: Support elevations (z coords on positions)
- LineLayer64: Support elevations (z coords on positions)
- Scatterplot: Enable updateTriggers on instanceRadius, separate from positions.
- EXPERIMENTAL FEATURE: ReflectionEffect
- INTERNAL: Target build env moved to Node 6. Travis tests now run on 6 & 7.

### v3.1 Beta Releases

#### [v3.1.0-beta.16] -
- NEW: Main example now provides UI to modify layer props
- NEW: Main example now has GeoJson test file with all GeoJson geometry types.
- NEW: GridLayer
- FIX: GeoJson points now render correctly
- FIX: Mutation issue in defaultProps
- Demo now installs and builds stand-alone
- Picking improvements - order of function calls changed to enable layer overrides
- PathLayer: new props
- PathLayer: geometry generation performance.
- Webpack config improvements to enable tree-shaking

#### [v3.1.0-beta.15] -
CHANGE: Revert to babel compilation to expose the dist file tree rather than a bundle

#### [v3.1.0-beta.14] -
FIX: GeoJson path layer
FIX: defaultProps handling

#### [v3.1.0-beta.13] -
NEW: GeoJsonLayer cleanup
NEW: HexagonLayer

#### [v3.1.0-beta.12] -
FIX: Broken dist export

#### [v3.1.0-beta.11] -

NEW: GeoJsonLayer, PathLayer
NEW: PolygonLayer with flat, extrusion and wireframe (5x faster than Choropleth)
NEW: Support immutable geojson data in choropleth layers
NEW: Add benchmarks for node and browser.js (#299)
NEW: Lighting supported on polygon layer. New lighting shader module.
FIX: FP64 math function improvement, bug fixes and speed
FIX: Set Viewport project/unproject default to screen coordinates
- Main example refactored
- Shader tests as webpack
- 64bit layers as subclasses of 32 bit layers
- Choropleth Layers now in deprecated folder
- Remove lodash.flattendeep and geojson-normalize module dependencies



#### [v3.1.0-beta.10] -
FIX: Loosen luma.gl peer dependency

#### [v3.1.0-beta.9] -
FIX: Additional model matrix cleanup and streamlining

#### [v3.1.0-beta.8] -
FIX: Model matrix cleanup

#### [v3.1.0-beta.7] -
- FIX: Re-export of beta6 with fixed config.

#### [v3.1.0-beta6] -
- FIX: Fix to model matrix in meter offsets mode (now handles rotations in addition to translations)
- BREAKING: `react` and `experimental` entry points no longer supported (after webpack transition).
- CHANGE: Now packaged using Webpack 2 - exposed as a single bundle rather than a directory of files.
- UPDATE: Simplification and cleanup of main example.

#### [v3.1.0-beta5] -
- FIX: Disable viewport comparison (temporarily) as it broke `METERS` mode.
- CHANGE: Remove react-autobind dependency (deck.gl/react now includes a minimal
  `autobind` implementation).
- NEW: Additional examples included, including (WIP) google maps.

#### [v3.1.0-beta4] -
- FIX: Restore `COORDINATE_SYSTEM` export

#### [v3.1.0-beta3] -
- CHANGE: Move shaderlib into src, remove unneeded scripts

#### [v3.1.0-beta2] - Working modelMatrix
- FIX: modelMatrix now applied correctly in both drawing and picking
- NEW: Main example now has slider to separate layers

#### [v3.1.0-beta1] - Use new `Viewport` from `viewport-mercator-project`

- NEW: Support for per-layer model matrices (layer.modelMatrix props)
- NEW: Support for non-mercator Viewports
  The `DeckGL` React component now takes a generic `Viewport` prop that can be
  created with arbitrary `view` and `projection` matrices.
  If not supplied, it attempts to create a viewport from supplied mercator
  parameters, which corresponds to behavior before the change.
- NEW: `LayerManager.setViewport` replaces `LayerManager.setContext`
Internal changes:
- `WebGLViewport` now a wrapper around a supplied `Viewport` rather than a subclass.


## deck.gl v3.0

#### [3.0.9, 3.0.10] - 2016-11-18

- Bumped viewport-mercator-project version for the unproject fix.
- Updated dependency versions (#229)
- Added test code for attribute-manager (#213)
- Added minMax radius for the scatterplot-layer (#230)

#### [3.0.8] - 2016-11-18

- Performance optimization: remove unnecessary gl.getParameter() calls (#227)

#### [3.0.7] - 2016-11-16

- Fixed precision issue for vec2_mix_fp64 function (#223)
- Added mouse event object to hover and click event parameter (#255)

#### [3.0.6] - 2016-11-14

- Bug fix for picking not returning x, y coordinates (#220)

#### [3.0.5] - 2016-11-14

- Performance optimization: prevent redundant data calculation (#222)

#### [3.0.3] - 2016-11-14

- Bug fixes for ScatterplotLayer not being updated with new data prop (#215)
- Performance optimization: prevent fbo from reallocating every time (#217)

#### [3.0.2] - 2016-11-12

- Performance optimization for examples in gh-pages

#### [3.0.1] - 2016-11-11

- Enable blending by default
- Fix syntax highlighting in gh-pages

#### [3.0.0] - Major deck.gl Release

For details see [What's New](docs/whats-new.md)

### v3.0 Beta Releases

#### [v3.0.0-rc6] -
- Support layerIndex uniform to solve z-fighting
- gl_FragDepth extension to fix Voronoi Layer (#186)
- Remove Scatterplot64(Meters) Layer for now (#188)
- FIX: Made Viewport.getUniforms() overridable and more debuggable

#### [v3.0.0-rc5] -
- FIX: METERS mode high precision z coordinate restored

#### [v3.0.0-rc4] -
- FIX: METERS mode high precision restored
- REMOVED unfinished GeoJson layer
- FIX: gl.viewport only called when view size changes

#### [v3.0.0-rc3] -
- FIX: Uniforms arg on Layer.draw()

#### [v3.0.0-rc2] -
- FIX to ChoroplethLayer64 colors
- FIX: METERS MODE
- Viewport now imported from viewport-mercator-project
- Dependency cleanup - several no longer needed dependencies removed
- Doc now serves locally from relative directories


#### [v3.0.0-rc1] - First Release Candidate, Final API changes
- BREAKING: Removed pickInfo life cycle method - can be handled by pick
- FEATURE: Add `onLayerClick` and `onLayerHover` methods to deck.gl wrapper.
- FIX: Restore multilayer picking. Fixes #136.
- PERF: Enable Uint8Array color attributes
  - Layer.instancePickingColors and Scatterplot.instanceColors now Uint8Arrays

#### [v3.0.0-beta31] - Stabilization/Performance round
- FIX: Scatterplot lineWidth warning
- FIX: context.viewport = null in draw
- FIX: opacity prop.
- FEATURE: Enables prop diff tracing (deck.log.priority = 1)
- PERF: Defeat spurious redraws

#### [v3.0.0-beta30] - Perf fixes - significantly reduce GPU load.
- FIX: compareProps and updateTriggers fixes
- PERF: reduce unnecessary updates
- Doc updates

#### [v3.0.0-beta29] -
- FIX: ArcLayer flickering last segments
- FIX: Scatterplot Layer exception
- FIX: Layer lifecycle - initialization/update of sublayers
- Doc update of Layers


#### [v3.0.0-beta28] -
- BREAKING CHANGE: Picking API final version. Fixes #115. Fixes #116.
- FIX: Ignore null layers
- FIX: Warns once instead of throws on deprecated props.
- FIX: Pinned babel-plugin-glslify version to avoid broken release
- Remove broken layers (HexagonLayer and PointCloudLayer).

#### [v3.0.0-beta27] - Broken
- npm publish failed, no dist

#### [v3.0.0-beta26] -
- FEATURE: line width now takes device pixel ratio into account
- FEATURE: New life cycle methods, old methods deprecated
- FIX: Fix for context.viewport initialization order
- FIX: `DeckGL` component now cancels animation loop on unmount.
- BREAKING: Removed `blending` prop from react components
- FIX: ScreenGridLayer
- FEATURE: ScreenGridLayer now have accessors (getPosition, getWeight) and custom
    color ramps (minColor, maxColor)

#### [v3.0.0-beta25] -
- FEATURE: Adds drawOutline option to ScatterplotLayer.
- FIX: update context.viewport issue #128
- BREAKING: deepCompare prop changed to dataComparator. lodash.isequal dependency removed.

#### [3.0.0-beta24] -
- FIX: Picking in most layers
- FIX: Initialization of sublayers
- Exports more symbols from lib
- 64 bit ExtrudedChoroplethLayer
- 64 bit layers in place
- GLSL library alignement 64 bit projections

#### [3.0.0-beta23] -
 - FEATURE: `Layer.pick` lifecycle method - Let's layers take control of picking
 - FEATURE: Support for Composite Layers
 - FEATURE: new GeoJsonLayer - Initial composite layer, only Polygons for now.
 - BREAKING: Introducing `context` that is shared between layers.
    gl and viewport moved from state to context. This implies that apps
    no longer need to pass {lng,lat,zoom,pitch,bearing} to each layer, only
    to the `DeckGL` react component.
 - BREAKING: GridLayer renamed to ScreenGridLayer
 - BREAKING: All layers now use `assembleShaders`
 - BREAKING: GLSL `project` package - shader functions renamed to have
   `project` prefix, in line with conventions for new shader package system.
 - MISC: Documentation updates.
 - MISC: WebGLRenderer/DeckGl react component cleanup, removed unusued methods.

#### [3.0.0-beta22] -
 - FIX: Perspective projection matrix "far plane" now covers negative Z coords
 - FEATURE: Improved precision trigonometry library for Intel GPUs
 - FEATURE: ChoroplethLayer64
 - FEATURE: Experimental "Cone Based" VoronoiLayer
 - CHANGE: shaderAssembler system reorganization

#### [3.0.0-beta21] -
 - FIX: Now takes layer props into account when generating projection uniforms

#### [3.0.0-beta20] -
 - DOCUMENTATION: Article updates
 - FIX: Fix broken shader export in beta19

#### [3.0.0-beta19] -
 - BREAKING - New GLSL projection methods and assembleShader function.
   All layers updated.
 - FIX - ArcLayer64 flickering fixed by high precision workaround.

#### [3.0.0-beta18] -
 - BREAKING: No longer use Camera/Scene to render. Enabler for issue #5.
 - BREAKING: Sample layers now available through `import 'deck.gl/samples';
 - FEATURE: FP64 layers now exported by default import 'deck.gl'
 - BREAKING: DeckGLOverlay renamed to DeckGL: `import DeckGL from 'deck.gl';`
 - FIX: GridLayer
 - FEATURE: ChoroplethLayer now renders MultiPolygons and Polygons with holes

#### [3.0.0-beta17] - 64bit layers and more.
 - FEATURE: New GLSL library: 64bit emulated floating point
 - FEATURE: New layer: ScatterplotLayer64: Sample 64-bit, high precision layer
 - FEATUREY: ArcLayer can now specify separate start end end color for each arc.
 - FIX: Add high precision version of `tan` as Intel GPU workaround.
 - INTERNAL: eslint now uses stronger rules. Fix new eslint warnings.

#### [3.0.0-beta16] -
 - Breaking change - rename `disableMercatorProject` prop to `mercatorEnabled`
 - Add experimental layers folder
 - Add separate import files for experimental layers and viewport
   import {PointCloudLayer, ...} from 'deck.gl/experimental'
   import Viewport from 'deck.gl/viewport'
- Add test cases for top-level exports
- Code reorganization

#### [3.0.0-beta15] - Merge 2.4.9 fixes

#### [3.0.0-beta14] - Viewport improvements
- Revert to 2-series luma.gl (no longer need beta release)
- Viewport improvements

#### [3.0.0-beta13] -
- Breaking Change: Standardize parameters in layers to always expect arrays.
- Remove separate attribute updater definitions to simplify layer subclass
  creation


## deck.gl v2

#### [2.4.10] - 2016-09-20
- Added line width support to the choropleth layer.

#### [2.4.9] - FIX: Picking of instanced layers restored
- Layer.calculateInstancePickingColors now gets correct numInstances argument.
- Bumps luma.gl to include Linux fix.

#### [2.4.8] - TBD
- Move glslify to "dependencies" in package.json
- Fix bool uniform that webgl in certain environment handles it differently

#### [2.4.7] - 2016-09-06
- Fix issue of mercatorEnabled not working on Linux

#### [2.4.6] - 2016-09-06
- Fix issue where 0 opacity is interpreted as default opacity
- Fix issue with printing of layerName in debug messages crashes

#### [2.4.5] - 2016-08-31
- Fixed picking for the choropleth layer

#### [2.4.4] - 2016-08-17
- Added deckgl-overlay canvas ID and customize style support

#### [2.4.3] - 2016-08-16
- Fix document / add customize style support to the canvas (@contra)

#### [2.4.2] - 2016-08-16
- Added per point radius support for the scatterplot-layer

#### [2.4.1] - 2016-08-15
- Fixed primitive distortion bug for the scatterplot and hexagon-layer

#### [2.4.0] - 2016-08-12
- Added non-LatLng coordinate support for
  - arc-layer
  - choropleth-layer
  - line-layer
  - scatterplot-layer

#### [2.3.0] - 2016-08-06
- Added line-layer support

#### [2.2.5] - 2016-08-02
- Added per point color support for the scatterplot-layer

#### [2.2.4] - 2016-07-13
- Performance improvement

#### [2.2.0] - 2016-07-05
- Added perspective mode, 3D camera support
- Added unit tests
- Tons of refactoring and performance improvement

#### [2.1.0] - 2016-03-30
- Added precompile support
- Added data deep comparison support
- Added better uniform error message support
- Changed to use the new Luma.gl API
- Moved babel-related libraries from devDependence to dependency
- Changed default blending function (ZERO -> ONE_MINUS_SRC_ALPHA)
- Bug in getNumberInstances

#### [2.0.0] - 2016-02-29
- Retina display support
- Performance refactoring
- Switched the underlying rendering framework to
  [luma.gl](https://github.com/uber/luma.gl)
- Fixed picking on retina/regular display

## deck.gl v1

#### [1.0.0] - 2016-01-06
- Initial commit of the open-source version of deck.gl
