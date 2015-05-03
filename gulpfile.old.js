// Generated on 2015-01-29 using generator-jekyllized 0.7.0
'use strict';

var gulp = require('gulp');
// Loads the plugins without having to list all of them, but you need
// to call them as $.pluginname
var $ = require('gulp-load-plugins')();
// 'del' is used to clean out directories and such
var del = require('del');
// Parallelize the uploads when uploading to Amazon S3
// 'fs' is used to read files from the system (used for AWS uploading)
var fs = require('fs');
var path = require('path');
var parallelize = require("concurrent-transform");
// BrowserSync isn't a gulp package, and needs to be loaded manually
var browserSync = require('browser-sync');
// merge is used to merge the output from two different streams into the same stream
var merge = require('merge-stream');
// Need a command for reloading webpages using BrowserSync
var reload = browserSync.reload;
// And define a variable that BrowserSync uses in it's function
var bs;
// Execute shell commands
var spawn = require('child_process').spawn;
// Run Sequence
var sequence = require('run-sequence');


var onError = function (err) {
    console.log(err);
    this.emit('end');
};

// Deletes the directory that is used to serve the site during development
gulp.task('clean:dev', del.bind(null, ['']));

// Deletes the directory that the optimized site is output to
gulp.task('clean:prod', del.bind(null, ['site', '_tmp', 'src/.jekyll-metadata']));

// Runs the build command for Jekyll to compile the site locally
// This will build the site with the production settings
gulp.task('jekyll:dev', $.shell.task('bundle exec jekyll build'));
gulp.task('jekyll-rebuild', ['jekyll:dev'], function () {
  reload;
});

// Almost identical to the above task, but instead we load in the build configuration
// that overwrites some of the settings in the regular configuration so that you
// don't end up publishing your drafts or future posts
gulp.task('jekyll:prod', $.shell.task('bundle exec jekyll build --config _config.yml,_config.build.yml'));

// Compiles the SASS files and moves them into the 'assets/stylesheets' directory
gulp.task('styles', function () {
  // Looks at the style.scss file for what to include and creates a style.css file
  return gulp.src('src/assets/css/main.less')
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.less({
      paths: ['./src/bower']
    }))
    // AutoPrefix your CSS so it works between browsers
    .pipe($.autoprefixer('last 1 version', { cascade: true }))
    // Directory your CSS file goes to
    .pipe(gulp.dest('serve/assets/css/'))
    // Outputs the size of the CSS file
    .pipe($.size({title: 'styles'}))
    // Injects the CSS changes to your browser since Jekyll doesn't rebuild the CSS
    .pipe(reload({stream: true}));
});

// Optimizes the images that exists
gulp.task('images', function () {
  return gulp.src('src/assets/images/**')
    .pipe($.changed('serve/assets/img'))
    .pipe(gulp.dest('serve/assets/img'))
    .pipe($.size({title: 'images'}));
});

// Just move images over
gulp.task('assets', function() {
  return gulp.src(['src/assets/**', '!src/assets/styles/**', '!src/assets/scripts/**'])
    .pipe($.changed('serve/assets'))
    .pipe(gulp.dest('serve/assets'))
    .pipe(reload({stream: true}));
});


// Copy over extra assets to the site
/*gulp.task('assets:prod', function () {
  return gulp.src(['src/assets/**', '!src/assets/js/**', '!src/assets/css/**', '!src/assets/img/**'])
    .pipe(gulp.dest('_tmp/assets'))
    .pipe($.size({ title: 'extra assets' }));
});*/

// Copy xml and txt files to the 'site' directory
gulp.task('copy', function () {
  return gulp.src(['serve/*.txt', 'serve/*.xml', 'serve/favicon.ico'])
    .pipe(gulp.dest('_tmp'))
    .pipe($.size({ title: 'xml & txt' }))
});

// Optimizes all the CSS, HTML and concats the JS etc
gulp.task('html', ['styles'], function () {
  var assets = $.useref.assets({searchPath: 'serve'});

  return gulp.src('serve/**/*.html')
    .pipe(assets)
    // Concatenate JavaScript files and preserve important comments
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    // Minify CSS
    .pipe($.if('*.css', $.minifyCss()))
    .pipe(assets.restore())
    // Conctenate your files based on what you specified in _layout/header.html
    .pipe($.useref())
    // Minify HTML
    .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      removeCommentsFromCDATA: true,
      removeCDATASectionsFromCDATA: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true
    })))
    // Send the output to the correct folder
    .pipe(gulp.dest('_tmp'))
    .pipe($.size({title: 'optimizations'}));
});

