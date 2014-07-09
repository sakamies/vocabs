module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      app: {
        files: {
          'app/assets/css/happy.css': 'app/assets/scss/happy.scss',
        }
      },
      vocabs: {
        files: [{
          expand: true,
          cwd: 'app/vocabs/',
          src: ['*/syntax.scss'],
          dest: 'app/vocabs/',
          ext: '.css'
        }],
      }
    },
    autoprefixer: {
      app: {
        files: {
          'app/assets/css/happy.css': 'app/assets/css/happy.css'
        }
        //TODO: autoprefix vocabs too
      }
    },
    devserver: {
      app: {
        options: {
          base: 'app',
          port: 2000,
          async: true
        }
      }
    },
    watch: {
      reload: {
        files: [
          'app/assets/*.html',
          'app/assets/css/*.css',
          'app/assets/js/*.js'
        ],
        options: {
          livereload: true,
          interrupt: true,
        }
      },
      sass: {
        files: [
          'app/assets/scss/*.scss',
          'app/vocabs/*/syntax.scss'
        ],
        tasks: ['sass', 'autoprefixer'],
        options: {
          livereload: false,
          interrupt: true,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-devserver');

  grunt.registerTask('serve', ['devserver']);
  grunt.registerTask('app', ['devserver:app']);
  grunt.registerTask('site', ['devserver:site']);
  grunt.registerTask('default', ['watch']);

};
