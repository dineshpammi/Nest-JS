import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TodoSchema, Todos } from "src/schemas/todo.schema";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";

@Module({
    imports: [MongooseModule.forFeature([{
        name: Todos.name, schema: TodoSchema
    }])],
    controllers: [TodoController],
    providers: [TodoService],
})
export class TodosModule { }

