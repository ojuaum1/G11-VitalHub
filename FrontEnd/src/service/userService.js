import api, {apiUrlLocal} from "../service/Service"

export const BuscarPacientePorId = async userId => {
    const url = `${apiUrlLocal}/Pacientes/BuscarPorID/${userId}`;
    const response = (await api.get(url)).data;
    return response;
}

export const BuscarConsultaPelaData = async (userId, date) => {
    
}
