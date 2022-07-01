"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBooks = exports.deleteBook = exports.updateBook = exports.retrieveBook = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, cantidad, fechaDePublicacion, paginas, formato, procedencia, editorial, descripcion } = req.body;
    const response = yield new BookController().create({ titulo, cantidad, fechaDePublicacion, paginas, formato, procedencia, editorial, descripcion });
    return res.status(response.status).json(response);
});
exports.createBook = createBook;
const retrieveBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new BookController().retrieve(docId);
    return res.status(response.status).json(response);
});
exports.retrieveBook = retrieveBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, cantidad, fechaDePublicacion, paginas, formato, procedencia, editorial, descripcion } = req.body;
    const docId = req.params.id;
    const response = yield new BookController().update(docId, { titulo, cantidad, fechaDePublicacion, paginas, formato, procedencia, editorial, descripcion });
    return res.status(response.status).json(response);
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new BookController().delete(docId);
    return res.status(response.status).json(response);
});
exports.deleteBook = deleteBook;
const listBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield new BookController().list();
    return res.status(200).json(response);
});
exports.listBooks = listBooks;
class BookController {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = new book_model_1.Book(payload);
            return book.save().then(data => {
                return {
                    message: "CREATED: Book added to database",
                    status: 201,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "Error on create Book",
                    status: 500,
                    content: err
                };
            });
        });
    }
    retrieve(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return book_model_1.Book.findOne({ _id: docId }).then(data => {
                if (data === null) {
                    return {
                        message: "NOT FOUND: Book not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Book retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    update(docId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return book_model_1.Book.updateOne({ _id: docId }, { $set: {
                    /*titulo , cantidad, fechaDePublicacion, paginas, formato, procedencia, editorial, descripcion*/
                    titulo: payload.titulo,
                    cantidad: payload.cantidad,
                    fechaDePublicacion: payload.fechaDePublicacion,
                    paginas: payload.paginas,
                    formato: payload.formato,
                    procedencia: payload.procedencia,
                    editorial: payload.editorial,
                    descripcion: payload.descripcion
                } }).then(data => {
                return {
                    message: "OK: Book updated",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: Book not updated",
                    status: 500,
                    content: err
                };
            });
        });
    }
    delete(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return book_model_1.Book.deleteOne({ _id: docId }).then(data => {
                if (data.deletedCount == 0) {
                    return {
                        message: "NOT FOUND: Book not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Book deleted",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return book_model_1.Book.find({}).then(data => {
                return {
                    message: "OK: All Books retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return { message: "Error on retrieve Books", status: 500, content: err };
            });
        });
    }
}
