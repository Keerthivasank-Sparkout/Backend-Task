import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HelloService } from 'src/hello/hello.service';


@Injectable()
export class UserService {
    constructor(private readonly helloService:HelloService,private configService : ConfigService){};

    getAllUser(){
        return [
            {
                id:1,
                name:"Keerthi"
            },
            {
                id:2,
                name:"Vismitha"
            },
            {
                id:3,
                name:"Deepak"
            },
            {
                id:4,
                name:"Hari"
            },
        ]
    }
    getUserById(id:number){
        const user = this.getAllUser().find(item => item.id === id);
        return user;
    }

    getWelcomeMessage(userId:number){
        const user = this.getUserById(userId);
        const name = this.configService.get<string>('APP_NAME','default_value')
        if(!user){
            return `user not found in ${name}`;
        }
        return this.helloService.getHelloWithName(user?.name);
    }
}
