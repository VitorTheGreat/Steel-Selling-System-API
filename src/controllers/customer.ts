import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import Validator from "fastest-validator";
const models = require("../models");

const NAMESPACE = "CUSTOMER CONTROLLER";

const validateFields = (fields: object) => {
    const v = new Validator();

    const schema = {
        name: { type: "string", nullable: false },
        email: { type: "string", optional: true, nullable: true },
        document: { type: "string", nullable: false },
        rg: { type: "string", nullable: false },
        contact: { type: "string", nullable: false },
        secondary_contact: { type: "string", nullable: false },
        postal_code: { type: "string", nullable: false },
        city: { type: "string", nullable: false },
        neighborhood: { type: "string", optional: true, nullable: true },
        address: { type: "string", optional: true, nullable: true },
        fk_state_id: { type: "number", optional: true, nullable: true, integer: true },
    };

    return v.validate(fields, schema);
};

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Creating Product");

    let {
        name,
        email,
        document,
        rg,
        contact,
        secondary_contact,
        postal_code,
        city,
        neighborhood,
        address,
        fk_state_id,
    } = req.body;

    let customer = {
        name,
        email,
        document,
        rg,
        contact,
        secondary_contact,
        postal_code,
        city,
        neighborhood,
        address,
        fk_state_id,
    };

    const validationResponse = validateFields(customer);

    if (validationResponse !== true) {
        //? The validator is not totally boolean, when not passed it returns a json about the error

        return res.status(400).json({
            message: "Validation Error",
            error: validationResponse,
        });
    }

    models.Customer.create(customer)
        .then((result: any) =>
            res.status(201).json({
                message: "Customer Created successfully",
                post: result,
            })
        )
        .catch((err: any) => {
            logging.error(NAMESPACE, err.message, err);

            return res.status(500).json({
                message: "ERROR: Customer not Created",
                error: err,
            });
        });
};

const getById = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Getting Customer by Id`);

    const id = req.params.id;

    models.Customer.findByPk(id)
        .then((result: any) => {
            if (!result) {
                res.status(404).json({ message: "Customer not found" });
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
    logging.info(NAMESPACE, `Getting All Customers`);

    models.Customer.findAll()
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
    logging.info(NAMESPACE, `Updating a Customer`);

    const id = req.params.id;

    let {
        name,
        email,
        document,
        rg,
        contact,
        secondary_contact,
        postal_code,
        city,
        neighborhood,
        address,
        fk_state_id,
    } = req.body;

    let updatedInfo = {
        name,
        email,
        document,
        rg,
        contact,
        secondary_contact,
        postal_code,
        city,
        neighborhood,
        address,
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

    models.Customer.update(updatedInfo, { where: { id } })
        .then((result: any) => res.status(200).json({ result })) //? the result here, returns a boolean value!
        .catch((err: any) => {
            logging.error(NAMESPACE, err.message, err);

            return res.status(500).json({
                message: "ERROR: Customer not updated",
                error: err,
            });
        });
};

const destroy = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Deleting a Customer`);

    const id = req.params.id;

    models.Customer.destroy({ where: { id } })
        .then((result: any) => res.status(200).json({ result })) //? the result here, returns a boolean value!
        .catch((err: any) => {
            logging.error(NAMESPACE, err.message, err);

            return res.status(500).json({
                message: "ERROR: Customer not deleted",
                error: err,
            });
        });
};

export default { getAll, create, getById, update, destroy };
