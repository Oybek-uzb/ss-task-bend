import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class AuthDTO {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string
}