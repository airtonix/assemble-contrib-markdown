In the command line, run:

```bash
npm install assemble-contrib-markdown --save
```

Next, register the plugin with Assemble in your project's Gruntfile:

```js
assemble: {
  options: {
    plugin: ['assemble-contrib-markdown', 'other/plugins/*']
  }
}
```

## Configuration

You can also use the plugin with specific targets:

```js
assemble: {
  foo: {
    options: {
      plugin: ['assemble-contrib-markdown'],
      layout: 'blog-post.hbs'
    },
    files: {'dist/': 'content/*.md'}
  },
  // The plugin won't run on this target
  bar: {
    files: {'dist/': 'templates/*.hbs'}
  }
}
```

To disable the plugin, either remove it from the options or specify `markdown: {convert: false}` in the options:

```js
assemble: {
  foo: {
    options: {
      plugin: ['assemble-contrib-markdown'],
      markdown: {convert: false}
    },
    files: {'dist/': 'content/*.md'}
  }
}
```
Visit the [plugins docs](http://assemble.io/plugins/) for more info or for help getting started.