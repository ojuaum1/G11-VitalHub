import axios from "axios";

// declarar a porta da api 

const portaApi = '4466'

//declarar o ip da maquina 

const ip = '192.168.21.123'

// defdinir a base da url de acesso da api 
const apiUrlLocal = `http://${ip}:${portaApi}/api`

//configurar axios 
const api = axios.create({
    baseUrl : apiUrlLocal
})

export default api