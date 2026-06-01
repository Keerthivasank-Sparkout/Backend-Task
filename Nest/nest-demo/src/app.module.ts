import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal: true // this will make tha config module available in globally
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get<string>('MONGO_URI'),
        };
      },
    }),
    HelloModule, UserModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
