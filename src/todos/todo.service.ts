import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTodoDto } from "./dto/CreateTodo.dto";
import {  Todos } from "src/schemas/todo.schema";

@Injectable()
export class TodoService {
    constructor(@InjectModel(Todos.name) private todoModel: Model<Todos>) {
    }

    async createTodo(createTodoDto: CreateTodoDto): Promise<Todos> {
        const createdTodo = await this.todoModel.create(createTodoDto)
        return createdTodo
    }

    async getTodos(): Promise<Todos[]> {
        return await this.todoModel.find()
    }
}