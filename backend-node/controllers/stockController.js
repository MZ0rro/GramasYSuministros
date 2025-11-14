import { conexion } from '../config/db.js';

export const obtenerStock = async (req, res) => {
    try {
        const [rows] = await conexion.query("SELECT * FROM stock");
        res.json(rows);
    } catch (error) {
        console.error('Error en obtenerStock:', error);
        res.status(500).json({ error: "Error al obtener stock" });
    }
};

// Agregar updateStock si la necesitas
export const updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;
        
        const [result] = await conexion.execute(
            'UPDATE stock SET cantidad = ? WHERE id_stock = ?',
            [cantidad, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Stock no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Stock actualizado exitosamente'
        });
    } catch (error) {
        console.error('Error en updateStock:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar stock',
            error: error.message
        });
    }
};