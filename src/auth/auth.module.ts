import {Module} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";

@Module({
    imports: [PrismaService],
    controllers: [AuthController],
    providers: [AuthService, PrismaService],
})
export class AuthModule {}
