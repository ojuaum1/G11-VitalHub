import api, {apiUrlLocal} from "../service/Service"

export const BuscarPacientePorId = async userId => {
    const url = `${apiUrlLocal}/Pacientes/BuscarPorID/${userId}`;
    const response = (await api.get(url)).data;
    return response;
}

export const CreateUser = async (userName, userEmail, userPassword) => {
    const url = `${apiUrlLocal}/Pacientes`;
    const response = await api.post(url, {
        nome: userName,
        email: userEmail, 
        senha: userPassword,
        idTipoUsuario: '6B810955-8D69-4416-9A04-CAD05BE687BA'
    });
    console.log(response);
}

export const BuscarMedicoPorId = async userId => {
    const url = `${apiUrlLocal}/Medicos/BuscarPorID/${userId}`;
    const response = (await api.get(url)).data;
    return response;
}

export const BuscarConsultaPelaDataPaciente = async (userId, date) => {
    const url = `${apiUrlLocal}/Pacientes/BuscarPorData?data=${date}&id=${userId}`;
    const response = (await api.get(url)).data;
    return response;
}

export const BuscarConsultaPelaDataMedico = async (userId, date) => {
    const url = `${apiUrlLocal}/Medicos/BuscarConsultasPorData?data=${date}&id=${userId}`;
    const response = (await api.get(url)).data;
    return response;
}