const router = require("express").Router();

const indexRouter = require("./indexRouter");
const productRouter = require("./productRouter");
const userRouter = require("./usersRouter");
const cagatoryRouter = require("./cagatory");
const adminRouter = require("./adminRouter");

router.use("/admin", adminRouter);
router.use("/catagory", cagatoryRouter);
router.use("/", indexRouter);
router.use("/product", productRouter);
router.use("/user", userRouter);
module.exports = router;
