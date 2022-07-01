"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Writer = void 0;
const mongoose_1 = require("mongoose");
//Schema
const writerSchema = new mongoose_1.Schema({
    nombre: { type: String },
    lugarDeNacimiento: { type: String },
    fechaDeNacimiento: { type: Date },
    generosLiterarios: { type: String },
    librosDestacados: { type: String },
});
//Model
const Writer = (0, mongoose_1.model)('Player', writerSchema);
exports.Writer = Writer;
