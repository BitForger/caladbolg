/**
 * @author admin
 */

import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BannedCategory extends Document {
  @Prop() category: string;
  @Prop() categoryName: string;
  @Prop() role: string;
}
