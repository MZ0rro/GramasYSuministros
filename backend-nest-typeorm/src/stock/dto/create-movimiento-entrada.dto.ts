import {
  IsInt,
  IsPositive,
  IsOptional,
  IsString,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateMovimientoEntradaDto {
  @IsInt()
  @IsPositive()
  id_producto: number;

  @IsInt()
  @IsPositive()
  id_usuario: number; // El usuario que registra la entrada

  @IsInt()
  @IsPositive()
  cantidad: number;

  @IsOptional()
  @IsString()
  detalle?: string;

  // Campos específicos de Entrada
  @IsOptional()
  @IsInt()
  @IsPositive()
  id_proveedor?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  precio_unitario?: number;

  @IsOptional()
  @IsString()
  lote?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}