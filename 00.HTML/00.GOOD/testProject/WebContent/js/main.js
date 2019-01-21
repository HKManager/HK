var masterContainer = document.getElementById('visualization');

var mapOutlineImage;

//	where in html to hold all our things
var glContainer = document.getElementById( 'glContainer' );
var dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;

var lang = getLang();
var dict;

//	contains a list of facility codes with their matching facility names
var facilityFile = 'data/facility.' + lang + '.json';
var missileFile = 'data/missile.' + lang + '.json';
var dictFile = 'data/dict.' + lang + '.json';

var camera, scene, renderer;
var camera2s, scene2d;

var sphere;
var rotating;
var visualizationMesh;

//	contains the data loaded from the test data file
//	contains a list of years, followed by tests within that year
var timeBins;

//	contains latlon data for each facility
var latlonData;

//	contains above but organized as a mapped list via ['facilityname'] = facilityobject
//	each facility object has data like center of facility in 3d space, lat lon and facility name
var facilityData = new Object();
var testData = new Object();

//	contains a list of missile code to missile name for running lookups
var missileLookup;

var yearIndexLookup = {};
var selectableTests = [];
var summary;

//	a list of outcome 'codes'
//	now they are just strings of categories
//	Outcome Code : Outcome Node
var outcomeLookup = {
	'success': 'Success',
	'failure': 'Failure',
	'unknown': 'Unknown'
};

//	A list of missile colors
var missileColors = {
	'er-scud' : 0x1A62A5,
	'hwasong-12' : 0x6C6C6C,
	'hwasong-14' : 0xAEB21A,
	'hwasong-15' : 0x1DB2C4,
	'kn-02': 0xB68982,
	'musudan': 0x9FBAE3,
	'nodong': 0xFD690F,
	'polaris-1': 0xFEAE65,
	'polaris-2': 0xDA5CB6,
	'scud-b': 0x279221,
	'scud-b-marv': 0xD2D479,
	'scud-c': 0x89DC78,
	'scud-c-marv': 0xBBBBBB,
	'taepodong-1': 0xCA0F1E,
	'unha': 0x814EAF,
	'unha-3': 0xB89FCB,
	'unknown': 0x78433B
};

//	the currently selected test
var selectedTest = null;
var previouslySelectedTest = null;

//	contains info about what year, what tests, outcomes, missiles, etc that's being visualized
var selectionData;

function getLang() {
	var lang = '';
	var match = location.search.match(/lang=(.*?)(&|$)/);
	//var match = location.href.match(/\/([a-z]{2})\/[^\/]*$/);
	if (match) {
		lang = decodeURIComponent(match[1]).substring(0, 2);
	}
	if (lang === 'ja' || lang === 'en') {
		return lang;
	}
	lang = (window.navigator.languages && window.navigator.languages[0]) ||
		window.navigator.language ||
		window.navigator.userLanguage ||
		window.navigator.browserLanguage;
	return (lang && lang.substring(0, 2) === 'ja') ? 'ja' : 'en';
}

function loadLangCSS(lang) {
	if (lang !== 'en') {
		var tags = document.createDocumentFragment();
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = 'style.' + lang + '.css';
		tags.appendChild(link);
		document.getElementsByTagName('head')[0].appendChild(tags);
	}
}

//	TODO
//	use underscore and ".after" to load these in order
//	don't look at me I'm ugly
function start(e) {
	//	detect for webgl and reject everything else
	if (!Detector.webgl) {
		Detector.addGetWebGLMessage();
	} else {
		loadLangCSS(lang);
		//	ensure the map images are loaded first!!
		mapOutlineImage = new Image();
		mapOutlineImage.src = 'images/map_outline.png';
		mapOutlineImage.onload = function() {
			loadDictData(function() {
				document.title = dict['_title'];
				loadFacilityData(function() {
					loadMissileData(function() {
						loadTestData(function() {
							initScene();
							
							
							// -  신인환 주석 지도쪽 애니매이션 파트 
							//animate();
						});
					});
				});
			});
		};
	};
}



var Selection = function(selectedYear, selectedTest) {
	this.selectedYear = selectedYear;
	this.selectedTest = selectedTest;

	this.outcomeCategories = new Object();
	for (var i in outcomeLookup) {
		this.outcomeCategories[i] = true;
	}
	this.missileCategories = new Object();
	for (var i in missileLookup) {
		this.missileCategories[i] = true;
	}

	this.getOutcomeCategories = function() {
		var list = [];
		for (var i in this.outcomeCategories) {
			if (this.outcomeCategories[i]) {
				list.push(i);
			}
		}
		return list;
	}

	this.getMissileCategories = function() {
		var list = [];
		for (var i in this.missileCategories) {
			if (this.missileCategories[i]) {
				list.push(i);
			}
		}
		return list;
	}
};

