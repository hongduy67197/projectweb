const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const Router = require("./routes");
const cookieParser = require("cookie-parser");
// const userModel = require ("./models/productModel");

// ??
// const productRouter = require("./routes/productRouter");
// const userRouter = require("./routes/usersRouter");
// const indexRouter = require("./routes/indexRouter");

app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());
//view engine
app.set("view engine", "ejs");

//Route sang 2 trang --- Trang chu & admin backend -- tu userRouter
app.use("/", Router);
// app.use("/", indexRouter);

// app.use("/product", productRouter);

// app.use("/user", userRouter);

//Public Folder View
app.use("/views", express.static(path.join(__dirname, "./views/")));

// Route Thong bao sai duong dan
app.get("*", (req, res) => {
  res.send("<h1>Invalid URL</h1>");
});

// test api find all

// listen port 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
