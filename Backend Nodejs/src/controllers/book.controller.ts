import { Request, Response } from 'express';
import { IBook, Book } from '../models/book.model';
import { IResponse } from '../models/response.model';


export const createBook = async (req: Request, res: Response)=> {           
    const { titulo, cantidad, fechaDePublicacion, paginas, formato, procedencia, editorial, descripcion } : IBook = req.body;
    const response = await new BookController().create({ titulo, cantidad, fechaDePublicacion, paginas, formato, procedencia, editorial, descripcion });         
    return res.status(response.status).json(response);   
}

export const retrieveBook = async (req: Request, res: Response) => {
   const docId : String = req.params.id; 
   const response = await new BookController().retrieve(docId);         
   return res.status(response.status).json(response);   
}

export const updateBook = async (req: Request, res: Response)=> {           
    const { titulo, cantidad, fechaDePublicacion, paginas, formato, procedencia, editorial, descripcion } : IBook = req.body;
    const docId : String = req.params.id; 
    const response = await new BookController().update(docId, { titulo, cantidad, fechaDePublicacion, paginas, formato, procedencia, editorial, descripcion });         
    return res.status(response.status).json(response);   
}

export const deleteBook = async (req: Request, res: Response) => {
    const docId : String = req.params.id; 
    const response = await new BookController().delete(docId);         
    return res.status(response.status).json(response);   
 }

export const listBooks = async (req: Request, res: Response) => {
    const response = await new BookController().list();         
    return res.status(200).json(response);    
}




class BookController {

    public async create(payload : IBook) : Promise<IResponse> {
        const book = new Book(payload);
        return book.save().then(data => {
            return {
                message: "CREATED: Book added to database",
                status: 201,
                content : data
            }
        }).catch(err => {
            return {
                message: "Error on create Book",
                status: 500,
                content : err
            }
        });        
    }

    public async retrieve(docId: String) : Promise<IResponse> {        
        return Book.findOne({_id: docId}).then(data => {
            if(data === null) {
                return {
                    message: "NOT FOUND: Book not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Book retrieve",
                status: 200,
                content : data
            };
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.name ,
                status: 500,
                content : err
            };
        });        
    }

    public async update(docId: String, payload : IBook) : Promise<IResponse>{
        return Book.updateOne({_id: docId} , { $set: { 
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
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: Book not updated",
                status: 500,
                content : err
            }
        });
    }
    



    public async delete(docId: String) : Promise<IResponse> {
        return Book.deleteOne({_id: docId}).then(data => {
            if (data.deletedCount == 0) {
                return {
                    message: "NOT FOUND: Book not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Book deleted",
                status: 200,
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.name,
                status: 500,
                content : err
            }
        });
    }

    public async list() : Promise<IResponse> {
        return Book.find({}).then(data => {
                return {
                    message: "OK: All Books retrieve",
                    status: 200,
                    content : data
                };
            }).catch(err => {
                return { message: "Error on retrieve Books", status: 500, content : err }
        });       
    }

}