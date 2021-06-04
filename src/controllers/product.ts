import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import Validator from "fastest-validator";
const models = require("../models");

const NAMESPACE = "PRODUCT CONTROLLER";

const validateFields = (fields: object) => {
  const v = new Validator();

  const schema = {
    name: { type: "string", nullable: false },
    ean: { type: "string", max: "13", optional: true, nullable: true },
    fractioned_qty: { type: "number", optional: true, nullable: true },
    unit_price: { type: "number", nullable: false },
    buy_price: { type: "number", nullable: false },
    cost_price: { type: "number", nullable: false },
    selling_price: { type: "number", nullable: false },
    profit: { type: "number", nullable: false },
    ipi: { type: "string", optional: true, nullable: true },
    icms: { type: "string", optional: true, nullable: true },
    ncm: { type: "string", optional: true, nullable: true },
    csosn: { type: "string", optional: true, nullable: true },
    fk_supplier_id: { type: "number", integer: true, optional: true, nullable: true }
  };

  return v.validate(fields, schema);
};

const create = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Creating Product");

  let {
    name,
    ean,
    fractioned_qty,
    unit_price,
    buy_price,
    cost_price,
    selling_price,
    profit,
    ipi,
    icms,
    ncm,
    csosn,
    fk_supplier_id
  } = req.body;

  let product = {
    name,
    ean,
    fractioned_qty,
    unit_price,
    buy_price,
    cost_price,
    selling_price,
    profit,
    ipi,
    icms,
    ncm,
    csosn,
    fk_supplier_id
  };

  const validationResponse = validateFields(product);

  if (validationResponse !== true) {
    //? The validator is not totally boolean, when not passed it returns a json about the error

    return res.status(400).json({
      message: "Validation Error",
      error: validationResponse,
    });
  }

  models.Product.create(product)
    .then((result: any) =>
      res.status(201).json({
        message: "Product Created successfully",
        post: result,
      })
    )
    .catch((err: any) => {
      logging.error(NAMESPACE, err.message, err);

      return res.status(500).json({
        message: "ERROR: Product not Created",
        error: err,
      });
    });
};

const getById = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `Getting Product by Id`);

  const id = req.params.id;

  models.Product.findByPk(id)
    .then((result: any) => {
      if (!result) {
        res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(result);
    })
    .catch((err: any) => {
      logging.error(NAMESPACE, err.message, err);

      return res.status(500).json({
        message: "ERROR: ID not founded",
        error: err,
      });
    });
};

const getAll = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `Getting All Products`);

  models.Product.findAll()
    .then((results: any) => res.status(200).json({ results }))
    .catch((err: any) => {
      logging.error(NAMESPACE, err.message, err);

      return res.status(500).json({
        message: "ERROR",
        error: err,
      });
    });
};

const update = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `Updating a Product`);

  const id = req.params.id;

  let {
    name,
    ean,
    fractioned_qty,
    unit_price,
    buy_price,
    cost_price,
    selling_price,
    profit,
    ipi,
    icms,
    ncm,
    csosn,
    fk_supplier_id
  } = req.body;

  let updatedInfo = {
    name,
    ean,
    fractioned_qty,
    unit_price,
    buy_price,
    cost_price,
    selling_price,
    profit,
    ipi,
    icms,
    ncm,
    csosn,
    fk_supplier_id
  };

  const validationResponse = validateFields(updatedInfo);

  if (validationResponse !== true) {
    //? The validator is not totally boolean, when not passed it returns a json about the error

    return res.status(400).json({
      message: "Validation Error",
      error: validationResponse,
    });
  }

  models.Product.update(updatedInfo, { where: { id } })
    .then((result: any) => res.status(200).json({ result })) //? the result here, returns a boolean value!
    .catch((err: any) => {
      logging.error(NAMESPACE, err.message, err);

      return res.status(500).json({
        message: "ERROR: Product not updated",
        error: err,
      });
    });
};

const destroy = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `Deleting a Product`);

  const id = req.params.id;

  models.Product.destroy({ where: { id } })
    .then((result: any) => res.status(200).json({ result })) //? the result here, returns a boolean value!
    .catch((err: any) => {
      logging.error(NAMESPACE, err.message, err);

      return res.status(500).json({
        message: "ERROR: Product not deleted",
        error: err,
      });
    });
};

export default { getAll, create, getById, update, destroy };
