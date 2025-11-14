import { conexion } from '../db/conexion.js';

export const getAllProducts = async (req, res) => {
    try {
        // Cambiar 'productos' por 'producto' y usar los campos correctos
        const [rows] = await conexion.execute('SELECT * FROM producto');
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Error en getAllProducts:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener productos',
            error: error.message
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        // Cambiar tabla y campo ID
        const [rows] = await conexion.execute('SELECT * FROM producto WHERE id_producto = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error('Error en getProductById:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener producto',
            error: error.message
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        // Usar los campos reales de tu tabla
        const { nombre, marca, peso, material, descripcion, precio, altura, id_categoria, imagen, stock } = req.body;
        
        const [result] = await conexion.execute(
            'INSERT INTO producto (nombre, marca, peso, material, descripcion, precio, altura, id_categoria, imagen, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, marca, peso, material, descripcion, precio, altura, id_categoria, imagen, stock]
        );
        
        res.json({
            success: true,
            message: 'Producto creado exitosamente',
            id: result.insertId
        });
    } catch (error) {
        console.error('Error en createProduct:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear producto',
            error: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // Usar campos reales
        const { nombre, marca, peso, material, descripcion, precio, altura, id_categoria, imagen, stock } = req.body;
        
        const [result] = await conexion.execute(
            'UPDATE producto SET nombre = ?, marca = ?, peso = ?, material = ?, descripcion = ?, precio = ?, altura = ?, id_categoria = ?, imagen = ?, stock = ? WHERE id_producto = ?',
            [nombre, marca, peso, material, descripcion, precio, altura, id_categoria, imagen, stock, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Producto actualizado exitosamente'
        });
    } catch (error) {
        console.error('Error en updateProduct:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar producto',
            error: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Cambiar tabla y campo ID
        const [result] = await conexion.execute('DELETE FROM producto WHERE id_producto = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Producto eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error en deleteProduct:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar producto',
            error: error.message
        });
    }
};