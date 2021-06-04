import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import Validator from "fastest-validator";
const models = require("../models");

const NAMESPACE = "SUPPLIER CONTROLLER";

const validateFields = (fields: object) => {
    const v = new Validator();

    const schema = {
        registered_name: { type: "string", nullable: false },
        email: { type: "string", optional: true, nullable: true },
        cnpj: { type: "string", nullable: false },
        ie: { type: "string", nullable: false },
        contact: { type: "string", nullable: false },
        address: { type: "string", nullable: false },
        neighborhood: { type: "string", nullable: false },
        city: { type: "string", nullable: false },
        postal_code: { type: "string", optional: true, nullable: true },
        fk_state_id: { type: "number", optional: true, nullable: true, integer: true }
    };

    return v.validate(fields, schema);
};

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Creating Supplier");

    let {
        registered_name,
        email,
        cnpj,
        ie,
        contact,
        address,
        neighborhood,
        city,
        postal_code,
        fk_state_id,
    } = req.body;

    let supplier = {
        registered_name,
        email,
        cnpj,
        ie,
        contact,
        address,
        neighborhood,
        city,
        postal_code,
        fk_state_id,
    };

    const validationResponse = validateFields(supplier);

    if (validationResponse !== true) {
        //? The validator is not totally boolean, when not passed it returns a json about the error

        return res.status(400).json({
            message: "Validation Error",
            error: validationResponse,
        });
    }

    models.Supplier.create(supplier)
        .then((result: any) =>
            res.status(201).json({
                message: "Supplier Created successfully",
                post: result,
            })
        )
        .catch((err: any) => {
            logging.error(NAMESPACE, err.message, err);

            return res.status(500).json({
                message: "ERROR: Supplier not Created",
                error: err,
            });
        });
};

const getAll = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Getting All Supplier`);

    models.Supplier.findAll()
        .then((results: any) => res.status(200).json({ results }))
        .catch((err: any) => {
            logging.error(NAMESPACE, err.message, err);

            return res.status(500).json({
                message: "ERROR",
                error: err,
            });
        });
};

const getById = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Getting Product by Id`);

    const id = req.params.id;

    models.Supplier.findByPk(id)
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

const update = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Updating a Supplier`);

    const id = req.params.id;

    let {
        registered_name,
        email,
        cnpj,
        ie,
        contact,
        address,
        neighborhood,
        city,
        postal_code,
        fk_state_id,
    } = req.body;

    let updatedInfo = {
        registered_name,
        email,
        cnpj,
        ie,
        contact,
        address,
        neighborhood,
        city,
        postal_code,
        fk_state_id,
    };

    const validationResponse = validateFields(updatedInfo);

    if (validationResponse !== true) {
        //? The validator is not totally boolean, when not passed it returns a json about the error

        return res.status(400).json({
            message: "Validation Error",
            error: validationResponse,
        });
    }

    models.Supplier.update(updatedInfo, { where: { id } })
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
    logging.info(NAMESPACE, `Deleting a Supplier`);

    const id = req.params.id;

    models.Supplier.destroy({ where: { id } })
        .then((result: any) => res.status(200).json({ result })) //? the result here, returns a boolean value!
        .catch((err: any) => {
            logging.error(NAMESPACE, err.message, err);

            return res.status(500).json({
                message: "ERROR: Supplier not deleted",
                error: err,
            });
        });
};


export default { getAll, create, getById, update, destroy };
