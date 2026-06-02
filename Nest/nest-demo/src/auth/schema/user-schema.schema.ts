import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export enum UserRole {
    USER = "user",
    ADMIN = "admin"
}
@Schema({ timestamps: true })
export class User {

     _id: Types.ObjectId;
     
    @Prop({ required: true })
    userName: string

    @Prop({ required: true })
    phoneNumber: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'Post' }],
    })
    posts: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);