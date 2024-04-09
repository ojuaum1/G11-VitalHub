import React, { useEffect, useState } from 'react';
import { LocationContainer } from './style';
import { SecondSubtitle, Title } from '../../components/Title/style';
import InternalTextArea from '../../components/InternalTextArea';
import { InternalInputsWrapper } from '../../components/InternalInput/style';
import { SplitedTextAreasContainer } from '../../components/InternalTextArea/style';
import Map from '../../components/Map';
import UnsignedLink from '../../components/UnsignedLink';
import { GetClinicById } from '../../service/clinicService';

export default function ConsultationLocationScreen({ navigation, route }) {
    const { latitude, longitude, clinicId } = route.params;

    const [clinicName, setClinicName] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');

    async function loadData() {
        const response = await GetClinicById(clinicId);

        console.log(response);
    }

    useEffect(() => {
        loadData()
    }, [clinicId]);

    return (
        <>
            <Map latitude={latitude} longitude={longitude} /> 
            <LocationContainer>
                <Title marginTop={10}>Clínica Natureh</Title>
                <SecondSubtitle>São Paulo, SP</SecondSubtitle>
                
                <InternalInputsWrapper>
                    <InternalTextArea 
                        inputText='Logradouro'
                        textArea='Rua Vicenso Silva, 987'
                    />
                    <SplitedTextAreasContainer>
                        <InternalTextArea 
                            widthPercentage={45} 
                            inputText='Número'
                            textArea='578'
                        />
                        <InternalTextArea 
                            widthPercentage={45} 
                            inputText='Bairro'
                            textArea='Moema-SP'
                        />
                    </SplitedTextAreasContainer>
                    <UnsignedLink 
                        linkText='Cancelar'
                        handleClickFn={() => navigation.replace('Main')}
                    />
                </InternalInputsWrapper>
            </LocationContainer>
        </>
    );
}
