import React, { useEffect, useState } from 'react';
import { Container } from '../../components/Container/style';
import InternalInput from "../../components/InternalInput";
import { InternalInputsWrapper } from "../../components/InternalInput/style";
import UserMainInfo from "../../components/UserMainInfo";
import { UnsignedButtonsWrapper } from "../../components/UnsignedButton/style";
import UnsignedButton from "../../components/UnsignedButton";
import UnsignedLink from "../../components/UnsignedLink";
import InternalTextArea from "../../components/InternalTextArea";
import { UserProfileImage } from "../../components/UserImage/style";
import { ScrollContainer } from "../../components/ScrollContainer/style";

export default function InsertMedicalRecordScreen({ route, navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const { consultationData } = route.params;
  const [descricao, setDescricao] = useState(consultationData.descricao);
  const [diagnostico, setDiagnostico] = useState(consultationData.diagnostico);
  const [prescricao, setPrescricao] = useState(consultationData.receita);

  useEffect(() => {
    setDescricao(consultationData.descricao) 
    setDiagnostico(consultationData.diagnostico)
    setPrescricao(consultationData.receita)
  },[route])

  function returnToHome() {
    navigation.navigate("Main"); 
  }

  return (
    <ScrollContainer>
      <UserProfileImage
        resizeMode="cover"
        source={require("../../assets/user-profile-image.png")}
      />
      <Container>
        <UserMainInfo
          username={consultationData.patientName}
          infoArr={[consultationData.patientAge, consultationData.patientEmail]}
        />
        
        <InternalInputsWrapper>
          {isEditing ? (
            <>
              <InternalInput
                inputText="Descrição da consulta"
                placeholder={consultationData.descricao}
                value={descricao}
                handleChangeText={setDescricao}
                numberOfLines={4}
              />
              <InternalInput
                inputText="Diagnóstico do paciente"
                placeholder={consultationData.diagnostico}
                value={diagnostico}
                handleChangeText={setDiagnostico}
              />
              <InternalInput
                inputText="Prescrição médica"
                placeholder={consultationData.receita}
                value={prescricao}
                handleChangeText={setPrescricao}
                numberOfLines={4}
              />
            </>
          ) : (
            <>
              <InternalTextArea
                labelText="Descrição da consulta"
                textArea={consultationData.descricao}
              />
              <InternalTextArea
                labelText="Descrição da consulta"
                textArea={consultationData.diagnostico}
              />
              <InternalTextArea
                labelText="Prescrição médica"
                textArea={consultationData.receita}
              />
            </>
          )}
        </InternalInputsWrapper>
        <UnsignedButtonsWrapper>
          <UnsignedButton
            buttonText="Salvar"
            handleClickFn={() => setIsEditing(false)}
          />
          {!isEditing && (
            <UnsignedButton
              buttonText="Editar"
              handleClickFn={() => setIsEditing(true)}
            />
          )}
        </UnsignedButtonsWrapper>
        <UnsignedLink linkText="Cancelar" handleClickFn={returnToHome} />
      </Container>
    </ScrollContainer>
  );
}
