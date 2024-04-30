import { Request, Response } from 'express';

const todos = [
    { id: 1, name: "Todo 1" },
    { id: 2, name: "Todo 2" },
    { id: 3, name: "Todo 3" },
    { id: 4, name: "Todo 4" },
    { id: 5, name: "Todo 5" },
]

export class TodosController {
    //* DI
    constructor(){}

    public getTodos(req:Request, res:Response){

            return res.json(todos);

    }

    public getTodoById(req:Request, res:Response){
        const  id = +req.params.id;
        if(isNaN(id)){
            return res.status(400).json({ message: "Id require a number" });
        }
        const todo = todos.find(todo => todo.id === Number(id));
        if(!todo){
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.json(todo);
    }
}