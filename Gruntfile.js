// Generated on 2016-12-09
'use strict';

module.exports = function (grunt) {


  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);
  // Read package version
  var pkg = require('./package.json');

  grunt.initConfig({
    // Configurable paths

    watch: {
      sass: {
        files: ['app/_assets/scss/**/*.{scss,sass}'],
        tasks: 'sass:server'
      },
      jekyll: {
        files: [
          'app/**/*.{html,yml,md,mkd,markdown,svg,js}',
          '!app/_assets/bower/**/*'
        ],
        tasks: ['jekyll:server']
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src: [
            '.jekyll/**/*.html',
            '.tmp/css/**/*.css',
            '{.tmp,app}/js/**/*.js',
            '{app}/_assets/bower/**/*.js',
            'app/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
          ]
        },
        options: {
          server: {
            baseDir: [
              '.jekyll',
              '.tmp',
              'app'
            ],
          },
          watchTask: true
        }
      },
      dist: {
        options: {
          server: {
            baseDir: 'dist/public'
          }
        }
      },
      test: {
        bsFiles: {
          src: [
            '.jekyll/**/*.html',
            '.tmp/css/**/*.css',
            '{.tmp,app}/js/**/*.js',
            '{app}/_assets/bower/**/*.js',
            'app/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
          ]
        },
        options: {
          server: {
            baseDir: [
              '.jekyll',
              '.tmp',
              'app'
            ]
          },
          watchTask: true
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'dist/*',
            // Running Jekyll also cleans the target directory.  Exclude any
            // non-standard `keep_files` here (e.g., the generated files
            // directory from Jekyll Picture Tag).
            '!dist/.git*'
          ]
        }]
      },
      server: [
        '.tmp',
        '.jekyll'
      ]
    },
    sass: {
      options: {
        debugInfo: false,
        lineNumbers: false,
        bundleExec: true,
        loadPath: 'app/_assets/bower'
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'app/_assets/scss',
          src: '**/*.{scss,sass}',
          dest: '.tmp/css',
          ext: '.css'
        }]
      },
      server: {
        options: {
          debugInfo: true,
          lineNumbers: true
        },
        files: [{
          expand: true,
          cwd: 'app/_assets/scss',
          src: '**/*.{scss,sass}',
          dest: '.tmp/css',
          ext: '.css'
        }]
      }
    },
    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml,_config.build.yml',
        src: 'app'
      },
      dist: {
        options: {
          dest: 'dist/public',
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },
    useminPrepare: {
      options: {
        dest: 'dist/public'
      },
      html: 'dist/public/index.html'
    },
    usemin: {
      options: {
        assetsDirs: ['dist/public', 'dist/public/img']
      },
      html: ['dist/public/**/*.html'],
      css: ['dist/public/css/**/*.css']
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true
        },
        files: [{
          expand: true,
          cwd: 'dist/public',
          src: '**/*.html',
          dest: 'dist/public'
        }]
      }
    },
    // Usemin adds files to concat
    concat: {},
    // Usemin adds files to uglify
    uglify: {},
    // Usemin adds files to cssmin
    cssmin: {
      dist: {
        options: {
          check: 'gzip'
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          progressive: true,
          check:'gzip'
        },
        files: [{
          expand: true,
          cwd: 'dist/public',
          src: '**/*.{jpg,jpeg,png}',
          dest: 'dist/public'
        }]
      }
    },
    svgmin: {
      dist: {
        options: {
          progressive: true,
          check: 'gzip'
        },
        files: [{
          expand: true,
          cwd: 'dist/public',
          src: '**/*.svg',
          dest: 'dist/public'
        }]
      }
    },
    copy: {
      dist: {
        options: {
          progressive: true,
          check: 'gzip'
        },
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          src: [
            // Jekyll processes and moves HTML and text files.
            // Usemin moves CSS and javascript inside of Usemin blocks.
            // Copy moves asset files and directories.
            'img/**/*',
            // 'js/**/*',
            // 'js/*.js',
            'js/vendor/**/*.js',
            'fonts/**/*',
            // Like Jekyll, exclude files & folders prefixed with an underscore.
            '!**/_*{,/**}',
            // Explicitly add any files your site needs for distribution here.
            '_assets/bower/jquery/dist/jquery.min.js',
            '_assets/bower/bootstrap/dist/js/bootstrap.min.js',
            '_assets/bower/simple-jekyll-search/dest/jekyll-search.js',
            '_assets/bower/jquery/jquery.min.js',
            'favicon.ico',
            'apple-touch*.png'
          ],
          dest: 'dist/public'
        }]
      },
      // Copy CSS into .tmp directory for Autoprefixer processing
      stageCss: {
        options: {
          progressive: true,
          check: 'gzip'
        },
        files: [{
          expand: true,
          dot: true,
          cwd: 'app/css',
          src: '**/*.css',
          dest: '.tmp/css'
        }]
      },
      prod: {
        options: {
          progressive: true,
          check: 'gzip'
        },
        files: [{
          expand: true,
          dot: true,
          cwd: '.',
          src: [
            'composer.json',
            'Procfile',
            'rewrite.conf'
          ],
          dest: 'dist'
        }]
      }
    },
    filerev: {
      options: {
        length: 0
      },
      dist: {
        files: [{
          src: [
          ]
        }]
      }
    },
    buildcontrol: {
      options: {
        commit: true,
        push: true,
        message: '🚀 Launched from commit %sourceCommit%',
        login: 'aheci',
        token: process.env.GH_TOKEN,
        check: 'gzip'
      },
      dist: {
        options: {
          remote: 'git@github.com:aheci/word-scramble.git',
          branch: 'staging',
        }
      }
    },
    concurrent: {
      server: [
        'sass:server',
        'copy:stageCss',
        'jekyll:server'
      ],
      dist: [
        'sass:dist',
        'copy:dist',
        'copy:prod'
      ]
    }
  });

  // Define Tasks
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'browserSync:dist']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'browserSync:server',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  // No real tests yet. Add your own.
  grunt.registerTask('test', [
  //   'clean:server',
  //   'concurrent:test',
  //   'browserSync:test'
  ]);

  grunt.registerTask('check', [
    'clean:server',
    'jekyll:check',
    'sass:server'
    //'jshint:all'
  ]);

  grunt.registerTask('build', [
    'clean',
    // Jekyll cleans files from the target directory, so must run first
    'jekyll:dist',
    'concurrent:dist',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'imagemin',
    'svgmin',
    'filerev',
    'usemin'
    //'htmlmin'
    ]);

    grunt.registerTask('deploy', function() {

      //if (process.env.TRAVIS === 'true' && process.env.TRAVIS_SECURE_ENV_VARS === 'true' && process.env.TRAVIS_PULL_REQUEST === 'false') {
        grunt.log.writeln('executing deployment');
        // queue deployment
        grunt.task.run([
          'check',
          'test',
          'build',
          'buildcontrol:dist'
        ]);
      //} else {
  		//	grunt.log.writeln('skipped deployment');
  		//}

    });

  grunt.registerTask('default', [
    'check',
    'test',
    'build'
  ]);
};
