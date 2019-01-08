

function CollisionEntityTag(game) {}



function CircularCollisionSystem(game) {
	Entity.call(this, game);
}
CircularCollisionSystem.prototype = Object.create(Entity.prototype);
CircularCollisionSystem.prototype.class_name = 'CircularCollisionSystem';
CircularCollisionSystem.prototype.update = function(game) {
	Entity.prototype.update.call(this, game);
	var collision_entities = game.query_entities_by_tag(Entity, CollisionEntityTag);

	// var terrain_grid = game.game_systems.terrain_grid;

	// for (var i = 0; i < collision_entities.length; i++) {
	// 	var ent = collision_entities[i];

	// 	if (ent.sx !== 0) {
	// 		var dx = ent.sx;
	// 		dx = this.check_terrain_move_x(terrain_grid, ent, dx);
	// 		// if (dx !== 0)
	// 		// 	dx = this.check_entities_move_x(collision_entities, ent, dx);
	// 		ent.px += dx;
	// 	}
	// 	if (ent.sy !== 0) {
	// 		var dy = ent.sy;
	// 		dy = this.check_terrain_move_y(terrain_grid, ent, dy);
	// 		// if (dy !== 0)
	// 		// 	dy = this.check_entities_move_y(collision_entities, ent, dy);
	// 		ent.py += dy;
	// 		// ent.py += this.check_terrain_move_y(terrain_grid, ent, ent.sy);
	// 	}
	// }

	for (var i = 0; i < collision_entities.length; i++) {
		var ent = collision_entities[i];

		for (var k = 0; k < ent.collision_map.length; k++) {
			// console.log("debug: ", ent.collision_radius + ent.collision_map[k].class.prototype.collision_radius);
			var collision_option = ent.collision_map[k];
			var colliding;
			if (collision_option.rectangular_collision) {
				colliding = game.find_colliding_rectangular(ent, collision_option.class);
			} else if (collision_option.container_class) {
				colliding = game.find_colliding_circular_nested(ent, collision_option.container_class, collision_option.class, ent.collision_radius);
			} else {
				colliding = game.find_colliding_circular(ent, collision_option.class, ent.collision_radius);
			}

			for (var m = 0; m < colliding.length; m++) {
				ent[collision_option.callback](game, colliding[m]);
			}
		}
	}
};



function ScrollingParticleBackground(game, config) {
	ParticleEffectSystem.call(this, game, config);
	this.particle_spawn_count = config.particle_spawn_count || 1;
	this.particle_spawn_density = config.particle_spawn_count || 0.5;
	this.particle_min_speed = config.particle_min_speed || 0.1;
	this.particle_speed = config.particle_speed || 1;

	this.particle_edge_offset = 20;

	this.init_particles(game);
}
ScrollingParticleBackground.prototype = Object.create(ParticleEffectSystem.prototype);
ScrollingParticleBackground.prototype.constructor = ScrollingParticleBackground;
ScrollingParticleBackground.prototype.update = function(game) {
	ParticleEffectSystem.prototype.update.call(this, game);

	for (var i = 0; i < this.particle_spawn_count; i++) {
		if (Math.random() < this.particle_spawn_density) {
			var particle = this.add_particle(Math.random() * (game.canvas.width + this.particle_edge_offset * 2) - this.particle_edge_offset,
					-this.particle_edge_offset, 0);
			particle.sy = this.particle_min_speed + (Math.random() * this.particle_speed) ** 2;
		}
	}

	if (this.particles.length === 40) {
		// console.log('debug:', this.particles);
		
	}
	// console.log('debug:', this.particles.length);
	for (var i = this.particles.length - 1; i >= 0; i--) {
		if (this.particles[i].py >= game.canvas.height + this.particle_edge_offset) {
			this.particles.splice(i, 1);
		}
	}
};


ScrollingParticleBackground.prototype.init_particles = function(game) {
	for (var y = -this.particle_edge_offset; y < game.canvas.height + this.particle_edge_offset; y++) {
		for (var i = 0; i < this.particle_spawn_count; i++) {
			if (Math.random() < this.particle_spawn_density) {
				var particle = this.add_particle(Math.random() * (game.canvas.width + this.particle_edge_offset * 2) - this.particle_edge_offset,
						y, 0);
				particle.sy = this.particle_min_speed + (Math.random() * this.particle_speed) ** 2;
			}
		}
	}
};



function UIRasterText(game, px, py, width_multiplier, height_multiplier, text, font_image) {
	ScreenEntity.call(this, game, px, py, undefined, undefined, undefined);
	this.angle_granularity = 1;

	this.font_image = font_image;
	this.font_width = this.font_image.width / 16;
	this.font_height = this.font_image.height / 6;

	this.width_multiplier = width_multiplier;
	this.height_multiplier = height_multiplier;

	this.ufo_image = game.images.ufo;
	this.set_text(text);
}
UIRasterText.prototype = Object.create(ScreenEntity.prototype);
UIRasterText.prototype.render_text = function(text) {
	var text_characters = text.split('');

	var buffer_canvas = document.createElement('canvas');
	buffer_canvas.width = this.font_width * text_characters.length;
	buffer_canvas.height = this.font_height;

	var buffer_context = buffer_canvas.getContext('2d');
	
	buffer_context.globalCompositeOperation = '#source-over';

	// buffer_context.drawImage(this.ufo_image, 0, 0);

	for (var i = 0; i < text_characters.length; i++) {
		buffer_context.save();
		buffer_context.translate(i * this.font_width, 0);
		this.render_character(buffer_context, text_characters[i]);
		buffer_context.restore();
	}

	return buffer_canvas;
};
UIRasterText.prototype.render_character = function(buffer_context, character) {
	var character_index = character.charCodeAt(0);
	var x = character_index % 16;
	var y = Math.floor(character_index / 16) - 2;
	buffer_context.drawImage(this.font_image,
		x * this.font_width, y * this.font_height, this.font_width, this.font_height,
		0, 0, this.font_width, this.font_height);
};
UIRasterText.prototype.set_text = function(text) {
	this.text = text;
	this.image = this.render_text(this.text);
	this.width = this.image.width * this.width_multiplier;
	this.height = this.image.height * this.height_multiplier;
};












function EnemyBullet(game, px, py, path, image) {
	image = image || game.images.orange_round_bullet;
	PathEntity.call(this, game, px, py, 16, 16, image, path);

	this.angle_granularity = 5;
}
EnemyBullet.prototype = Object.create(PathEntity.prototype);
EnemyBullet.prototype.class_name = 'EnemyBullet';
EnemyBullet.prototype.collision_radius = 6;
EnemyBullet.prototype.update = function(game) {
	PathEntity.prototype.update.call(this, game);

	if (Math.abs(this.px - game.canvas.width / 2) >= game.canvas.width / 2 + this.width ||
			Math.abs(this.py - game.canvas.height / 2) >= game.canvas.height / 2 + this.width) {
		// console.log('despawned ' + this.class_name);
		game.remove_entity(this);
	}
};

function PlayerBullet(game, px, py, path, image) {
	image = image || game.images.orange_round_bullet;
	PathEntity.call(this, game, px, py, 32, 32, image, path);

	this.angle_granularity = 5;

	this.entity_tags.push(new CollisionEntityTag());
}
PlayerBullet.prototype = Object.create(PathEntity.prototype);
PlayerBullet.prototype.collision_radius = 5;
PlayerBullet.prototype.collision_map = [
	{
		class: EnemyEntity,
		callback: 'hit_enemy',
	},
	{
		class: EnemyEntity,
		container_class: EnemyContainerEntity,
		callback: 'hit_enemy',
	},
];
PlayerBullet.prototype.hit_enemy = function(game, enemy) {
	enemy.take_damage(game, 5);
	game.entities_to_remove.push(this);
	game.particle_systems.red_particles.add_particle(this.px, this.py, 3);
};

function PlayerMissile(game, px, py, path) {
	PathEntity.call(this, game, px, py, 32, 10, game.images.fighter_missile, path);
	this.angle_granularity = 5;
	this.entity_tags.push(new CollisionEntityTag());
}
PlayerMissile.prototype = Object.create(PathEntity.prototype);
PlayerMissile.prototype.collision_radius = 16;
PlayerMissile.prototype.collision_map = [
	{
		class: EnemyEntity,
		callback: 'hit_enemy',
	},
	{
		class: EnemyEntity,
		container_class: EnemyContainerEntity,
		callback: 'hit_enemy',
	},
];
PlayerMissile.prototype.update = function(game) {
	PathEntity.prototype.update.call(this, game);
	var self = this;

	// find enemies and sort by distance
	var enemies = game.query_entities(EnemyEntity).concat(game.query_entities(EnemyContainerEntity));
	enemies.sort(function (a, b) { return points_dist(self, a) - points_dist(self, b); });

	// target closest enemy
	var target = enemies[0];
	if (target) {
		// find target angle
		var angle = point_angle(this.px, this.py, target.px, target.py);
		// this.angle %= 360;
		// find angle difference
		var diff = this.angle - angle;
		if (diff > 180)
			diff -= 360;
		else if (diff < -180)
			diff += 360;

		// clamp to +/- 15 delta
		if (diff > 15)
			diff = 15;
		else if (diff < -15)
			diff = -15;
		// console.log("debug:", this.angle, angle, diff);

		this.path[this.path_index - 1].da = -diff;
	} else {
		this.path[this.path_index - 1].da = 0;
	}
};
PlayerMissile.prototype.hit_enemy = function(game, enemy) {
	enemy.take_damage(game, 25);
	game.entities_to_remove.push(this);
	for (var i = 0; i < 5; i++) {
		game.particle_systems.red_particles.add_particle(this.px, this.py, 5);
	}
};

function PlayerTorpedo(game, px, py, path) {
	PathEntity.call(this, game, px, py, 32, 10, game.images.fighter_torpedo, path);
	this.max_frame = 2;
	this.frame_step = 0;
	this.angle_granularity = 5;
	this.entity_tags.push(new CollisionEntityTag());
}
PlayerTorpedo.prototype = Object.create(PathEntity.prototype);
PlayerTorpedo.prototype.collision_radius = 8;
PlayerTorpedo.prototype.collision_map = [
	{
		class: EnemyEntity,
		callback: 'hit_enemy',
	},
	{
		class: EnemyEntity,
		container_class: EnemyContainerEntity,
		callback: 'hit_enemy',
	},
];
PlayerTorpedo.prototype.update = function(game) {
	PathEntity.prototype.update.call(this, game);

	this.frame_step = (this.frame_step + 1) % 10;
	this.frame = Math.floor(this.frame_step / 5);
};
PlayerTorpedo.prototype.hit_enemy = function(game, enemy) {
	enemy.take_damage(game, 100);
	game.entities_to_remove.push(this);
	for (var i = 0; i < 20; i++) {
		game.particle_systems.red_particles.add_particle(this.px, this.py, 6);
	}
};





