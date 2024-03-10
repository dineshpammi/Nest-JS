import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Customers, CustomerSchema } from "src/schemas/customer.schema";
import { CustomersService } from "./customers.service";
import { CustomerController } from "./customers.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [MongooseModule.forFeature([{
        name: Customers.name, schema: CustomerSchema
    }]),
        AuthModule],
    controllers: [CustomerController],
    providers: [CustomersService],
})
export class CustomersModule { }

