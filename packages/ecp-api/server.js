require('dotenv').config();

const isArray = require("lodash/isArray");
const floor = require("lodash/floor");
const jsonServer = require("json-server");

const jsonUrlRewrite = require("./routes.json");
const datasets = require("./datasets/db.js");

// middlewares
const post2get = require("./middlewares/post2get");
const header = require("./middlewares/header");
const server = jsonServer.create();
const jsonDefault = jsonServer.defaults();
const jsonRouter = jsonServer.router(datasets(), { _isFake: true });
const port = `${process.env.API_SERVER_PORT}`;

function getUrlParams(url) {
  if (!url || url.length === 0) {
    return {};
  }
  const hashes = url.slice(url.indexOf("?") + 1).split("&");
  return hashes.reduce((params, hash) => {
    const split = hash.indexOf("=");
    if (split < 0) {
      return {};
    }

    const key = hash.slice(0, split);
    const val = hash.slice(split + 1);

    return Object.assign(params, {
      [key]: decodeURIComponent(val)
    });
  }, {});
}

jsonRouter.render = (req, res) => {
  const data = res.locals.data;
  const pagination = {};
  if (isArray(data)) {
    const params = getUrlParams(req.originalUrl);
    pagination.pageNo = parseInt(params.pageNo, 10) || 1;
    pagination.pageSize = parseInt(params.pageSize, 10) || 20;
    pagination.totalCount = res.getHeader('X-Total-Count').value() || 0;
    pagination.totalPage = floor(pagination.totalCount / pagination.pageSize);
  }
  setTimeout(function() {
    res.json({
      code: 200,
      ...pagination,
      data: data,
      message: 'json-server mock data'
    })
  }, 500);
};

server.use(header);
server.use(jsonServer.rewriter(jsonUrlRewrite));
server.use(post2get);

server.use(jsonDefault);
server.use(jsonRouter);

server.listen(port, () => {
  console.log("started mockserver!");
});
