import React from 'react';
import Modal from '../Modal';
import { BigGroup, SmallGroup, SmallSubtitle, SmallTitle, Subtitle, Title } from '../Title/style';
import UnsignedButton from '../UnsignedButton';
import UnsignedLink from '../UnsignedLink';
import moment from 'moment';

export default function ScheduleBriefModal({ 
  active, 
  disableModalFn = null, 
  confirmModalFn = null,
  consultationDate,
  doctorName,
  doctorSpecialty,
  consultationLocation,
  consultationType
}) {

  function formatDate(date) {
    let formattedDate = moment(date).format('DD MMMM YYYY')
    return formattedDate.replace(/\s/g, ' de ');
  }

  return (
    <Modal 
      active={active}
      modalHeighPercentage={75}
    >
      <BigGroup>
        <Title $marginTop={0}>Agendar consulta</Title>
        <Subtitle>Consulte os dados selecionados para a sua consulta</Subtitle>
      </BigGroup>

      <SmallGroup>
        <SmallTitle marginTop={0}>Data da consulta:</SmallTitle>
        <SmallSubtitle>{formatDate(consultationDate)}</SmallSubtitle>
      </SmallGroup>
      <SmallGroup>
        <SmallTitle marginTop={0}>Médico(a) da consulta</SmallTitle>
        <SmallSubtitle>{doctorName}</SmallSubtitle>
        <SmallSubtitle>{doctorSpecialty}</SmallSubtitle>
      </SmallGroup>
      <SmallGroup>
        <SmallTitle marginTop={0}>Local da consulta</SmallTitle>
        <SmallSubtitle>{consultationLocation}</SmallSubtitle>
      </SmallGroup>
      <SmallGroup>
        <SmallTitle marginTop={0}>Tipo da consulta</SmallTitle>
        <SmallSubtitle>{consultationType}</SmallSubtitle>
      </SmallGroup>

      <UnsignedButton 
        buttonText='Confirmar'
        handleClickFn={confirmModalFn}
      />
      <UnsignedLink 
        linkText='Cancelar'
        handleClickFn={disableModalFn}
      />
    </Modal>
  )
}