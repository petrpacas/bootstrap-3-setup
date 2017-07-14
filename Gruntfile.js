module.exports = function(grunt) {
  grunt.initConfig({
    vars: {
      jsSrc: [
        './src/js/bootstrap/affix.js',
        './src/js/bootstrap/alert.js',
        './src/js/bootstrap/button.js',
        './src/js/bootstrap/carousel.js',
        './src/js/bootstrap/collapse.js',
        './src/js/bootstrap/dropdown.js',
        './src/js/bootstrap/modal.js',
        './src/js/bootstrap/scrollspy.js',
        './src/js/bootstrap/tab.js',
        './src/js/bootstrap/transition.js',
        './src/js/bootstrap/tooltip.js',
        './src/js/bootstrap/popover.js',
        './src/js/main.js'
      ]
    },
    clean: {
      target: ['dist']
    },
    concat: {
      options: {
        sourceMap: true
      },
      target: {
        src: "<%= vars.jsSrc %>",
        dest: './dist/main.js'
      }
    },
    uglify: {
      options: {
        mangle: true,
        keep_fnames: true,
        sourceMap: true,
        sourceMapIn: './dist/main.js.map'
      },
      target: {
        files: {
          './dist/main.js': './dist/main.js'
        }
      }
    },
    sass: {
      options: {
        outFile: './dist/main.css',
        sourceMap: true
      },
      target: {
        files: {
          './dist/main.css': './src/scss/main.scss'
        }
      }
    },
    postcss: {
      options: {
        map: {
          inline: false
        },
        processors: [
          require('autoprefixer'),
          require('cssnano')({
            discardComments: {
              removeAll: true,
            }
          })
        ]
      },
      target: {
        src: './dist/main.css',
        dest: './dist/main.css'
      }
    },
    browserSync: {
      target: {
        bsFiles: {
          src: [
            // '**/*.php',
            '**/*.html',
            './dist/main.css',
            './dist/main.js'
          ]
        },
        options: {
          // proxy: 'localhost/grunt-bootstrap-3-setup/',
          server: './', // Comment this line when using PHP
          notify: false,
          open: true,
          port: 2222,
          watchTask: true
        }
      }
    },
    watch: {
      js: {
        files: ['./src/js/**/*.js'],
        tasks: ['concat']
      },
      css: {
        files: ['./src/scss/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('default', ['clean', 'concat', 'sass', 'browserSync', 'watch']);
  grunt.registerTask('build', ['clean', 'concat', 'uglify', 'sass', 'postcss']);
};
