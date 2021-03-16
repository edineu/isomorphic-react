import express from "express";
import yields from "express-yields";
import fs from "fs-extra";
import webpack from "webpack";

/** here you define the post and instiate express */
const port = process.env.PORT || 3000;
const app = express(); /* here you instatiate the app */

if (process.env.NODE_ENV === "development") {
  const config = require("../webpack.config.dev.babel").default;
  const compiler = webpack(config);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
}

/* the * (start) is a generator function */
app.get(["/"], function* (req, res) {
  let index = yield fs.readFile("./public/index.html", "utf-8");
  res.send(index);
});

/** easier to debug on mobile devices */
app.listen(port, "0.0.0.0", () => console.info(`App listening on ${port}`));
