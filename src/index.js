const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');
const app = express();

const config = {
  dev: false,
  buildDir: '.nuxt',
  build: {
    publicPath: '/assets/',
  },
};
const nuxt = new Nuxt(config);

exports.nuxtapp = functions.https.onRequest(async (req, res) => {
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    await nuxt.ready();
  }
  app.use(nuxt.render);
  return app(req, res);
});
