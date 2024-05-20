import React, { useEffect, useState } from 'react';
import { Container } from '../../components/Container/style';
import UserMainInfo from '../../components/UserMainInfo';
import { InternalInputsWrapper } from '../../components/InternalInput/style';
import InternalTextArea from '../../components/InternalTextArea';
import { UserProfileImage } from './style';
import MedicalExams from '../../components/MedicalExams';
import UnsignedLink from '../../components/UnsignedLink';
import { ScrollContainer, ScrollContainer1 } from '../../components/ScrollContainer/style';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import api, {apiUrlLocal} from '../../service/Service'

export default function PatientViewMedicalRecord({ navigation, route }) {
    const [consultationIdSaved, setConsultationIdSaved] = useState();
    const [photosUri, setPhotosUri] = useState([]);
    const [ocrDescription, setOcrDescription] = useState("");
    const {newPhotoUri, consultationData } = route.params;

    const [savedConsultationData, setSavedConsultationData] = useState({ consultationId: '', doctorSpecialty: '',  doctorName: '', doctorCRM: '', descricao: '', prescricao: '', receita: '' });
    
    useEffect(() => {
        if (consultationData && consultationData.consultationId) 
            setConsultationIdSaved(() => consultationData.consultationId);

        if (consultationData) 
            setSavedConsultationData(consultationData)
    
    }, [route.params])

    useEffect(() => {
        InserirExame();
    }, [newPhotoUri])

    async function InserirExame(){
        if (newPhotoUri == null || newPhotoUri == '')
            return;

        try {
            const formData =  new FormData();
            formData.append("ConsultaId", consultationIdSaved);
            formData.append("Imagem", {
                uri : newPhotoUri,
                name : `image.${newPhotoUri.split('.').pop()}`,
                type : `image/${newPhotoUri.split('.').pop()}`
            });
    
            const response = await api.post(`${apiUrlLocal}/Exame/Cadastrar`, formData, {
                headers : {
                    "Content-Type": "multipart/form-data"
                }
            })

            console.log('-------------------------------------------------');
            console.log(response.data);

            setOcrDescription(() => ocrDescription + ' ' + response.data.descricao);
            
        } catch (error) {
            console.log(error);      
        }
    }

    useEffect(() => {
      
        if (newPhotoUri !== '') {
            setPhotosUri([...photosUri, newPhotoUri]);
        }

    }, [newPhotoUri]);

    // Extrair dados da receita

    return (
        <ScrollContainer1>
            <UserProfileImage 
                source={{uri: savedConsultationData.foto}}
            />
            <Container>
                <UserMainInfo 
                    username={savedConsultationData.doctorName}
                    infoArr={[
                        savedConsultationData.doctorSpecialty,
                        savedConsultationData.doctorCRM
                    ]}
                />

                <InternalInputsWrapper>
                    <InternalTextArea labelText="Descrição da consulta" textArea={savedConsultationData.descricao} />
                    <InternalTextArea labelText="Diagnóstico do paciente" textArea={savedConsultationData.diagnostico} />
                    <InternalTextArea labelText="Prescrição médica" textArea={savedConsultationData.receita} />
                    
                </InternalInputsWrapper>

                <MedicalExams
                    handleSendClick={async () => {
                        console.log('Clicked');
                        await Camera.requestCameraPermissionsAsync();
                        await MediaLibrary.requestPermissionsAsync();
                        navigation.navigate('Camera', { getMediaLibrary : true, isProfile: false});
                    }}
                    handleCanceling={() => {
                        setPhotosUri([]);
                    }}
                    photosUri={photosUri}
                    ocrDescription={ocrDescription}
                />

                <UnsignedLink 
                    linkText='Voltar'
                    handleClickFn={() => navigation.navigate('Main')}
                />
            </Container>
        </ScrollContainer1>
    );
}
