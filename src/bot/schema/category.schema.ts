/**
 * @author admin
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop() guild: string;
  @Prop() guildName: string;
  @Prop() category: string;
  @Prop() categoryName: string;
  @Prop() role: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
