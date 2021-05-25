import express from "express";
import controller from "../controllers/customer";

const router = express.Router();

router.get("/getAll", controller.getAll);
router.get("/getById/:id", controller.getById);
router.post("/create", controller.create);
router.patch("/update/:id", controller.update);
router.delete("/delete/:id", controller.destroy);

export = router;
