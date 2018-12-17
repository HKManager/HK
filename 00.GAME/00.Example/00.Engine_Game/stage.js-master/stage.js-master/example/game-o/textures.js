Stage({
  image : { src : "./main.png", ratio : 8 },
  ppu : 16,
  textures : {
    "playbg"     : { x : 0.1,  y : 0.1,  width : 0.8,     height : 0.8 },
    "homebg"     : { x : 1.1,  y : 0.1,  width : 0.8,     height : 0.8 },

    "shadow"     : { x : 6.6,  y : 0,    width : 0.3,     height : 0.1 },

    "option"     : { x : 9.5,  y : 0.25, width : 1.5,     height : 1.5 },
    "play"       : { x : 7.5,  y : 0.25, width : 1.5,     height : 1.5 },

    "tombstone"  : { x :12+3/8,y : 0,    width : 4-3/8,   height : 4-3/8 },

    "coin_1"     : { x : 0,    y : 2,    width : 1,       height : 1 },
    "coin_2"     : { x : 1,    y : 2,    width : 1,       height : 1 },
    "coin_5"     : { x : 2,    y : 2,    width : 1,       height : 1 },
    "coin_10"    : { x : 3,    y : 2,    width : 1,       height : 1 },
    "coin_20"    : { x : 4,    y : 2,    width : 1,       height : 1 },
    "coin_50"    : { x : 5,    y : 2,    width : 1,       height : 1 },
    "coin_100"   : { x : 6,    y : 2,    width : 1,       height : 1 },
    "coin_1000"  : { x : 7,    y : 2,    width : 1,       height : 1 },
    "coin_10000" : { x : 8,    y : 2,    width : 1,       height : 1 },

    "up_power"   : { x : 6,    y : 3,    width : 1,       height : 1 },
    "up_energy"  : { x : 7,    y : 3,    width : 1,       height : 1 },
    "up_speed"   : { x : 8,    y : 3,    width : 1,       height : 1 },
    "up_pull"    : { x : 9,    y : 3,    width : 1,       height : 1 },
    "up_push"    : { x : 10,   y : 3,    width : 1,       height : 1 },
    "up_slow"    : { x : 11,   y : 3,    width : 1,       height : 1 },

    "tri_0"      : { x : 0,    y : 4,    width : 1,       height : 1 },
    "tri_1"      : { x : 1,    y : 4,    width : 1,       height : 1 },
    "tri_2"      : { x : 2,    y : 4,    width : 1,       height : 1 },
    "tri_3"      : { x : 3,    y : 4,    width : 1,       height : 1 },
    "tri_4"      : { x : 4,    y : 4,    width : 1,       height : 1 },
    "tri_5"      : { x : 5,    y : 4,    width : 1,       height : 1 },
    "tri_6"      : { x : 6,    y : 4,    width : 1,       height : 1 },
    "tri_7"      : { x : 7,    y : 4,    width : 1,       height : 1 },
    "tri_8"      : { x : 8,    y : 4,    width : 1,       height : 1 },
    "tri_9"      : { x : 9,    y : 4,    width : 1,       height : 1 },
    "tri_a"      : { x : 10,   y : 4,    width : 1,       height : 1 },
    "tri_b"      : { x : 11,   y : 4,    width : 1,       height : 1 },
    "tri_c"      : { x : 12,   y : 4,    width : 1,       height : 1 },

    "tri_live"   : [ "tri_0", "tri_1", "tri_2", "tri_3", "tri_4",
                     "tri_4", "tri_3", "tri_2", "tri_1", "tri_0" ],

    "tri_weak"   : [ "tri_6", "tri_7", "tri_8", "tri_9", "tri_a", "tri_b" ],

    "tri_mix"    : [ "tri_1", "tri_0", "tri_0", "tri_1", "tri_2",
                     "tri_6", "tri_7", "tri_8",
                     "tri_3", "tri_4", "tri_4", "tri_3", "tri_2",
                     "tri_9", "tri_a", "tri_b" ],

    "tri_dead"   : [ "tri_5" ],

    "box_0"      : { x : 0,    y : 5,    width : 1,       height : 1 },
    "box_1"      : { x : 1,    y : 5,    width : 1,       height : 1 },
    "box_2"      : { x : 2,    y : 5,    width : 1,       height : 1 },
    "box_3"      : { x : 3,    y : 5,    width : 1,       height : 1 },
    "box_4"      : { x : 4,    y : 5,    width : 1,       height : 1 },
    "box_5"      : { x : 5,    y : 5,    width : 1,       height : 1 },
    "box_6"      : { x : 6,    y : 5,    width : 1,       height : 1 },
    "box_7"      : { x : 7,    y : 5,    width : 1,       height : 1 },
    "box_8"      : { x : 8,    y : 5,    width : 1,       height : 1 },
    "box_9"      : { x : 9,    y : 5,    width : 1,       height : 1 },
    "box_a"      : { x : 10,   y : 5,    width : 1,       height : 1 },
    "box_b"      : { x : 11,   y : 5,    width : 1,       height : 1 },
    "box_c"      : { x : 12,   y : 5,    width : 1,       height : 1 },

    "box_live"   : [ "box_0", "box_1", "box_2", "box_3", "box_4",
                     "box_4", "box_3", "box_2", "box_1", "box_0" ],

    "box_weak"   : [ "box_6", "box_7", "box_8", "box_9", "box_a", "box_b" ],

    "box_mix"    : [ "box_1", "box_0", "box_0", "box_1", "box_2",
                     "box_6", "box_7", "box_8",
                     "box_3", "box_4", "box_4", "box_3", "box_2",
                     "box_9", "box_a", "box_b" ],

    "box_dead"   : [ "box_5" ],

    "player" : [
                   { x : 0,    y : 6,    width : 1,       height : 1 },
                   { x : 1,    y : 6,    width : 1,       height : 1 },
                   { x : 2,    y : 6,    width : 1,       height : 1 },
                   { x : 3,    y : 6,    width : 1,       height : 1 },
                   { x : 4,    y : 6,    width : 1,       height : 1 },
                   { x : 3,    y : 6,    width : 1,       height : 1 },
                   { x : 2,    y : 6,    width : 1,       height : 1 },
                   { x : 1,    y : 6,    width : 1,       height : 1 }
    ],

    "die" : [
                   { x : 2,    y : 6,    width : 1,       height : 1 },
                   { x : 6,    y : 6,    width : 1,       height : 1 },
                   { x : 5,    y : 6,    width : 1,       height : 1 },
                   { x : 2,    y : 6,    width : 1,       height : 1 },
                   { x : 6,    y : 6,    width : 1,       height : 1 },
                   { x : 5,    y : 6,    width : 1,       height : 1 },
                   { x : 2,    y : 6,    width : 1,       height : 1 },
                   { x : 6,    y : 6,    width : 1,       height : 1 },
                   { x : 5,    y : 6,    width : 1,       height : 1 },
                   { x : 5,    y : 6,    width : 1,       height : 1 },
    ],

    "up" : {
      "0"        : { x : 9.50, y : 6.38,  width : 1,       height : 0.3 },
      "1"        : { x : 9.25, y : 6.38,  width : 1,       height : 0.3 },
      "2"        : { x : 9.00, y : 6.38,  width : 1,       height : 0.3 },
      "3"        : { x : 8.75, y : 6.38,  width : 1,       height : 0.3 },
      "4"        : { x : 8.50, y : 6.38,  width : 1.25,    height : 0.3 },
      "5"        : { x : 8.25, y : 6.38,  width : 1.50,    height : 0.3 },
      "6"        : { x : 8.00, y : 6.38,  width : 1.50,    height : 0.3 }
    },

    "cursor"     : { x : 1,    y : 7,    width : 1,       height : 1 },
    "energy"     : { x : 2,    y : 7.3,  width : 2,       height : 0.4, left: 0.125, right: 0.125 },
    "dot"        : { x : 4,    y : 7,    width : 1,       height : 1 },
    "power"      : { x : 5,    y : 7,    width : 1,       height : 1 },

    "d" : {
      "0"        : { x : 6.0,  y : 7.3,  width : 4.7/16,  height : 0.4 },
      "1"        : { x : 6.5,  y : 7.3,  width : 3.1/16,  height : 0.4 },
      "2"        : { x : 7.0,  y : 7.3,  width : 4.5/16,  height : 0.4 },
      "3"        : { x : 7.5,  y : 7.3,  width : 4.3/16,  height : 0.4 },
      "4"        : { x : 8.0,  y : 7.3,  width : 5.0/16,  height : 0.4 },
      "5"        : { x : 8.5,  y : 7.3,  width : 4.4/16,  height : 0.4 },
      "6"        : { x : 9.0,  y : 7.3,  width : 4.7/16,  height : 0.4 },
      "7"        : { x : 9.5,  y : 7.3,  width : 4.5/16,  height : 0.4 },
      "8"        : { x : 10.0, y : 7.3,  width : 4.8/16,  height : 0.4 },
      "9"        : { x : 10.5, y : 7.3,  width : 4.8/16,  height : 0.4 },
      "-"        : { x : 11.0, y : 7.3,  width : 3.0/16,  height : 0.4 },
      "."        : { x : 11.5, y : 7.3,  width : 2.0/16,  height : 0.4 },
      "k"        : { x : 12.0, y : 7.3,  width : 4.0/16,  height : 0.4 },
      "M"        : { x : 12.5, y : 7.3,  width : 7.0/16,  height : 0.4 },
      "$"        : { x : 13.0, y : 7.3,  width : 6.0/16,  height : 0.4 },
      " "        : { x : 13.5, y : 7.3,  width : 5.0/16,  height : 0.4 }
    },

    "border"     : { x : 14,   y : 7,    width : 1,       height : 1 , top: 1/8, bottom: 1/8, left: 1/8, right: 1/8}
  }
});