// import { ChakraProvider, position } from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import React from 'react';
import { Link } from 'react-router-dom'
export default function Navbar() {

    const SECRET = "yutuyghguyjksttyyy";

    const [user, setUser] = React.useState({});
    const [login, setLogin] = React.useState(false);

    let token = localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token');
        setUser({});
    }

    React.useEffect(() => {

        if (token) {
            
            const decoded_user = jwt_decode(token, SECRET);
            const { id, name, email } = decoded_user
            setUser({
                id, name, email
            })
            setLogin(true)
          
        } else {
            setLogin(false)
            console.log("token not found");
        }
    }, [token])


    return (
        <div style={{ position: "sticky", top: "0", backgroundColor: "white", padding: "1rem", zIndex: "2", boxShadow: "inset 0px -1px 0px rgba(233, 238, 242, 0.4)" }}>
            <div style={{ display: "flex", width: "1200px", margin: "auto", marginInline: "auto", backgroundColor: "transparent", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}><p style={{ paddingRight: "15px", fontWeight: "bold", fontSize: "20px", color: "#696969" }}>{user.name}</p><Link to="/loginUser"> <button onClick={logout} style={{ border: "none", color: "white", backgroundColor: "#08BD80", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" }}>{login ? "Logout" : "Student login"}</button></Link></div>
                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}><p style={{ paddingRight: "15px", fontWeight: "bold", fontSize: "20px", color: "#696969" }}>{user.name}</p><Link to="/loginAdmin"> <button onClick={logout} style={{ border: "none", color: "white", backgroundColor: "#08BD80", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" }}>{login ? "Logout" : "Admin login"}</button></Link></div>
            </div>
        </div>
    )
}