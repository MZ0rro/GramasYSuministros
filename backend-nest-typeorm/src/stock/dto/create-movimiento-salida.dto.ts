import { IsInt, IsPositive, IsOptional, IsString } from 'class-validator';

export class CreateMovimientoSalidaDto {
  @IsInt()
  @IsPositive()
  id_producto: number;

  @IsInt()
  @IsPositive()
  id_usuario: number;

  @IsInt()
  @IsPositive()
  cantidad: number;

  @IsOptional()
  @IsString()
  detalle?: string;

  // Campos específicos de Salida
  @IsOptional()
  @IsString()
  destino?: string; // Ej: nombre del cliente

  @IsOptional()
  @IsString()
  motivo?: string; // Ej: 'venta', 'traslado', 'merma'

  @IsOptional()
  @IsString()
  observaciones?: string;
}