import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined)
interface AuthContextType {
    isAuth: boolean;
    user: { username: string, role: string } | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState<{ username: string, role: string } | null>(null)

    useEffect(() => {
        const storeUser = localStorage.getItem('logged')
        if (storeUser && storeUser !== 'undefined') {
            setUser(JSON.parse(storeUser));
            setIsAuth(true);
        }
    }, [])

    const login = async (username: string, password: string) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.statusCode === 404) {
            return false
        } else {
            localStorage.setItem('logged', JSON.stringify(data))
            setUser(data)
            setIsAuth(true)
            return true
        }

        return false
    }

    const logout = () => {
        setUser(null)
        setIsAuth(false)
        localStorage.removeItem('logged')
    }

    return (
        <AuthContext.Provider value={{ isAuth, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('nanana')
    }
    return context
}