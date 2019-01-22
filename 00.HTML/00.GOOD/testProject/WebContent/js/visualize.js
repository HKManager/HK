function buildDataVizGeometries( linearData ){

	var sphereRad = 1;
	var rad = 100;
	var loadLayer = document.getElementById('loading');

	for( var i in linearData ){
		var yearBin = linearData[i].data;

		var year = linearData[i].year;
		yearIndexLookup[year] = i;

		var count = 0;
		console.log('Building data for ...' + year);
		for( var s in yearBin ){
			var set = yearBin[s];

			var seriesPostfix = set.series ? ' [' + set.series + ']' : '';
			set.testName = (set.date + ' ' + missileLookup[set.missile].name + seriesPostfix).toUpperCase();

			var facilityName = set.facility;
			facility = facilityData[facilityName];

			//	we couldn't find the facility, it wasn't in our list...
			if( facility === undefined )
				continue;

			var distance = set.distance;
			if (isNaN(distance)) {
				distance = 0;
			}

			var apogee = set.apogee;
			if (apogee === 'unknown' && distance > 0) {
				// minimum energy trajectory
				apogee = -0.000013 * distance * distance + 0.26 * distance;
			}
			if (isNaN(apogee)) {
				apogee = 0;
			}

			var landing = landingLatLon(facility.lat, facility.lon, set.bearing, distance);
			var lon = landing.lon - 90;
			var lat = landing.lat;
			var phi = Math.PI/2 - lat * Math.PI / 180;
			var theta = 2 * Math.PI - (lon - 9.9) * Math.PI / 180;

			var lcenter = new THREE.Vector3();
			lcenter.x = Math.sin(phi) * Math.cos(theta) * rad;
			lcenter.y = Math.cos(phi) * rad;
			lcenter.z = Math.sin(phi) * Math.sin(theta) * rad;

			set.landingLocation = {
				name: set.landing,
				lat: landing.lat,
				lon: landing.lon,
				center: lcenter
			};

			if (distance == 0) {
				set.markerOnLeft = true;
			}

			//	visualize this event
			set.lineGeometry = makeConnectionLineGeometry( facility, set.landingLocation, apogee );

			testData[set.testName] = set;

		}

	}

	loadLayer.style.display = 'none';
}

