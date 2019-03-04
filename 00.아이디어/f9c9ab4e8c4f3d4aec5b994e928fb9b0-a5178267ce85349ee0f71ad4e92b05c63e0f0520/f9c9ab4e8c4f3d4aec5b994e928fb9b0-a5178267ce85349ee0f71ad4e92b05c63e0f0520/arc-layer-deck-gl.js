const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/light-v9",
        center: [-122.398, 37.788],
        zoom: 12,
        pitch: 60
    });

    map.on("style.load", () => {
        // Get data for the arc map from SFMTA origin/destination routes
        fetch('https://raw.githubusercontent.com/uber/deck.gl/master/examples/layer-browser/data/sfmta.routes.json')
            .then(function(response) {
                const arclayer = new MapboxLayer({
                    id: 'my-arc',
                    type: ArcLayer,
                    data: response.json(),
                    getSourcePosition: d => d.START,
                    getTargetPosition: d => d.END,
                    getSourceColor: d => [64, 255, 0],
                    getTargetColor: d => [0, 128, 200]
                });
          
                //Add the deck.gl arc layer to the map 
                map.addLayer(arclayer, 'waterway-label');
            });
    })