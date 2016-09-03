module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
      scripts: {
        files: ['app/src/**/*.js'],
        tasks: ['eslint', 'concat:dev', 'copy:dev'],
        options: {
          spawn: false,
        },
      },
      html: {
        files: ['app/**/*.html'],
        tasks: ['copy:dev']
      },
      css: {
        files: 'app/src/**/*.scss',
        tasks: ['sass:dev', 'cssmin', 'copy:dev']
      },
      eslint: {
        files: 'app/src/**/*.js',
        tasks: ['eslint']
      }
    },
    eslint: {
        target: ['app/src/**/*.js']
    },
    concat: {
      options: {
        separator: '\n\n',
      },
      dev: {
        src: [
          'app/src/appModule.js',
          'app/src/modules/**/*Module.js',
          'app/src/**/*.js',
          '!app/src/**/app.*.js'
        ],
        dest: 'app/app.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'app/app.min.js': ['app/app.js']
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'app/src/styles/main.min.css': ['app/src/styles/main.css']
        }
      }
    },
    sass: {
      dev: {
        files: {
          'app/src/styles/main.css': 'app/src/styles/main.scss'
        }
      }
    },
    clean: {
      folder: ['dist']
    },
    copy: {
      dev: {
        files: [
          // Copy images
          {expand: true, flatten: true, src: ['app/images/*'], dest: 'dist/images/'},

          // Copy libraries
          {expand: true, src: ['app/lib/'], dest: 'dist/'},
          {expand: true, src: ['app/lib/angular/angular.min.js*'], dest: 'dist/'},
          {expand: true, src: ['app/lib/angular-mocks/angular-mocks.js'], dest: 'dist/'},
          {expand: true, src: ['app/lib/lodash/dist/lodash.min.js'], dest: 'dist/'},
          {expand: true, src: ['app/lib/jquery/dist/jquery.min.js'], dest: 'dist/'},
          {expand: true, src: ['app/lib/moment/min/moment.min.js'], dest: 'dist/'},
          {expand: true, src: ['app/lib/bootstrap/dist/js/bootstrap.min.js'], dest: 'dist/'},
          {expand: true, src: ['app/lib/angular-ui-router/release/angular-ui-router.min.js'], dest: 'dist/'},
          {expand: true, src: ['app/lib/angular-simple-logger/dist/angular-simple-logger.min.js'], dest: 'dist/'},
          {expand: true, src: ['app/lib/angular-google-maps/dist/angular-google-maps*'], dest: 'dist/'},

          // Copy CSS
          {expand: true, flatten: true, src: ['app/src/styles/**.min.css'], dest: 'dist/styles/'},
          {expand: true, flatten: true, src: ['app/src/styles/**.map'], dest: 'dist/styles/'},
          {expand: true, src: ['app/lib/bootstrap/dist/css/bootstrap.min.css*'], dest: 'dist/'},

          // Copy actual application script
          {expand: true, src: ['app/app.js'], dest: 'dist/'},
          // {expand: true, src: ['app/app.min.js'], dest: 'dist/'}, TODO: investivate minification

          // Copy index and templates files
          {expand: true, flatten: true, src: ['app/index.html'], dest: 'dist/'},
          {expand: true, src: ['app/src/**/*.html'], dest: 'dist/'}
        ]
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['karma']);

  grunt.registerTask('build',
    [
      'eslint',
      'concat:dev',
      'karma',
      'sass:dev',
      'cssmin',
      'clean',
      'copy:dev'
    ]
  );
};