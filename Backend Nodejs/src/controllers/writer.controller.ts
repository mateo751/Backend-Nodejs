import { Request, Response } from 'express';
import { IWriter, Writer } from '../models/writer.model';
import { IResponse } from '../models/response.model';


export const createWriter = async (req: Request, res: Response)=> {           
    const { nombre, lugarDeNacimiento, fechaDeNacimiento, generosLiterarios, librosDestacados } : IWriter = req.body;
    const response = await new WriterController().create({ nombre, lugarDeNacimiento, fechaDeNacimiento, generosLiterarios, librosDestacados });         
    return res.status(response.status).json(response);   
}

export const retrieveWriter = async (req: Request, res: Response) => {
   const docId : String = req.params.id; 
   const response = await new WriterController().retrieve(docId);         
   return res.status(response.status).json(response);   
}

export const updateWriter = async (req: Request, res: Response)=> {           
    const { nombre, lugarDeNacimiento, fechaDeNacimiento, generosLiterarios, librosDestacados } : IWriter = req.body;
    const docId : String = req.params.id; 
    const response = await new WriterController().update(docId, { nombre, lugarDeNacimiento, fechaDeNacimiento, generosLiterarios, librosDestacados });         
    return res.status(response.status).json(response);   
}

export const deleteWriter = async (req: Request, res: Response) => {
    const docId : String = req.params.id; 
    const response = await new WriterController().delete(docId);         
    return res.status(response.status).json(response);   
 }

export const listWriters = async (req:Request, res: Response) => {
    const response = await new WriterController().list();         
    return res.status(200).json(response);    
}




class WriterController {

    public async create(payload : IWriter) : Promise<IResponse> {
        const writer = new Writer(payload);
        return writer.save().then(data => {
            return {
                message: "CREATED: Writer added to database",
                status: 201,
                content : data
            }
        }).catch(err => {
            return {
                message: "Error on create Writer",
                status: 500,
                content : err
            }
        });        
    }

    public async retrieve(docId: String) : Promise<IResponse> {        
        return Writer.findOne({_id: docId}).then(data => {
            if(data === null) {
                return {
                    message: "NOT FOUND: Writer not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Writer retrieve",
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

    public async update(docId: String, payload : IWriter) : Promise<IResponse>{
        return Writer.updateOne({_id: docId} , { $set: { 
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
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: Writer not updated",
                status: 500,
                content : err
            }
        });
    }
    



    public async delete(docId: String) : Promise<IResponse> {
        return Writer.deleteOne({_id: docId}).then(data => {
            if (data.deletedCount == 0) {
                return {
                    message: "NOT FOUND: Writer not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Writer deleted",
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
        return Writer.find({}).then(data => {
                return {
                    message: "OK: All writers retrieve",
                    status: 200,
                    content : data
                };
            }).catch(err => {
                return { message: "Error on retrieve Writers", status: 500, content : err }
        });       
    }

}