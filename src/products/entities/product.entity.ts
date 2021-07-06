import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// import { Brand } from "./brand.entity";
import { SubDoc, SubDocSchema } from './sub-doc.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Number, index: true }) //Campo prioritario, consultas frecuentes
  price: number;
    
  @Prop({ type: Number })
  stock: number;

  @Prop()
  image: string;
  
  @Prop()
  brand: string;

  // Tipado  
  @Prop({ type: SubDocSchema })
  subDoc: SubDoc;  // 👈 new field (1:1)

  @Prop({ type: [SubDocSchema] })
  subDocs: Types.Array<SubDoc>;  // 👈 new field (1:N)

//   // Relación embebida o uno a uno
//   @Prop(
//     raw({ 
//       name: { type: String },
//       image: { type: String },
//     }),
//   )
//   category: Record<string, any>;

//   // Relacion uno a uno referenciada
//   @Prop({ type: Types.ObjectId, ref: Brand.name })
//   brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ price: 1, stock: -1 }); // Indexación
