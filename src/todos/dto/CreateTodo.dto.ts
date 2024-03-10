import { IsAlphanumeric, IsBoolean, IsNotEmpty, IsNumber, IsNumberString, IsObject, IsString, isObject } from "class-validator";

export class CreateTodoDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsBoolean()
    completed: boolean;
}
