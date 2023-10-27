import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SampleDto {
  @ApiProperty({ description: 'Name of the product' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly models: string[];
}

export class UpdateSampleDto extends PartialType(SampleDto) {}
