import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList';
import UsersList from './features/users/UsersList';
import NewNote from './features/notes/NewNote';
import EditNote from './features/notes/EditNote';
import NewUserForm from './features/users/NewUserForm';
import EditUser from './features/users/EditUser';
import PreFetch from './features/auth/PreFetch';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import {ROLES} from './config/roles'

function App() {
  return (
    <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Public/>}/>
          <Route path='login' element={<Login/>}/>

          {/*Protected Routes */}

          <Route element={<PersistLogin/>}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>{/*Taking in all the routes to protect routes*/}
          <Route element={<PreFetch/>}>

          <Route path='dash' element={<DashLayout/>}>
            <Route index element={<Welcome/>}/>

            <Route element={<RequireAuth allowedRoles={[ROLES.Manager,ROLES.Admin]}/>}>
            <Route path='users'>
              <Route index element={<UsersList/>}/>
              <Route path=":id" element={<EditUser/>}/>
              <Route path="new" element={<NewUserForm/>}/>
            </Route>
            </Route>

            
            <Route path='notes'>
              <Route index element={<NotesList/>}/>
              <Route path=":id" element={<EditNote/>}/>
              <Route path="new" element={<NewNote/>}/>
            </Route>
          </Route>{/*End Dash*/}

          </Route>
          </Route>
          </Route>{/*End of Protected Routes*/}

        </Route>
    </Routes>
  );
}

export default App;