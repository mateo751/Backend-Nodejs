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
exports.listWriters = exports.deleteWriter = exports.updateWriter = exports.retrieveWriter = exports.createWriter = void 0;
const writer_model_1 = require("../models/writer.model");
const createWriter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, lugarDeNacimiento, fechaDeNacimiento, generosLiterarios, librosDestacados } = req.body;
    const response = yield new WriterController().create({ nombre, lugarDeNacimiento, fechaDeNacimiento, generosLiterarios, librosDestacados });
    return res.status(response.status).json(response);
});
exports.createWriter = createWriter;
const retrieveWriter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new WriterController().retrieve(docId);
    return res.status(response.status).json(response);
});
exports.retrieveWriter = retrieveWriter;
const updateWriter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, lugarDeNacimiento, fechaDeNacimiento, generosLiterarios, librosDestacados } = req.body;
    const docId = req.params.id;
    const response = yield new WriterController().update(docId, { nombre, lugarDeNacimiento, fechaDeNacimiento, generosLiterarios, librosDestacados });
    return res.status(response.status).json(response);
});
exports.updateWriter = updateWriter;
const deleteWriter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new WriterController().delete(docId);
    return res.status(response.status).json(response);
});
exports.deleteWriter = deleteWriter;
const listWriters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield new WriterController().list();
    return res.status(200).json(response);
});
exports.listWriters = listWriters;
class WriterController {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const writer = new writer_model_1.Writer(payload);
            return writer.save().then(data => {
                return {
                    message: "CREATED: Writer added to database",
                    status: 201,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "Error on create Writer",
                    status: 500,
                    content: err
                };
            });
        });
    }
    retrieve(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return writer_model_1.Writer.findOne({ _id: docId }).then(data => {
                if (data === null) {
                    return {
                        message: "NOT FOUND: Writer not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Writer retrieve",
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
            return writer_model_1.Writer.updateOne({ _id: docId }, { $set: {
                    /*, , , ,  */
                    nombre: payload.nombre,
                    lugarDeNacimiento: payload.lugarDeNacimiento,
                    fechaDeNacimiento: payload.fechaDeNacimiento,
                    generosLiterarios: payload.generosLiterarios,
                    librosDestacados: payload.librosDestacados
                } }).then(data => {
                return {
                    message: "OK: Writer updated",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: Writer not updated",
                    status: 500,
                    content: err
                };
            });
        });
    }
    delete(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return writer_model_1.Writer.deleteOne({ _id: docId }).then(data => {
                if (data.deletedCount == 0) {
                    return {
                        message: "NOT FOUND: Writer not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Writer deleted",
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
            return writer_model_1.Writer.find({}).then(data => {
                return {
                    message: "OK: All writers retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return { message: "Error on retrieve Writers", status: 500, content: err };
            });
        });
    }
}
