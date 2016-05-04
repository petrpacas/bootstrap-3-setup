module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        sourceMap: true
      },
      dev: {
        src: [
          './src/js/bootstrap.min.js',
          './src/js/main.js'
        ],
        dest: './dist/js/main.min.js'
      },
      build: {
        src: [
          './src/js/bootstrap.min.js',
          './src/js/main.js'
        ],
        dest: './dist/js/main.js'
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
      dev: {
        files: {
          './dist/css/main.min.css': './src/scss/main.scss'
        }
      },
      build: {
        files: {
          './dist/css/main.css': './src/scss/main.scss'
        }
      }
    },
    postcss: {
      options: {
        map: {
          inline: false
        },
        processors: [
          require('autoprefixer')({
            browsers: [
              'Android 2.3',
              'Android >= 4',
              'Chrome >= 20',
              'Firefox >= 24',
              'Explorer >= 8',
              'iOS >= 6',
              'Opera >= 12',
              'Safari >= 6'
            ]
          }),
          require('cssnano')()
        ]
      },
      build: {
        src: './dist/css/main.css',
        dest: './dist/css/main.min.css'
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            // '**/*.php',
            '**/*.html',
            './dist/css/main.min.css',
            './dist/js/main.min.js'
          ]
        },
        options: {
          // proxy: 'bootstrap3.dev',
          server: './',
          notify: false,
          open: true,
          port: 3030,
          watchTask: true
        }
      }
    },
    watch: {
      js: {
        files: ['./src/js/**/*.js'],
        tasks: ['concat:dev']
      },
      css: {
        files: ['./src/scss/**/*.scss'],
        tasks: ['sass:dev']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('dev', ['concat:dev', 'sass:dev', 'browserSync', 'watch']);
  grunt.registerTask('build', ['concat:build', 'uglify', 'sass:build', 'postcss']);

};
