import { Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";

@Injectable()
export class LoginThrottler extends ThrottlerGuard{
    protected async getTracker(req: Record<string, any>): Promise<string> {
        const email = req.body?.email || 'anonymus';
        return `login-${email}`;
    }
    protected getLimit():Promise<number>{
        return Promise.resolve(3);
    }
}