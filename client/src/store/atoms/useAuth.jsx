
import { useEffect, useState } from "react";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(async() => {
        const token = localStorage.getItem("studenttoken");
        if (token) {
            await setIsAuthenticated(true);
        }
        else{
            alert("Invalid session")
        }
    }, []);

    return isAuthenticated;
};
