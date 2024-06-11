import { CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { JWTpayload, Positions } from "../misc/types";


export const POSITIONS_KEY = 'positions'
export const RequiredPositions = (...positions: Positions[]) => SetMetadata(POSITIONS_KEY, positions)



@Injectable()
export class PositionGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private jwtService: JwtService) {

  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  const requiredPositions = this.reflector.getAllAndOverride<Positions[]>(POSITIONS_KEY, [
    context.getHandler(),
    context.getClass()
  ])
  const request = context.switchToHttp().getRequest()
  const payload: JWTpayload = request.user
 if (requiredPositions.includes(payload.position)) {
  return true
} else {
  let message = 'You do not have right to use this route'
  if (payload.position === 'Processor') {
    message = 'User with position Processor can not use this route'
  }
  if (payload.position === 'Requester') {
    message = 'User with position Requester can not use this route'
  }
  throw new ForbiddenException({message})
}
 }}
  