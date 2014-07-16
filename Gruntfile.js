module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    haml: {
      vocabs: {
        //TODO: how to remove all whitespace while compiling?
        //options {remove_whitespace: true, ugly: true} didn't work
        files: [{
          expand: true,
          cwd: 'app/vocabs/',
          src: ['*/sample.haml'],
          dest: 'app/vocabs/',
          ext: '.html'
        }],
      }
    },
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
      },
      vocabs: {
        files: [{
          expand: true,
          cwd: 'app/vocabs/',
          src: ['*/syntax.css'],
          dest: 'app/vocabs/',
          ext: '.css'
        }],
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
      appfiles: {
        files: [
          'app/*.html',
          'app/assets/css/*.css',
          'app/assets/js/*.js'
        ],
        options: {
          livereload: true,
          interrupt: true,
        }
      },
      appstyles: {
        files: [
          'app/assets/scss/*.scss',
        ],
        tasks: ['sass:app', 'autoprefixer:app'],
        options: {
          livereload: false,
          interrupt: true,
        }
      },
      vocabs: {
        files: [
          'app/vocabs/*/syntax.scss',
          'app/vocabs/*/sample.haml',
        ],
        tasks: ['haml:vocabs', 'sass:vocabs', 'autoprefixer:vocabs'],
        options: {
          livereload: false,
          interrupt: true,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-haml');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-devserver');

  grunt.registerTask('serve', ['devserver']);
  grunt.registerTask('default', ['watch']);

};
