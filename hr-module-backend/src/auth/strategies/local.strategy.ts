import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService) {
        super({
            passwordField: 'password_hash'
        });
    }
    
    async validate(username: string, password_hash: string): Promise<any> {
        const user = await this.authService.validateUser({
            username,
            password_hash
        });

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}