module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
      css: {
        files: 'scss/**/*.scss',
        tasks: ['sass:dev', 'cssmin']
      },
      artists: {
        files: 'artists/**/*.json',
        tasks: ['sass:dev', 'execute:generate_artists']
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/style.min.css': ['css/style.css']
        }
      }
    },
    sass: {
      dev: {
        files: {
          'css/style.css': 'scss/main.scss'
        }
      }
    },
    execute: {
      generate_artists: {
          src: ['artists/artists.js']
      },
      generate_schedule: {
          src: ['schedule/schedule.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-execute');

  grunt.registerTask('build',
    [
      'sass:dev',
      'cssmin',
      'execute:generate_artists',
      'execute:generate_schedule'
    ]
  );
};
