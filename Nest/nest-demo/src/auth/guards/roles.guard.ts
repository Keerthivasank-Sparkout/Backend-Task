import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "../schema/user-schema.schema";
import { ROLES_KEY } from "../decorators/roles.decorator";



@Injectable()
export class RolesGaurd implements CanActivate{
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean{
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY,[
                context.getHandler(),
                context.getClass()
            ]
        )
        if(!requiredRoles){
            return true
        }
        const {user} = context.switchToHttp().getRequest()
        if(!user){
            throw new ForbiddenException("User not Authendicated");
        }
        const hasReuiredRole = requiredRoles.some(role=>user.role === role);
        console.log(user.role);
        if(!hasReuiredRole){
            throw new ForbiddenException("Insufficient permission");
        }
        return true;
    }
}