import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';

export class TodosController {
    //* DI
    constructor() { }

    public getTodos = async (req: Request, res: Response) => {

        await prisma.todo.findMany()
            .then(todos => {
                res.json(todos);
            }).catch(err => {
                res.status(500).json({ error: err.message });
            });

    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        await prisma.todo.findUnique({
            where: {
                id: id
            }
        }).then(todo => {
            if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });
            res.json(todo);
        }).catch(err => {
            res.status(500).json({ error: err.message });
        });
    }

    public createTodo = async (req: Request, res: Response) => {
        const { text } = req.body;
        
        if (!text) return res.status(400).json({ error: 'Text property is required' });

        await prisma.todo.create({
            data: {
                text: text,
                completedAt: null
            }
        }).then(todo => {
            res.json(todo);
        }).catch(err => {
            res.status(500).json({ error: err.message });
        });

    };

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        await prisma.todo.findUnique({
            where: {
                id: id
            }
        }).then(todo => {
            if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

            const { text, completedAt } = req.body;

            prisma.todo.update({
                where: {
                    id: id
                },
                data: {
                    text: text || todo.text,
                    completedAt: completedAt || todo.completedAt
                }
            }).then(todo => {
                res.json(todo);
            }).catch(err => {
                res.status(500).json({ error: err.message });
            });

        }).catch(err => {
            res.status(500).json({ error: err.message });
        });

    }


    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        await prisma.todo.delete({
            where: {
                id: id
            }
        }).then(todo => {
            if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });
            res.json(todo);
        }).catch(err => {
            res.status(500).json({ error: err.message });
        });
    }
}