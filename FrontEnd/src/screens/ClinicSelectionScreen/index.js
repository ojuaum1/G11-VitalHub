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
    const { clinicCity, consultationType } = route.params;

    const [selectedClinicId, setSelectedClinicId] = useState('');
    const [selectedClinicLocation, setSelectedClinicLocation] = useState('');
    const [clinicsData, setClinicsData] = useState([]);

    async function getClinicsByCity() {
        const response = (await api.get(`${apiUrlLocal}/Clinica/BuscarPorCidade?cidade=${clinicCity}`)).data;

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
                            console.log(item);
                            setSelectedClinicId(item.clinicId)
                            setSelectedClinicLocation(item.clinicLocation)
                        }}>
                            <ClinicCard
                                clinicName={item.clinicName}
                                clinicLocation={item.clinicLocation}
                                clinicStarsNumber={item.clinicStars}
                                clinicOpenedRange={item.clinicOpenedRange}
                                isSelected={item.clinicId == selectedClinicId}
                            />
                        </TouchableCard>
                    }
                />
            </ScrollContainer>
            <ButtonLinkWrapper>
                <UnsignedButton 
                    buttonText='Continuar'
                    handleClickFn={() => navigation.navigate('doctorSelection', { consultationLocation: selectedClinicLocation, consultationType, clinicId: selectedClinicId })}
                />
                <UnsignedLink 
                    linkText='Cancelar'
                    handleClickFn={() => navigation.navigate('Main')}
                />
            </ButtonLinkWrapper>
        </Container>
    )
}