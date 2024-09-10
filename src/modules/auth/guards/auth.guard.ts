import { AuthService } from "./../auth.service";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { isJWT } from "class-validator";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    const request: Request = httpContext.getRequest<Request>();
    const token = this.extractToken(request);
    request.user = await this.authService.validateAccessToken(token);
    return true;
  }
  protected extractToken(request: Request) {
    const { authorization } = request.headers;
    if (!authorization || authorization?.trim() === "") {
      throw new UnauthorizedException("authorization header is required");
    }
    const [bearer, token] = authorization?.split(" ");
    if (bearer?.toLocaleLowerCase() !== "bearer" || !token || !isJWT(token)) {
      throw new UnauthorizedException("invalid authorization header");
    }
    return token;
  }
}
