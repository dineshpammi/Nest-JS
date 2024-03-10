import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsObject, IsString, MinLength, isObject } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter correct mail' })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string;

}
