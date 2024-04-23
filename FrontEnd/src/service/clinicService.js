import api, {apiUrlLocal} from "./Service"

export const GetClinicById = async (clinicId) => {
    const url = `${apiUrlLocal}/Clinica/BuscarPorId?id=${clinicId}`;
    const response = await api.get(url);

    return response.data;
}