import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/style";
import InternalInput from "../../components/InternalInput";
import { InternalInputsWrapper } from "../../components/InternalInput/style";
import UserMainInfo from "../../components/UserMainInfo";
import { UnsignedButtonsWrapper } from "../../components/UnsignedButton/style";
import UnsignedButton from "../../components/UnsignedButton";
import UnsignedLink from "../../components/UnsignedLink";
import InternalTextArea from "../../components/InternalTextArea";
import { UserProfileImage } from "../../components/UserImage/style";
import { ScrollContainer1 } from "../../components/ScrollContainer/style";
import api,{ apiUrlLocal } from "../../service/Service";

export default function InsertMedicalRecordScreen({ route, navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const { consultationData } = route.params;
  const [descricao, setDescricao] = useState(consultationData.descricao);
  const [diagnostico, setDiagnostico] = useState(consultationData.diagnostico);
  const [prescricao, setPrescricao] = useState(consultationData.receita);
  const [foto, setFoto] = useState(consultationData.foto);
  const [consultationId, setConsultationId] = useState(consultationData.id);

  useEffect(() => {
    setFoto(consultationData.foto);
    setDescricao(consultationData.descricao);
    setDiagnostico(consultationData.diagnostico);
    setPrescricao(consultationData.receita);
    setConsultationId(consultationData.consultationId);
  }, [route]);

  function returnToHome() {
    navigation.navigate("Main");
  }

console.log(consultationId);

  async function saveChanges() {
    try {
      
      await api.put(`${apiUrlLocal}/Consultas/Prontuario`,{
        consultaId: consultationId, 
        medicamento: prescricao,
        descricao: descricao,
        diagnostico: diagnostico
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  }

  return (
    <ScrollContainer1>
      <UserProfileImage resizeMode="cover" source={{ uri: foto }} />
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
                placeholder={prescricao}
                value={prescricao}
                handleChangeText={setPrescricao}
                numberOfLines={4}
              />
            </>
          ) : (
            <>
              <InternalTextArea
                labelText="Descrição da consulta"
                textArea={descricao}
              />
              <InternalTextArea
                labelText="Diagnostico"
                textArea={diagnostico}
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
            handleClickFn={saveChanges}
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
    </ScrollContainer1>
  );
}