function EnemyEntity(game, px, py, width, height, image, path) {
	PathEntity.call(this, game, px, py, width, height, image, path);
	this.health = 250;
	this.armor = 0;
	this.dead = false;

	this.on_screen = false;
	this.despawn_off_screen = true;
	this.despawn_distance = Math.max(this.width, this.height);
}
EnemyEntity.prototype = Object.create(PathEntity.prototype);
EnemyEntity.prototype.class_name = 'EnemyEntity';
EnemyEntity.prototype.update = function(game) {
	PathEntity.prototype.update.call(this, game);

	if (this.on_screen) {
		if (this.despawn_off_screen) {
			var p = this;
			if (this.parent instanceof EnemyContainerEntity)
				p = this.parent.get_global_position(this);

			if (Math.abs(p.px - game.canvas.width / 2) >= game.canvas.width / 2 + this.despawn_distance ||
					Math.abs(p.py - game.canvas.height / 2) >= game.canvas.height / 2 + this.despawn_distance) {
				// console.log('despawned ' + this.class_name);
				game.remove_entity(this);
			}
		}
	} else {
		if (this.px >= 0 && this.px < game.canvas.width && this.py >= 0 && this.py < game.canvas.height) {
			this.on_screen = true;
		}
	}
};
EnemyEntity.prototype.fire_at = function(game, target, args) {
	var self = this;
	args = args || [];

	var targets = game.query_entities(target);
	var p = this;
	if (this.parent instanceof EnemyContainerEntity) {
		p = this.parent.get_global_position(this);
	}

	if (targets.length) {
		targets.sort(function (a, b) { return points_dist(p, a) - points_dist(p, b); });
		var target = targets[0];

		var full_args = args.slice();
		full_args.unshift(target);
		full_args.unshift(game);
		this.fire.apply(this, full_args);
	}
};
EnemyEntity.prototype.take_damage = function(game, damage) {
	this.health -= damage - (damage * this.armor);
	if (this.health <= 0 && !this.dead) {
		this.dead = true;
		this.on_death(game);
		this.parent.remove_entity(this);
	}
};
EnemyEntity.prototype.on_death = function(game) {
	var p = this;
	if (this.parent instanceof EnemyContainerEntity) {
		p = this.parent.get_global_position(this);
	}

	var count = 24 + Math.random() * 32;
	for (var i = 0; i < count; i++) {
		var offsetx = (Math.random() * this.width - (this.width / 2)) / 1.5;
		var offsety = (Math.random() * this.height - (this.height / 2)) / 1.5;
		game.particle_systems.explosion_particles.add_particle(p.px + offsetx, p.py + offsety, 2);
	}
	var count = Math.floor(2 + Math.random() * 2);
	for (var i = 0; i < count; i++) {
		game.particle_systems.ship_chunks.add_image_particle(this.image, this.width, this.height, p.px, p.py, 3);
	}

	for (var i = 0; i < this.sub_entities.length; i++) {
		if (this.sub_entities[i] instanceof EnemyEntity) {
			this.sub_entities[i].on_death(game);
		}
	}
};


function EnemyContainerEntity(game, px, py, width, height, image, path) {
	EnemyEntity.call(this, game, px, py, width, height, image, path);
}
EnemyContainerEntity.prototype = Object.create(EnemyEntity.prototype);
EnemyContainerEntity.prototype.get_global_position = function(pxy_angle) {
	var offset = d2_point_offset(this.angle, pxy_angle.px, pxy_angle.py);

	return {
		px: this.px + offset.px,
		py: this.py + offset.py,
		angle: this.angle + pxy_angle.angle,
	}
};


function UFOEnemy(game, px, py, path) {
	EnemyEntity.call(this, game, px, py, 64, 64, game.images.ufo, path);
	this.health = 250;
	this.rotation = 1;
}
UFOEnemy.prototype = Object.create(EnemyEntity.prototype);
UFOEnemy.prototype.collision_radius = 32;

UFOEnemy.prototype.fire = function(game, target) {
	// var target_angle = point_angle(this.px, this.py, target.px, target.py);
	// for (var d = -120; d <= 120; d += 60) {
	// 	var offset = point_offset(target_angle + 90, d);
		
	// 	var path = [
	// 		{ timeout: 30, px: this.px + offset.px, py: this.py + offset.py, },
	// 		{ timeout: 30, },
	// 		{ timeout: 30, repeat: 4,
	// 			spawn: [{ path: [{timeout: 360, speed: 2, angle: target_angle}, {delete: true}] }],
	// 		},
	// 		{delete: true},
	// 	];

	// 	game.entities_to_add.push(new EnemyBullet(game, this.px, this.py, path));
	// }

	var target_angle = point_angle(this.px, this.py, target.px, target.py);
	// console.log("angle: ", target_angle / Math.PI * 180);

	// var sx = Math.cos(target_angle) * 2;
	// var sy = Math.sin(target_angle) * 2;

	for (var a = 0; a < 360; a += 30) {
		var bx = Math.cos(a / 180 * Math.PI) * 40;
		var by = Math.sin(a / 180 * Math.PI) * 40;

		var path = [
			{ timeout: 30, px: this.px + bx, py: this.py + by, },
			{ timeout: 30, },
			{ timeout: 360, angle: target_angle, speed: 2 },
			// { sx: sx, sy: sy, },
			{ delete: true, },
		];
		game.entities_to_add.push(new EnemyBullet(game, this.px, this.py, path));
	}
};
function MiniUFOEnemy(game, px, py, path) {
	EnemyEntity.call(this, game, px, py, 32, 32, game.images.ufo_mini, path);
	this.health = 100;
	this.rotation = 1;
}
MiniUFOEnemy.prototype = Object.create(EnemyEntity.prototype);
MiniUFOEnemy.prototype.collision_radius = 16;

MiniUFOEnemy.prototype.fire = function(game, target) {
	var p = this;
	if (this.parent instanceof EnemyContainerEntity)
		p = this.parent.get_global_position(this);

	var target_angle = point_angle(p.px, p.py, target.px, target.py);

	game.add_entity(new EnemyBullet(game, p.px, p.py, [
		{ timeout: 360, angle: target_angle, speed: 2 },
	], game.images.orange_round_bullet));
};



function HeavyUFOEnemy(game, px, py, path) {
	EnemyContainerEntity.call(this, game, px, py, 64, 64, game.images.ufo, path);
	this.health = 250;
	this.rotation = 0;

	this.angle_offset = 0;

	var spread = 60;
	this.mini_ufos = [];
	for (var i = 0; i < 360 / spread; i++) {
		var offset = point_offset(this.angle + i * spread, this.width / 2 + 16);
		var ent = new MiniUFOEnemy(game, offset.px, offset.py, [
			{ timeout: 60, repeat: 100, call: [{ method: 'fire_at', args: [PlayerShip] }] },
		]);
		ent.despawn_off_screen = false;
		this.mini_ufos.push(ent);
		this.add_entity(ent);
	}
}
HeavyUFOEnemy.prototype = Object.create(EnemyContainerEntity.prototype);
HeavyUFOEnemy.prototype.collision_radius = 32;
HeavyUFOEnemy.prototype.update = function(game) {
	EnemyContainerEntity.prototype.update.call(this, game);

	this.angle_offset = (this.angle_offset + 1) % 360;

	var spread = 60;
	for (var i = 0; i < this.mini_ufos.length; i++) {
		var offset = point_offset(this.angle + i * spread + this.angle_offset, this.width / 2 + 16);
		this.mini_ufos[i].px = offset.px;
		this.mini_ufos[i].py = offset.py;
	}
};





function UFOPlatformSection(game, px, py) {
	EnemyEntity.call(this, game, px, py, 64, 64, game.images.platform_sections);
	this.frame = Math.floor(Math.random() * 4);
	this.max_frame = 4;
	this.angle = 90 * Math.floor(Math.random() * 4);
	// this.angle = Math.random() * 360;
}
UFOPlatformSection.prototype = Object.create(EnemyEntity.prototype);
UFOPlatformSection.prototype.collision_radius = 32;
UFOPlatformSection.prototype.z_index = -1;

function UFOPlatform(game, px, py, path) {
	EnemyContainerEntity.call(this, game, px, py, 64, 64, game.images.platform_core, path);
	this.health = 500;

	var section_count = Math.floor(Math.random() * 3) + 3;
	for (var i = 0; i < section_count; i++) {
		var offset = point_offset(i * (360 / section_count) + Math.random() * (360 / section_count), 48);

		var ent = new UFOPlatformSection(game, offset.px, offset.py);
		ent.despawn_off_screen = false;
		this.add_entity(ent);
	}

	this.rotation = 0.25 * (Math.floor(Math.random() * 5) - 2);
	this.angle = Math.random() * 360;
}
UFOPlatform.prototype = Object.create(EnemyContainerEntity.prototype);
UFOPlatform.prototype.collision_radius = 32;
UFOPlatform.prototype.update = function(game) {
	EnemyContainerEntity.prototype.update.call(this, game);

	if (this.firing > 0)
		this.spawn_bullets(game);
};
UFOPlatform.prototype.spawn_bullets = function(game) {
	this.firing--;

	var target_angle = point_angle(this.px, this.py, this.fire_target.px, this.fire_target.py);
	// slightly randomize target aim by +/- 4 degrees
	target_angle += (Math.floor(Math.random() * 101) - 50) / 50 * 4;

	// // spawn linear bullet
	// game.entities_to_add.push(new EnemyBullet(game, this.px, this.py, [
	// 	{ timeout: 240, angle: target_angle, speed: 2 + Math.random() },
	// ], game.images.bright_purple_square_bullet));

	// prepare burst spawn
	var spawn_burst = [];
	for (var i = 0; i < 360 / 45; i++) {
		spawn_burst.push({ image: game.images.bright_purple_square_bullet,
			path: [{ timeout: 120, angle: target_angle + i * 45, speed: 1 }] });
	}

	// spawn flak bullet
	if (Math.random() < 0.1) {
		game.entities_to_add.push(new EnemyBullet(game, this.px, this.py, [
			{ trail: { type: 'purple_particles', thickness: 0.01 }, timeout: 120, angle: target_angle, speed: 1.5 + Math.random() * 2 },
			{ spawn: spawn_burst, delete: true },
		], game.images.purple_square_bullet));
	}
};
UFOPlatform.prototype.fire = function(game, target) {
	this.firing = 40;
	this.fire_target = { px: target.px, py: target.py };

	this.spawn_bullets(game);
};




