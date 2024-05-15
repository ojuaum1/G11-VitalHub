import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import UnsignedButton from "../UnsignedButton";
import UnsignedLink from "../UnsignedLink";
import UserMainInfo from "../UserMainInfo";
import { ModalImage } from "../Modal/style";
import api, { apiUrlLocal } from "../../service/Service";
import moment from "moment";

export default function MarkAsCompletedModal({
  active,
  disableModalFn = null,
  userData = {
    userName: "",
    userAge: "",
    userEmail: "",
  },
  consultationData = {},
  updateConsultations = null
}) {

  async function markAsCompleted() {
    const currentDate = moment();
    const consultationDate = moment(consultationData.selectedDate);

    const diff = currentDate.diff(consultationDate, 'days')

    const validatedDate = diff >= 0;

    if (!validatedDate) 
      return;

    await api.put(`${apiUrlLocal}/Consultas/Status?idConsulta=${consultationData.consultationId}&status=Realizados`);

    await updateConsultations();

    disableModalFn();
  }

  return (
    <Modal active={active} modalHeighPercentage={60}>
      <ModalImage
        heightPercentage={50}
        source={{ uri: consultationData.foto }}
      />
      <UserMainInfo
        username={consultationData.patientName}
        infoArr={[consultationData.patientAge, consultationData.patientEmail]}
      />
      <UnsignedButton
        buttonText="Marcar como realizada"
        handleClickFn={markAsCompleted}
      />
      <UnsignedLink linkText="Cancelar" handleClickFn={disableModalFn} />
    </Modal>
  );
}
