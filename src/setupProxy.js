const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        ["/api", "/auth/google", "/upload"],
        createProxyMiddleware({
            target: "http://127.0.0.1:5000",
        })
    );
    app.use(
        ["/new_data.json"],
        createProxyMiddleware({
            target: "http://127.0.0.1:8080",
        })
    );
};