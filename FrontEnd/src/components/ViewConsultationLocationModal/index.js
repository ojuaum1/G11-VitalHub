import { View, Text } from 'react-native'
import React from 'react'
import Modal from '../Modal'
import { ModalImage } from '../Modal/style'
import UserMainInfo from '../UserMainInfo'
import UnsignedButton from '../UnsignedButton'
import UnsignedLink from '../UnsignedLink'

export default function ViewConsultationLocationModal({
    active,
    disableModalFn = null,
    doctorData = {
        doctorName: '',
        doctorSpecialty: '',
        doctorCRM: '',
        clinicId: '',
        latitude: '', 
        longitude: '',
        foto: ''
    },
    navigation
}) {
    return (
        <Modal active={active} modalHeighPercentage={60}>
            <ModalImage 
                heightPercentage={50}
                source={{uri: doctorData.foto}}
            />
            <UserMainInfo
                username={doctorData.doctorName}
                infoArr={[
                    doctorData.doctorSpecialty,
                    doctorData.doctorCRM
                ]}
            />
            <UnsignedButton 
                buttonText='Ver local da consulta'
                handleClickFn={() => navigation.navigate('consultationLocation',{ latitude: doctorData.latitude , longitude: doctorData.longitude, clinicId: doctorData.clinicId })}
            />
            

            <UnsignedLink 
                linkText='Cancelar'
                handleClickFn={disableModalFn}
            />
        </Modal>
    )
}



