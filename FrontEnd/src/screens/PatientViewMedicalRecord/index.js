import React, { useEffect, useState } from 'react';
import { Container } from '../../components/Container/style';
import UserMainInfo from '../../components/UserMainInfo';
import { InternalInputsWrapper } from '../../components/InternalInput/style';
import InternalTextArea from '../../components/InternalTextArea';
import { UserProfileImage } from './style';
import MedicalExams from '../../components/MedicalExams';
import UnsignedLink from '../../components/UnsignedLink';
import { ScrollContainer } from '../../components/ScrollContainer/style';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function PatientViewMedicalRecord({ navigation, route }) {
    const [photosUri, setPhotosUri] = useState([]);
    const { newPhotoUri, descricao, diagnostico, Receita } = route.params;
    
    const { medicamento, observacoes } = Receita || {};
    var stringText = `${medicamento} \n ${observacoes}`
    useEffect(() => {
      
        if (newPhotoUri !== '') {
            setPhotosUri([...photosUri, newPhotoUri]);
        }
    }, [newPhotoUri]);

    // Extrair dados da receita

    return (
        <ScrollContainer>
            <UserProfileImage 
                source={require('../../assets/doctor-image-extended.png')}
            />
            <Container>
                <UserMainInfo 
                    username='Dr. Claudio'
                    infoArr={[
                        'Clínico geral',
                        'CRM-15286'
                    ]}
                />

                <InternalInputsWrapper>
                    <InternalTextArea inputText="Descrição da consulta" textArea={descricao} />
                    <InternalTextArea inputText="Diagnóstico" textArea={diagnostico} />
                    <InternalTextArea inputText="Medicamento" textArea={stringText} />
                    
                </InternalInputsWrapper>

                <MedicalExams
                    handleSendClick={async () => {
                        await Camera.requestCameraPermissionsAsync();
                        await MediaLibrary.requestPermissionsAsync();
                        navigation.navigate('Camera');
                    }}
                    photosUri={photosUri}
                />

                <UnsignedLink 
                    linkText='Voltar'
                    handleClickFn={() => navigation.navigate('Main')}
                />
            </Container>
        </ScrollContainer>
    );
}
