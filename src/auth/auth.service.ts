import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAccountDto } from './dto/create-account.dto';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

    async createAccount(dto: CreateAccountDto) {
        const existing = await this.userService.findUserByEmail(dto.email);

        if (existing) {
            throw new UnauthorizedException(
                'User with that email already exists',
            );
        }

        const user = await this.userService.createUser(
            dto.firstName,
            dto.lastName,
            dto.email,
            dto.password,
        );

        return user;
    }

    async signIn(dto: SignInDto) {
        const user = await this.userService.findUserByEmail(dto.email);

        if (!user) throw new UnauthorizedException('Invalid Credentials');

        const isValid = await bcrypt.compare(dto.password, user.password);
        if (!isValid) throw new UnauthorizedException('Invalid Credentials');

        const token = this.jwtService.sign({ id: user.id, email: user.email });
        return { token };
    }
}
