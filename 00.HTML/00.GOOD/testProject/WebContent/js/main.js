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
	for( var i in timeBins ){
		var bin = timeBins[i].data;
		for( var s in bin ){
			var set = bin[s];

			var seriesPostfix = set.series ? ' [' + set.series + ']' : '';
			var testName = (set.date + ' ' + missileLookup[set.missile].name + seriesPostfix).toUpperCase();

			selectableTests.push( testName );
		}
	}

	console.time('buildDataVizGeometries');
	var vizilines = buildDataVizGeometries(timeBins);
	console.timeEnd('buildDataVizGeometries');
	
	var latestBin = timeBins[timeBins.length - 1];
	var selectedYear = latestBin.year;

	var latestTest = latestBin.data[latestBin.data.length - 1];
	var selectedTestName = latestTest.testName;

	selectionData = new Selection(selectedYear, selectedTestName);

	// - 신인환 주석  전체 레이어 관련
	selectVisualization(timeBins, selectedYear, [selectedTestName], Object.keys(outcomeLookup), Object.keys(missileLookup));
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
