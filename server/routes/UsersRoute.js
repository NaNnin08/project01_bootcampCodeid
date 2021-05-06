import { Router } from "express";
import IndexCtrl from "../controller/indexController";

const router = Router();
router.post("/signup", IndexCtrl.User.signup);
router.post("/signin", IndexCtrl.User.signin);
router.post("/signout", IndexCtrl.User.signout);
router.get("/", IndexCtrl.User.requireSignin, IndexCtrl.User.findAll);
router.get("/all", IndexCtrl.User.findAll);
router.get("/:id", IndexCtrl.User.findOne);
router.put("/:id", IndexCtrl.User.update);
router.delete("/:id", IndexCtrl.User.remove);

export default router;
