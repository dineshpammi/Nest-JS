import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/auth/dto/SignUp.dto';
import { LoginDto } from 'src/auth/dto/Login.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/schemas/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/signup')
    @UsePipes(new ValidationPipe())
    signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUpDto)
    }

    @Post('/login')
    @UsePipes(new ValidationPipe())
    login(@Body() loginDto: LoginDto): Promise<{ token: string, name: string }> {
        return this.authService.logIn(loginDto)
    }

    @Get('/user')
    @UseGuards(AuthGuard())
    async getUser(@Req() req): Promise<User> {
        return await this.authService.getUser(req.user);
    }
}
