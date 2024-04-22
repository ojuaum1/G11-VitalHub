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
    const [cep, setCep] = useState('');

    async function loadData() {
        const response = await GetClinicById(clinicId);

        setClinicName(response.nomeFantasia);
        setNeighborhood(response.endereco.logradouro);
        setNumber(response.endereco.numero)
        setCity(response.endereco.cidade);
        setCep(response.endereco.cep);

        console.log(response);
    }

    useEffect(() => {
        loadData()
    }, [clinicId]);

    return (
        <>
            <Map latitude={latitude} longitude={longitude} /> 
            <LocationContainer>
                <Title marginTop={10}>{clinicName}</Title>
                <SecondSubtitle>{city}</SecondSubtitle>
                
                <InternalInputsWrapper>
                    <InternalTextArea 
                        inputText='Logradouro'
                        textArea={neighborhood}
                    />
                    <SplitedTextAreasContainer>
                        <InternalTextArea 
                            widthPercentage={45} 
                            inputText='Número'
                            textArea={number}
                        />
                        <InternalTextArea 
                            widthPercentage={45} 
                            inputText='CEP'
                            textArea={cep}
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
