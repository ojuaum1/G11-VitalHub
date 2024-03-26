import {api,apiUrlLocal} from "../service/Service"

export const BuscarPacientePorId = async userId => {
    return await api.get(`${apiUrlLocal}/Pacientes/BuscarPorID/${userId}`);
}
