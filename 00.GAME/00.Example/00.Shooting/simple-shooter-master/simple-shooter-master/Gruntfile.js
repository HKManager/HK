module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    connect: {
      all: {
        options:{
          port: 9000,
          hostname: '',
          base:"./dist/",
          livereload: true,
          open:true
        }
      }
    },

    sass: {
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          './dist/css/app.css': './source/scss/app.scss'
        }
      }
    },

  uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        sourceMap: true
      },
      dist: {
        files: {
          './dist/js/app.min.js': ['./source/js/*.js']
        }
      }
    },

    jshint: {

      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        curly: true, // put always curly braces around block
        eqeqeq: true, // == and != are not valid, use === and !== instead
        bitwise: true, // prohibits the use of bitwise operators
        //undef: true, // error when a variable is undefined
        trailing: true, // warning when there are trailing whitespaces
        node:true, // defines globals available in the Node runtime environment
        devel:true, // defines globals used for debugging (console, alert..)
        browser:true // defines globals exposed by modern browsers (document, navigator, FileReader...)
      },

      scripts: './source/js/*.js',

      gruntfile: 'Gruntfile.js'
    },

    watch: {

      options: {
        livereload: true,
      },

      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
      },

      sass: {
        files: './source/scss/*.scss',
        tasks: ['sass']
      },

      scripts: {
        files: './source/js/*.js',
        tasks: ['jshint:scripts', 'uglify']
      },

      html: {
        files: './dist/index.html',
        options: {
          livereload:true
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass', 'jshint:gruntfile', 'jshint:scripts', 'uglify']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};