gulp.task('rev', function() {
  return gulp.src('serve/**')
    .pipe($.revAll({ignore: ['.html', '.xml', 'favicon.ico', /^\/assets\/files\//, '.txt']}))
    .pipe($.revReplace())
    .pipe(gulp.dest('site'));
});

// Task to deploy your site to Amazon S3 and Cloudfront
gulp.task('deploy', function () {
  // Generate the needed credentials (bucket, secret key etc) from a "hidden" JSON file
  var credentials = JSON.parse(fs.readFileSync('aws-credentials.json', 'utf8'));
  var publisher = $.awspublish.create(credentials);
  // Give your files the proper headers
  var headers = {
    'Cache-Control': 'max-age=0, no-transform, public',
    'Content-Encoding': 'gzip'
  };

  gulp.src('site/**/*')
    .pipe($.awspublishRouter({
      routes: {
        "^assets/(?:.+)\\.(?:js|css)$": {
          key: "$&",
          headers: {
            'Cache-Control': 'max-age=315360000, no-transform, public',
            'Content-Encoding': 'gzip'
          }
        },

        "^assets/(?:.+)\\.(?:jpg|png|gif)$": {
          key: "$&",
          headers: {
            'Cache-Control': 'max-age=315360000, no-transform, public',
            'Content-Encoding': 'gzip'
          }
        },

        "^assets/fonts/(?:.+)\\.(?:eot|svg|ttf|woff)$": {
          key: "$&",
          headers: {
            'Cache-Control': 'max-age=315360000, no-transform, public'
          }
        },

        "^.+\\.html": {
          key: "$&",
          headers: {
            'Cache-Control': 'max-age=0, no-transform, public',
            'Content-Encoding': 'gzip'
          }
        },
        "^.+$": "$&"
      }
    }))
    // Gzip the files for moar speed
    .pipe($.awspublish.gzip())
    // Parallelize the number of concurrent uploads, in this case 30
    .pipe(parallelize(publisher.publish(), 30))
    // Have your files in the system cache so you don't have to recheck all the files every time
    .pipe(publisher.cache())
    // Synchronize the contents of the bucket and local (this deletes everything that isn't in local!)
    .pipe(publisher.sync())
    // And print the ouput, glorious
    .pipe($.awspublish.reporter());
    // And update the default root object
    //.pipe($.cloudfront(credentials));
});

// Run JS Lint against your JS
gulp.task('jslint', function () {
  gulp.src('./serve/assets/js/*.js')
    // Checks your JS code quality against your .jshintrc file
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter());
});

// Runs 'jekyll doctor' on your site to check for errors with your configuration
// and will check for URL errors a well
gulp.task('doctor', $.shell.task('bundle exec jekyll doctor'));

// BrowserSync will serve our site on a local server for us and other devices to use
// It will also autoreload across all devices as well as keep the viewport synchronized
// between them.
gulp.task('serve:dev', ['styles', 'jekyll:dev'], function () {
  bs = browserSync({
    notify: true,
    // tunnel: '',
    server: {
      baseDir: 'serve'
    },
    open: false,
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: true
    }
  });
});

// These tasks will look for files that change while serving and will auto-regenerate or
// reload the website accordingly. Update or add other files you need to be watched.
gulp.task('watch', function () {
  gulp.watch(['src/**/*.md', 'src/**/*.html', 'src/**/*.xml', 'src/**/*.txt'], function () {
    sequence('jekyll-rebuild', reload)
  });
  gulp.watch(['src/assets/css/**/*.less'], ['styles']);
  gulp.watch(['src/assets/**', '!src/assets/css/**'], ['assets']);
});

// Serve the site after optimizations to see that everything looks fine
gulp.task('serve:prod', function () {
  bs = browserSync({
    notify: false,
    // tunnel: true,
    server: {
      baseDir: 'site'
    },
    open: false,
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: true
    }
  });
});

// Default task, run when just writing 'gulp' in the terminal
gulp.task('default', ['serve:dev', 'watch']);

// Checks your CSS, JS and Jekyll for errors
gulp.task('check', ['jslint', 'doctor'], function () {
  // Better hope nothing is wrong.
});

// Builds the site but doesn't serve it to you
gulp.task('build', ['jekyll:prod', 'styles', 'assets'], function () {});

// Builds your site with the 'build' command and then runs all the optimizations on
// it and outputs it to './site'
gulp.task('publish', ['build'], function () {
  sequence('rev');
});
