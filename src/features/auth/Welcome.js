import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {

    const {username,isAdmin,isManager}=useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (

        //for user settings and add new user, we are alowing for only manager and admins to have access to those links.
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome! {username}</h1>

            <p><Link to="/dash/notes">View techNotes</Link></p>

            <p><Link to="/dash/notes/new">Add New techNote</Link></p>

            {((isAdmin)||(isManager))&&<p><Link to="/dash/users">View User Settings</Link></p>}

            {((isAdmin)||(isManager))&&<p><Link to="/dash/users/new">Add New User</Link></p>}

        </section>
    )

    return content
}
export default Welcome