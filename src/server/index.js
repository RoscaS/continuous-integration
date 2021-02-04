const consola = require('consola');
const express = require('express');
const { Nuxt, Builder } = require('nuxt');
const app = express();

// import Nuxt config
let config = require('../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

async function start() {
  const nuxt = new Nuxt({ ...config, debug: true });
  const { host, port } = nuxt.options.server;

  // dev environment build
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // pass nuxt's middleware to express
  app.use(nuxt.render);

  app.listen(port, host);
  consola.ready({
    message: `Server is listening on http://${host}:${port}`,
    badge: true
  });
}

start();