function getVisualizedMesh( linearData, year, outcomeCategories, missileCategories ){
	//	pick out the year first from the data
	var indexFromYear = yearIndexLookup[year];

	var affectedTest = [];

	var bin = linearData[indexFromYear].data;

	var linesGeo = new THREE.Geometry();
	var lineColors = [];

	var particlesGeo = new THREE.BufferGeometry();
	var particlePositions = [];
	var particleSizes = [];
	var particleColors = [];

	particlesGeo.vertices = [];

	//	go through the data from year, and find all relevant geometries
	for( i in bin ){
		var set = bin[i];

		var relevantOutcomeCategory = $.inArray(set.outcome, outcomeCategories) >= 0;
		var relevantMissileCategory = $.inArray(set.missile, missileCategories) >= 0;

		if( relevantOutcomeCategory && relevantMissileCategory ){
			//	we may not have line geometry... (?)
			if( set.lineGeometry === undefined )
				continue;

			var lineColor = new THREE.Color(missileColors[set.missile]);

			var lastColor;
			//	grab the colors from the vertices
			for( s in set.lineGeometry.vertices ){
				var v = set.lineGeometry.vertices[s];
				lineColors.push(lineColor);
				lastColor = lineColor;
			}

			//	merge it all together
			linesGeo.merge(set.lineGeometry);

			var particleColor = lastColor.clone();
			var points = set.lineGeometry.vertices;
			var particleCount = 1;
			var particleSize = set.lineGeometry.size * dpr;
			if (set === selectedTest) {
				particleCount *= 4;
				particleSize *= 2;
			}
			for( var rIndex=0; rIndex<points.length-1; rIndex++ ){
				for ( var s=0; s < particleCount; s++ ) {
					var point = points[rIndex];
					var particle = point.clone();
					particle.moveIndex = rIndex;
					particle.nextIndex = rIndex+1;
					if(particle.nextIndex >= points.length )
						particle.nextIndex = 0;
					particle.lerpN = 0;
					particle.path = points;
					particlesGeo.vertices.push( particle );
					particle.size = particleSize;

					particlePositions.push( particle.x, particle.y, particle.z );
					particleSizes.push( particleSize );
					particleColors.push( particleColor.r, particleColor.g, particleColor.b );
				}
			}

			affectedTest.push(set.testName);

			if( set.outcome === 'success' ){
				summary.success[set.missile]++;
				summary.success.total++;
			}
			else if( set.outcome === 'failure' ){
				summary.failure[set.missile]++;
				summary.failure.total++;
			}
			else {
				summary.unknown[set.missile]++;
				summary.unknown.total++;
			}

			summary.total++;

		}
	}

	// console.log(selectedTest);

	linesGeo.colors = lineColors;

	//	make a final mesh out of this composite
	var splineOutline = new THREE.Line( linesGeo, new THREE.LineBasicMaterial(
		{ 	color: 0xffffff, opacity: 1.0, blending:
			THREE.AdditiveBlending, transparent:true,
			depthWrite: false, vertexColors: true,
			linewidth: 1 } )
	);


	particlesGeo.addAttribute('position', new THREE.BufferAttribute(new Float32Array(particlePositions), 3));
	particlesGeo.addAttribute('size', new THREE.BufferAttribute(new Float32Array(particleSizes), 1));
	particlesGeo.addAttribute('customColor', new THREE.BufferAttribute(new Float32Array(particleColors), 3));

	uniforms = {
		amplitude: { type: "f", value: 1.0 },
		color:     { type: "c", value: new THREE.Color( 0xffffff ) },
		texture:   { type: "t", value: new THREE.TextureLoader().load( "images/particleA.png" ) },
	};

	var shaderMaterial = new THREE.ShaderMaterial( {

		uniforms:		uniforms,
		vertexShader:	document.getElementById( 'vertexshader' ).textContent,
		fragmentShader:	document.getElementById( 'fragmentshader' ).textContent,

		blending:		THREE.AdditiveBlending,
		depthTest:		true,
		depthWrite:		false,
		transparent:	true,
		// sizeAttenuation: true,
	});



	var pSystem = new THREE.Points( particlesGeo, shaderMaterial );
	pSystem.dynamic = true;
	splineOutline.add( pSystem );

	pSystem.update = function(){
		// var time = Date.now();
		var positionArray = this.geometry.attributes.position.array;
		var index = 0;
		for( var i in this.geometry.vertices ){
			var particle = this.geometry.vertices[i];
			var path = particle.path;
			var moveLength = path.length;

			particle.lerpN += 0.05;
			if(particle.lerpN > 1){
				particle.lerpN = 0;
				particle.moveIndex = particle.nextIndex;
				particle.nextIndex++;
				if( particle.nextIndex >= path.length ){
					particle.moveIndex = 0;
					particle.nextIndex = 1;
				}
			}

			var currentPoint = path[particle.moveIndex];
			var nextPoint = path[particle.nextIndex];


			particle.copy( currentPoint );
			particle.lerp( nextPoint, particle.lerpN );

			positionArray[index++] = particle.x;
			positionArray[index++] = particle.y;
			positionArray[index++] = particle.z;
		}
		this.geometry.attributes.position.needsUpdate = true;
	};

	//	return this info as part of the mesh package, we'll use this in selectvisualization
	splineOutline.affectedTests = affectedTest;


	return splineOutline;
}

// - 신인환 주석 전체 레이어 관련
function selectVisualization( linearData, year, tests, outcomeCategories, missileCategories ){
	//	we're only doing one test for now so...
	var cName = tests[0].toUpperCase();

	$("#hudButtons .testTextInput").val(cName);
	previouslySelectedTest = selectedTest;
	selectedTest = testData[tests[0].toUpperCase()];

	summary = {
		success: {
			total: 0
		},
		failure: {
			total: 0
		},
		unknown: {
			total: 0
		},
		total: 0,
		max: 0,
		historical: getHistoricalData()
	};
	for( var i in missileLookup ){
		summary.success[i] = 0;
		summary.failure[i] = 0;
		summary.unknown[i] = 0;
	}

	// console.log(selectedTest);

	//	clear markers
	for( var i in selectableTests ){
		removeMarkerFromTest( selectableTests[i] );
	}

	//	build the mesh
	
	// - 신인환 주석 좌측 하단 관련 데이터 표출
	console.time('getVisualizedMesh');
	
	console.timeEnd('getVisualizedMesh');

	d3Graphs.initGraphs();
}