//	-----------------------------------------------------------------------------
//	All the initialization stuff for THREE
function initScene() {

	//	-----------------------------------------------------------------------------
	//	Let's make a scene
	scene = new THREE.Scene();
	scene.matrixAutoUpdate = false;
	// scene.fog = new THREE.FogExp2( 0xBBBBBB, 0.00003 );

	scene2d = new THREE.Scene();

	scene.add( new THREE.AmbientLight( 0x505050 ) );

	rotating = new THREE.Object3D();
	scene.add(rotating);

	var outlinedMapTexture = new THREE.Texture( mapOutlineImage );
	outlinedMapTexture.needsUpdate = true;
	// outlinedMapTexture.magFilter = THREE.NearestFilter;
	// outlinedMapTexture.minFilter = THREE.NearestFilter;

	var mapMaterial = new THREE.MeshBasicMaterial({
		map: outlinedMapTexture,
		polygonOffset: true,
		polygonOffsetFactor: 1,
		polygonOffsetUnits: 1
	});


	//	-----------------------------------------------------------------------------
	sphere = new THREE.Mesh( new THREE.SphereBufferGeometry( 100, 40, 40 ), mapMaterial );
	sphere.doubleSided = false;
	sphere.rotation.x = Math.PI;
	sphere.rotation.y = -Math.PI/2;
	sphere.rotation.z = Math.PI;
	sphere.id = "base";
	rotating.add( sphere );

	var atmosphereMaterial = new THREE.ShaderMaterial({
		vertexShader: document.getElementById('vertexShaderAtmosphere').textContent,
		fragmentShader: document.getElementById('fragmentShaderAtmosphere').textContent,
		// atmosphere should provide light from behind the sphere, so only render the back side
		side: THREE.BackSide
	});

	var atmosphere = new THREE.Mesh(sphere.geometry.clone(), atmosphereMaterial);
	atmosphere.scale.x = atmosphere.scale.y = atmosphere.scale.z = 1.8;
	rotating.add(atmosphere);

	for( var i in timeBins ){
		var bin = timeBins[i].data;
		for( var s in bin ){
			var set = bin[s];

			var seriesPostfix = set.series ? ' [' + set.series + ']' : '';
			var testName = (set.date + ' ' + missileLookup[set.missile].name + seriesPostfix).toUpperCase();

			selectableTests.push( testName );
		}
	}

	console.log( selectableTests );

	// load geo data (facility lat lons in this case)
	console.time('loadGeoData');
	loadGeoData( latlonData );
	console.timeEnd('loadGeoData');

	console.time('buildDataVizGeometries');
	var vizilines = buildDataVizGeometries(timeBins);
	console.timeEnd('buildDataVizGeometries');

	visualizationMesh = new THREE.Object3D();
	rotating.add(visualizationMesh);

	var latestBin = timeBins[timeBins.length - 1];
	var selectedYear = latestBin.year;

	var latestTest = latestBin.data[latestBin.data.length - 1];
	var selectedTestName = latestTest.testName;

	selectionData = new Selection(selectedYear, selectedTestName);

	// - 신인환 주석  전체 레이어 관련
	selectVisualization(timeBins, selectedYear, [selectedTestName], Object.keys(outcomeLookup), Object.keys(missileLookup));


	//	-----------------------------------------------------------------------------
	//	Setup our renderer
	renderer = new THREE.WebGLRenderer({antialias:false});
	renderer.setPixelRatio(dpr);
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.autoClear = false;

	renderer.sortObjects = false;
	renderer.generateMipmaps = false;

	glContainer.appendChild( renderer.domElement );

//	document.addEventListener('testPassiveEventSupport', function() {}, options);
//	document.removeEventListener('testPassiveEventSupport', function() {}, options);

	//	-----------------------------------------------------------------------------
	//	Event listeners
//	document.addEventListener( 'mousemove', onDocumentMouseMove, true );
//	document.addEventListener( 'touchmove', onDocumentMouseMove, passive ? { capture: true, passive: false } : true );
//	document.addEventListener( 'windowResize', onDocumentResize, false );

	//masterContainer.addEventListener( 'mousedown', onDocumentMouseDown, true );
	//masterContainer.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, true );
//	document.addEventListener( 'touchstart', onDocumentMouseDown, passive ? { capture: true, passive: false } : true );
//	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
//	document.addEventListener( 'touchend', onDocumentMouseUp, false );
//	document.addEventListener( 'touchcancel', onDocumentMouseUp, false );

	var mc = new Hammer(document);
	mc.get('pinch').set({ enable: true });
	mc.get('pan').set({ threshold: 0, pointers: 3, direction: Hammer.DIRECTION_VERTICAL });
	mc.on('pinchstart pinchmove', onDocumentPinch);
	mc.on('panmove', onDocumentPan);

	masterContainer.addEventListener( 'click', onClick, true );
	masterContainer.addEventListener( 'mousewheel', onMouseWheel, false );
}


