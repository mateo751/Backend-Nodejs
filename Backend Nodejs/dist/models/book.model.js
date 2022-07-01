"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
//Schema
const bookSchema = new mongoose_1.Schema({
    titulo: { type: String },
    cantidad: { type: Number },
    fechaDePublicacion: { type: Date },
    paginas: { type: Number },
    formato: { type: String },
    procedencia: { type: String },
    editorial: { type: String },
    descripcion: { type: String }
});
//Model
const Book = (0, mongoose_1.model)('Book', bookSchema);
exports.Book = Book;
