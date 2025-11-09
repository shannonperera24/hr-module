import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

type AuthInput = { username: string; password_hash: string };
type SignInData = { user_id: number; username: string };
type AuthResult = { accessToken: string; user_id: number; username: string };

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.usersService.findUserByName(input.username)
        
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(input.password_hash, user.password_hash);

        if (isPasswordValid) {
            return {
                user_id: user.user_id,
                username: user.username
            }
        }
        
        return null;
    }

    async signIn(user: SignInData): Promise<AuthResult> {
        const tokenPayload = {
            sub: user.user_id,
            username: user.username
        }

        const accessToken = await this.jwtService.signAsync(tokenPayload);

        return { accessToken, username: user.username, user_id: user.user_id };
    }
}