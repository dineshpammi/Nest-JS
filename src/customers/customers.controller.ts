import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/CreateCustomer.dto';
import { Customers } from 'src/schemas/customer.schema';
import { UpdateCustomerDto } from './dto/UpdateCustomer.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('customer')
export class CustomerController {
    constructor(private cusService: CustomersService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard())
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto, @Req() req): Promise<Customers> {
        return await this.cusService.createCustomer(createCustomerDto, req.user);
    }

    @Get()
    @UseGuards(AuthGuard())
    async getCustomers(@Query() query: any) {
        const customers = await this.cusService.getCustomers(query);
        return customers;
    }

    @Get(':id')
    async getCustomersById(@Param('id') id: number) {
        const customers = await this.cusService.getCustomersById(id);
        return customers;
    }

    @Put(':id')
    async updateCustomerById(@Param('id') id: string, @Body() customer: CreateCustomerDto): Promise<Customers> {
        return this.cusService.updateCustomerById(id, customer)
    }


    @Delete(':id')
    async removeCustomersById(@Param('id') id: string) {
        const customers = await this.cusService.softDeleteCustomerById(id)//.removeCustomersById(id);
        return customers;
    }

    @Patch(':id')
    async patchCustomerById(@Param('id') id: string, @Body() customer: UpdateCustomerDto): Promise<Customers> {
        return this.cusService.updateCustomerById(id, customer);
    }

    @Post('search')
    async getCustomersWithFilters(@Body() payload: any): Promise<any> {
        return await this.cusService.getCustomersWithFilters(payload);
    }
}
