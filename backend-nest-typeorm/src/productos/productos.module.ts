import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';

@Module({
  imports: [TypeOrmModule],
  providers: [ProductosService],
  controllers: [ProductosController],
})
export class ProductosModule {}
