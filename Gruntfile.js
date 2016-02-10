module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        sourceMap: true
      },
      build: {
        src: ['./src/js/bootstrap.min.js', './src/js/main.js'],
        dest: './dist/js/main.js',
      }
    },
    uglify: {
      options: {
        mangle: false,
        sourceMap: true,
        sourceMapIn: './dist/js/main.js.map'
      },
      build: {
        files: {
          './dist/js/main.min.js': './dist/js/main.js'
        }
      }
    },
    sass: {
      options: {
        outFile: './dist/css/main.css',
        sourceMap: true
      },
      build: {
        files: {
          './dist/css/main.css': './src/scss/main.scss'
        }
      }
    },
    cssmin: {
      options: {
        roundingPrecision: -1,
        sourceMap: [true, './dist/css/main.css.map']
      },
      build: {
        files: {
          './dist/css/main.min.css': './dist/css/main.css'
        }
      }
    },
    php: {
      dev: {
        options: {
          port: 8010
        }
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            '**/*.php',
            './dist/css/main.min.css',
            './dist/js/main.min.js'
          ]
        },
        options: {
          proxy: '127.0.0.1:8010',
          port: 8080,
          open: true,
          watchTask: true
        }
      }
    },
    watch: {
      css: {
        files: ['./src/scss/**/*.scss'],
        tasks: ['sass', 'cssmin']
      },
      js: {
        files: ['./src/js/**/*.js'],
        tasks: ['concat', 'uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-php');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin']);
  grunt.registerTask('serve', ['default', 'php', 'browserSync', 'watch']);

};
