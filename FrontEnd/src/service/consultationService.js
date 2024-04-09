import api, {apiUrlLocal} from "../service/Service"

export const CancelConsultation = async (consultationId) => {
    const url = `${apiUrlLocal}/Consultas/Status?consultaId=${consultationId}&situacaoId=91C97DFE-E7EC-4686-915B-FA3803BE2E00`

    await api.patch(url)
}