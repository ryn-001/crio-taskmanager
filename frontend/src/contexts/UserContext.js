import {createContext,useContext,useState,useEffect} from "react";
import axios from "axios";
import {config} from "../index.js"

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user,setUser] = useState(null);

    const refreshUser = async () => {
        try {
            const { data } = await axios.get(`${config.backendPoint}/api/users/me`, {withCredentials: true});
            if (data.success) {
                setUser(data.user);
            }
        } catch (err) {
            setUser(null);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await axios.get(`${config.backendPoint}/api/users/me`, {withCredentials: true});
        } catch (err) {
            console.error("Logout error", err);
        } finally {
            setUser(null);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};