import { IsAlphanumeric, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsObject, IsOptional, IsString, isObject } from "class-validator";
import { Address, Company } from "src/schemas/customer.schema";
import { User } from "src/schemas/user.schema";

export class UpdateCustomerDto {
    @IsOptional()
    @IsNotEmpty()
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;

    @IsObject()
    address?: Address;
    company?: Company;
    @IsEmpty({ message: 'Id not allowed in payload' })
    readonly createdBy: User
    readonly isDeleted: boolean
}
