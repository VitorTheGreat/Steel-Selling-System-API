import http from "http";
import express from "express";
import bodyParser from "body-parser";
import logging from "./config/logging";
import config from "./config/envConfig";

//this middleware can be used to each route or used to all routes. SEE ROUTES --->
import authMiddleware from "./middleware/check-auth";

//import Routes
import productRoutes from "./routes/product";
import userRoutes from "./routes/user";
import supplierRoutes from './routes/supplier'
import customerRoutes from './routes/customer'

const NAMESPACE = "SERVER";
const router = express();

// Logging the request
router.use((req, res, next) => {
  logging.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  });

  next();
});

// Parse the request
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Rules of our API
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

//Routes
// I chose to use it with all routes here to protect everything
// router.use("/api/books", authMiddleware.checkAuth, productRoutes);
router.use("/api/suppliers", supplierRoutes);
router.use("/api/products", productRoutes);
router.use("/api/customers", customerRoutes);
router.use("/api/user", userRoutes);

// Error Handling
router.use((req, res, next) => {
  const error = new Error("not found");

  return res.status(404).json({
    message: error.message,
  });
});

// Create the server
const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () =>
  logging.info(
    NAMESPACE,
    `Server running on ${config.server.hostname}:${config.server.port}`
  )
);
