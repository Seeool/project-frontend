const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        'api',
        createProxyMiddleware({
            target: 'http://seol.site:9000',
            changeOrigin: true,
        })
    );
};