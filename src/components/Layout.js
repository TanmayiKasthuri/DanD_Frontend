import { Outlet } from "react-router-dom";

//for rendering the children of parent component i.e; layout extends outlet
//this component is for rendering on each and every page be it public or private in this project i.e; ex- a banner/ footer that would go on login, logout, home and every page on the website assosiated
const Layout=()=>{
    return <Outlet/>
}
export default Layout;  