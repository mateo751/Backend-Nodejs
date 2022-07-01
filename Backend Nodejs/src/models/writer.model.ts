import { Schema, model } from 'mongoose';

//Interface
export interface IWriter {
    nombre:            string;
    lugarDeNacimiento:  null | string;
    fechaDeNacimiento:      null | Date;
    generosLiterarios:      string;
    librosDestacados:       null | string;
} 

//Schema
const writerSchema = new Schema<IWriter>({
    nombre: {type: String},
    lugarDeNacimiento : {type: String},
    fechaDeNacimiento: {type: Date},
    generosLiterarios: {type: String},
    librosDestacados: {type: String},
});

//Model
const Writer = model<IWriter>('Player', writerSchema);

export {Writer}

