import { View, Text } from 'react-native'
import React from 'react'
import { DoctorImage, DoctorNameText, DoctorSpecialtiesText, InfoTextWrapper } from './style'
import { DoctorCardContainer } from '../ClinicCard/style'

export default function DoctorCard({ doctorImageUri,isSelected = false,medico }) {
  return (
    <DoctorCardContainer isSelected={isSelected}>
        <DoctorImage source={{ uri: doctorImageUri }}/>
        <InfoTextWrapper>
            <DoctorNameText maxChar={20}> { medico.usuario.nome }</DoctorNameText>
            <DoctorSpecialtiesText>{ medico.especialidade.especialidade1 }</DoctorSpecialtiesText>
        </InfoTextWrapper>
    </DoctorCardContainer>
  )
}