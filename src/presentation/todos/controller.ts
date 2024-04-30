import { Request, Response } from 'express';


export class TodosController {
    //* DI
    constructor(){}

    public getTodos(req:Request, res:Response){

            res.json([
                { id: 1, name: "Todo 1" },
                { id: 2, name: "Todo 2" },
                { id: 3, name: "Todo 3" },
                { id: 4, name: "Todo 4" },
                { id: 5, name: "Todo 5" },
            ]);

    }
}