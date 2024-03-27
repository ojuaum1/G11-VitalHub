import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { decode,encode } from "base-64";

// do a para o b a gente decodifica 
if (!global.atob) {
    global.atob = decode
}

//do b para o a a gente codifica
if (!global.btoa) {
    global.btoa = encode
}

// funcao de decodificar 
export const userDecodeToken = async () =>{

    //capturando o token
    const token = await AsyncStorage.getItem('token');
    
    if (token === null) {
        return null; 
    }

    
    const decoded = jwtDecode(token)
   
    return {
        name: decoded.name,
        role: decoded.role,
        email: decoded.email,
        id: decoded.jti
    };
}

export const logout = async () => {
    await AsyncStorage.removeItem('token');
    const token = await AsyncStorage.getItem('token');
}