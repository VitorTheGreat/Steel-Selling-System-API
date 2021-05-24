import express from "express";
import controller from "../controllers/supplier";

const router = express.Router();

router.get("/getAll", controller.getAll);
router.post("/create", controller.create);

export = router;
