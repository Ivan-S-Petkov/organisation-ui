import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: React.ReactNode;
    requiredRole?: string;
};

const roleHierarchy: { [key: string]: string[] } = {
    'user': ['user', 'admin'],
    'admin': ['admin']
};


export default function ProtectedRoute({ children, requiredRole = "admin" }: ProtectedRouteProps) {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    const allowedRoles = roleHierarchy[requiredRole] || [requiredRole];
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}