import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {

  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
   const request = context.switchToHttp().getRequest()
   try {
    let token = ''
    let authHeader = request.headers.authorization
    if (authHeader) {
      token = authHeader.split(' ')[1]
    } else {
      authHeader = request.headers.jwt
      token = authHeader
      if (!authHeader) {
      throw new UnauthorizedException({message: 'AuthHeader not found'})
      }
    }
    if (!token) {
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