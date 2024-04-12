"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const users_route_1 = __importDefault(require("./routes/users.route"));
const meals_route_1 = __importDefault(require("./routes/meals.route"));
const error_middleWare_1 = require("./middlewares/error.middleWare");
const cors_1 = __importDefault(require("cors"));
// @ts-ignore
// import swaggerDocument from "../swagger.json" assert { type: "json" };
const cors_config_1 = require("./config/cors-config");
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(cors_config_1.corsOptions));
// define route path
app.use("/api/users", users_route_1.default);
app.use("/api/meals", meals_route_1.default);
// app.use("/api/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// catch 404 and forward to error handler
// Error handling middleware for Prisma errors
app.use(error_middleWare_1.notFound);
app.use(error_middleWare_1.errorHandler);
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
