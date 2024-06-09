import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {

  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
   const request = context.switchToHttp().getRequest()
   try {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      throw new UnauthorizedException({message: 'AuthHeader not found'})
    }
    const bearer = authHeader.split(' ')[0]
    const token = authHeader.split(' ')[1]
    if (!token || !bearer) {
     throw new UnauthorizedException({message: 'Token not found'});
   }
   const user = this.jwtService.verify(token)
   request['user'] = user
   return true
   } catch (error) {
    throw new UnauthorizedException({message: error})
   }
  }
  
}