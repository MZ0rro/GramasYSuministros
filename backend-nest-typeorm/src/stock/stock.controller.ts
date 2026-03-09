import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateMovimientoEntradaDto } from './dto/create-movimiento-entrada.dto';
import { CreateMovimientoSalidaDto } from './dto/create-movimiento-salida.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  // Endpoints para ENTRADAS
  @Post('entrada')
  crearEntrada(@Body() createEntradaDto: CreateMovimientoEntradaDto) {
    return this.stockService.crearEntrada(createEntradaDto);
  }

  // Endpoints para SALIDAS
  @Post('salida')
  crearSalida(@Body() createSalidaDto: CreateMovimientoSalidaDto) {
    return this.stockService.crearSalida(createSalidaDto);
  }

  // Endpoints para MOVIMIENTOS
  @Get('movimientos')
  findAllMovimientos() {
    return this.stockService.findAllMovimientos();
  }

  @Get('movimientos/:id')
  findOneMovimiento(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.findOneMovimiento(id);
  }

  // Endpoints para STOCK
  @Get()
  findAllStock() {
    return this.stockService.findAllStock();
  }

  @Get('producto/:id_producto')
  findOneStock(@Param('id_producto', ParseIntPipe) id_producto: number) {
    return this.stockService.findOneStock(id_producto);
  }
}