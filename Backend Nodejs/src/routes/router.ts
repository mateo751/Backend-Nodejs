import {Application} from 'express';
import { createBook , deleteBook, listBooks, retrieveBook, updateBook } from '../controllers/book.controller';
import { createWriter, deleteWriter, listWriters, retrieveWriter, updateWriter } from '../controllers/writer.controller';

export const router = (app: Application) => {
    app.post("/writer", createWriter);    
    app.get("/writer/:id", retrieveWriter);
    app.put("/writers/:id", updateWriter);
    app.delete("/writers/:id", deleteWriter);    
    app.get("/writers", listWriters);

    // books
    app.post("/book", createBook );    
    app.get("/book/:id", retrieveBook );
    app.put("/books/:id", updateBook );
    app.delete("/books/:id", deleteBook );    
    app.get("/books", listBooks);
}