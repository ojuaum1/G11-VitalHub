import React, { useEffect, useState } from 'react'
import BottomModal from '../BottomModal'
import { Title } from '../Title/style'
import UnsignedButton from '../UnsignedButton'
import UnsignedLink from '../UnsignedLink'
import ButtonSelectInput from '../ButtonSelectInput'
import InternalInput from '../InternalInput'
import { KeyboardAvoidingView, Text, View, Platform, Modal } from 'react-native'

export function getConsultationLevelById(consultationId) {
  switch (consultationId) {
    case 0:
      return 'Rotina'; 
    case 1:
      return 'Exame';
    case 2: 
      return 'Urgência';
    default:
      return 'Inválido';
  }
}

export default function ScheduleConsultationModal({ active = true, disableModalFn = null, navigation = null }) {
  const [consultationLevel, setConsultationLevel] = useState('');

  const [errors, setErrors] = useState({});
  const [haveSomeError, setHaveSomeError] = useState(false);

  const [scheduleData, setScheduleData] = useState({
    priorityId: '',
    priorityLabel: '',
    clinicCity: '',
  })

  function validateForm() {
    let errors = {};

    if (scheduleData.priorityId === '') {
      errors.priority = 'A prioridade da consulta é requirido.';
    }

    if (scheduleData.clinicCity === '') {
      errors.password = 'A cidade da clínica é requirida.';
    }

    setErrors(errors);
    setHaveSomeError(Object.keys(errors).length >= 1);
  }

  useEffect(() => {
    validateForm();
  }, [scheduleData])

  useEffect(() => {
    console.log('Schedule:' + JSON.stringify(scheduleData));
  }, [scheduleData])

  return (
    <BottomModal active={active} modalHeightPercentage={70}>
      {/* <KeyboardAvoidingView
        style={{ flex : 1 }}
        behavior={"padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      > */}
        {/* <View style={{ flex : 1 }}> */}
          
          <Title>Agendar consulta</Title>

          <ButtonSelectInput 
            selectedButtonId={consultationLevel}
            handleChangeSelectedFn={(buttonId, priorityId) => {
              setConsultationLevel(buttonId);
              setScheduleData({
                ...scheduleData,
                priorityId: priorityId,
                priorityLabel: getConsultationLevelById(buttonId)
              })
            }}
          />

          <InternalInput 
            inputText='Cidade em deseja buscar a clínica'
            inputTextFontSize={14}
            placeholder='Cidade...'
            handleChangeText={text => setScheduleData({
              ...scheduleData,
              clinicCity: text
            })}
            value={scheduleData.clinicCity}
          />

          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            {Object.values(errors).map((error, index) => ( 
                <Text key={index} style={{ color: 'red'}}> 
                    *{error} 
                </Text> 
            ))} 
          </View>

          <UnsignedButton 
              buttonText='Continuar'
              handleClickFn={() => {
                if (haveSomeError)
                  return;

                disableModalFn();
                navigation.navigate('clinicSelection', { scheduleData });
              }}
          />

          <UnsignedLink
              linkText='Cancelar'
              handleClickFn={disableModalFn}
          />
          {/* </View> */}
        {/* </KeyboardAvoidingView> */}
      </BottomModal>
  )
}