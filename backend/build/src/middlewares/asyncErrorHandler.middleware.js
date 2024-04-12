"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncErrorHandler = void 0;
// Define the asyncErrorHandler function with TypeScript types
const asyncErrorHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.asyncErrorHandler = asyncErrorHandler;
