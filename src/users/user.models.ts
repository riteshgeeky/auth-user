import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";

import { Document } from "mongoose";

export type UserDocument = User & Document;


@Schema()
export class User{
    @Prop()
    username: string;
    @Prop()
    password: string;
    @Prop()
    email: string;
    @Prop({default: Date.now})
    date_added: Date;
    @Prop()
    forgetPasswordOtp: string;
    @Prop({default: Date.now})
    forgetPasswordExpiry: Date;
   
}

export const UserSchema=SchemaFactory.createForClass(User);