// - 신인환 주석 : 지도쪽 애니메이션 파트
function animate() {

	//	Disallow roll for now, this is interfering with keyboard input during search
/*
	if(keyboard.pressed('o') && keyboard.pressed('shift') == false)
		camera.rotation.z -= 0.08;
	if(keyboard.pressed('p') && keyboard.pressed('shift') == false)
		camera.rotation.z += 0.08;
*/

	if( rotateTargetX !== undefined && rotateTargetY !== undefined ){

		rotateVX += (rotateTargetX - rotateX) * 0.012;
		rotateVY += (rotateTargetY - rotateY) * 0.012;

		// var move = new THREE.Vector3( rotateVX, rotateVY, 0 );
		// var distance = move.length();
		// if( distance > .01 )
		// 	distance = .01;
		// move.normalize();
		// move.multiplyScalar( distance );

		// rotateVX = move.x;
		// rotateVy = move.y;

		if( Math.abs(rotateTargetX - rotateX) < 0.02 && Math.abs(rotateTargetY - rotateY) < 0.02 ){
			rotateTargetX = undefined;
			rotateTargetY = undefined;
		}
	}

	rotateX += rotateVX;
	rotateY += rotateVY;

	//rotateY = wrap( rotateY, -Math.PI, Math.PI );

	rotateVX *= 0.98;
	rotateVY *= 0.98;

	if(dragging || rotateTargetX !== undefined ){
		rotateVX *= 0.6;
		rotateVY *= 0.6;
	}

	//	constrain the pivot up/down to the poles
	//	force a bit of bounce back action when hitting the poles
	if(rotateX < -rotateXMax){
		rotateX = -rotateXMax;
		rotateVX *= -0.95;
	}
	if(rotateX > rotateXMax){
		rotateX = rotateXMax;
		rotateVX *= -0.95;
	}

	rotating.rotation.x = rotateX;
	rotating.rotation.y = rotateY;

	if (tiltTarget !== undefined) {
		tilt += (tiltTarget - tilt) * 0.012;
		camera.position.y = 300 * Math.sin(-tilt);
		camera.position.z = 100 + 300 * Math.cos(-tilt);
		camera.lookAt(new THREE.Vector3(0, 0, 100));

		if (Math.abs(tiltTarget - tilt) < 0.05) {
			tiltTarget = undefined;
		}
	}

	if (scaleTarget !== undefined) {
		camera.zoom *= Math.pow(scaleTarget / camera.zoom, 0.012);
		camera.updateProjectionMatrix();

		if (Math.abs(Math.log(scaleTarget / camera.zoom)) < 0.05) {
			scaleTarget = undefined;
		}
	}

	render();

	requestAnimationFrame( animate );


	rotating.traverse(function(mesh) {
		if (mesh.update !== undefined) {
			mesh.update();
		}
	});

	updateMarkers();
	render2d();
}

function render() {
	renderer.clear();
	renderer.render( scene, camera );
}

function render2d() {
	renderer.render( scene2d, camera2d );
}

function getHistoricalData() {
	var history = [];

	var outcomeCategories = selectionData.getOutcomeCategories();
	var missileCategories = selectionData.getMissileCategories();

	for( var i in timeBins ){
		var yearBin = timeBins[i].data;
		var value = {successes: 0, failures:0, unknowns:0};
		for( var s in yearBin ){
			var set = yearBin[s];
			var outcomeName = set.outcome;
			var missileName = set.missile;

			var relevantCategory = ( $.inArray(outcomeName, outcomeCategories ) >= 0 ) &&
								   ( $.inArray(missileName, missileCategories ) >= 0 );

			if( relevantCategory == false )
				continue;

			if( outcomeName === 'success' )
				value.successes++;
			else if( outcomeName === 'failure' )
				value.failures++;
			else
				value.unknowns++;
		}
		history.push(value);
	}
	// console.log(history);
	return history;
}
