/**
 * Markdown plugin, for Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */


// node_modules
var markdown   = require('marked');
var mdToc      = require('marked-toc');


var md = function(str){
  return markdown.parse(str).replace(/&#39;/g, '\'').replace(/&quot;/g, '"');
};


module.exports = function (params, callback) {
  'use strict';

  var grunt   = params.grunt;
  var async   = grunt.util.async;
  var options = params.assemble.options;
  var pages   = options.pages;


  // Add "markdown" options object to Assemble options.
  options.markdown = options.markdown || {};
  options.data.toc = '';

  // Announce plugin in verbose mode.
  grunt.verbose.header('Running:'.magenta.bold, 'assemble-contrib-markdown'.bold);
  grunt.verbose.writeln('Stage:  '.magenta.bold, 'render:pre:pages\n'.bold);


  // Run the plugin unless `convert: false` is specified in markdown options
  if(options.markdown.convert !== false) {
    var converted = 0;

    async.forEach(pages, function (file, next) {
      try {
        // TOC currently doesn't work. Don't use!
        if(options.markdown.toc !== false) {
          options.data.toc = mdToc(file.page);
          options.data.toc = options.data.toc;
          grunt.verbose.writeln(options.data.toc);
          file.page = md(options.data.toc) + md(file.page);
        } else {
          file.page = md(file.page);
        }
        grunt.log.writeln('Transforming:', file.src.cyan + ' >> '.green + file.dest.cyan + ' OK'.green);
        converted += 1;
        next();
      } catch (e) {
        grunt.log.error('Conversion from markdown to HTML failed.');
        next();
      }
    });

    // Success message in verbose mode.
    grunt.verbose.writeln();
    grunt.verbose.writeln('>>'.green + ' Converted'.yellow.bold, converted + ' pages from markdown to HTML.\n');
    callback();
  } else {
    // Skip the plugin
    grunt.log.writeln('>> Skipping markdown plugin, since `convert: false` was defined.'.yellow);
    callback();
  }
};

module.exports.options = {
  stage: 'render:pre:pages'
};
