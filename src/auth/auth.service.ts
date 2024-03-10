import { Get, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/auth/dto/SignUp.dto';
import { LoginDto } from 'src/auth/dto/Login.dto';
@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) {
    }
    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { name, email, password } = signUpDto;
        const user = await this.userModel.findOne({ email })
        if (user) {
            throw new UnauthorizedException('Email already registered')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        // try {
        const createdUser = await this.userModel.create({ name, email, password: hashedPassword })
        const token = this.jwtService.sign({ id: createdUser._id })
        return { token };
        // } catch (error) {
        //     throw new HttpException({
        //         status: HttpStatus.BAD_REQUEST,
        //         error: 'Invalid Payload',
        //     }, HttpStatus.BAD_REQUEST, {
        //         cause: error
        //     });
        // }
    }

    async logIn(logInDto: LoginDto): Promise<{ token: string, name: string }> {
        const { email, password } = logInDto;
        const user = await this.userModel.findOne({ email })
        if (!user) {
            throw new UnauthorizedException('Invalid email or password')
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password')
        }
        const token = this.jwtService.sign({ id: user._id })
        return { token, name: user.name };
        // else {
        //     try {
        //         const createdUser = await this.userModel.create({ name, email, password: hashedPassword })
        //         const token = this.jwtService.sign({ id: createdUser._id })
        //         return { token };
        //     } catch (error) {
        //         throw new HttpException({
        //             status: HttpStatus.BAD_REQUEST,
        //             error: 'Invalid Payload',
        //         }, HttpStatus.BAD_REQUEST, {
        //             cause: error
        //         });
        //     }
        // }
    }

    async getUser(user: any): Promise<any> {
        try {
            let response = { '_id': user._id, name: user.name, email: user.email }
            return response

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Invalid User',
            }, HttpStatus.UNAUTHORIZED, {
                cause: error
            });
        }
    }
}
