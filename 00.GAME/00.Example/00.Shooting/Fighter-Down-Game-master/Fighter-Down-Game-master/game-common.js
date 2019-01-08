
function load_image(url, callback) {
	var image = new Image();
	image.addEventListener('load', callback.bind(undefined, image));
	image.addEventListener('error', function (e) {
		console.log("error loading image:", image, e);
	});
	// image.onload = callback.bind(undefined, image);
	image.src = url;
}
function load_audio(url, callback) {
	var audio = new Audio();
	// audio.addEventListener('canplaythrough', callback.bind(undefined, audio));
	var loaded = false;
	audio.addEventListener('canplaythrough', function () {
		if (!loaded) {
			loaded = true;
			callback(audio);
		}
	});
	audio.addEventListener('error', function (e) {
		console.log("error loading audio:", audio, e);
	});
	audio.preload = "auto";
	audio.src = url;
	audio.load();
	// audio.play();
}

function load_all_images(images, callback) {
	var keys = Object.keys(images);
	var count_loaded = 0;
	for (var i = 0; i < keys.length; i++) {
		load_image(images[keys[i]], (function (key, image) {
			images[key] = image;

			count_loaded++;
			if (count_loaded === keys.length)
				callback();
		}).bind(undefined, keys[i]));
	}
}

function load_all_assets(assets, callback) {
	var images = assets.images;
	var audio = assets.audio;

	var loaded_assets = {
		images: {},
		audio: {},
	};
	var count_loaded = 0;
	var count_expected = 0;
	if (images) {
		count_expected += Object.keys(images).length;
	}
	if (audio) {
		count_expected += Object.keys(audio).length;
	}

	if (images) {
		var keys = Object.keys(images);
		for (var i = 0; i < keys.length; i++) {
			load_image(images[keys[i]], (function (key, image) {
				// console.log("loaded image:", image);
				loaded_assets.images[key] = image;

				count_loaded++;
				if (count_loaded >= count_expected)
					callback(loaded_assets);
			}).bind(undefined, keys[i]));
		}
	}
	if (audio) {
		var keys = Object.keys(audio);
		for (var i = 0; i < keys.length; i++) {
			load_audio(audio[keys[i]], (function (key, audio_data) {
				// console.log("loaded audio:", audio_data);
				loaded_assets.audio[key] = audio_data;

				count_loaded++;
				if (count_loaded >= count_expected)
					callback(loaded_assets);
			}).bind(undefined, keys[i]));
		}
	}
}

function point_offset(angle, dist) {
	return { px: dist * Math.cos(Math.PI * angle / 180), py: dist * Math.sin(Math.PI * angle / 180), };
}

function point_dist(px, py) {
	return (px ** 2 + py ** 2) ** 0.5;
}

function points_dist(p1, p2) {
	return ((p1.px - p2.px) ** 2 + (p1.py - p2.py) ** 2) ** 0.5;
}

function point_normal(px, py) {
	var dist = (px ** 2 + py ** 2) ** 0.5;
	if (dist === 0)
		return { px: 0, py: 0 };
	return { px: px / dist, py: py / dist, };
}

function d2_point_offset(angle, px, py) {
	return {
		px: px * Math.cos(Math.PI * angle / 180) - py * Math.sin(Math.PI * angle / 180),
		py: py * Math.cos(Math.PI * angle / 180) + px * Math.sin(Math.PI * angle / 180),
	};
}

function point_angle(fromx, fromy, tox, toy) {
	var dx = tox - fromx;
	var dy = toy - fromy;
	var angle = Math.atan2(dy, dx);
	// console.log("angle: ", angle / Math.PI * 180);
	return angle / Math.PI * 180;
}

function points_angle(from, to) {
	var angle = Math.atan2(to.py - from.py, to.px - from.px);
	// console.log("angle: ", angle / Math.PI * 180);
	return angle / Math.PI * 180;
}

function point_rotate_90(p) {
	return { px: -p.py, py: p.px };
}

function point_rotate_180(p) {
	return { px: -p.px, py: -p.py };
}

function point_rotate_270(p) {
	return { px: p.py, py: -p.px };
}


function angle_diff(a, b) {
	var diff = a - b;
	while (diff > 180) {
		diff -= 360;
	}
	while (diff < -180) {
		diff += 360;
	}

	return diff;
}

