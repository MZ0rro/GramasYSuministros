// Componente ProtectedRoute - Protege rutas según el rol del usuario
// Solo permite acceso si el usuario tiene el rol correcto

import { Navigate } from 'react-router-dom'; // Para redireccionar

// Props que recibe:
// - children: componente hijo que se renderizará si tiene permiso
// - requiredRole: rol requerido para acceder (1=admin, 2=cliente)
export default function ProtectedRoute({ children, requiredRole }) {
    // Obtiene el token de autenticación del localStorage
    const token = localStorage.getItem('token');

    // Obtiene el rol del usuario del localStorage y lo convierte a número
    const userRole = parseInt(localStorage.getItem('id_rol'));

    // Si no hay token, redirige al login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Si hay rol requerido y no coincide con el rol del usuario
    if (requiredRole && userRole !== requiredRole) {
        // Si es admin intentando acceder a ruta de cliente, redirige a panel admin
        if (userRole === 1) {
            return <Navigate to="/panel-admin" replace />;
        }
        // Si es cliente intentando acceder a ruta de admin, redirige a catálogo
        if (userRole === 2) {
            return <Navigate to="/catalogo" replace />;
        }
        // En cualquier otro caso, redirige al login
        return <Navigate to="/login" replace />;
    }

    // Si pasa todas las validaciones, renderiza el componente hijo
    return children;
}
