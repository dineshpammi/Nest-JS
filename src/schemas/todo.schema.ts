import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema()

// Mongoose document type for Offers model
// export type CustomerDocument = Customers & Document;

export class Todos {
    @Prop({ unique: true })
    id: number;
    @Prop({ unique: true })
    userId: number;
    @Prop({ unique: true })
    title: string;
    @Prop({ unique: false })
    completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todos)