function Asteroid(game, px, py, path) {
	EnemyEntity.call(this, game, px, py, 64, 64, game.images.asteroid_64, path);
	this.health = 100;
	this.angle = Math.random() * 360;
	this.rotation = Math.random() * 2 - 1;
}
Asteroid.prototype = Object.create(EnemyEntity.prototype);
Asteroid.prototype.collision_radius = 24;

function CannonAsteroid(game, px, py, path) {
	EnemyContainerEntity.call(this, game, px, py, 64, 64, game.images.asteroid_64, path);
	this.health = 100;
	this.angle = Math.random() * 360;
	// this.rotation = Math.random() * 2 - 1;

	var cannon_angle = Math.random() * 360;
	var offset = point_offset(cannon_angle, this.width / 2);
	var ent = new SmallCannon(game, offset.px, offset.py, [{
		timeout: 60,
		repeat: 100,
		angle: cannon_angle,
		call: [{ method: 'fire_at', args: [PlayerShip] }],
	}]);
	ent.despawn_off_screen = false;
	this.add_entity(ent);
	
	var offset = point_offset(cannon_angle + 120, this.width / 2);
	var ent = new SmallCannon(game, offset.px, offset.py, [{
		timeout: 60,
		repeat: 100,
		angle: cannon_angle + 120,
		call: [{ method: 'fire_at', args: [PlayerShip] }],
	}]);
	ent.despawn_off_screen = false;
	this.add_entity(ent);

	var offset = point_offset(cannon_angle + 240, this.width / 2);
	var ent = new SmallCannon(game, offset.px, offset.py, [{
		timeout: 60,
		repeat: 100,
		angle: cannon_angle + 240,
		call: [{ method: 'fire_at', args: [PlayerShip] }],
	}]);
	ent.despawn_off_screen = false;
	this.add_entity(ent);
}
CannonAsteroid.prototype = Object.create(EnemyContainerEntity.prototype);
CannonAsteroid.prototype.collision_radius = 32;

function PointSuppressionDrone(game, px, py, path) {
	EnemyEntity.call(this, game, px, py, 40, 40, game.images.point_defense_drone, path);
	this.health = 400;
	this.angle = Math.random() * 360;
	this.rotation = 0.5;
}
PointSuppressionDrone.prototype = Object.create(EnemyEntity.prototype);
PointSuppressionDrone.prototype.collision_radius = 16;
PointSuppressionDrone.prototype.fire = function(game) {
	var spread = 5;
	for (var i = 0; i <= 60 / spread; i++) {
		game.add_entity(new EnemyBullet(game, this.px, this.py, [
			{ timeout: 30, angle: this.angle + i * spread, speed: 4 },
		], game.images.bright_purple_square_bullet));
	}
	for (var i = 0; i <= 60 / spread; i++) {
		game.add_entity(new EnemyBullet(game, this.px, this.py, [
			{ timeout: 30, angle: this.angle + 180 + i * spread, speed: 4 },
		], game.images.bright_purple_square_bullet));
	}
};

function TargetSuppressionDrone(game, px, py, path) {
	EnemyEntity.call(this, game, px, py, 80, 80, game.images.point_defense_drone, path);
	this.health = 800;
	this.angle = Math.random() * 360;
	this.rotation = 0.5;

	this.firing = 0;
}
TargetSuppressionDrone.prototype = Object.create(EnemyEntity.prototype);
TargetSuppressionDrone.prototype.collision_radius = 36;
TargetSuppressionDrone.prototype.update = function(game) {
	EnemyEntity.prototype.update.call(this, game);
	if (this.firing > 0) {
		this.firing--;
		this.spawn_bullets(game);
	}
}
TargetSuppressionDrone.prototype.fire = function(game, target) {
	this.firing = 200;
	this.fire_target = target;
};
TargetSuppressionDrone.prototype.spawn_bullets = function(game) {
	if (Math.random() < 0.2) {
		var spawn_offset = point_offset(Math.random() * 360, this.width / 2 + Math.random() * this.width);
		for (var i = 0; i < 10; i++) {
			var micro_offset = point_offset(Math.random() * 360, Math.random() * this.width / 2);
			var target_angle = point_angle(this.px + spawn_offset.px, this.py + spawn_offset.py,
					this.fire_target.px, this.fire_target.py);
			// var target_angle = point_angle(this.px + spawn_offset.px + micro_offset.px, this.py + spawn_offset.py + micro_offset.py,
			// 		this.fire_target.px, this.fire_target.py);
			game.add_entity(new EnemyBullet(game, this.px, this.py, [
				{ timeout: 10, px: this.px + spawn_offset.px + micro_offset.px, py: this.py + spawn_offset.py + micro_offset.py },
				{ timeout: 50 },
				{ timeout: 240, angle: target_angle, speed: 2 },
			], game.images.bright_blue_square_bullet));
		}
	}
};



function UFOStation(game, px, py, path) {
	EnemyContainerEntity.call(this, game, px, py, 64, 64, game.images.ufo_station_core, path);

	// this.rotation = 0.25;
	this.angle_granularity = 5;
	this.angle_offset = 0;

	this.outer_ring = [];
	var pylon_distance = 32;
	var section_count = 6;
	for (var i = 0; i < section_count; i++) {
		var offset = point_offset(i * (360 / section_count), pylon_distance);
		var pylon = new EnemyEntity(game, offset.px, offset.py, 64, 64, game.images.ufo_station_pylon2);
		pylon.collision_radius = 20;
		pylon.angle_granularity = 5;
		pylon.z_index = -1;
		pylon.angle = i * (360 / section_count);
		pylon.despawn_off_screen = false;
		this.outer_ring.push(pylon);
		this.add_entity(pylon);
	}

	this.inner_ring = [];
	var pylon_distance = 24;
	var section_count = 6;
	for (var i = 0; i < section_count; i++) {
		var offset = point_offset(i * (360 / section_count), pylon_distance);
		var pylon = new EnemyEntity(game, offset.px, offset.py, 64, 64, game.images.ufo_station_pylon2);
		pylon.collision_radius = 20;
		pylon.angle_granularity = 5;
		pylon.z_index = -1;
		pylon.angle = i * (360 / section_count);
		pylon.despawn_off_screen = false;
		this.inner_ring.push(pylon);
		this.add_entity(pylon);
	}

	// this.sub_entities.push(new UFOStationRing(game, 0, 0, -0.25, 32));
	// this.sub_entities.push(new UFOStationRing(game, 0, 0, 0.25, 24));
}
UFOStation.prototype = Object.create(EnemyContainerEntity.prototype);
UFOStation.prototype.collision_radius = 16;
UFOStation.prototype.update = function(game) {
	EnemyContainerEntity.prototype.update.call(this, game);
	if (this.firing > 0)
		this.spawn_bullets(game);

	this.angle_offset = (this.angle_offset + 0.25) % 360;

	var pylon_distance = 32;
	var section_count = 6;
	for (var i = 0; i < section_count; i++) {
		var angle = Math.floor((this.angle_offset + i * (360 / section_count)) / this.angle_granularity) * this.angle_granularity;
		var offset = point_offset(angle, pylon_distance);
		this.outer_ring[i].px = offset.px;
		this.outer_ring[i].py = offset.py;
		this.outer_ring[i].angle = angle;
	}

	var pylon_distance = 24;
	var section_count = 6;
	for (var i = 0; i < section_count; i++) {
		var angle = Math.floor((-this.angle_offset + i * (360 / section_count)) / this.angle_granularity) * this.angle_granularity;
		var offset = point_offset(angle, pylon_distance);
		this.inner_ring[i].px = offset.px;
		this.inner_ring[i].py = offset.py;
		this.inner_ring[i].angle = angle;
	}

	// for (var i = 0; i < section_count; i++) {
	// 	var offset = point_offset(i * (360 / section_count), pylon_distance);
	// 	var pylon = new ScreenEntity(game, offset.px, offset.py, 64, 64, game.images.ufo_station_pylon2);
	// 	pylon.angle = i * (360 / section_count);
	// 	this.outer_ring.push(pylon);
	// 	this.sub_entities.push(pylon);
	// }
};

UFOStation.prototype.spawn_bullets = function(game) {
	// spread triangle fire
	if (this.firing % 15 === 0) {
		var target_angle = point_angle(this.px, this.py, this.fire_target.px, this.fire_target.py);
		// determine spread for this tick
		var spread = (135 - this.firing) / 15;

		// fire bullets in a spread
		for (var i = -spread; i <= spread; i += 2) {
			game.entities_to_add.push(new EnemyBullet(game, this.px, this.py, [
				{ timeout: 240, angle: target_angle + i * 5, speed: 2 }
			]));
		}
	}

	// // focused bar fire
	// if (this.firing % 45 === 0) {
	// 	var target_angle = point_angle(this.px, this.py, this.fire_target.px, this.fire_target.py);

	// 	// fire bullets in a spread
	// 	for (var i = -2; i <= 2; i++) {
	// 		// game.entities_to_add.push(new EnemyBullet(game, this.px, this.py, [
	// 		// 	{ timeout: 240, angle: target_angle + i * 5, speed: 2 }
	// 		// ], game.images.bright_purple_square_bullet));
	// 		// game.entities_to_add.push(new EnemyBullet(game, this.px, this.py, [
	// 		// 	{ timeout: 240, angle: target_angle + i * 5, speed: 3 }
	// 		// ], game.images.bright_purple_square_bullet));
	// 		game.entities_to_add.push(new EnemyBullet(game, this.px, this.py, [
	// 			{ timeout: 240, angle: target_angle + i * 5, speed: 2 }
	// 		], game.images.bright_purple_square_bullet));
	// 	}
	// }

	this.firing--;
};
UFOStation.prototype.fire = function(game, target) {
	this.firing = 135;
	this.fire_target = { px: target.px, py: target.py };

	this.spawn_bullets(game);
};

function UFOStationRing(game, px, py, rotation, pylon_distance) {
	ScreenEntity.call(this, game, px, py, 0, 0, game.images.purple_crystal);
	this.angle = 0;
	this.rotation = rotation;
	this.angle_granularity = 5;

	var section_count = 6;
	for (var i = 0; i < section_count; i++) {
		var offset = point_offset(i * (360 / section_count), pylon_distance);
		var pylon = new ScreenEntity(game, offset.px, offset.py, 64, 64, game.images.ufo_station_pylon2);
		pylon.angle = i * (360 / section_count);
		this.sub_entities.push(pylon);
	}
}
UFOStationRing.prototype = Object.create(ScreenEntity.prototype);
UFOStationRing.prototype.z_index = -1;



