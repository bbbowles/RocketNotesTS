import {createContext, useContext, useState, useEffect, ReactNode} from "react"

import {api} from "../services/api"

interface userAuth{
    user?:UserInterface,
    signin:(data:SignInInterface)=>void
}

const AuthContext = createContext({})

interface ChildrenInterface {
    children:ReactNode
}

interface SignInInterface{
    email:string,
    password:string
}

interface UserInterface{
    name:string,
    email:string,
    password:string,
    avatar:string,
}

const AuthProviderFunction : React.FC<ChildrenInterface> = ({children}) =>{
    const [data,setData] = useState({
        user:{},
        token:""
    }) 

    async function signIn(data : SignInInterface){
        console.log("chegou no hook", data)
        try{
            const response = await api.post("http://localhost:3002/sessions", {email:data.email,password:data.password})
            const {user, token} = response.data

            localStorage.setItem("@rocketnotes:user", JSON.stringify(user)) //enviamos em string
            localStorage.setItem("@rocketnotes:token", token)

            console.log({user,token})


            setData({user,token})
            api.defaults.headers.common["Authorization"] = `Bearer ${token}` //insere depois da criacao da sessao, o token no header do axios


        }catch(error : unknown){
            alert("erro interno")
            // if(error.response){
            //     alert(error.response.data.message)
            // }else{
            //     alert("erro interno")
            // }
        }
    
    }

    function signOut(){
         localStorage.clear()

         setData({
            user:{},
            token:""
         })
    }

    async function updateProfile(user: UserInterface, avatarFile : string){
        try{
            if(avatarFile){
                const fileUploadForm = new FormData()
                fileUploadForm.append("avatar", avatarFile)

                const response = await api.patch("http://localhost:3002/users/avatar", fileUploadForm)
                user.avatar = response.data.avatar
            }

            await api.put("http://localhost:3002/users", user)
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user))

            setData({user,token:data.token})
            alert("perfil atualizado")

        }catch(error){
            alert(error)
            // if(error.response){
            //     alert(error.response.data.message)
            // }else{
            //     alert("erro interno")
            // }

            // }
    }
}

    useEffect(()=>{
        const token = localStorage.getItem("@rocketnotes:token")
        const user = localStorage.getItem("@rocketnotes:user")

        if(token && user){
            api.defaults.headers.common["Authorization"] = `Bearer ${token}` //insere depois da criacao da sessao, o token no header do axios
      
            setData({token,
                user:JSON.parse(user)}) //recebemos em json

        }
    },[])

    return(
        //passamos no context o signin, signout e o user data, por isso podemos acessar a funcao pelo useAuth()
        <AuthContext.Provider value={{signIn,signOut,updateProfile, user: data.user}}> 
            {children}
        </AuthContext.Provider>
    )
}
function useAuth(){
    const context = useContext(AuthContext)

    return context
    
}

export {AuthProviderFunction, useAuth}