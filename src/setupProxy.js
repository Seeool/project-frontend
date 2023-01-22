const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://172.30.1.1:9000',
            changeOrigin: true,
        })
    );
};