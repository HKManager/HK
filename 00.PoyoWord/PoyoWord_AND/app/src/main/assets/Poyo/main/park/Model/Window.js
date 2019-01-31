var Window = {
	SIZES: [
		[320, 480],
		[640, 960],
		[960, 1440]
	],
	SELECTEDSIZE : 2,
	SCALE_WIDTH: function () {
		return this.SIZES[this.SELECTEDSIZE][0];
	},
    SCALE_HEIGHT: function () {
        return this.SIZES[this.SELECTEDSIZE][1];
    },
    SCALE: function () {
		return this.SIZES[this.SELECTEDSIZE][0] / this.SIZES[0][0];
	},
	REAL_WIDTH: function () {
		return this.SIZES[0][0];
	},
	REAL_HEIGHT: function () {
		return this.SIZES[0][1];
	}
}