function UFOCorsairEnemy(game, px, py, path) {
	EnemyEntity.call(this, game, px, py, 128, 64, game.images.ufo_corsair, path);
	var ent = new ScreenEntity(game, this.width / 4, 0, 16, 16, game.images.purple_crystal);
	ent.rotation = 1;
	this.add_entity(ent);
	this.angle = 0;

	this.health = 500;
}
UFOCorsairEnemy.prototype = Object.create(EnemyEntity.prototype);
UFOCorsairEnemy.prototype.collision_radius = 32;
UFOCorsairEnemy.prototype.fire = function(game) {
	var offset = point_offset(this.angle, this.width / 4);

	for (var da = 0.25; da < 2; da += 0.5) {
		game.entities_to_add.push(new EnemyBullet(game, this.px + offset.px, this.py + offset.py, [
			{ timeout: -1, angle: this.angle },
			{
				timeout: 20, repeat: 8,
				spawn: [{
					image: game.images.bright_purple_square_bullet,
					path: [{timeout: 90, trail: { type: 'purple_particles', thickness: 0.01 }, }, {delete: true}],
				}],
				trail: { type: 'purple_particles', thickness: 0.03 },
				speed: 3, da: da
			},
		], game.images.purple_square_bullet));
		game.entities_to_add.push(new EnemyBullet(game, this.px + offset.px, this.py + offset.py, [
			{ timeout: -1, angle: this.angle },
			{
				timeout: 20, repeat: 8,
				spawn: [{
					image: game.images.bright_purple_square_bullet,
					path: [{timeout: 90, trail: { type: 'purple_particles', thickness: 0.01 }, }, {delete: true}],
				}],
				trail: { type: 'purple_particles', thickness: 0.03 },
				speed: 3, da: -da
			},
		], game.images.purple_square_bullet));
		
	}
};

function UFOCorvetteEnemy(game, px, py, path) {
	EnemyContainerEntity.call(this, game, px, py, 192, 96, game.images.ufo_corvette, path);
	this.angle = 0;

	this.health = 500;
	this.fire_timer = 30 * 5;

	var cannon = new EnemyEntity(game, 0, -this.height / 3, 72, 72, game.images.ufo_corvette_cannon);
	cannon.collision_radius = 24;
	cannon.angle_granularity = 1;
	cannon.despawn_off_screen = false;
	this.add_entity(cannon);
	var cannon = new EnemyEntity(game, 0, this.height / 3, 72, 72, game.images.ufo_corvette_cannon);
	cannon.collision_radius = 24;
	cannon.angle_granularity = 1;
	cannon.despawn_off_screen = false;
	this.add_entity(cannon);

	var cannon = new EnemyEntity(game, this.width / 3, -this.height / 3, 72, 72, game.images.ufo_corvette_cannon);
	cannon.collision_radius = 24;
	cannon.angle_granularity = 1;
	cannon.despawn_off_screen = false;
	this.add_entity(cannon);
	var cannon = new EnemyEntity(game, this.width / 3, this.height / 3, 72, 72, game.images.ufo_corvette_cannon);
	cannon.collision_radius = 24;
	cannon.angle_granularity = 1;
	cannon.despawn_off_screen = false;
	this.add_entity(cannon);
}
UFOCorvetteEnemy.prototype = Object.create(EnemyContainerEntity.prototype);
UFOCorvetteEnemy.prototype.collision_radius = 64;
// UFOCorvetteEnemy.prototype.update = function(game) {
// 	EnemyContainerEntity.prototype.update.call(this, game);
// };
UFOCorvetteEnemy.prototype.fire = function(game, target) {
	for (var i = this.sub_entities.length - 1; i >= 0; i--) {
		var ent = this.sub_entities[i];
		var pos = this.get_global_position(ent);

		ent.angle = point_angle(pos.px, pos.py, target.px, target.py) - this.angle;
		this.spawn_bullets(game, pos, target);
	}
};
UFOCorvetteEnemy.prototype.spawn_bullets = function(game, from, to) {
	var target_angle = point_angle(from.px, from.py, to.px, to.py);

	for (var k = -1; k <= 1; k++) {
		var angle_offset = k * 10;
		for (var i = 0; i < 4; i++) {
			game.add_entity(new EnemyBullet(game, from.px, from.py, [
				{ timeout: 240, angle: target_angle + angle_offset, speed: 1 + i * 0.5 },
			], game.images.bright_purple_square_bullet));
		}
	}
};

function UFOMineLayer(game, px, py, path) {
	EnemyContainerEntity.call(this, game, px, py, 160, 64, game.images.ufo_mine_layer, path);
	this.angle = 0;

	this.health = 500;
	this.spawn_timer = 0;

	for (var i = -this.width / 3; i <= this.width / 3; i += 8) {
		var width = i;
		var height = (Math.random() - 0.5) * this.height * 0.8;
		width += width > 0 ? this.width / 32 : -this.width / 32;
		height += height > 0 ? this.height / 8 : -this.height / 8;

		var explosive_mine = new ExplosiveMine(game, width, height);
		explosive_mine.health = 100;
		explosive_mine.despawn_off_screen = false;
		this.add_entity(explosive_mine);
	}
}
UFOMineLayer.prototype = Object.create(EnemyContainerEntity.prototype);
UFOMineLayer.prototype.collision_radius = 32;
UFOMineLayer.prototype.update = function(game) {
	EnemyContainerEntity.prototype.update.call(this, game);

	this.spawn_timer++;
	if (this.spawn_timer > 40) {
		this.spawn_timer = 0;

		var offset = { px: Math.random() * 10, py: Math.random() * 10 };
		var ent = new ExplosiveMine(game, this.px + offset.px, this.py + offset.py, [
			{ timeout: 2000, sy: 0.5 },
		]);
		ent.z_index = -1;
		game.add_entity(ent);
	}
};
// UFOMineLayer.prototype.fire = function(game, target) {
// 	for (var i = this.sub_entities.length - 1; i >= 0; i--) {
// 		var ent = this.sub_entities[i];
// 		var pos = this.get_global_position(ent);

// 		ent.angle = point_angle(pos.px, pos.py, target.px, target.py) - this.angle;
// 		this.spawn_bullets(game, pos, target);
// 	}
// };
// UFOMineLayer.prototype.spawn_bullets = function(game, from, to) {
// 	var target_angle = point_angle(from.px, from.py, to.px, to.py);

// 	for (var k = -1; k <= 1; k++) {
// 		var angle_offset = k * 10;
// 		for (var i = 0; i < 4; i++) {
// 			game.add_entity(new EnemyBullet(game, from.px, from.py, [
// 				{ timeout: 240, angle: target_angle + angle_offset, speed: 1 + i * 0.5 },
// 			], game.images.bright_purple_square_bullet));
// 		}
// 	}
// };

function UFOSupplyShip(game, px, py, path) {
	EnemyContainerEntity.call(this, game, px, py, 128, 64, game.images.ufo_corvette, path);
	this.angle = 0;

	this.health = 500;
	this.fire_timer = 30 * 5;

	// var cannon = new EnemyEntity(game, 0, -this.height / 3, 48, 48, game.images.ufo_corvette_cannon);
	// cannon.collision_radius = 24;
	// cannon.angle_granularity = 1;
	// this.add_entity(cannon);
	// var cannon = new EnemyEntity(game, 0, this.height / 3, 48, 48, game.images.ufo_corvette_cannon);
	// cannon.collision_radius = 24;
	// cannon.angle_granularity = 1;
	// this.add_entity(cannon);

	// var cannon = new EnemyEntity(game, this.width / 3, -this.height / 3, 48, 48, game.images.ufo_corvette_cannon);
	// cannon.collision_radius = 24;
	// cannon.angle_granularity = 1;
	// this.add_entity(cannon);
	// var cannon = new EnemyEntity(game, this.width / 3, this.height / 3, 48, 48, game.images.ufo_corvette_cannon);
	// cannon.collision_radius = 24;
	// cannon.angle_granularity = 1;
	// this.add_entity(cannon);
}
UFOSupplyShip.prototype = Object.create(EnemyContainerEntity.prototype);
UFOSupplyShip.prototype.collision_radius = 32;
UFOSupplyShip.prototype.on_death = function(game) {
	EnemyContainerEntity.prototype.on_death.call(this, game);

	game.add_entity(new PickupBox(game, this.px, this.py, [{
		timeout: 240,
		angle: 90 + Math.random() * 90 - 45,
		speed: 0.5,
	}]));
};

function UFOCarrierDefensePlate(game, px, py) {
	EnemyEntity.call(this, game, px, py, 48, 96, game.images.ufo_carrier_armor);
	this.health = 500;
	this.fire_timer = Math.random() * 120;
}
UFOCarrierDefensePlate.prototype = Object.create(EnemyEntity.prototype);
UFOCarrierDefensePlate.prototype.collision_radius = 24;
UFOCarrierDefensePlate.prototype.update = function(game) {
	EnemyEntity.prototype.update.call(this, game);

	this.fire_timer++;
	if (this.fire_timer > 120) {
		this.fire_timer = 0;
		this.fire(game);
	}
};
UFOCarrierDefensePlate.prototype.fire = function(game) {
	var p = this;
	if (this.parent instanceof EnemyContainerEntity)
		p = this.parent.get_global_position(this);

	for (var i = -6; i <= 6; i++) {
		game.add_entity(new EnemyBullet(game, p.px, p.py, [
			{ timeout: 480, angle: p.angle + i * 2, speed: 2 },
		], game.images.bright_purple_square_bullet));
		
	}
};


function UFOCarrier(game, px, py, path) {
	EnemyContainerEntity.call(this, game, px, py, 128, 128, game.images.ufo_carrier_body, path);
	this.angle = Math.random() * 360;
	this.rotation = 0.1;


	this.health = 2000;
	this.spawn_timer = 0;

	for (var i = 0; i < 360 / 90; i++) {
		var angle = i * 90;
		var offset = point_offset(angle, 48);
		var plate = new UFOCarrierDefensePlate(game, offset.px, offset.py);
		plate.angle = angle;
		plate.despawn_off_screen = false;
		this.add_entity(plate);
	}
}
UFOCarrier.prototype = Object.create(EnemyContainerEntity.prototype);
UFOCarrier.prototype.collision_radius = 40;
UFOCarrier.prototype.update = function(game) {
	EnemyContainerEntity.prototype.update.call(this, game);

	this.spawn_timer++;
	if (this.spawn_timer > 360) {
		this.spawn_timer = 0;

		for (var i = 0; i < 360 / 90; i++) {
			var ent = new MiniUFOEnemy(game, this.px, this.py, [
				{ timeout: 120, angle: this.angle + 45 + i * 90, speed: 1, },
				{ timeout: 60, repeat: 100, angle: this.angle + 45, speed: 1,
					call: [{ method: 'fire_at', args: [PlayerShip] }] },
			]);
			ent.z_index = -1;
			ent.on_screen = true;
			game.add_entity(ent);
		}
	}
};
UFOCarrier.prototype.on_death = function(game) {
	EnemyContainerEntity.prototype.on_death.call(this, game);

	game.add_entity(new PickupBox(game, this.px, this.py, [{
		timeout: 240,
		angle: 90 + Math.random() * 90 - 45,
		speed: 0.5,
	}]));
};

