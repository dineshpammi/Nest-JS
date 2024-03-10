import { IsAlphanumeric, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsObject, IsString, isObject } from "class-validator";
import { Address, Company } from "src/schemas/customer.schema";
import { User } from "src/schemas/user.schema";

export class CreateCustomerDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    website: string;

    @IsObject()
    address?: Address;

    @IsObject()
    company?: Company;

    @IsEmpty({ message: 'Id not allowed in payload' })
    readonly createdBy: User

    readonly isDeleted: boolean;
}
