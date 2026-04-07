import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthSuccess(){
    const [searchParams] = useSearchParams()
    const {login} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const token = searchParams.get('token')
        if(token){
            login(token)
            navigate('/dashboard')
        }else{
            navigate('/login')
        }
    },[])

    return(
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
            <p className="text-white">Redirecting...</p>
        </div>
    )

}

export default AuthSuccess