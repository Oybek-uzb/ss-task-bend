import {ForbiddenException, Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import {AuthDTO} from "./dto";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {}

    async signup(dto: AuthDTO): Promise<any> {
        const user = await this.prismaService.user.findFirst({
            where: {
                userName: dto.username
            }
        })

        if (user) throw new ForbiddenException("User already exists");

        const hash = await this.hashData(dto.password);

        return await this.prismaService.user.create({
            data: {
                userName: dto.username,
                hash,
            },
        })
    }

    async signin(dto: AuthDTO): Promise<any> {
        const user = await this.prismaService.user.findFirst({
            where: {
                userName: dto.username
            }
        })
        if (!user) throw new ForbiddenException("Access denied!");

        const passwordMatches = await bcrypt.compare(dto.password, user.hash);
        if (!passwordMatches) throw new ForbiddenException("Access denied!")

        return user;
    }

    hashData(data: string) {
        return bcrypt.hash(data, 10);
    }
}
