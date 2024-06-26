import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import usersRouter from "./routes/users.route";
import mealsRouter from "./routes/meals.route";
import authRouter from "./routes/auth.route";
import { notFound, errorHandler } from "./middlewares/error.middleWare";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
// @ts-ignore
// import swaggerDocument from "../swagger.json" assert { type: "json" };
import { corsOptions } from "./config/cors-config";

const port = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// define route path
app.use("/api/users", usersRouter);
app.use("/api/meals", mealsRouter);
app.use("/api/auth", authRouter);
// app.use("/api/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
// Error handling middleware for Prisma errors
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