var image_lib = {

	// renders a canvas with the given image textured by the texture
	image_render_textured: function (image, texture, offsetx, offsety, alpha) {
		var buffer_canvas = document.createElement('canvas');
		buffer_canvas.width = image.width;
		buffer_canvas.height = image.height;
		var buffer_context = buffer_canvas.getContext('2d');
		buffer_context.imageSmoothingEnabled = false;

		if (offsetx === 0 && offsety === 0) {
			buffer_context.drawImage(texture, 0, 0, image.width, image.height);
			
		} else {
			buffer_context.drawImage(texture, offsetx, offsety, image.width, image.height);
			buffer_context.drawImage(texture, offsetx - image.width, offsety, image.width, image.height);
			buffer_context.drawImage(texture, offsetx, offsety - image.height, image.width, image.height);
			buffer_context.drawImage(texture, offsetx - image.width, offsety - image.height, image.width, image.height);
		}

		buffer_context.globalCompositeOperation = "destination-in";
		buffer_context.drawImage(image, 0,0);
		buffer_context.globalCompositeOperation = "source-over";
		buffer_context.globalAlpha = alpha;
		buffer_context.drawImage(image, 0,0);
		return buffer_canvas;
	},

	// converts all pixel colors in the image to the given fill style
	image_colorize: function  (image, fill_style) {
		var buffer_canvas = document.createElement('canvas');
		buffer_canvas.width = image.width;
		buffer_canvas.height = image.height;
		var buffer_context = buffer_canvas.getContext('2d');
		buffer_context.imageSmoothingEnabled = false;

		buffer_context.fillStyle = fill_style;
		buffer_context.fillRect(0,0, buffer_canvas.width, buffer_canvas.height);

		buffer_context.globalCompositeOperation = "destination-atop";
		buffer_context.drawImage(image, 0, 0);

		return buffer_canvas;
	},

	// adds an outline to the image
	image_outline: function (image, outline_style) {
		var buffer_canvas = document.createElement('canvas');
		buffer_canvas.width = image.width + 2;
		buffer_canvas.height = image.height + 2;
		var buffer_context = buffer_canvas.getContext('2d');
		buffer_context.imageSmoothingEnabled = false;

		var colored_image = image_lib.image_colorize(image, outline_style);

		buffer_context.translate(1, 1);
		buffer_context.drawImage(colored_image, -1, 0, image.width, image.height);
		buffer_context.drawImage(colored_image, 0, -1, image.width, image.height);
		buffer_context.drawImage(colored_image, 1, 0, image.width, image.height);
		buffer_context.drawImage(colored_image, 0, 1, image.width, image.height);

		return buffer_canvas;
	},

	// draws the top_image atop the bottom_image
	image_composite: function (bottom_image, top_image) {
		var buffer_canvas = document.createElement('canvas');
		buffer_canvas.width = bottom_image.width;
		buffer_canvas.height = bottom_image.height;
		var buffer_context = buffer_canvas.getContext('2d');
		buffer_context.imageSmoothingEnabled = false;

		buffer_context.drawImage(bottom_image, 0, 0, bottom_image.width, bottom_image.height);
		buffer_context.drawImage(top_image, bottom_image.width / 2 - top_image.width / 2, bottom_image.height / 2 - top_image.height / 2,
				top_image.width, top_image.height);

		return buffer_canvas;
	},

	// chops the image
	image_chop: function (image, offsetx, offsety, width, height, full_width, full_height) {
		var buffer_canvas = document.createElement('canvas');
		buffer_canvas.width = width;
		buffer_canvas.height = height;
		var buffer_context = buffer_canvas.getContext('2d');
		buffer_context.imageSmoothingEnabled = false;

		buffer_context.translate(-offsetx, -offsety);
		buffer_context.drawImage(image, 0, 0, full_width, full_height);

		return buffer_canvas;
	},

	// masks the image
	image_mask: function (image, mask, mask_frame, mask_max_frame) {
		mask_frame = mask_frame || 0;
		mask_max_frame = mask_max_frame || 1;

		var buffer_canvas = document.createElement('canvas');
		buffer_canvas.width = image.width;
		buffer_canvas.height = image.height;
		var buffer_context = buffer_canvas.getContext('2d');
		buffer_context.imageSmoothingEnabled = false;

		buffer_context.drawImage(image, 0, 0, image.width, image.height);
		buffer_context.globalCompositeOperation = 'destination-in';
		buffer_context.drawImage(mask,
			mask_frame * (mask.width / mask_max_frame), 0, mask.width / mask_max_frame, mask.height,
			0, 0, image.width, image.height);

		return buffer_canvas;
	},


	// flip an image across the y-axis
	image_flip_horizontal: function (image) {
		var buffer_canvas = document.createElement('canvas');
		buffer_canvas.width = image.width;
		buffer_canvas.height = image.height;
		var buffer_context = buffer_canvas.getContext('2d');
		buffer_context.imageSmoothingEnabled = false;

		buffer_context.translate(image.width, 0);
		buffer_context.scale(-1, 1);
		buffer_context.drawImage(image, 0, 0);

		return buffer_canvas;
	},

	// flip an image across the x-axis
	image_flip_vertical: function (image) {
		var buffer_canvas = document.createElement('canvas');
		buffer_canvas.width = image.width;
		buffer_canvas.height = image.height;
		var buffer_context = buffer_canvas.getContext('2d');
		buffer_context.imageSmoothingEnabled = false;

		buffer_context.translate(image.width, 0);
		buffer_context.scale(1, -1);
		buffer_context.drawImage(image, 0, 0);

		return buffer_canvas;
	},
};


