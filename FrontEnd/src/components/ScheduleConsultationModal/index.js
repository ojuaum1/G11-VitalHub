import { View, Text } from 'react-native'
import React, { useState } from 'react'
import BottomModal from '../BottomModal'
import { Title } from '../Title/style'
import UnsignedButton from '../UnsignedButton'
import UnsignedLink from '../UnsignedLink'
import ButtonSelectInput from '../ButtonSelectInput'
import InternalInput from '../InternalInput'

export function getConsultationLevelById(consultationId) {
  switch (consultationId) {
    case 1:
      return 'Rotina'; 
    case 2:
      return 'Exame';
    case 3: 
      return 'Urgência';
    default:
      return 'Inválido';
  }
}

export default function ScheduleConsultationModal({ active = true, disableModalFn = null, navigation = null }) {
  const [clinicCity, setClinicCity] = useState('');
  const [consultationLevel, setConsultationLevel] = useState('');

  return (
    <BottomModal active={active} modalHeightPercentage={80}>
        <Title>Agendar consulta</Title>

        <ButtonSelectInput 
          selectedButtonId={consultationLevel}
          handleChangeSelectedFn={setConsultationLevel}
        />

        <InternalInput 
          inputText='Cidade em deseja buscar a clínica'
          inputTextFontSize={14}
          placeholder='Cidade...'
          handleChangeText={setClinicCity}
          value={clinicCity}
        />

        <UnsignedButton 
            buttonText='Continuar'
            handleClickFn={() => {
              if (clinicCity === '' || consultationLevel === '')
                return;

              disableModalFn();
              navigation.navigate('clinicSelection', { clinicCity, consultationType: getConsultationLevelById(consultationLevel) });
            }}
        />

        <UnsignedLink
            linkText='Cancelar'
            handleClickFn={disableModalFn}
        />
    </BottomModal>
  )
}