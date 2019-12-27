
const jsonServer = require("json-server");

const jsonUrlRewrite = require("./routes.json");
const datasets = require("./datasets/db.js");

// middlewares
const post2get = require("./middlewares/post2get");
const header = require("./middlewares/header");
const server = jsonServer.create();
const jsonDefault = jsonServer.defaults();
const jsonRouter = jsonServer.router(datasets(), { _isFake: true });
const port = 3000;

jsonRouter.render = (req, res) => {
  res.json({
    code: 200,
    data: res.locals.data,
    message: 'json-server mock data'
  })
};

server.use(header);
server.use(jsonServer.rewriter(jsonUrlRewrite));
server.use(post2get);

server.use(jsonDefault);
server.use(jsonRouter);

server.listen(port, () => {
  console.log("started mockserver!");
});
