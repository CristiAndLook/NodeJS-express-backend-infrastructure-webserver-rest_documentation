import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos/index';

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
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        
        if (error) return res.status(400).json({ error });

        await prisma.todo.create({
            data: createTodoDto!
        }).then(todo => {
            res.json(todo);
        }).catch(err => {
            res.status(500).json({ error: err.message });
        });
    };

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

        if (error) return res.status(400).json({ error });


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
                data: updateTodoDto!.values
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