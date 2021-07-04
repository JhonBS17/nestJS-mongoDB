import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice) // Si hay un min, debe haber un max
  @IsPositive()
  maxPrice: number;
}