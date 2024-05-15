import React, { useEffect, useState } from 'react'
import { Container } from '../../components/Container/style'
import { Title } from '../../components/Title/style'
import ClinicCard from '../../components/ClinicCard'
import UnsignedButton from '../../components/UnsignedButton';
import UnsignedLink from '../../components/UnsignedLink';
import { ButtonLinkWrapper } from './style'
import { ScrollContainer } from '../../components/ScrollContainer/style'
import { CardsList, TouchableCard } from '../../components/Card/style'
import api, { apiUrlLocal } from '../../service/Service'

export default function ClinicSelectionScreen({ navigation, route }) {
    const [scheduleData, setScheduleData] = useState(route.params.scheduleData)

    const [clinicsData, setClinicsData] = useState([]);

    const [someSelected, setSomeSelected] = useState(false);

    async function getClinicsByCity() {
        const response = (await api.get(`${apiUrlLocal}/Clinica/BuscarPorCidade?cidade=${scheduleData.clinicCity}`)).data;

        let clinicsFormated = []

        response.forEach(item => {
            clinicsFormated.push(
                {
                    clinicId: item.id,
                    clinicName: item.nomeFantasia,
                    clinicLocation: item.endereco.cidade,
                    clinicStars: '4,5',
                    clinicOpenedRange: 'Seg-Sex'
                },
            )
        });

        setClinicsData(clinicsFormated);
    }

    useEffect(() => {
        getClinicsByCity();
    }, [])

    useEffect(() => {
        console.log(scheduleData);
    }, [scheduleData])

    return (
        <Container>
            <Title>Selecionar clínica</Title>
            <ScrollContainer horizontal showsHorizontalScrollIndicator={false}>
                <CardsList 
                    data={clinicsData}
                    keyExtractor={clinic => clinic.clinicId}
                    contentContainerStyle={{ gap: 12}}
                    renderItem={({ item }) =>
                        <TouchableCard onPress={() => {
                            setScheduleData({
                                ...scheduleData,
                                clinicId: item.clinicId,
                                clinicCity: item.clinicLocation
                            })
                            setSomeSelected(true);
                        }}>
                            <ClinicCard
                                clinicName={item.clinicName}
                                clinicLocation={item.clinicLocation}
                                clinicStarsNumber={item.clinicStars}
                                clinicOpenedRange={item.clinicOpenedRange}
                                isSelected={item.clinicId == scheduleData.clinicId}
                            />
                        </TouchableCard>
                    }
                />
            </ScrollContainer>
            <ButtonLinkWrapper>
                <UnsignedButton 
                    buttonText='Continuar'
                    handleClickFn={() => {
                        if (!someSelected)
                            return;

                        navigation.navigate('doctorSelection', { scheduleData })}
                    } 
                />
                <UnsignedLink 
                    linkText='Cancelar'
                    handleClickFn={() => navigation.navigate('Main')}
                />
            </ButtonLinkWrapper>
        </Container>
    )
}