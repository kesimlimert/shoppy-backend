import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt } from "passport-jwt";
import { Request } from "express";
import { TokenPayload } from "../token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies.Authentication,
            ]),
            secretOrKey: configService.getOrThrow('JWT_KEY'),
        });
    }
    validate(payload: TokenPayload) {
        return payload;
    }
}