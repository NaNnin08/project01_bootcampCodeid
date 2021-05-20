import { Router } from "express";
import IndexCtrl from "../controller/indexController";

const router = Router();
router.post("/", IndexCtrl.Pa.create);
router.post("/multipart", IndexCtrl.Pa.createMultipart);
router.get("/", IndexCtrl.Pa.findAll);
router.get("/:id", IndexCtrl.Pa.findOne);
router.put("/:id", IndexCtrl.Pa.update);
router.delete("/:id", IndexCtrl.Pa.remove);

export default router;