function SmallCannon(game, px, py, path) {
	EnemyEntity.call(this, game, px, py, 32, 32, game.images.small_cannon_base, path);
	this.angle = 0;

	this.health = 100;

	var turret = new ScreenEntity(game, 0, 0, 32, 32, game.images.small_cannon_turret);
	turret.collision_radius = 24;
	turret.angle_granularity = 1;
	this.add_entity(turret);
}
SmallCannon.prototype = Object.create(EnemyEntity.prototype);
SmallCannon.prototype.collision_radius = 16;
SmallCannon.prototype.fire = function(game, target) {
	var ent = this.sub_entities[0];
	var pos = this.parent.get_global_position(this);

	var target_angle = point_angle(pos.px, pos.py, target.px, target.py);
	var diff = angle_diff(this.parent.angle + this.angle, target_angle);
	var offset = point_offset(this.parent.angle + this.angle, 20);
	game.game_systems.debug_system.add_debug_ray(pos, { px: pos.px + offset.px, py: pos.py + offset.py });

	if (Math.abs(diff) < 90) {
		ent.angle = -diff;
		this.spawn_bullets(game, pos, target);
	}
};
SmallCannon.prototype.spawn_bullets = function(game, from, to) {
	var target_angle = point_angle(from.px, from.py, to.px, to.py);

	game.add_entity(new EnemyBullet(game, from.px, from.py, [
		{ timeout: 480, angle: target_angle, speed: 2 },
	], game.images.orange_round_bullet));
};

function ExplosiveMine(game, px, py, path) {
	EnemyEntity.call(this, game, px, py, 24, 24, game.images.explosive_mine, path);
	this.angle = 0;

	this.health = 50;
}
ExplosiveMine.prototype = Object.create(EnemyEntity.prototype);
ExplosiveMine.prototype.collision_radius = 8;

function PickupBox(game, px, py, path) {
	PathEntity.call(this, game, px, py, 32, 32, game.images.pickup_box, path);
	this.rotation = 2;

	var dice_roll = Math.floor(Math.random() * 3);
	if (dice_roll === 0) {
		this.carrying = 'missiles';
	} else if (dice_roll === 1) {
		this.carrying = 'torpedoes';
	} else {
		this.carrying = 'familiars';
	}

	this.add_entity(new UIRasterText(game, 0, 0, 2, 2, this.carrying[0], game.images.ui_blockface_raster_font));
}
PickupBox.prototype = Object.create(PathEntity.prototype);
PickupBox.prototype.collision_radius = 20;
PickupBox.prototype.update = function(game) {
	PathEntity.prototype.update.call(this, game);

	if (this.current_action)
		this.current_action.sy += 0.02;
};


function PlayerFamiliarShip(game, px, py, parent_ship) {
	PathEntity.call(this, game, px, py, 32, 32, game.images.mini_fighter);
	this.angle_granularity = 3;

	this.fire_timer = 0;
	this.speed = 4;
	this.parent_ship = parent_ship;
}
PlayerFamiliarShip.prototype = Object.create(PathEntity.prototype);
PlayerFamiliarShip.prototype.update = function(game) {
	PathEntity.prototype.update.call(this, game);

	if (this.formation) {
		if (game.keystate.shift) {
			var target_position = {
				px: this.parent_ship.px + this.formation.px / 2,
				py: this.parent_ship.py + this.formation.py / 2,
			};
			
		} else {
			var target_position = {
				px: this.parent_ship.px + this.formation.px,
				py: this.parent_ship.py + this.formation.py,
			};
		}


		var speedx;
		if (Math.abs(this.px - target_position.px) < 5) {
			speedx = this.speed / 4;
		} else if (Math.abs(this.px - target_position.px) < 10) {
			speedx = this.speed / 2;
		} else {
			speedx = this.speed;
		}
		if (this.px + speedx < target_position.px) {
			this.px += speedx;
			if (this.angle < 15)
				this.angle++;
		} else if (this.px + -speedx > target_position.px) {
			this.px += -speedx;
			if (this.angle > -15)
				this.angle--;
		} else {
			if (this.angle > 0)
				this.angle--;
			else if (this.angle < 0)
				this.angle++;
		}

		var speedy;
		if (Math.abs(this.py - target_position.py) < 5) {
			speedy = this.speed / 4;
		} else if (Math.abs(this.py - target_position.py) < 10) {
			speedy = this.speed / 2;
		} else {
			speedy = this.speed;
		}

		if (this.py + speedy < target_position.py) {
			this.py += speedy;
		} else if (this.py + -speedy > target_position.py) {
			this.py += -speedy;
		}
	}

	if (this.fire_timer) {
		this.fire_timer--;
	} else {
		if (game.keystate.Z) {
			this.fire(game);
			this.fire_timer = 7;
		}
	}
};
PlayerFamiliarShip.prototype.fire = function(game) {
	var offset = point_offset(this.angle - 90, this.height / 2);
	game.entities_to_add.push(new PlayerBullet(game, this.px + offset.px, this.py + offset.py, [
		{ timeout: 40, angle: this.angle - 90, speed: 16 },
	], game.images.red_streak_bullet));
};


function ImmuneEntityTag(timer) {
	this.timer = timer;
}


function PlayerShip(game, px, py) {
	PathEntity.call(this, game, px, py, 64, 64, game.images.fighter_transform_animation);
	this.max_frame = 8;
	// this.angle = 0;

	this.transformation_step = 0;

	this.tilt_angle = 0;
	this.fire_timer = 0;
	this.missile_fire_timer = 0;
	this.torpedo_fire_timer = 0;
	this.speed = 6;
	this.special_weapon = undefined;
	this.has_familiars = false;

	this.angle_granularity = 3;

	this.entity_tags.push(new CollisionEntityTag());
	var cross = new ScreenEntity(game, 0, 0, 64, 64, game.images.ui_position_cross);
	cross.alpha = 0.5;
	cross.rotation = 1;
	cross.angle_granularity = 1;
	this.ui_entities.push(cross);
	var cross = new ScreenEntity(game, 0, 0, 64, 64, game.images.ui_position_cross);
	cross.alpha = 0.5;
	cross.rotation = -1;
	cross.angle_granularity = 1;
	this.ui_entities.push(cross);

	// this.spawn_familiars(game);
}
PlayerShip.prototype = Object.create(PathEntity.prototype);
PlayerShip.prototype.collision_radius = 8;
PlayerShip.prototype.collision_map = [
	{
		class: EnemyBullet,
		callback: 'hit_bullet',
	},
	{
		class: EnemyEntity,
		callback: 'hit_enemy',
	},
	{
		class: EnemyEntity,
		container_class: EnemyContainerEntity,
		callback: 'hit_enemy',
	},
	{
		class: PickupBox,
		callback: 'hit_pickup',
	},
];
PlayerShip.prototype.update = function(game) {
	PathEntity.prototype.update.call(this, game);

	if (game.keystate.shift) {
		if (this.transformation_step < 14) {
			this.transformation_step++;
		}
	} else {
		if (this.transformation_step > 0) {
			this.transformation_step--;
		}
	}
	this.frame = Math.floor(this.transformation_step / 2);
	this.speed = 6 - this.transformation_step / 4;

	if (game.keystate.left) {
		this.px -= this.speed;
		if (this.px < 0) {
			this.px = 0;
		}

		if (this.transformation_step === 0) {
			if (this.tilt_angle > 0) {
				this.tilt_angle -= 9;
			} else if (this.tilt_angle > -30) {
				this.tilt_angle -= 3;
			}
			this.width = 64 - Math.abs(this.tilt_angle / 30 * 10);
		}
	} else if (game.keystate.right) {
		this.px += this.speed;
		if (this.px >= 640) {
			this.px = 640 - 1;
		}
		if (this.transformation_step === 0) {
			if (this.tilt_angle < 0) {
				this.tilt_angle += 9;
			} else if (this.tilt_angle < 30) {
				this.tilt_angle += 3;
			}
			this.width = 64 - Math.abs(this.tilt_angle / 30 * 10);
		}
	} else {
		if (this.transformation_step === 0) {
			if (this.tilt_angle < 0) {
				this.tilt_angle += 3;
			} else if (this.tilt_angle > 0) {
				this.tilt_angle -= 3;
			}
			this.width = 64 - Math.abs(this.tilt_angle / 30 * 10);
		}
	}
	this.angle = this.tilt_angle;

	if (game.keystate.up) {
		this.py -= this.speed;
		if (this.py < 0) {
			this.py = 0;
		}
	} else if (game.keystate.down) {
		this.py += this.speed;
		if (this.py >= 480) {
			this.py = 480 - 1;
		}
	}

	if (this.fire_timer) {
		this.fire_timer--;
	} else {
		if (game.keystate.Z) {
			this.fire(game);
			this.fire_timer = 3;
		}
	}

	var tag = this.get_tag(ImmuneEntityTag);
	if (tag) {
		this.visible = (tag.timer % 2) > 0;
	} else {
		this.visible = true;
	}

	// this.fire_timer--;
	// if (this.fire_timer <= 0) {
	// 	this.fire(game);
	// 	this.fire_timer = 30 * 5;
	// }
};
PlayerShip.prototype.hit_pickup = function(game, other) {
	game.remove_entity(other);

	if (other.carrying === 'missiles' || other.carrying === 'torpedoes') {
		this.special_weapon = other.carrying;
	} else if (other.carrying === 'familiars') {
		if (!this.has_familiars) {
			this.has_familiars = true;
			this.spawn_familiars(game);
		}
	}
};
PlayerShip.prototype.hit_bullet = function(game, other) {
	game.remove_entity(other);
	if (!this.get_tag(ImmuneEntityTag)) {
		this.on_death(game);
		game.remove_entity(this);
	}
};
PlayerShip.prototype.hit_enemy = function(game, other) {
	if (!this.get_tag(ImmuneEntityTag)) {
		this.on_death(game);
		game.remove_entity(this);
	}
};
PlayerShip.prototype.on_death = function(game) {

	var p = this;
	// if (this.parent instanceof EnemyContainerEntity) {
	// 	p = this.parent.get_global_position(this);
	// }

	var count = 24 + Math.random() * 32;
	for (var i = 0; i < count; i++) {
		var offsetx = (Math.random() * this.width - (this.width / 2)) / 1.5;
		var offsety = (Math.random() * this.height - (this.height / 2)) / 1.5;
		game.particle_systems.explosion_particles.add_particle(p.px + offsetx, p.py + offsety, 2);
	}
	var count = Math.floor(2 + Math.random() * 2);
	for (var i = 0; i < count; i++) {
		game.particle_systems.ship_chunks.add_image_particle(this.image, this.width, this.height, p.px, p.py, 3);
	}

	for (var i = 0; i < this.sub_entities.length; i++) {
		if (this.sub_entities[i] instanceof EnemyEntity) {
			this.sub_entities[i].on_death(game);
		}
	}
};
PlayerShip.prototype.fire = function(game) {
	if (this.transformation_step >= 12) {
		if (this.special_weapon === 'missiles') {
			if (this.missile_fire_timer) {
				this.missile_fire_timer--;
			} else {
				this.missile_fire_timer = 3;

				var offset = point_offset(this.tilt_angle - 90 + 135, this.width / 2);
				game.add_entity(new PlayerMissile(game, this.px + offset.px, this.py + offset.py, [
					{ timeout: 60, angle: this.tilt_angle - 90 + 135, speed: 8 },
				]));
				var offset = point_offset(this.tilt_angle - 90 - 135, this.width / 2);
				game.add_entity(new PlayerMissile(game, this.px + offset.px, this.py + offset.py, [
					{ timeout: 60, angle: this.tilt_angle - 90 - 135, speed: 8 },
				]));
			}
		} else if (this.special_weapon === 'torpedoes') {
			if (this.torpedo_fire_timer) {
				this.torpedo_fire_timer--;
			} else {
				this.torpedo_fire_timer = 10;

				var offset = point_offset(this.tilt_angle - 90 + 135, this.width / 4);
				var offset_speed = point_offset(this.tilt_angle - 90 + 135, 2);
				game.add_entity(new PlayerTorpedo(game, this.px + offset.px, this.py + offset.py, [
					{ timeout: 10, angle: this.tilt_angle - 90, sx: offset_speed.px, sy: offset_speed.py, },
					{ timeout: 60, angle: this.tilt_angle - 90, speed: 8 },
				]));
				var offset = point_offset(this.tilt_angle - 90 - 135, this.width / 4);
				var offset_speed = point_offset(this.tilt_angle - 90 - 135, 2);
				game.add_entity(new PlayerTorpedo(game, this.px + offset.px, this.py + offset.py, [
					{ timeout: 10, angle: this.tilt_angle - 90, sx: offset_speed.px, sy: offset_speed.py, },
					{ timeout: 60, angle: this.tilt_angle - 90, speed: 8 },
				]));
			}
		} else {
			var offset = d2_point_offset(this.tilt_angle, -this.width / 3, -this.height / 2);
			game.entities_to_add.push(new PlayerBullet(game, this.px + offset.px, this.py + offset.py, [
				{ timeout: 40, angle: this.tilt_angle - 90 - 15, speed: 16 },
			], game.images.red_streak_bullet));
			var offset = d2_point_offset(this.tilt_angle, this.width / 3, -this.height / 2);
			game.entities_to_add.push(new PlayerBullet(game, this.px + offset.px, this.py + offset.py, [
				{ timeout: 40, angle: this.tilt_angle - 90 + 15, speed: 16 },
			], game.images.red_streak_bullet));
		}
	} else if (this.transformation_step === 0) {
		var offset = d2_point_offset(this.tilt_angle, -this.width / 3, -this.height / 2);
		game.entities_to_add.push(new PlayerBullet(game, this.px + offset.px, this.py + offset.py, [
			{ timeout: 40, angle: this.tilt_angle - 90 - 15, speed: 16 },
		], game.images.red_streak_bullet));
		var offset = d2_point_offset(this.tilt_angle, this.width / 3, -this.height / 2);
		game.entities_to_add.push(new PlayerBullet(game, this.px + offset.px, this.py + offset.py, [
			{ timeout: 40, angle: this.tilt_angle - 90 + 15, speed: 16 },
		], game.images.red_streak_bullet));
	}
	var offset = d2_point_offset(this.tilt_angle, -this.width / 8, -this.height / 2);
	game.entities_to_add.push(new PlayerBullet(game, this.px + offset.px, this.py + offset.py, [
		{ timeout: 40, angle: this.tilt_angle - 90, speed: 16 },
	], game.images.red_streak_bullet));
	var offset = d2_point_offset(this.tilt_angle, this.width / 8, -this.height / 2);
	game.entities_to_add.push(new PlayerBullet(game, this.px + offset.px, this.py + offset.py, [
		{ timeout: 40, angle: this.tilt_angle - 90, speed: 16 },
	], game.images.red_streak_bullet));
};
PlayerShip.prototype.spawn_familiars = function(game) {
	var familiar = new PlayerFamiliarShip(game, this.px, this.py, this);
	familiar.formation = { px: -this.width, py: this.height / 2 };
	game.add_entity(familiar);
	var familiar = new PlayerFamiliarShip(game, this.px, this.py, this);
	familiar.formation = { px: this.width, py: this.height / 2 };
	game.add_entity(familiar);
};


