import api, {apiUrlLocal} from "../service/Service"

export const BuscarPacientePorId = async userId => {
    try {
        const url = `${apiUrlLocal}/Pacientes/BuscarPorId?id=${userId}`;
        const response = (await api.get(url)).data;

        return response;     
    } catch (error) {
        console.log(error);
    }
}

export const CreateUser = async (userName, userEmail, userPassword) => {
    const url = `${apiUrlLocal}/Pacientes`;

    const formData = new FormData();

    formData.append('nome', userName);
    formData.append('email', userEmail);
    formData.append('senha', userPassword);
    formData.append('idTipoUsuario', '6B810955-8D69-4416-9A04-CAD05BE687BA');
    
    const response = await api.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    console.log(response);
}

export const BuscarMedicoPorId = async userId => {
    const url = `${apiUrlLocal}/Medicos/BuscarPorId?id=${userId}`;
    const response = (await api.get(url)).data;
    return response;
}

export const BuscarConsultaPelaDataPaciente = async (userId, date) => {
    const url = `${apiUrlLocal}/Pacientes/BuscarPorData?data=${date}&id=${userId}`;
    const response = (await api.get(url)).data;
    return response;
}

export const BuscarConsultaPelaDataMedico = async (userId, date) => {
    const url = `${apiUrlLocal}/Medicos/BuscarPorData?data=${date}&id=${userId}`;
    const response = (await api.get(url)).data;
    return response;
}

export const AtualizarPerfilPaciente = async (userToken, birthDate, neighborhood, number, CEP, city) => {
    const url = `${apiUrlLocal}/Pacientes/`

    const config = {
        headers: { Authorization: `Bearer ${userToken}` }
    };

    const response = await api.put(url, {
        dataNascimento: birthDate,
        logradouro: neighborhood,
        numero: number,
        cep: CEP,
        cidade: city
    }, config)
}

export const AtualizarPerfilMedico = async (userToken, specialtyId, CRM, neighborhood, number, CEP, city) => {
    const url = `${apiUrlLocal}/Medicos/`

    const config = {
        headers: { Authorization: `Bearer ${userToken}` }
    };

    const response = await api.put(url, {
        especialidadeId: specialtyId,
        crm: CRM,
        logradouro: neighborhood,
        numero: number,
        cep: CEP,
        cidade: city
    }, config)
}

export const GetSpecialties = async () => {
    const url = `${apiUrlLocal}/Especialidade`;

    const response = await api.get(url);

    return response.data;
}