module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      app: {
        files: {
          'app/css/happy.css': 'app/scss/happy.scss',
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
      styles: {
        files: {
          'app/css/happy.css': 'app/css/happy.css'
        }
      }
    },
    devserver: {
      app: {
        options: {
          base: 'app',
          port: 2000,
          async: true
        }
      },
      site: {
        options: {
          base: 'site',
          port: 3000,
          async: true
        }
      }
    },
    watch: {
      reload: {
        files: [
          'app/*.html',
          'app/css/*.css',
          'app/js/*.js'
        ],
        options: {
          livereload: true,
          interrupt: true,
        }
      },
      sass: {
        files: [
          'app/scss/*.scss',
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
