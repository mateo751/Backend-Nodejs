import { Schema, model } from 'mongoose';

//Interface
export interface IBook {
    titulo:       null | string;
    cantidad:      null | number;
    fechaDePublicacion:     null | Date;
    paginas:            number | null;
    formato:            string;
    procedencia:         string;
    editorial:           string
    descripcion:         string;
    
} 

//Schema
const bookSchema = new Schema<IBook>({
    titulo: {type: String},
    cantidad: {type: Number},
    fechaDePublicacion: {type: Date},
    paginas: {type: Number},
    formato: {type: String}, 
    procedencia: {type: String},
    editorial:   {type: String},
    descripcion: {type: String}
});

//Model
const Book = model<IBook>('Book', bookSchema);

export {Book}

