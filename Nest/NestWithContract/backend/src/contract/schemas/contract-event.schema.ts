import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContractEventDocument = HydratedDocument<ContractEvent>;

@Schema({ timestamps: true })
export class ContractEvent {
  @Prop({ required: true })
  eventName!: 'NAME_CHANGED' | 'USER_DETAILS_CHANGED';

  @Prop({ required: true, lowercase: true })
  contractAddress!: string;

  @Prop({ required: true, lowercase: true })
  changedBy!: string;

  @Prop()
  oldName?: string;

  @Prop()
  oldMobile?: string;

  @Prop()
  newName?: string;

  @Prop()
  newMobile?: string;

  @Prop({ required: true, lowercase: true })
  transactionHash!: string;

  @Prop({ required: true })
  blockNumber!: string;

  @Prop({ required: true })
  logIndex!: number;
}

export const ContractEventSchema = SchemaFactory.createForClass(ContractEvent);

ContractEventSchema.index(
  { transactionHash: 1, logIndex: 1 },
  { unique: true },
);
