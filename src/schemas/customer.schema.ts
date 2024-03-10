import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose from "mongoose";

export class Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export class Geo {
    lat: string;
    lng: string;
}

export class Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

@Schema({ timestamps: true })

// Mongoose document type for Offers model
// export type CustomerDocument = Customers & Document;

export class Customers {
    @Prop({ unique: true })
    id: number;
    @Prop({ unique: true })
    name: string;
    @Prop({ unique: true })
    username: string;
    @Prop({ unique: true })
    email: string;
    @Prop({ unique: true })
    phone: string;
    @Prop({ unique: true })
    website: string;
    @Prop({ unique: false, required: false })
    address?: Address;
    @Prop({ unique: false, required: false })
    company?: Company;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    createdBy: User;
    @Prop({ default: false })
    isDeleted: boolean;

}

export const CustomerSchema = SchemaFactory.createForClass(Customers)