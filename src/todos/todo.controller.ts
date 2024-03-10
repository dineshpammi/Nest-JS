import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/CreateTodo.dto';
import { Todos } from 'src/schemas/todo.schema';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    async createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todos> {
        return await this.todoService.createTodo(createTodoDto);
    }

    @Get()
    async getTodo() {
        const todos = await this.todoService.getTodos();
        return todos;
    }
}
