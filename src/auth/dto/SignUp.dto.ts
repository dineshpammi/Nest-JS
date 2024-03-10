import {  IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsObject, IsString, MinLength, isObject } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsEmail({},{message:'Please enter correct mail'})
    readonly email: string;

    @MinLength(8)
    readonly password: string;

}