function RespawnSystem(game) {
	ScreenEntity.call(this, game, game.canvas.width / 2, game.canvas.height / 2);

	this.respawn_timer = 0;
}
RespawnSystem.prototype = Object.create(ScreenEntity.prototype);
RespawnSystem.prototype.update = function(game) {
	Entity.prototype.update.call(this, game);

	var player = game.query_entities(PlayerShip)[0];

	if (!player) {
		this.respawn_timer++;
		if (this.respawn_timer > 180) {
			this.respawn_timer = 0;
			player = new PlayerShip(game, 320, 480 - 80);
			player.add_tag(new ImmuneEntityTag(90));
			game.add_entity(player);
		}
	}
};


function main () {
	var canvas = document.querySelector('#game_canvas');
	var ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;


	var assets = {
		images: {
			fighter: "assets/fighter.png",
			fighter_missile: "assets/fighter_missile.png",
			fighter_torpedo: "assets/fighter_torpedo.png",
			mini_fighter: "assets/mini_fighter.png",
			fighter_attack_formation: "assets/fighter_attack_formation.png",
			fighter_transform_animation: "assets/fighter_transform_animation.png",
			ufo: "assets/ufo.png",
			ufo_mini: "assets/ufo_mini.png",
			// ufo_small: "assets/ufo_small.png",
			ufo_corsair: "assets/ufo_corsair.png",
			ufo_corvette: "assets/ufo_corvette.png",
			ufo_mine_layer: "assets/ufo_mine_layer.png",
			ufo_corvette_cannon: "assets/ufo_corvette_cannon.png",
			small_cannon_base: "assets/small_cannon_base.png",
			small_cannon_turret: "assets/small_cannon_turret.png",
			point_defense_drone: "assets/point_defense_drone.png",
			ufo_carrier_body: "assets/ufo_carrier_body.png",
			ufo_carrier_armor: "assets/ufo_carrier_armor.png",

			platform_core: "assets/platform_core.png",
			platform_sections: "assets/platform_sections.png",
			ufo_station_core: "assets/ufo_station_core.png",
			ufo_station_pylon: "assets/ufo_station_pylon.png",
			ufo_station_pylon2: "assets/ufo_station_pylon2.png",

			red_streak_bullet: "assets/red_streak_bullet.png",
			bright_blue_square_bullet: "assets/bright_blue_square_bullet.png",
			bright_purple_square_bullet: "assets/bright_purple_square_bullet.png",
			purple_square_bullet: "assets/purple_square_bullet.png",
			orange_round_bullet: "assets/orange_round_bullet.png",
			explosive_mine: "assets/explosive_mine.png",
			// enemy_bullet_orange: "assets/enemy_bullet_orange.png",
			// enemy_bullet_overlay_effect: "assets/enemy_bullet_overlay_effect.png",
			purple_crystal: "assets/purple_crystal.png",
			particle_effect_generic: "assets/particle_effect_generic.png",
			particle_effect_explosion: "assets/particle_effect_explosion.png",
			particle_star: "assets/particle_star.png",

			asteroid_64: "assets/asteroid_64.png",
			chop_piece: "assets/chop_piece.png",
			pound_sign: "assets/pound_sign.png",

			ui_position_cross: "assets/ui_position_cross.png",
			ui_blockface_raster_font: "assets/ui_blockface_raster_font.png",
			pickup_box: "assets/pickup_box.png",
		},
	};

	load_all_assets(assets, function (loaded_assets) {
		console.log("all assets loaded");

		var game = new GameSystem(canvas, loaded_assets);


		game.game_systems.collision_system = new CircularCollisionSystem(game);
		// game.game_systems.input_manager = new InputManager(game);
		// game.game_systems.input_manager.input_handlers.push({
		// 	type: 'key_pressed',
		// 	key: 'O',
		// 	callback: function (game) {
		// 		game.game_systems.debug_system.visible = !game.game_systems.debug_system.visible;
		// 	},
		// });

		game.game_systems.ui_container = new Entity(game);
		game.game_systems.ui_container.z_index = 100;
		var debug_button = new UIButton(game, 640 - 16, 480 - 16, 32, 32, game.images.pound_sign);
		debug_button.on_down = function (game) {
			this.angle = this.angle === 0 ? 90 : 0;
			// game.update_entities = !game.update_entities;
			game.game_systems.debug_system.visible = !game.game_systems.debug_system.visible;
		};
		// debug_button.on_up = function (game) {
		// 	this.angle = 0;
		// 	game.game_systems.debug_system.visible = false;
		// };
		game.game_systems.ui_container.add_entity(debug_button);

		game.game_systems.debug_system = new DebugSystem(game);
		game.game_systems.debug_system.visible = false;

		game.game_systems.debug_system.add_debug_text({
			update: function (game) {
				var player_bullets = game.query_entities(PlayerBullet);
				this.text = "# player bullets: " + player_bullets.length;
			},
		});

		game.game_systems.debug_system.add_debug_text({
			update: function (game) {
				this.text = "# stars: " + (game.particle_systems.star_particles.particles.length +
					game.particle_systems.blue_star_particles.particles.length +
					game.particle_systems.red_star_particles.particles.length);
			},
		});

		game.game_systems.respawn_system = new RespawnSystem(game);
		game.game_systems.spawn_system = new PathEntity(game, 0, 0, undefined, undefined, undefined, [
			{ timeout: 60, repeat: 4, spawn_entity: [
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + 15, speed: 1 }]] },
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + 15, speed: 1.25 }]] },
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + 15, speed: 1.5 }]] },
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + -15, speed: 1 }]] },
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + -15, speed: 1.25 }]] },
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + -15, speed: 1.5 }]] },
			]},
			{ timeout: 60 },
			{ timeout: 120, spawn_entity: [
				{ class: UFOEnemy, px: 150, py: -100, args: [[
						{ timeout: 120, angle: 90, speed: 1.5 },
						{ timeout: 120, repeat: 4, sy: 1, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, angle: 90, speed: 1.5 },]] },
				{ class: UFOEnemy, px: 640 - 150, py: -100, args: [[
						{ timeout: 120, angle: 90, speed: 1.5 },
						{ timeout: 120, repeat: 4, sy: 1, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, angle: 90, speed: 1.5 },]] },
			]},
			{ timeout: 60, repeat: 4, spawn_entity: [
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + 15, speed: 1 }]] },
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + 15, speed: 1.5 }]] },
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + -15, speed: 1 }]] },
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + -15, speed: 1.5 }]] },
			]},
			{ timeout: 120, spawn_entity: [
				{ class: UFOEnemy, px: 150, py: -100, args: [[
						{ timeout: 120, angle: 90, speed: 1.5 },
						{ timeout: 120, repeat: 4, sy: 1, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, angle: 90, speed: 1.5 },]] },
				{ class: UFOEnemy, px: 640 - 150, py: -100, args: [[
						{ timeout: 120, angle: 90, speed: 1.5 },
						{ timeout: 120, repeat: 4, sy: 1, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, angle: 90, speed: 1.5 },]] },
			]},
			{ timeout: 60, repeat: 4, spawn_entity: [
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + 15, speed: 1 }]] },
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + 15, speed: 1.5 }]] },
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + -15, speed: 1 }]] },
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + -15, speed: 1.5 }]] },
			]},
			{ timeout: 60 },
			{ timeout: 120, spawn_entity: [
				{ class: PointSuppressionDrone, px: 120, py: -100, args: [[
						{ timeout: 40, repeat: 20, sy: 1, call: [{ method: 'fire' }] },]] },
				{ class: PointSuppressionDrone, px: 640 - 120, py: -200, args: [[
						{ timeout: 40, repeat: 20, sy: 1, call: [{ method: 'fire' }] },]] },
				{ class: PointSuppressionDrone, px: 320, py: -400, args: [[
						{ timeout: 40, repeat: 20, sy: 1, call: [{ method: 'fire' }] },]] },
			]},
			{ timeout: 60, repeat: 4, spawn_entity: [
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + 15, speed: 1 }]] },
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + 15, speed: 1.5 }]] },
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + -15, speed: 1 }]] },
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + -15, speed: 1.5 }]] },
			]},



			{ timeout: 240 },
			{ timeout: 120, spawn_entity: [
				{ class: UFOSupplyShip, px: 640 + 50, py: 50, args: [[
						{ timeout: 2000, angle: 90 + 30 + 45, speed: 1.2 },]] },
			]},
			{ timeout: 120 },
			{ timeout: 120, repeat: 4, spawn_entity: [
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + 15, speed: 1 }]] },
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + 15, speed: 1.5 }]] },
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + -15, speed: 1 }]] },
				{ class: Asteroid, px: 320, py: -100, scatter: { width: 640 },
						args: [[{ timeout: 1000, angle: 90 + -15, speed: 1.5 }]] },
				{ class: CannonAsteroid, px: 320, py: -100, scatter: { width: 640 }, args: [[
						{ timeout: 1000, angle: 90 + 15, speed: 1.5 },]] },
				{ class: CannonAsteroid, px: 320, py: -100, scatter: { width: 640 }, args: [[
						{ timeout: 1000, angle: 90 + -15, speed: 1.5 },]] },
			]},
			{ timeout: 240 },
			{ timeout: 360 },
			{ timeout: 120, spawn_entity: [
				{ class: MiniUFOEnemy, px: 50, py: -100, args: [[
						{ timeout: 60, angle: 90, speed: 2 },
						{ timeout: 30, repeat: 4, angle: 90, speed: 1.5, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, angle: 90, speed: 2 },]] },
				{ class: MiniUFOEnemy, px: 150, py: -150, args: [[
						{ timeout: 60, angle: 90, speed: 2 },
						{ timeout: 30, repeat: 4, angle: 90, speed: 1.5, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, angle: 90, speed: 2 },]] },
				{ class: MiniUFOEnemy, px: 250, py: -200, args: [[
						{ timeout: 60, angle: 90, speed: 2 },
						{ timeout: 30, repeat: 4, angle: 90, speed: 1.5, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, angle: 90, speed: 2 },]] },
				{ class: MiniUFOEnemy, px: 640 - 50, py: -100, args: [[
						{ timeout: 60, angle: 90, speed: 2 },
						{ timeout: 30, repeat: 4, angle: 90, speed: 1.5, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, angle: 90, speed: 2 },]] },
				{ class: MiniUFOEnemy, px: 640 - 150, py: -150, args: [[
						{ timeout: 60, angle: 90, speed: 2 },
						{ timeout: 30, repeat: 4, angle: 90, speed: 1.5, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, angle: 90, speed: 2 },]] },
				{ class: MiniUFOEnemy, px: 640 - 250, py: -200, args: [[
						{ timeout: 60, angle: 90, speed: 2 },
						{ timeout: 30, repeat: 4, angle: 90, speed: 1.5, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, angle: 90, speed: 2 },]] },
			]},
			{ timeout: 120, spawn_entity: [
				{ class: UFOEnemy, px: 200, py: -100, args: [[
						{ timeout: 100, angle: 90, speed: 1.5 },
						{ timeout: 120, repeat: 3, angle: 90, speed: 1.5, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, angle: 90, speed: 1.5 },]] },
				{ class: UFOEnemy, px: 200, py: -180, args: [[
						{ timeout: 140, angle: 90, speed: 1.5 },
						{ timeout: 120, repeat: 3, angle: 90, speed: 1.5, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, angle: 90, speed: 1.5 },]] },
				{ class: UFOEnemy, px: 200, py: -260, args: [[
						{ timeout: 180, angle: 90, speed: 1.5 },
						{ timeout: 120, repeat: 3, angle: 90, speed: 1.5, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, angle: 90, speed: 1.5 },]] },
			]},
			{ timeout: 240 },
			{ timeout: 120, spawn_entity: [
				{ class: UFOEnemy, px: 640 - 200, py: -100, args: [[
						{ timeout: 100, angle: 90, speed: 1.5 },
						{ timeout: 120, repeat: 3, angle: 90, speed: 1.5, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, angle: 90, speed: 1.5 },]] },
				{ class: UFOEnemy, px: 640 - 200, py: -180, args: [[
						{ timeout: 140, angle: 90, speed: 1.5 },
						{ timeout: 120, repeat: 3, angle: 90, speed: 1.5, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, angle: 90, speed: 1.5 },]] },
				{ class: UFOEnemy, px: 640 - 200, py: -260, args: [[
						{ timeout: 180, angle: 90, speed: 1.5 },
						{ timeout: 120, repeat: 3, angle: 90, speed: 1.5, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, angle: 90, speed: 1.5 },]] },
			]},
			{ timeout: 240, spawn_entity: [
				{ class: UFOSupplyShip, px: -50, py: 100, args: [[
						{ timeout: 2000, angle: 90 - 15 - 45, speed: 1.2 },]] },
			]},
			{ timeout: 360 },
			{ timeout: 120, spawn_entity: [
				{ class: HeavyUFOEnemy, px: 320, py: -80, args: [[
						{ timeout: 2000, angle: 90, speed: 0.8 },]] },
				{ class: HeavyUFOEnemy, px: 320 + 100, py: -100, args: [[
						{ timeout: 2000, angle: 90 + -15, speed: 0.8 },]] },
				{ class: HeavyUFOEnemy, px: 320 - 100, py: -140, args: [[
						{ timeout: 2000, angle: 90 + 15, speed: 0.8 },]] },
			]},
			{ timeout: 360 },
			{ timeout: 120, spawn_entity: [
				{ class: UFOMineLayer, px: -100, py: 50, args: [[
						{ timeout: 1000, angle: 15, speed: 1.5 },]] },
				{ class: UFOMineLayer, px: 640 + 100, py: 70, args: [[
						{ timeout: 1000, angle: 180 - 15, speed: 1.5 },]] },
			]},
			{ timeout: 240 },
			{ timeout: 120, spawn_entity: [
				{ class: UFOMineLayer, px: -100, py: 50, args: [[
						{ timeout: 1000, angle: 15, speed: 1.5 },]] },
				{ class: UFOMineLayer, px: 640 + 100, py: 70, args: [[
						{ timeout: 1000, angle: 180 - 15, speed: 1.5 },]] },
			]},

			{ timeout: 240 },
			{ timeout: 120, spawn_entity: [
				{ class: UFOPlatform, px: 200, py: -150, args: [[
						{ timeout: 100, sy: 2, },
						{ timeout: 180, repeat: 4, sy: 0.1, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, sx: -1, sy: 2, },]] },
				{ class: UFOPlatform, px: 640 - 200, py: -150, args: [[
						{ timeout: 100, sy: 2, },
						{ timeout: 180, repeat: 4, sy: 0.1, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, sx: 1, sy: 2, },]] },
			]},
			{ timeout: 480 },
			{ timeout: 120, spawn_entity: [
				{ class: MiniUFOEnemy, px: -50, py: 60, args: [[
						{ timeout: 60, sx: 2, },
						{ timeout: 30, repeat: 5, sx: 2, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, sx: 2 },]] },
				{ class: MiniUFOEnemy, px: 640 + 50, py: 60, args: [[
						{ timeout: 60, sx: -2, },
						{ timeout: 30, repeat: 5, sx: -2, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, sx: -2, },]] },
				{ class: MiniUFOEnemy, px: -70, py: 100, args: [[
						{ timeout: 60, sx: 2, },
						{ timeout: 30, repeat: 5, sx: 2, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, sx: 2 },]] },
				{ class: MiniUFOEnemy, px: 640 + 70, py: 100, args: [[
						{ timeout: 60, sx: -2, },
						{ timeout: 30, repeat: 5, sx: -2, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, sx: -2, },]] },
				{ class: MiniUFOEnemy, px: -90, py: 140, args: [[
						{ timeout: 60, sx: 2, },
						{ timeout: 30, repeat: 5, sx: 2, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, sx: 2 },]] },
				{ class: MiniUFOEnemy, px: 640 + 90, py: 140, args: [[
						{ timeout: 60, sx: -2, },
						{ timeout: 30, repeat: 5, sx: -2, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, sx: -2, },]] },
			]},
			{ timeout: 240 },
			{ timeout: 1, spawn_entity: [
				{ class: TargetSuppressionDrone, px: 320, py: -80, args: [[
						{ timeout: 100, sy: 1, },
						{ timeout: 400, repeat: 2, sy: 0.2, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, sx: 1, sy: -1, },]] },
			]},
			{ timeout: 120, repeat: 3, spawn_entity: [
				{ class: UFOEnemy, px: -50, py: 60, args: [[
						{ timeout: 100, sx: 1, },
						{ timeout: 60, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, sx: 1, sy: 1, },]] },
				{ class: UFOEnemy, px: 640 + 50, py: 60, args: [[
						{ timeout: 100, sx: -1, },
						{ timeout: 60, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, sx: -1, sy: 1, },]] },
			]},
			{ timeout: 240 },
			{ timeout: 240, spawn_entity: [
				{ class: UFOSupplyShip, px: -50, py: 100, args: [[
						{ timeout: 2000, angle: 90 - 15 - 45, speed: 1.2 },]] },
			]},
			{ timeout: 480 },
			{ timeout: 120, spawn_entity: [
				{ class: UFOCorsairEnemy, px: 150, py: -80, args: [[
						{ timeout: 100, angle: 90, sy: 1, },
						{ timeout: 240, repeat: 3, sy: 0.25, call: [{ method: 'fire' }] },
						{ timeout: 1000, sy: 1.5 },]] },
				{ class: UFOCorsairEnemy, px: 640 - 150, py: -80, args: [[
						{ timeout: 100, angle: 90, sy: 1, },
						{ timeout: 240, repeat: 3, sy: 0.25, call: [{ method: 'fire' }] },
						{ timeout: 1000, sy: 1.5 },]] },
				{ class: UFOCorsairEnemy, px: 250, py: -160, args: [[
						{ timeout: 240, angle: 90, sy: 1, },
						{ timeout: 240, repeat: 3, sy: 0.25, call: [{ method: 'fire' }] },
						{ timeout: 1000, sy: 1.5 },]] },
				{ class: UFOCorsairEnemy, px: 640 - 250, py: -160, args: [[
						{ timeout: 240, angle: 90, sy: 1, },
						{ timeout: 240, repeat: 3, sy: 0.25, call: [{ method: 'fire' }] },
						{ timeout: 1000, sy: 1.5 },]] },
				{ class: UFOCorvetteEnemy, px: 320, py: -200, args: [[
						{ timeout: 360, angle: 90, sy: 0.75, },
						{ timeout: 240, repeat: 3, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, sy: -1, },]] },
			]},
			{ timeout: 720 },
			{ timeout: 120, spawn_entity: [
				{ class: UFOStation, px: 150, py: -80, args: [[
						{ timeout: 100, sy: 1, },
						{ timeout: 240, repeat: 3, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, sx: 2, },]] },
				{ class: UFOStation, px: 640 - 100, py: -80, args: [[
						{ timeout: 100, sy: 1, },
						{ timeout: 240, repeat: 3, call: [{ method: 'fire_at', args: [PlayerShip] }] },
						{ timeout: 1000, sx: -2, },]] },
				{ class: UFOCarrier, px: 320, py: -160, args: [[
						{ timeout: 1000, sy: 0.3, },
						{ timeout: 960, },
						{ timeout: 1000, sy: 2, },]] },
			]},
		]);

		// game.game_systems.debug_system.add_debug_text({
		// 	update: function (game) {
		// 		var enemy_entities = game.query_entities(EnemyEntity);
		// 		this.text = "# enemy entities: " + enemy_entities.length;
		// 	},
		// });

		game.add_entity(new PlayerShip(game, 320, 480 - 80));

		// game.add_entity(new UFOStation(game, 320, 0, [
		// 	{ timeout: 120, sy: 0.1 },
		// 	{ timeout: 360, repeat: 4, sy: 0.1, call: [{ method: 'fire', args: [320, 240] }] },
		// ]));

		// game.add_entity(new UFOPlatform(game, 320, 0, [
		// 	{ timeout: 1000, sy: 0.5 },
		// 	{ timeout: 120, repeat: 4, call: [{ method: 'fire', args: [300, 300] }] },
		// 	{ timeout: 360, sy: 0.5, sx: 0.5 },
		// ]));

		// game.add_entity(new UFOEnemy(game, 0,100, [
		// 	{ timeout: 640, sx: 1 },
		// 	{ timeout: 640, sx: -1 },
		// ]));

		// game.add_entity(new UFOEnemy(game, 640,100, [
		// 	{ timeout: 640, sx: -1 },
		// 	{ timeout: 640, sx: 1 },
		// ]));

		// for (var i = 0; i < 8; i++) {
		// 	game.add_entity(new CannonAsteroid(game, Math.random() * (640 + 200) - 100, -100 - Math.random() * 200, [
		// 		{ px: Math.random() * (640 + 200) - 100, py: 800, speed: 1.5 },
		// 	]));
		// }

		// game.add_entity(new UFOEnemy(game, 100,-100, [
		// 	{ timeout: 120, sy: 1 },
		// 	{ timeout: 120, repeat: 5, sy: 1, call: [{ method: 'fire_at', args: [PlayerShip] }] },
		// ]));

		// game.add_entity(new PointSuppressionDrone(game, 100,-100, [
		// 	{ timeout: 120, sy: 1 },
		// 	{ timeout: 30, repeat: 25, sy: 1, call: [{ method: 'fire' }] },
		// ]));

		// game.add_entity(new TargetSuppressionDrone(game, 500,-100, [
		// 	{ timeout: 120, sy: 1 },
		// 	{ timeout: 400, repeat: 25, sy: 0.20, call: [{ method: 'fire_at', args: [PlayerShip] }] },
		// ]));

		// game.add_entity(new UFOCarrier(game, 320,-100, [
		// 	{ timeout: 360, repeat: 10, sy: 0.2 },
		// ]));

		// game.add_entity(new HeavyUFOEnemy(game, 500, -100, [
		// 	{ timeout: 960, sy: 1 },
		// ]));
		// game.add_entity(new UFOSupplyShip(game, 500, -100, [
		// 	{ timeout: 960, angle: 120, speed: 1 },
		// ]));
		// game.add_entity(new UFOMineLayer(game, 500, 100, [
		// 	{ timeout: 960, angle: 120, speed: 0.5 },
		// ]));

		// game.add_entity(new UFOEnemy(game, 640 - 100, 100, [
		// 	{ timeout: 120, sy: 1 },
		// 	{ timeout: 60, repeat: 5, sy: 1, call: [{ method: 'fire', args: [300, 300] }] },
		// ]));

		// game.add_entity(new UFOCorvetteEnemy(game, 320, -100, [
		// 	{ timeout: 180, angle: 90, speed: 1 },
		// 	{ timeout: 180, repeat: 2, angle: 90, speed: 0.1, call: [{ method: 'fire_at', args: [PlayerShip] }] },
		// 	{ timeout: 180, repeat: 2, angle: 90, da: 90 / (180 * 2), speed: 0.25, call: [{ method: 'fire_at', args: [PlayerShip] }] },
		// 	{ timeout: 360, angle: 180, speed: 0.75, call: [{ method: 'fire_at', args: [PlayerShip] }] },
		// ]));
		// game.add_entity(new UFOCorsairEnemy(game, 320, -100, [
		// 	{ timeout: 180, angle: 90, speed: 1 },
		// 	{ timeout: 180, repeat: 2, angle: 90, speed: 0.1, call: [{ method: 'fire' }] },
		// 	{ timeout: 180, repeat: 2, angle: 90, da: 90 / (180 * 2), speed: 0.25, call: [{ method: 'fire' }] },
		// 	{ timeout: 360, angle: 180, speed: 0.75, call: [{ method: 'fire' }] },
		// ]));

		// game.add_entity(new UFOPlatform(game, 500,-400, [
		// 	{ timeout: 1000, sy: 0.5 },
		// 	{ timeout: 120, repeat: 4, call: [{ method: 'fire', args: [300, 300] }] },
		// 	{ timeout: 360, sy: 0.5, sx: 0.5 },
		// ]));


		// game.add_entity(new EnemyBullet(game, 8,8, []));
		// game.add_entity(new UFOPlatform(game, 100,100));
		// game.add_entity(new UFOPlatform(game, 200,100));
		// game.add_entity(new UFOPlatform(game, 300,100));
		// game.add_entity(new UFOPlatform(game, 400,100));
		// game.add_entity(new UFOPlatform(game, 500,100));
		// game.add_entity(new UFOEnemy(game, 100,100));
		// game.add_entity(new UFOCorsairEnemy(game, 300,100));
		game.particle_systems.purple_particles = new ParticleEffectSystem(game, {
			fill_style: '#404',
			particle_deflate: 1.5,
		});
		game.particle_systems.red_particles = new ParticleEffectSystem(game, {
			fill_style: '#f88',
			particle_size: 12,
			particle_longevity: 0.3,
			particle_deflate: 1.5,
		});
		game.particle_systems.ship_chunks = new ParticleEffectSystem(game, {
			dynamic_images: true,
			particle_image: game.images.chop_piece,
			chopped_images: true,
			masked_images: true,
			max_frame: 1,
			particle_longevity: 0.003, 
		});
		game.particle_systems.explosion_particles = new ParticleEffectSystem(game, {
			particle_image: game.images.particle_effect_explosion,
			particle_size: 32,
			particle_longevity: 0.3,
			particle_respawn: 0.2,
		});
		game.particle_systems.star_particles = new ScrollingParticleBackground(game, {
			particle_image: game.images.particle_star,
			static_images: true,
			particle_size: 8,
			particle_longevity: -1,

			particle_spawn_density: 0.5,
			particle_spawn_count: 1,
			particle_min_speed: 0.1,
			particle_speed: 20,
		});
		game.particle_systems.star_particles.z_index = -1000;
		game.particle_systems.blue_star_particles = new ScrollingParticleBackground(game, {
			particle_image: game.images.particle_star,
			fill_style: '#46a',
			static_images: true,
			particle_size: 8,
			particle_longevity: -1,

			particle_spawn_density: 0.05,
			particle_spawn_count: 1,
			particle_min_speed: 1,
			particle_speed: 10,
		});
		game.particle_systems.blue_star_particles.z_index = -1000;
		game.particle_systems.red_star_particles = new ScrollingParticleBackground(game, {
			particle_image: game.images.particle_star,
			fill_style: '#fa4',
			static_images: true,
			particle_size: 12,
			particle_longevity: -1,

			particle_spawn_density: 0.05,
			particle_spawn_count: 1,
			particle_min_speed: 0.4,
			particle_speed: 20,
		});
		game.particle_systems.red_star_particles.z_index = -1000;

		setInterval(game.step_game_frame.bind(game, ctx), 1000 / 60);
	});
}


window.addEventListener('load', main);



