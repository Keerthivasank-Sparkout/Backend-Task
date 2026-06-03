import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRole } from './schema/user-schema.schema';
import mongoose, { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>, private readonly jwtService: JwtService) { }

    async register(registerDetails: RegisterDto) {    
        const existingUser = await this.userModel.findOne({ email: registerDetails.email })

        if (existingUser) {
            throw new ConflictException("Already this email exist try new email");
        }

        const hashedPassword = await this.hashPassword(registerDetails.password);

        const savedUser = await this.userModel.create({
            userName: registerDetails.userName,
            phoneNumber: registerDetails.phoneNumber,
            email: registerDetails.email,
            role: UserRole.USER,
            password: hashedPassword
        })
        const userList = savedUser.toObject();

        const { password, ...result } = userList;
        return result;
    }

    async createAdmin(registerDetails: RegisterDto) {
        const existingUser = await this.userModel.findOne({ email: registerDetails.email })

        if (existingUser) {
            throw new ConflictException("Already this email exist try new email");
        }

        const hashedPassword = await this.hashPassword(registerDetails.password);

        const savedUser = await this.userModel.create({
            userName: registerDetails.userName,
            phoneNumber: registerDetails.phoneNumber,
            email: registerDetails.email,
            role: UserRole.ADMIN,
            password: hashedPassword
        })

        const { password, ...result } = savedUser.toObject();
        return {
            userName: result.userName,
            email: result.email,
            phoneNumber: result.phoneNumber,
            role: result.role
        }
    }

    async login(loginDetails: LoginDto) {
        const user = await this.userModel.findOne({ email: loginDetails.email });

        if (!user || !(await this.verifyPassword(loginDetails.password, user.password))) {
            throw new UnauthorizedException("Invalid credentials")
        }
        const tokens = this.generateTokens(user);
          const userObj = user.toObject();
        const { password, ...result } = userObj
        return {
            user: result,
            ...tokens
        }
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.REFRESH_SECRET
            })
            const id = new mongoose.Types.ObjectId(payload.sub);
            const user = await this.userModel.findById(id);
            if (!user) {
                throw new UnauthorizedException("Invaid Token,Login again")
            }
            const token = this.generateAccessToken(user)
            return {token}
        } catch (err) {
            throw new UnauthorizedException('Invalid Token')
        }

    }

    async getUserById(id:string){
        const user = await this.userModel.findById(id);
        if(!user){
            throw new UnauthorizedException("User not found")
        }
        const userObj = user?.toObject();
        const {password, ...result} = userObj;
        return result;

    }

    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }

    private async verifyPassword(loginPassword: string, DBPassword: string): Promise<boolean> {
        return await bcrypt.compare(loginPassword, DBPassword);
    }
    private generateTokens(user: User) {
        return {
            accessToken: this.generateAccessToken(user),
            refreshToken: this.generateRefreshToken(user)
        }
    }

    private generateAccessToken(user: User): string {
        const payload = {
            email: user.email,
            sub: user._id,
            role: user.role
        }
        
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '15m'
        })
    }
    private generateRefreshToken(user: User): string {
        const payload = {
            sub: user._id,
        }
        return this.jwtService.sign(payload, {
            secret: process.env.REFRESH_SECRET,
            expiresIn: '7d'
        })
    }
}
