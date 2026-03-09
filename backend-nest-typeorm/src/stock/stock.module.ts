import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { movimiento } from './movimiento.entity';
import { entrada } from './entrada.entity';
import { salida } from './salida.entity';
import { stock } from './stock.entity';
import { proveedor } from './proveedor.entity';
import { ProductosModule } from '../productos/productos.module'; // Para poder inyectar ProductosService si lo prefieres
import { UsuariosModule } from '../Usuarios/usuarios.module'; // Para poder inyectar UsuariosService
import { productos } from '../productos/productos.entity';
import { usuario } from '../Usuarios/usuarios.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      movimiento,
      entrada,
      salida,
      stock,
      proveedor,
      productos, // Importamos la entidad directamente para usar su repo
      usuario,   // Importamos la entidad directamente para usar su repo
    ]),
    // Si prefieres usar los servicios en lugar de los repos, importa los módulos:
    // ProductosModule,
    // UsuariosModule,
  ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}