function GameSystem(canvas, assets) {
	this.canvas = canvas;
	canvas.game_system = this;
	this.images = assets.images;
	this.audio = assets.audio;

	this.entities = [];
	this.entities_to_add = [];
	this.entities_to_remove = [];

	this.game_systems = {};
	this.particle_systems = {};

	this.background_color = '#000';

	// edittable global flag which enables/disables updating all basic entities and particle systems
	// game systems are still updated
	this.update_entities = true;

	this.debug_time = { game_update_time: 0, game_draw_time: 0, game_entity_draw_time: {}, };
	this.debug_time_timer = 0;

	this.previous_keystate = {};
	this.keystate = {
		W: false,
		A: false,
		S: false,
		D: false,
		shift: false,
		ctrl: false,
		alt: false,
		
		space: false,
		left: false,
		up: false,
		right: false,
		down: false,
	};
	this.previous_mouse1_state = false;
	this.mouse1_state = false;
	this.mouse_position = { px: 0, py: 0 };

	document.addEventListener('keydown', (function (e) {
		e = e || window.event;
		if (!this.keystate.ctrl)
			e.preventDefault();
		var charcode = String.fromCharCode(e.keyCode);
		if (e.keyCode === 37)
			this.keystate.left = true;
		else if (e.keyCode === 38)
			this.keystate.up = true;
		else if (e.keyCode === 39)
			this.keystate.right = true;
		else if (e.keyCode === 40)
			this.keystate.down = true;
		else if (charcode === ' ')
			this.keystate.space = true;
		else
			this.keystate[charcode] = true;
		this.keystate.shift = !!e.shiftKey;
		this.keystate.ctrl = !!e.ctrlKey;
		this.keystate.alt = !!e.altKey;
		// console.log('keydown: ', e.keyCode, charcode);
	}).bind(this));

	document.addEventListener('keyup', (function (e) {
		e = e || window.event;
		if (!this.keystate.ctrl)
			e.preventDefault();
		var charcode = String.fromCharCode(e.keyCode);
		if (e.keyCode === 37)
			this.keystate.left = false;
		else if (e.keyCode === 38)
			this.keystate.up = false;
		else if (e.keyCode === 39)
			this.keystate.right = false;
		else if (e.keyCode === 40)
			this.keystate.down = false;
		else if (charcode === ' ')
			this.keystate.space = false;
		else
			this.keystate[charcode] = false;
		this.keystate.shift = !!e.shiftKey;
		this.keystate.ctrl = !!e.ctrlKey;
		this.keystate.alt = !!e.altKey;
		// console.log('keyup: ', charcode);
	}).bind(this));

	var self = this;
	this.canvas.addEventListener('mousedown', function (e) {
		var x = e.x - this.getBoundingClientRect().left;
		var y = e.y - this.getBoundingClientRect().top;
		self.mouse_position = { px: x, py: y };
		self.mouse1_state = true;
		// console.log("mousedown: ", x, y);
	});
	this.canvas.addEventListener('mouseup', function (e) {
		var x = e.x - this.getBoundingClientRect().left;
		var y = e.y - this.getBoundingClientRect().top;
		self.mouse_position = { px: x, py: y };
		self.mouse1_state = false;
		// console.log("mouseup: ", x, y);
	});
	this.canvas.addEventListener('mousemove', function (e) {
		var x = e.x - this.getBoundingClientRect().left;
		var y = e.y - this.getBoundingClientRect().top;
		self.mouse_position = { px: x, py: y };
		// console.log("mousemove: ", x, y);
	});
}
GameSystem.prototype.step_game_frame = function(ctx) {
	var self = this;
	// console.log('step');

	this.debug_time_timer++;
	if (this.debug_time_timer >= 120) {
		this.debug_time_timer = 0;
		// Object.keys(this.debug_time.game_entity_draw_time).forEach(function (k) { self.debug_time.game_entity_draw_time[k] /= 120; });
		// console.log("draw time by: ", this.debug_time.game_entity_draw_time); // DEBUG_TIME
		// console.log("frame time; update:", this.debug_time.game_update_time / 120, "draw:", this.debug_time.game_draw_time / 120); // DEBUG_TIME
		this.debug_time.game_update_time = 0;
		this.debug_time.game_draw_time = 0;
		this.debug_time.game_entity_draw_time = {};
	}

	// var start = new Date().getTime(); // DEBUG_TIME
	this.update();
	// this.debug_time.game_update_time += new Date().getTime() - start; // DEBUG_TIME
	
	// start = new Date().getTime(); // DEBUG_TIME
	this.draw(ctx);
	// this.debug_time.game_draw_time += new Date().getTime() - start; // DEBUG_TIME
};
GameSystem.prototype.update = function () {
	this.context_container = undefined;

	// update all additions and removals to the entity list
	for (var i = 0; i < this.entities_to_remove.length; i++) {
		var index = this.entities.indexOf(this.entities_to_remove[i]);
		if (index >= 0)
			this.entities.splice(index, 1);
	}
	this.entities_to_remove = [];

	for (var i = 0; i < this.entities_to_add.length; i++)
		this.entities.push(this.entities_to_add[i]);
	this.entities_to_add = [];

	// update all entities
	if (this.update_entities) {
		try {
			for (var i = 0; i < this.entities.length; i++) {
				this.context_container = this.entities[i];
				this.entities[i].update(this);
			}
		} catch (e) {
			console.error('exception during update:', e.message);
			console.error('exception stack:', e.stack);
		}
	}

	// update all game systems
	var keys = Object.keys(this.game_systems);
	for (var i = 0; i < keys.length; i++) {
		this.context_container = this.game_systems[keys[i]];
		this.game_systems[keys[i]].update(this);
	}

	this.context_container = undefined;

	// update particle systems
	if (this.update_entities) {
		var keys = Object.keys(this.particle_systems);
		for (var i = 0; i < keys.length; i++) {
			this.particle_systems[keys[i]].update(this);
		}
	}

	// refresh key and mouse states
	this.previous_keystate = this.keystate;
	this.keystate = Object.assign({}, this.keystate);
	this.previous_mouse1_state = this.mouse1_state;
};
GameSystem.prototype.draw = function (ctx) {
	ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

	ctx.fillStyle = this.background_color;
	ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

	var entities_to_draw = this.entities.slice();
	var game_systems_to_draw = Object.values(this.game_systems);
	var particle_systems_to_draw = Object.values(this.particle_systems);
	entities_to_draw.sort(function (a, b) {
		return a.z_index - b.z_index;
	});
	game_systems_to_draw.sort(function (a, b) {
		return a.z_index - b.z_index;
	});

	for (var i = 0; i < game_systems_to_draw.length; i++) {
		if (game_systems_to_draw[i].z_index < 0) {
			// var start = new Date().getTime(); // DEBUG_TIME
			game_systems_to_draw[i].draw(ctx);
			// this.debug_time.game_entity_draw_time[game_systems_to_draw[i].class_name] = // DEBUG_TIME
				// (this.debug_time.game_entity_draw_time[game_systems_to_draw[i].class_name] || 0) + new Date().getTime() - start; // DEBUG_TIME
		}
	}

	for (var i = 0; i < particle_systems_to_draw.length; i++) {
		if (particle_systems_to_draw[i].z_index < 0) {
			// var start = new Date().getTime(); // DEBUG_TIME
			particle_systems_to_draw[i].draw(ctx);
			// this.debug_time.game_entity_draw_time[particle_systems_to_draw[i].class_name] = // DEBUG_TIME
				// (this.debug_time.game_entity_draw_time[particle_systems_to_draw[i].class_name] || 0) + new Date().getTime() - start; // DEBUG_TIME
		}
	}

	for (var i = 0; i < entities_to_draw.length; i++) {
		// var start = new Date().getTime(); // DEBUG_TIME
		entities_to_draw[i].draw(ctx);
		// this.debug_time.game_entity_draw_time[entities_to_draw[i].class_name] = // DEBUG_TIME
			// (this.debug_time.game_entity_draw_time[entities_to_draw[i].class_name] || 0) + new Date().getTime() - start; // DEBUG_TIME
	}

	for (var i = 0; i < particle_systems_to_draw.length; i++) {
		if (particle_systems_to_draw[i].z_index >= 0) {
			// var start = new Date().getTime(); // DEBUG_TIME
			particle_systems_to_draw[i].draw(ctx);
			// this.debug_time.game_entity_draw_time[particle_systems_to_draw[i].class_name] = // DEBUG_TIME
				// (this.debug_time.game_entity_draw_time[particle_systems_to_draw[i].class_name] || 0) + new Date().getTime() - start; // DEBUG_TIME
		}
	}

	// var keys = Object.keys(this.particle_systems);
	// for (var i = 0; i < keys.length; i++) {
	// 	// var start = new Date().getTime(); // DEBUG_TIME
	// 	this.particle_systems[keys[i]].draw(ctx);
	// 	// this.debug_time.game_entity_draw_time[this.particle_systems[keys[i]].class_name] = // DEBUG_TIME
	// 		// (this.debug_time.game_entity_draw_time[this.particle_systems[keys[i]].class_name] || 0) + new Date().getTime() - start; // DEBUG_TIME
	// }

	for (var i = 0; i < game_systems_to_draw.length; i++) {
		if (game_systems_to_draw[i].z_index >= 0) {
			// var start = new Date().getTime(); // DEBUG_TIME
			game_systems_to_draw[i].draw(ctx);
			// this.debug_time.game_entity_draw_time[game_systems_to_draw[i].class_name] = // DEBUG_TIME
				// (this.debug_time.game_entity_draw_time[game_systems_to_draw[i].class_name] || 0) + new Date().getTime() - start; // DEBUG_TIME
		}
	}

	for (var i = 0; i < this.entities.length; i++) {
		this.entities[i].draw_ui(ctx);
	}
};

GameSystem.prototype.add_entity = function(ent) {
	ent.parent = this;
	this.entities_to_add.push(ent);
};

GameSystem.prototype.remove_entity = function(ent) {
	if (this.entities.indexOf(ent) !== -1) {
		this.entities_to_remove.push(ent);
	} else if (this.context_container !== undefined) {
		this.context_container.remove_entity(ent);
	}
};

GameSystem.prototype.query_entities = function(type) {
	var found = [];
	for (var i = 0; i < this.entities.length; i++) {
		if (this.entities[i] instanceof type) {
			found.push(this.entities[i]);
		}
	}

	return found;
};

GameSystem.prototype.query_entities_by_tag = function(type, tag_type) {
	var found = [];
	for (var i = 0; i < this.entities.length; i++) {
		if (this.entities[i] instanceof type) {
			if (this.entities[i].get_tag(tag_type) !== undefined) {
				found.push(this.entities[i]);
			}
		}
	}

	return found;
};

