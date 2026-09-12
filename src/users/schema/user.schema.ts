import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({timestamps:true})
export class User {
  @Prop({ type: String })
  fullName!: String;

  @Prop({ type: String })
  email!: String;

  @Prop({ type: String })
  password!: String;
}

export const userSchema = SchemaFactory.createForClass(User);
