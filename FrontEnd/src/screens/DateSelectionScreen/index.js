import React, { useEffect, useState } from 'react'
import { Container } from '../../components/Container/style'
import { Title } from '../../components/Title/style'
import { ButtonLinkWrapper } from '../ClinicSelectionScreen/style'
import UnsignedButton from '../../components/UnsignedButton'
import UnsignedLink from '../../components/UnsignedLink'
import SelectInput from '../../components/SelectInput'
import FullCalender from '../../components/FullCalendar'
import ScheduleBriefModal from '../../components/ScheduleBriefModal'
import { Host } from 'react-native-portalize'
import api, { apiUrlLocal } from '../../service/Service'
import { userDecodeToken } from '../../utils/Auth'

export default function DateSelectionScreen({ navigation, route }) {
    const [scheduleData, setScheduleData] = useState(route.params.scheduleData);

    const [avaliableTimesData, setAvaliableTimesData] = useState(['12:30', '14:00', '15:30', '16:00', '17:00']);
    const [isScheduleBriefActive, setIsScheduleBriefActive] = useState(false);

    const [token, setToken] = useState();

    async function getToken() {
        setToken(await userDecodeToken())
    }

    useEffect(() => {
        getToken();
    }, [])

    useEffect(() => console.log(scheduleData), [scheduleData])

    return (
        <Host>
            <ScheduleBriefModal 
                active={isScheduleBriefActive}
                disableModalFn={() => setIsScheduleBriefActive(false)}
                confirmModalFn={async () => {
                    const response = await api.post(`${apiUrlLocal}/Consultas/Cadastrar`, {
                        situacaoId: '0906A605-1206-47EA-B986-F8A3FB8CB549',
                        pacienteId: token.id,
                        medicoClinicaId: scheduleData.clinicDoctorId,
                        receitaId: null,
                        prioridadeId: scheduleData.priorityId,
                        dataConsulta: `${scheduleData.consultationDate} ${scheduleData.consultationTime}`,
                        descricao: null,
                        diagnostico: null
                    })

                    console.log(response);

                    setIsScheduleBriefActive(false);
                    navigation.navigate('Main');
                }}
                scheduleData={scheduleData}
            />
            <Container>
                <Title>Selecionar data</Title>

                <FullCalender 
                    selectedDate={scheduleData.consultationDate}
                    handleSelectedDateFn={date => setScheduleData({
                        ...scheduleData,
                        consultationDate: date
                    })}
                />

                <SelectInput 
                    labelText='Selecione um horário disponível'
                    defaultText='Selecionar horário'
                    handleSelectedFn={time => {
                        setScheduleData({
                            ...scheduleData,
                            consultationTime: time
                        })
                    }}
                    data={avaliableTimesData}
                />

                <ButtonLinkWrapper>
                    <UnsignedButton 
                        buttonText='Confirmar'
                        handleClickFn={() => setIsScheduleBriefActive(true)}
                    />
                    <UnsignedLink 
                        linkText='Cancelar'
                        handleClickFn={() => navigation.navigate('Main')}
                    />
                </ButtonLinkWrapper>
            </Container>
        </Host>
    )
}