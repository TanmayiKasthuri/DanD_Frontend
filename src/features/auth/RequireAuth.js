// to protect the routes
//if you know the routes, even though you use jwt auth and stuff, you knw the address then you can easily reach a page. Like if a regular employee who is logeed in knows route to noteslist page, even though he is not role-based-authorized for it, he can access the route and this code is to protect that

import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { roles } = useAuth()

    const content = (
        roles.some(role => allowedRoles.includes(role))
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )

    return content
}
export default RequireAuth