GameSystem.prototype.find_near = function(me, type, dist) {
	var found = [];
	for (var i = 0; i < this.entities.length; i++) {
		var ent = this.entities[i];
		if (ent instanceof type) {
			if (Math.abs(ent.px - me.px) < dist && Math.abs(ent.py - me.py) < dist &&
				Math.pow(Math.pow(ent.px - me.px, 2) + Math.pow(ent.py - me.py, 2), 0.5) < dist) {
				found.push(ent);
			}
		}
	}

	return found;
};

GameSystem.prototype.find_colliding_rectangular = function(me, type) {
	var found = [];
	for (var i = 0; i < this.entities.length; i++) {
		var ent = this.entities[i];
		if (ent instanceof type) {
			if (Math.abs(ent.px - me.px) < (ent.width + me.width) / 2 && Math.abs(ent.py - me.py) < (ent.height + me.height) / 2) {
				found.push(ent);
			}
		}
	}

	return found;
};

GameSystem.prototype.find_colliding_circular = function(me, type, dist) {
	var found = [];
	for (var i = 0; i < this.entities.length; i++) {
		var ent = this.entities[i];
		if (ent instanceof type) {
			var hit_radius = dist + ent.collision_radius;
			if (Math.abs(ent.px - me.px) < hit_radius && Math.abs(ent.py - me.py) < hit_radius &&
				Math.pow(Math.pow(ent.px - me.px, 2) + Math.pow(ent.py - me.py, 2), 0.5) < hit_radius) {
				found.push(ent);
			}
		}
	}

	return found;
};

GameSystem.prototype.find_colliding_circular_nested = function(me, group_type, type, dist) {
	var found = [];
	for (var i = 0; i < this.entities.length; i++) {
		var ent = this.entities[i];
		if (ent instanceof group_type) {
			for (var k = 0; k < ent.sub_entities.length; k++) {
				var ent_sub = ent.sub_entities[k];
				var offset = d2_point_offset(ent.angle, ent_sub.px, ent_sub.py);

				var hit_radius = dist + ent_sub.collision_radius;
				var p = { px: ent.px + offset.px, py: ent.py + offset.py };
				if (Math.abs(p.px - me.px) < hit_radius && Math.abs(p.py - me.py) < hit_radius &&
					Math.pow(Math.pow(p.px - me.px, 2) + Math.pow(p.py - me.py, 2), 0.5) < hit_radius) {
					found.push(ent_sub);
				}
			}
		}
	}

	return found;
};


function Entity(game) {
	this.sub_entities = [];
	this.ui_entities = [];
	this.entity_tags = [];
	this.visible = true;
}
Entity.prototype.class_name = 'Entity';
Entity.prototype.z_index = 0;
Entity.prototype.update = function(game) {
	for (var i = this.sub_entities.length - 1; i >= 0; i--) {
		this.sub_entities[i].update(game);
	}
	for (var i = this.ui_entities.length - 1; i >= 0; i--) {
		this.ui_entities[i].update(game);
	}
	for (var i = this.entity_tags.length - 1; i >= 0; i--) {
		if (this.entity_tags[i].timer !== undefined) {
			this.entity_tags[i].timer--;
			if (this.entity_tags[i].timer <= 0) {
				this.entity_tags.splice(i, 1);
			}
		}
	}
};
Entity.prototype.draw = function(ctx) {
	if (this.visible) {
		for (var i = 0; i < this.sub_entities.length; i++) {
			this.sub_entities[i].draw(ctx);
		}
	}
};
Entity.prototype.draw_ui = function(ctx) {
	if (this.visible) {
		for (var i = 0; i < this.ui_entities.length; i++) {
			this.ui_entities[i].draw(ctx);
		}
	}
};
Entity.prototype.get_tag = function(type) {
	for (var i = 0; i < this.entity_tags.length; i++) {
		if (this.entity_tags[i] instanceof type) {
			return this.entity_tags[i];
		}
	}
	return undefined;
};
Entity.prototype.add_tag = function(tag) {
	if (tag.exclusive) {
		// if tag requires exclusivity with itself, check for an existing tag of the same class
		var existing = this.get_tag(tag.constructor);
		if (existing) {
			if (tag.exclusive === 'reset') {
				existing.timer = tag.timer;
			} else if (tag.exclusive === 'stack') {
				existing.timer += tag.timer;
			}
			// else leave the existing tag in place
			return existing;
		} else {
			this.entity_tags.push(tag);
		}
	} else {
		this.entity_tags.push(tag);
	}
	return tag;
};
Entity.prototype.remove_tag = function(tag) {
	var index = this.entity_tags.indexOf(tag);
	if (index !== -1) {
		this.entity_tags.splice(index, 1);
	}
};
Entity.prototype.add_entity = function(ent) {
	ent.parent = this;
	this.sub_entities.push(ent);
};
Entity.prototype.remove_entity = function(ent) {
	var index = this.sub_entities.indexOf(ent);
	if (index !== -1) {
		this.sub_entities.splice(index, 1);
	}
};

