const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://partnerconnection-epc.dev.akbars.ru',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '/',
      },
    })
  );
};
