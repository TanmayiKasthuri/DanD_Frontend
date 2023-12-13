import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import {jwtDecode} from 'jwt-decode'// to decode the access token in order to have 


//This entire file will to used effectively as to when you are giving permissions to admin/manager/any highher official to a particular function like editing only available to admin etc.
//example of using this effectively: usage in dashfooter where you are displaying employee name and their status i.e; their employee status

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let status = "Employee"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo//obtaining userInfo from access token to check the roles

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        return { username, roles, status, isManager, isAdmin }
    }

    return { username: '', roles: [], isManager, isAdmin, status }
}
export default useAuth