function ScreenEntity(game, px, py, width, height, image) {
	Entity.call(this, game);
	this.px = px;
	this.py = py;
	this.angle = 0;
	this.frame = 0;
	this.max_frame = 1;
	this.width = width;
	this.height = height;
	this.image = image;

	this.rotation = 0;
	this.alpha = 1;
	this.angle_granularity = 15;
}
ScreenEntity.prototype = Object.create(Entity.prototype);
ScreenEntity.prototype.constructor = ScreenEntity;
ScreenEntity.prototype.class_name = 'ScreenEntity';
ScreenEntity.prototype.update = function(game) {
	Entity.prototype.update.call(this, game);
	if (this.rotation) {
		this.angle += this.rotation;
		this.angle %= 360;
	}
};
ScreenEntity.prototype.draw = function(ctx) {
	// ctx.drawImage(this.image, this.px - this.width / 2, this.py - this.height / 2, this.width, this.height);
	if (this.visible) {
		ctx.save();

		ctx.globalAlpha = this.alpha;

		ctx.translate(this.px, this.py);
		ctx.rotate(Math.PI * (Math.floor(this.angle / this.angle_granularity) * this.angle_granularity) / 180);

		for (var i = 0; i < this.sub_entities.length; i++) {
			if (this.sub_entities[i].z_index < this.z_index)
				this.sub_entities[i].draw(ctx);
		}

		if (this.image) {
			ctx.drawImage(this.image,
				this.frame * (this.image.width / this.max_frame), 0, this.image.width / this.max_frame, this.image.height,
				0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
		}

		for (var i = 0; i < this.sub_entities.length; i++) {
			if (this.sub_entities[i].z_index >= this.z_index)
				this.sub_entities[i].draw(ctx);
		}

		ctx.restore();
	}
};
ScreenEntity.prototype.draw_ui = function(ctx) {
	if (this.visible) {
		ctx.save();
		ctx.translate(this.px, this.py);
		for (var i = 0; i < this.ui_entities.length; i++) {
			this.ui_entities[i].draw(ctx);
		}
		ctx.restore();
	}
};



function ParticleEffectSystem(game, config) {
	ScreenEntity.call(this, game);
	this.fill_style = config.fill_style;
	this.particle_image = config.particle_image || game.images.particle_effect_generic;
	this.composite_operation = config.composite_operation || 'source-over';

	this.particles = [];

	this.width = 8;
	this.height = 8;
	// this.frame_width = 8;
	// this.max_frame = config.max_frame || (this.width / this.frame_width);
	this.max_frame = config.max_frame || (this.particle_image.width / this.width);
	this.frame_step = config.frame_step || 0;

	this.particle_windx = config.particle_windx || 0;
	this.particle_windy = config.particle_windy || 0;

	this.particle_width = config.particle_width || config.particle_size || 16;
	this.particle_height = config.particle_height || config.particle_size || 16;

	this.particle_deflate = config.particle_deflate;
	this.particle_longevity = config.particle_longevity || 0.05;
	this.particle_respawn = config.particle_respawn || 0;
	this.particle_base_timer = config.particle_base_timer || 4;
	this.particle_max_timer = config.particle_max_timer || 0;

	this.dynamic_images = config.dynamic_images;
	this.static_images = config.static_images;
	this.masked_images = config.masked_images;
	this.chopped_images = config.chopped_images;

	if (this.fill_style !== undefined)
		this.particle_image = this.render();
}
ParticleEffectSystem.prototype = Object.create(ScreenEntity.prototype);
ParticleEffectSystem.prototype.constructor = ParticleEffectSystem;
ParticleEffectSystem.prototype.class_name = 'ParticleEffectSystem';
ParticleEffectSystem.prototype.render = function() {
	var buffer_canvas = document.createElement('canvas');
	buffer_canvas.width = this.particle_image.width;
	buffer_canvas.height = this.particle_image.height;
	var buffer_context = buffer_canvas.getContext('2d');
	buffer_context.imageSmoothingEnabled = false;

	buffer_context.fillStyle = this.fill_style;
	buffer_context.fillRect(0,0, buffer_canvas.width, buffer_canvas.height);

	buffer_context.globalCompositeOperation = "destination-atop";
	buffer_context.drawImage(this.particle_image, 0,0);
	return buffer_canvas;
};
ParticleEffectSystem.prototype.add_particle = function(px, py, speed, frame, angle) {
	var sx = ((Math.random() - 0.5) * speed) ** 2 - ((Math.random() - 0.5) * speed) ** 2;
	var sy = ((Math.random() - 0.5) * speed) ** 2 - ((Math.random() - 0.5) * speed) ** 2;

	if (angle === undefined)
		angle = Math.random() * 360;
	if (frame === undefined) {
		if (this.static_images) {
			frame = Math.floor(Math.random() * this.max_frame);
		} else {
			frame = 0;
		}
	}

	var particle = {
		px: px,
		py: py,
		sx: sx,
		sy: sy,
		sr: Math.random() - 0.5,
		angle: angle,
		frame: frame,
		timer: this.particle_base_timer,
		// timer: this.particle_base_timer + Math.floor(Math.random() * (this.particle_max_timer - this.particle_base_timer + 1)),
	};
	this.particles.push(particle);

	return particle;
};
ParticleEffectSystem.prototype.add_image_particle = function(image, width, height, px, py, speed, angle) {
	var sx = ((Math.random() - 0.5) * speed) ** 2 - ((Math.random() - 0.5) * speed) ** 2;
	var sy = ((Math.random() - 0.5) * speed) ** 2 - ((Math.random() - 0.5) * speed) ** 2;

	var particle_width = width;
	var particle_height = height;


	if (this.chopped_images) {
		var sourcex = image.width * (Math.random() * 1);
		var sourcey = image.height * (Math.random() * 1);
		var chopped_width = width * (Math.random() * 0.25 + 0.25);
		var chopped_height = height * (Math.random() * 0.25 + 0.25);

		image = image_lib.image_chop(image, sourcex, sourcey, chopped_width, chopped_height, width, height);
		particle_width = chopped_width;
		particle_height = chopped_height;
	}
	if (this.masked_images) {
		image = image_lib.image_mask(image, this.particle_image, Math.floor(Math.random() * this.max_frame), this.max_frame);
		image = image_lib.image_composite(image_lib.image_outline(image, '#000'), image);
	}

	// var offsetx = Math.random() * width - width / 2;
	// var offsety = Math.random() * height - height / 2;

	var particle = {
		image: image,
		width: particle_width,
		height: particle_height,
		px: px,
		py: py,
		sx: sx,
		sy: sy,
		sr: Math.random() - 0.5,
		angle: Math.random() * 360,
		timer: this.particle_base_timer,
	};
	this.particles.push(particle);
	return particle;
};
ParticleEffectSystem.prototype.update = function(game) {
	for (var i = this.particles.length - 1; i >= 0; i--) {
		this.particles[i].sx += this.particle_windx;
		this.particles[i].sy += this.particle_windy;
		this.particles[i].px += this.particles[i].sx;
		this.particles[i].py += this.particles[i].sy;
		this.particles[i].angle += this.particles[i].sr;
		if (this.frame_step)
			this.particles[i].frame = (this.particles[i].frame + this.frame_step) % this.max_frame;

		if (Math.random() < this.particle_longevity) {
			if (this.static_images || this.dynamic_images) {
				this.particles[i].timer--;
				if (this.particles[i].timer <= 0) {
					if (Math.random() < this.particle_respawn) {
						this.particles[i].timer = 4;
					} else {
						this.particles.splice(i, 1);
					}
				}
			} else {
				this.particles[i].frame++;
				if (this.particles[i].frame >= this.max_frame) {
					if (Math.random() < this.particle_respawn) {
						this.particles[i].frame = 0;
					} else {
						this.particles.splice(i, 1);
					}
				}
			}
		}
	}
};
ParticleEffectSystem.prototype.draw = function(ctx) {
	if (this.visible) {
		// console.log("drawing ", this.particles.length, "particles");
		for (var i = 0; i < this.particles.length; i++) {
			var p = this.particles[i];
			ctx.save();

			ctx.globalCompositeOperation = this.composite_operation;
			ctx.translate(p.px, p.py);
			ctx.rotate(Math.PI * (Math.floor(p.angle / 15) * 15) / 180);
			var width = this.particle_width;
			var height = this.particle_height;
			if (this.particle_deflate) {
				// console.log("debug", this.particle_deflate);
				var multiplier = (this.max_frame * this.particle_deflate - p.frame) / this.max_frame;
				width *= multiplier;
				height *= multiplier;
			}
			// var width = this.particle_width * ((6 - p.frame) / 4);
			// var height = this.particle_height * ((6 - p.frame) / 4);
			// if (this.masked_images) {
			// 	ctx.drawImage(p.image, 0 - p.image.width / 2, 0 - p.image.height / 2, p.image.width, p.image.height);
			// } else
			if (this.dynamic_images) {
				ctx.drawImage(p.image, 
					// p.sourcex, p.sourcey, p.width, p.height,
					// this.width * p.frame, 0, this.width, this.height,
					0 - p.width / 2, 0 - p.height / 2, p.width, p.height);
			// } else if (this.static_images) {
			// 	ctx.drawImage(this.particle_image, 
			// 		this.width * p.frame, 0, this.width, this.height,
			// 		0 - width / 2, 0 - height / 2, width, height);
			// } else if (this.fill_style !== undefined) {
			// 	ctx.drawImage(this.buffer_canvas, 
			// 		this.width * p.frame, 0, this.width, this.height,
			// 		0 - width / 2, 0 - height / 2, width, height);
			} else {
				ctx.drawImage(this.particle_image, 
					this.width * p.frame, 0, this.width, this.height,
					0 - width / 2, 0 - height / 2, width, height);
			}

			ctx.restore();
		}
	}
};








function PathEntity(game, px, py, width, height, image, path) {
	ScreenEntity.call(this, game, px, py, width, height, image);

	// console.log('debug path: ', path);
	this.loop_path = false;

	this.path = path;
	this.path_index = 0;
	this.current_action = undefined;
}
PathEntity.prototype = Object.create(ScreenEntity.prototype);
PathEntity.prototype.constructor = PathEntity;
PathEntity.prototype.class_name = 'PathEntity';
PathEntity.prototype.trigger_path_action = function(game, action) {
	if (action.delete !== undefined) {
		game.entities_to_remove.push(this);
	}

	if (action.px !== undefined) {
		if (action.timeout !== undefined) {
			action.sx = (action.px - this.px) / action.timeout;
			action.sy = (action.py - this.py) / action.timeout;
			this.timer = action.timeout;
		} else {
			var dist = ((action.px - this.px) ** 2 + (action.py - this.py) ** 2) ** 0.5;
			var normalx = (action.px - this.px) / dist;
			var normaly = (action.py - this.py) / dist;
			action.sx = normalx * action.speed;
			action.sy = normaly * action.speed;
			this.timer = dist / action.speed;
		}
	} else {
		if (action.angle !== undefined) {
			this.angle = action.angle;
			if (action.speed !== undefined) {
				action.sx = Math.cos(action.angle / 180 * Math.PI) * action.speed;
				action.sy = Math.sin(action.angle / 180 * Math.PI) * action.speed;
			}
		}

		if (action.timeout !== undefined) {
			this.timer = action.timeout;
		} else {
			this.timer = undefined;
		}
	}

	if (action.repeat !== undefined) {
		if (this.action_repeat === undefined || this.action_repeat <= 0) {
			this.action_repeat = action.repeat;
		}
	} else {
		this.action_repeat = undefined;
	}


	if (action.sx === undefined)
		action.sx = 0;
	if (action.sy === undefined)
		action.sy = 0;



	if (action.spawn) {
		for (var i = 0; i < action.spawn.length; i++) {
			// console.log("debug path: ", action.spawn[i].path);
			var bullet = new EnemyBullet(game, this.px, this.py, action.spawn[i].path, action.spawn[i].image);
			bullet.angle = this.angle;
			game.entities_to_add.push(bullet);
		}
	}

	if (action.spawn_entity) {
		// console.log('debug');
		for (var i = 0; i < action.spawn_entity.length; i++) {
			// console.log("debug path: ", action.spawn_entity[i].path);
			var instruction = action.spawn_entity[i];

			var args = instruction.args.slice();
			var py = this.py + (instruction.py || 0);
			var px = this.px + (instruction.px || 0);
			if (instruction.scatter) {
				if (instruction.scatter.width)
					px += Math.random() * instruction.scatter.width - instruction.scatter.width / 2;
				if (instruction.scatter.height)
					py += Math.random() * instruction.scatter.height - instruction.scatter.height / 2;
			}
			args.unshift(py);
			args.unshift(px);
			args.unshift(game);

			var object = Object.create(instruction.class.prototype);
			instruction.class.apply(object, args);
			game.add_entity(object);
		}
	}

	if (action.call) {
		for (var i = 0; i < action.call.length; i++) {
			var args = action.call[i].args || [];
			args = args.slice(0);
			args.unshift(game);
			this[action.call[i].method].apply(this, args);
		}
	}

	if (action.call_system) {
		for (var i = 0; i < action.call_system.length; i++) {
			var args = action.call_system[i].args || [];
			args = args.slice(0);
			args.unshift(game);
			game.game_systems[action.call_system[i].system][action.call_system[i].method].apply(
					game.game_systems[action.call_system[i].system], args);
		}
	}
};
PathEntity.prototype.update = function(game) {
	ScreenEntity.prototype.update.call(this, game);
	if (this.path === undefined) {
		// do nothing
	} else if (this.current_action === undefined) {
		if (this.path.length > this.path_index) {
			this.current_action = this.path[this.path_index];
			this.path_index++;
			this.trigger_path_action(game, this.current_action);
		} else if (this.loop_path) {
			this.path_index = 0;
			this.current_action = this.path[this.path_index];
			this.path_index++;
			this.trigger_path_action(game, this.current_action);
		} else {
			game.entities_to_remove.push(this);
		}
	} else {
		if (this.current_action.fda !== undefined) {
			this.current_action.da *= this.current_action.fda;
		}
		if (this.current_action.da !== undefined) {
			this.angle += this.current_action.da;
			// this.angle = this.current_action.angle;
			if (this.current_action.speed) {
				this.current_action.sx = Math.cos(this.angle / 180 * Math.PI) * this.current_action.speed;
				this.current_action.sy = Math.sin(this.angle / 180 * Math.PI) * this.current_action.speed;
			}
		}

		if (this.current_action.trail) {
			if (Math.random() < this.current_action.trail.thickness) {
				game.particle_systems[this.current_action.trail.type].add_particle(this.px, this.py, this.current_action.trail.speed || 2);
			}
		}

		this.px += this.current_action.sx;
		this.py += this.current_action.sy;

		if (this.timer !== undefined) {
			this.timer--;
			if (this.timer <= 0) {
				if (this.action_repeat !== undefined && this.action_repeat > 1) {
					this.timer = this.current_action.timeout;
					this.trigger_path_action(game, this.current_action);
					this.action_repeat--;
				} else {
					this.current_action = undefined;
				}
			}
		}
	}
};



function DebugSystem(game) {
	Entity.call(this, game);

	this.debug_text_entries = [];

	this.debug_rays = [];
	this.next_debug_rays = [];
	this.debug_squares = [];
	this.next_debug_squares = [];
	this.debug_shapes = [];
	this.next_debug_shapes = [];
}
DebugSystem.prototype = Object.create(Entity.prototype);
DebugSystem.prototype.update = function(game) {
	this.debug_rays = this.next_debug_rays;
	this.next_debug_rays = [];
	this.debug_squares = this.next_debug_squares;
	this.next_debug_squares = [];
	this.debug_shapes = this.next_debug_shapes;
	this.next_debug_shapes = [];

	for (var i = 0; i < this.debug_text_entries.length; i++) {
		if (this.debug_text_entries[i]) {
			this.debug_text_entries[i].update(game);
		}
	}
};
DebugSystem.prototype.draw = function(ctx) {
	if (this.visible) {
		for (var i = 0; i < this.debug_text_entries.length; i++) {
			this.draw_debug_text(ctx, this.debug_text_entries[i], i + 1);
		}

		for (var i = 0; i < this.debug_rays.length; i++) {
			this.draw_debug_ray(ctx, this.debug_rays[i]);
		}

		for (var i = 0; i < this.debug_squares.length; i++) {
			this.draw_debug_square(ctx, this.debug_squares[i]);
		}

		for (var i = 0; i < this.debug_shapes.length; i++) {
			this.draw_debug_shape(ctx, this.debug_shapes[i]);
		}
	}
};
DebugSystem.prototype.draw_debug_text = function(ctx, entry, i) {
	ctx.font = '16pt monospace';
	ctx.fillStyle = entry.color || '#f00';

	ctx.fillText(entry.text, 0, i * 16);
	var offsetx = ctx.measureText(entry.text).width;

	for (var k = 0; k < entry.rays.length; k++) {
		this.draw_debug_ray(ctx, {
			start: { px: offsetx, py: i * 16 - 8 },
			end: entry.rays[k],
			color: entry.color,
		});
	}
};
DebugSystem.prototype.draw_debug_ray = function(ctx, ray) {
	ctx.strokeStyle = ray.color || '#f00';
	ctx.lineWidth = ray.thickness || 1;
	
	ctx.beginPath();
	ctx.moveTo(ray.start.px, ray.start.py);
	ctx.lineTo(ray.end.px, ray.end.py);

	var angle = point_angle(ray.start.px, ray.start.py, ray.end.px, ray.end.py);
	var offset = point_offset(angle - 135, 10);
	ctx.lineTo(ray.end.px + offset.px, ray.end.py + offset.py);
	var offset = point_offset(angle + 135, 10);
	ctx.lineTo(ray.end.px + offset.px, ray.end.py + offset.py);
	ctx.lineTo(ray.end.px, ray.end.py);
	
	ctx.stroke();
};
DebugSystem.prototype.draw_debug_square = function(ctx, square) {
	ctx.strokeStyle = square.color;
	ctx.lineWidth = square.thickness;
	
	ctx.beginPath();
	var width = square.width;
	ctx.rect(square.pxy.px - width / 2, square.pxy.py - width / 2, width, width);
	
	ctx.stroke();
};
DebugSystem.prototype.draw_debug_shape = function(ctx, shape) {
	ctx.save();

	ctx.globalAlpha = shape.alpha;
	ctx.fillStyle = shape.color;
	
	ctx.beginPath();
	if (shape.type === 'ellipse') {
		ctx.ellipse(shape.pxy.px, shape.pxy.py, shape.width / 2, shape.height / 2, 0, 0, 360);
	} else if (shape.type === 'rectangle') {
		ctx.rect(square.pxy.px - shape.width / 2, square.pxy.py - shape.height / 2, shape.width, shape.height);
	}
	ctx.fill();
	
	ctx.restore();
};
DebugSystem.prototype.add_debug_text = function(entry) {
	this.debug_text_entries.push({
		text: entry.text,
		update: entry.update,
		color: entry.color || '#f00',
		rays: entry.rays || [],
	});
};
DebugSystem.prototype.add_debug_ray = function(start, end, color, thickness) {
	this.next_debug_rays.push({
		start: start,
		end: end,
		color: color || '#f00',
		thickness: thickness || 1,
	});
};
DebugSystem.prototype.add_debug_square = function(pxy, width, color, thickness) {
	this.next_debug_squares.push({
		pxy: pxy,
		width: width || 10,
		color: color || '#f00',
		thickness: thickness || 1,
	});
};
DebugSystem.prototype.add_debug_shape = function(type, pxy, width, height, color, alpha) {
	this.next_debug_shapes.push({
		type: type,
		pxy: pxy,
		width: width || 10,
		height: height || 10,
		color: color || '#f00',
		alpha: alpha || 1,
	});
};








function GridSystem (game, sizex, sizey, width, height) {
	Entity.call(this, game);
	this.sizex = sizex;
	this.sizey = sizey;
	this.width = width;
	this.height = height;

	// this.grid = this.generate_grid(0);
}
GridSystem.prototype = Object.create(Entity.prototype);
GridSystem.prototype.class_name = 'GridSystem';
GridSystem.prototype.generate_grid = function(value) {
	var grid = [];
	for (var x = 0; x < this.sizex; x++) {
		grid[x] = [];
		for (var y = 0; y < this.sizey; y++) {
			grid[x][y] = value;
		}
	}

	return grid;
};
GridSystem.prototype.set_grid = function(grid) {
	this.grid = grid;
};
GridSystem.prototype.get_point = function(px, py) {
	return [
		Math.floor(px / this.width),
		Math.floor(py / this.height),
	];
};

GridSystem.prototype.find_edges = function(initial_point, degree) {
	var points = [initial_point];
	var checked = this.generate_grid(false);
	checked[initial_point[0]][initial_point[1]] = true;
	var edges = [];

	degree = degree || 1;

	while (points.length > 0) {
		var new_points = [];

		for (var i = 0; i < points.length; i++) {
			var x = points[i][0];
			var y = points[i][1];

			if (this.grid[x][y]) {

				if (x > 0) {
					if (checked[x - 1][y] === false) {
						checked[x - 1][y] = true;
						new_points.push([x - 1, y]);
					}
				}
				if (y > 0) {
					if (checked[x][y - 1] === false) {
						checked[x][y - 1] = true;
						new_points.push([x, y - 1]);
					}
				}
				if (x < this.sizex - 1) {
					if (checked[x + 1][y] === false) {
						checked[x + 1][y] = true;
						new_points.push([x + 1, y]);
					}
				}
				if (y < this.sizey - 1) {
					if (checked[x][y + 1] === false) {
						checked[x][y + 1] = true;
						new_points.push([x, y + 1]);
					}
				}
			} else {
				edges.push([x, y]);
			}
		}
		points = new_points;
	}

	points = edges;
	for (var k = 1; k < degree; k++) {
		var new_edges = [];
		for (var i = 0; i < points.length; i++) {
			var x = points[i][0];
			var y = points[i][1];

			if (x > 0) {
				if (checked[x - 1][y] === false) {
					checked[x - 1][y] = true;
					if (!this.grid[x - 1][y])
						new_edges.push([x - 1, y]);
				}
			}
			if (y > 0) {
				if (checked[x][y - 1] === false) {
					checked[x][y - 1] = true;
					if (!this.grid[x][y - 1])
						new_edges.push([x, y - 1]);
				}
			}
			if (x < this.sizex - 1) {
				if (checked[x + 1][y] === false) {
					checked[x + 1][y] = true;
					if (!this.grid[x + 1][y])
						new_edges.push([x + 1, y]);
				}
			}
			if (y < this.sizey - 1) {
				if (checked[x][y + 1] === false) {
					checked[x][y + 1] = true;
					if (!this.grid[x][y + 1])
						new_edges.push([x, y + 1]);
				}
			}
		}
		points = new_edges;
		edges = edges.concat(new_edges);
	}

	return edges;
};

GridSystem.prototype.is_in_bounds = function(p, w, h) {
	// check that all points are in-bounds
	return p[0] >= 0 && p[0] + w - 1 < this.sizex && p[1] >= 0 && p[1] + h - 1 < this.sizey;
};

GridSystem.prototype.test_rect_equals = function(p, w, h, value) {
	// check that all points are in-bounds
	if (p[0] < 0 || p[0] + w - 1 >= this.sizex || p[1] < 0 || p[1] + h - 1 >= this.sizey)
		return undefined;

	// iterate map values
	for (var x = p[0]; x < p[0] + w; x++) {
		for (var y = p[1]; y < p[1] + h; y++) {
			if (this.grid[x][y] !== value) {
				return false;
			}
		}
	}

	// return true if we didn't find a counter point
	return true;
};

GridSystem.prototype.test_rect_contains = function(p, w, h, value) {
	// check that all points are in-bounds
	if (p[0] < 0 || p[0] + w - 1 >= this.sizex || p[1] < 0 || p[1] + h - 1 >= this.sizey)
		return undefined;

	// iterate map values
	for (var x = p[0]; x < p[0] + w; x++) {
		for (var y = p[1]; y < p[1] + h; y++) {
			if (this.grid[x][y] === value) {
				return true;
			}
		}
	}

	// return false if we didn't find a case
	return false;
};

GridSystem.prototype.rect_set = function(p, w, h, value) {
	// check that all points are in-bounds
	if (p[0] < 0 || p[0] + w - 1 >= this.sizex || p[1] < 0 || p[1] + h - 1 >= this.sizey)
		return;

	// iterate map values
	for (var x = p[0]; x < p[0] + w; x++) {
		for (var y = p[1]; y < p[1] + h; y++) {
			this.grid[x][y] = value;
		}
	}
};












function RenderedGridSystem(game, sizex, sizey, width, height) {
	GridSystem.call(this, game, sizex, sizey, width, height);
	this.rendered_grid = this.prepare_buffer();
}
RenderedGridSystem.prototype = Object.create(GridSystem.prototype);
RenderedGridSystem.prototype.class_name = 'RenderedGridSystem';
RenderedGridSystem.prototype.draw = function(ctx) {
	ctx.drawImage(this.rendered_grid, 0, 0, this.rendered_grid.width, this.rendered_grid.height);
};

RenderedGridSystem.prototype.prepare_buffer = function() {
	var buffer_canvas = document.createElement('canvas');
	buffer_canvas.width = this.width * this.sizex;
	buffer_canvas.height = this.height * this.sizey;

	var buffer_context = buffer_canvas.getContext('2d');
	buffer_context.imageSmoothingEnabled = false;

	// this.render_rect(buffer_context, [0, 0], this.sizex, this.sizey);

	return buffer_canvas;
};
RenderedGridSystem.prototype.set_grid = function(grid) {
	this.grid = grid;
	this.update_render([0, 0], this.sizex, this.sizey);
};

RenderedGridSystem.prototype.rect_set = function(p, w, h, value) {
	GridSystem.prototype.rect_set.call(this, p, w, h, value);
	this.update_render(p, w, h);
};
RenderedGridSystem.prototype.update_render = function(p, w, h) {
	if (this.is_in_bounds(p, w, h)) {
		var buffer_context = this.rendered_grid.getContext('2d');
		buffer_context.imageSmoothingEnabled = false;
		this.render_rect(buffer_context, p, w, h);
	}
};

// // example render_rect function
// RenderedGridSystem.prototype.render_rect = function(ctx, p, w, h) {
// 	for (var x = p[0]; x < p[0] + w; x++) {
// 		for (var y = p[1]; y < p[1] + h; y++) {
// 			if (this.grid[x][y]) {
// 				ctx.save();
// 				ctx.translate(x * this.width, y * this.height);
// 				ctx.drawImage(this.image, 0, 0, this.width, this.height);
// 				ctx.restore();
// 			} else {
// 				ctx.save();
// 				ctx.translate(x * this.width, y * this.height);
// 				ctx.clearRect(0, 0, this.width, this.height);
// 				ctx.restore();
// 			}
// 		}
// 	}
// };


function SoundManager(game) {
	Entity.call(this, game);

	this.background_music = undefined;
}
SoundManager.prototype = Object.create(Entity.prototype);
SoundManager.prototype.play_background_music = function(background_music) {
	if (this.background_music)
		this.background_music.stop();
	this.background_music = background_music;
	this.background_music.loop = true;
	this.background_music.play();
};



function InputManager(game) {
	Entity.call(this, game);
	this.input_handlers = [];
}
InputManager.prototype = Object.create(Entity.prototype);
InputManager.prototype.update = function(game) {
	Entity.prototype.update.call(this, game);

	for (var i = 0; i < this.input_handlers.length; i++) {
		if (this.input_handlers[i].type === 'key_down') {
			if (game.keystate[this.input_handlers[i].key]) {
				this.input_handlers[i].callback(game);
			}
		} else if (this.input_handlers[i].type === 'key_up') {
			if (!game.keystate[this.input_handlers[i].key]) {
				this.input_handlers[i].callback(game);
			}
		} else if (this.input_handlers[i].type === 'key_pressed') {
			if (game.keystate[this.input_handlers[i].key] && !game.previous_keystate[this.input_handlers[i].key]) {
				this.input_handlers[i].callback(game);
			}
		}
	}
};


function UIButton(game, px, py, width, height, image) {
	ScreenEntity.call(this, game, px, py, width, height, image);
	this.pressed = false;
}
UIButton.prototype = Object.create(ScreenEntity.prototype);
UIButton.prototype.update = function(game) {
	ScreenEntity.prototype.update.call(this, game);
	
	if (this.visible) {
		if (!this.pressed) {
			if (!game.previous_mouse1_state && game.mouse1_state) {
				if (Math.abs(game.mouse_position.px - this.px) < this.width / 2 &&
						Math.abs(game.mouse_position.py - this.py) < this.height / 2) {
					this.pressed = true;
					this.on_down(game);
				}
			}
		} else {
			if (!game.mouse1_state || !(Math.abs(game.mouse_position.px - this.px) < this.width / 2 &&
					Math.abs(game.mouse_position.py - this.py) < this.height / 2)) {
				this.pressed = false;
				this.on_up(game);
			}
		}
	} else {
		if (this.pressed) {
			this.pressed = false;
			this.on_up(game);
		}
	}
};
// default on_down implementation. overridable
UIButton.prototype.on_down = function(game) {};
// default on_up implementation. overridable
UIButton.prototype.on_up = function(game) {};



