const express = require('express')
const cors = require('cors');
const {createProxyMiddleware} = require('http-proxy-middleware');

const listen_port = 3001;
const proxy_host = "http://127.0.0.1:4156";
const app = express()

// use cors
app.use(cors({
  origin: '*'
}));

// create proxy middleware
const proxyMiddleware = createProxyMiddleware({
  target: proxy_host, changeOrigin: true, pathRewrite: {
    '^/proxy': '',
  },
});

// proxy to kplayer-go api
app.use("/proxy", proxyMiddleware);

app.listen(listen_port, () => {
  console.log(`Express app listening on port :${listen_port}`)
});
