module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
      css: {
        files: 'scss/**/*.scss',
        tasks: ['sass:dev', 'cssmin']
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('build',
    [
      'sass:dev',
      'cssmin'
    ]
  );
};