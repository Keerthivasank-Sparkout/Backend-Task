import { Body, Controller, Post, UseGuards ,Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { jwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from './schema/user-schema.schema';
import { RolesGaurd } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('register')
    async register(@Body()registerDetails:RegisterDto){
        console.log(registerDetails);
        
        return await this.authService.register(registerDetails)
    }

    @Post('login')
    async login(@Body() loginDetails:LoginDto){
        return await this.authService.login(loginDetails);
    }

    @Post('refresh')
    async refreshToken(@Body('refreshToken')token:string){
        return await this.authService.refreshToken(token);
    }

    @UseGuards(jwtAuthGuard)
    @Get('profile')
    async getProfile(@CurrentUser() user:any){
        return user
    }

    @Post('create-admin')
    @Roles(UserRole.ADMIN)
    @UseGuards(jwtAuthGuard,RolesGaurd)
    createAdmin(@Body() registerDto:RegisterDto){
        return this.authService.createAdmin(registerDto);
    }
    
}
