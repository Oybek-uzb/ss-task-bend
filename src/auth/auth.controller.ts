import {Body, Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {AuthService} from "./auth.service"
import {AuthDTO} from "./dto";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: AuthDTO): Promise<any> {
        return this.authService.signup(dto);
    }

    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto: AuthDTO): Promise<any> {
        return this.authService.signin(dto);
    }

}