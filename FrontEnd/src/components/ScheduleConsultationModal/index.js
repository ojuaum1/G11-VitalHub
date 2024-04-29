
import React, { useEffect, useState } from 'react'
import BottomModal from '../BottomModal'
import { Title } from '../Title/style'
import UnsignedButton from '../UnsignedButton'
import UnsignedLink from '../UnsignedLink'
import ButtonSelectInput from '../ButtonSelectInput'
import InternalInput from '../InternalInput'

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

  const [scheduleData, setScheduleData] = useState({
    priorityId: '',
    priorityLabel: '',
    clinicCity: '',
  })

  useEffect(() => {
    console.log('Schedule:' + JSON.stringify(scheduleData));
  }, [scheduleData])

  return (
    <BottomModal active={active} modalHeightPercentage={80}>
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

        <UnsignedButton 
            buttonText='Continuar'
            handleClickFn={() => {
              if (scheduleData.clinicCity === '' || scheduleData.priorityId === '')
                return;

              disableModalFn();
              navigation.navigate('clinicSelection', { scheduleData });
            }}
        />

        <UnsignedLink
            linkText='Cancelar'
            handleClickFn={disableModalFn}
        />
    </BottomModal>
  )
}