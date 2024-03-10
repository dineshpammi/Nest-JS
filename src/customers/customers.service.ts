import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customers } from "src/schemas/customer.schema";
import { CreateCustomerDto } from "./dto/CreateCustomer.dto";
import { User } from "src/schemas/user.schema";

@Injectable()
export class CustomersService {
    constructor(@InjectModel(Customers.name) private customerModel: Model<Customers>) {
    }

    async createCustomer(createCustomerDto: CreateCustomerDto, user: User): Promise<Customers> {
        try {
            const data = Object.assign(createCustomerDto, { createdBy: user._id })
            const createdCustomer = await this.customerModel.create(data)
            return createdCustomer
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Invalid Data',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    async getCustomers(query?: any): Promise<Customers[]> {
        try {
            if (query?.limit) {//for pagination query 
                return await this.customerModel.find({ isDeleted: false }).sort('id').limit(query?.limit).skip((query?.skip) ? (query?.skip) : 0)
            }
            else {
                return await this.customerModel.find().sort('id')
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: error,
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    async getCustomersById(id: number): Promise<Customers[]> {
        try {
            let customer = await this.customerModel.find({ id: id, isDeleted: false })
            if (customer.length) {
                return customer
            }
            else {
                throw new UnauthorizedException('Invalid User ID')
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Customer ID not found',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    async updateCustomerById(id: string, customer: Customers): Promise<Customers> {
        try {
            return await this.customerModel.findByIdAndUpdate(id, customer, {
                new: false,
                runValidators: true,
            });
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Customer ID not found',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }

    }

    async removeCustomersById(id: string): Promise<Customers[]> {
        try {
            const filter = { _id: id };
            return await this.customerModel.findByIdAndDelete(id)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Customer ID not found',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    async softDeleteCustomerById(id: string): Promise<Customers[]> {
        try {
            return await this.customerModel.findByIdAndUpdate(id, { isDeleted: true }, {
                new: false,
                runValidators: true,
            });
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Customer ID not found',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
    async getCustomersWithFilters(payload?: any): Promise<Customers[]> {
        try {
            if (payload?.name) {//for pagination query 
                return await this.customerModel.find().find({ name: { $regex: new RegExp(payload?.name) }, id: { $lt: payload?.id } }).limit((payload?.limit) ? (payload?.limit) : 10).skip((payload?.skip) ? (payload?.skip) : 0)
            }
            else {
                return await this.customerModel.find().sort('id').limit((payload?.limit) ? (payload?.limit) : 10).skip((payload?.skip) ? (payload?.skip) : 0)
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: error,
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
}