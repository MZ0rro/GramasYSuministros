import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm'; // Importamos DataSource para las transacciones
import { movimiento } from './movimiento.entity';
import { entrada } from './entrada.entity';
import { salida } from './salida.entity';
import { stock } from './stock.entity';
import { proveedor } from './proveedor.entity';
import { productos } from '../productos/productos.entity';
import { usuario } from '../Usuarios/usuarios.entity';
import { CreateMovimientoEntradaDto } from './dto/create-movimiento-entrada.dto';
import { CreateMovimientoSalidaDto } from './dto/create-movimiento-salida.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(movimiento)
    private movimientoRepository: Repository<movimiento>,
    @InjectRepository(entrada)
    private entradaRepository: Repository<entrada>,
    @InjectRepository(salida)
    private salidaRepository: Repository<salida>,
    @InjectRepository(stock)
    private stockRepository: Repository<stock>,
    @InjectRepository(proveedor)
    private proveedorRepository: Repository<proveedor>,
    @InjectRepository(productos)
    private productoRepository: Repository<productos>,
    @InjectRepository(usuario)
    private usuarioRepository: Repository<usuario>,
    private dataSource: DataSource, // Para manejar transacciones
  ) {}

  // 1. CREAR UNA ENTRADA
  async crearEntrada(createDto: CreateMovimientoEntradaDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validar que el producto y el usuario existan
      const producto = await this.productoRepository.findOneBy({ id_producto: createDto.id_producto });
      if (!producto) throw new NotFoundException(`Producto ${createDto.id_producto} no encontrado`);

      const usuario = await this.usuarioRepository.findOneBy({ id_usuario: createDto.id_usuario });
      if (!usuario) throw new NotFoundException(`Usuario ${createDto.id_usuario} no encontrado`);

      // 1. Crear el movimiento PADRE
      const nuevoMovimiento = this.movimientoRepository.create({
        id_producto: createDto.id_producto,
        id_usuario: createDto.id_usuario,
        cantidad: createDto.cantidad,
        detalle: createDto.detalle,
        tipo: 'entrada',
      });
      const movimientoGuardado = await queryRunner.manager.save(nuevoMovimiento);

      // 2. Crear la entrada HIJA
      const nuevaEntrada = this.entradaRepository.create({
        id_movimiento: movimientoGuardado.id_movimiento,
        id_proveedor: createDto.id_proveedor,
        precio_unitario: createDto.precio_unitario,
        lote: createDto.lote,
        observaciones: createDto.observaciones,
      });
      await queryRunner.manager.save(nuevaEntrada);

      // 3. Actualizar el STOCK
      let stockProducto = await queryRunner.manager.findOne(stock, {
        where: { id_producto: createDto.id_producto },
      });

      if (!stockProducto) {
        // Si no hay registro de stock para este producto, lo creamos
        stockProducto = this.stockRepository.create({
          id_producto: createDto.id_producto,
          cantidad_actual: createDto.cantidad,
        });
      } else {
        // Si existe, sumamos la cantidad
        stockProducto.cantidad_actual += createDto.cantidad;
      }
      await queryRunner.manager.save(stockProducto);

      await queryRunner.commitTransaction();
      return { mensaje: 'Entrada registrada con éxito', movimiento: movimientoGuardado };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // 2. CREAR UNA SALIDA
  async crearSalida(createDto: CreateMovimientoSalidaDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validar que el producto y el usuario existan
      const producto = await this.productoRepository.findOneBy({ id_producto: createDto.id_producto });
      if (!producto) throw new NotFoundException(`Producto ${createDto.id_producto} no encontrado`);

      const usuario = await this.usuarioRepository.findOneBy({ id_usuario: createDto.id_usuario });
      if (!usuario) throw new NotFoundException(`Usuario ${createDto.id_usuario} no encontrado`);

      // Validar que haya stock suficiente
      const stockProducto = await queryRunner.manager.findOne(stock, {
        where: { id_producto: createDto.id_producto },
      });
      if (!stockProducto || stockProducto.cantidad_actual < createDto.cantidad) {
        throw new BadRequestException(`Stock insuficiente para el producto ${createDto.id_producto}. Disponible: ${stockProducto?.cantidad_actual || 0}`);
      }

      // 1. Crear el movimiento PADRE
      const nuevoMovimiento = this.movimientoRepository.create({
        id_producto: createDto.id_producto,
        id_usuario: createDto.id_usuario,
        cantidad: createDto.cantidad,
        detalle: createDto.detalle,
        tipo: 'salida',
      });
      const movimientoGuardado = await queryRunner.manager.save(nuevoMovimiento);

      // 2. Crear la salida HIJA
      const nuevaSalida = this.salidaRepository.create({
        id_movimiento: movimientoGuardado.id_movimiento,
        destino: createDto.destino,
        motivo: createDto.motivo,
        observaciones: createDto.observaciones,
      });
      await queryRunner.manager.save(nuevaSalida);

      // 3. Actualizar el STOCK (restar)
      stockProducto.cantidad_actual -= createDto.cantidad;
      await queryRunner.manager.save(stockProducto);

      await queryRunner.commitTransaction();
      return { mensaje: 'Salida registrada con éxito', movimiento: movimientoGuardado };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // 3. OBTENER TODOS LOS MOVIMIENTOS (con sus detalles)
  async findAllMovimientos() {
    return await this.movimientoRepository.find({
      relations: ['producto', 'usuario', 'entrada', 'entrada.proveedor', 'salida'],
      order: { fecha: 'DESC' },
    });
  }

  // 4. OBTENER UN MOVIMIENTO POR ID
  async findOneMovimiento(id: number) {
    const movimiento = await this.movimientoRepository.findOne({
      where: { id_movimiento: id },
      relations: ['producto', 'usuario', 'entrada', 'entrada.proveedor', 'salida'],
    });
    if (!movimiento) {
      throw new NotFoundException(`Movimiento con ID ${id} no encontrado`);
    }
    return movimiento;
  }

  // 5. OBTENER EL STOCK ACTUAL DE TODOS LOS PRODUCTOS
  async findAllStock() {
    return await this.stockRepository.find({
      relations: ['producto'],
    });
  }

  // 6. OBTENER EL STOCK DE UN PRODUCTO ESPECÍFICO
  async findOneStock(id_producto: number) {
    const stockItem = await this.stockRepository.findOne({
      where: { id_producto },
      relations: ['producto'],
    });
    if (!stockItem) {
      throw new NotFoundException(`Stock para el producto ${id_producto} no encontrado`);
    }
    return stockItem;
  }

  // 7. (Opcional) ELIMINAR UN MOVIMIENTO (¡CUIDADO! Esto afectaría el stock)
  // Por ahora, mejor no implementarlo o hacerlo muy restringido.
}