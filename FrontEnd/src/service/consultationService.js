import api, {apiUrlLocal} from "../service/Service"

export const CancelConsultation = async (consultationId) => {
    const url = `${apiUrlLocal}/Consultas/Status?idConsulta=${consultationId}&status=Cancelados`

    await api.put(url)
}