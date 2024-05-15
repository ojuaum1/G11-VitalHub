import React, { useEffect, useState } from "react";
import { ScreenContainer } from "../../components/ScreenContainer/style";
import HomeHeader from "../../components/HomeHeader";
import Calendar from "../../components/Calendar";
import { Container } from "../../components/Container/style";
import ConsultationBar from "../../components/ConsultationBar";
import { ConsultationCarList } from "../../components/ConsultationCardList/style";
import ConsultationCard from "../../components/ConsultationCard";
import CancelConsultationModal from "../../components/CancelConsultationModal";
import { FontAwesome6 } from "@expo/vector-icons";
import ScheduleConsultationModal, {
  getConsultationLevelById,
} from "../../components/ScheduleConsultationModal";
import ViewConsultationLocationModal from "../../components/ViewConsultationLocationModal";

import {
  BuscarConsultaPelaDataMedico,
  BuscarMedicoPorId,
} from "../../service/userService";
import { userDecodeToken } from "../../utils/Auth";
import moment from "moment";
import { ScheduleConsultationButton } from "../PatientConsultScreen/style";

import InsertMedicalRecordModal from "../../components/InsertMedicalRecordModal";
import MarkAsCompletedModal from "../../components/MarkAsCompletedModal";

export default function PatientConsultScreen({ navigation, route }) {
  const [isCancelConsultationModalActive, setIsCancelConsultationModalActive] =
    useState(false);

  const [isMarkAsCompletedModalActive, setIsMarkAsCompletedModalActive] = useState(false);

  const [
    isInsertMedicalRecordModalActive,
    setIsInsertMedicalRecordModalActive,
  ] = useState(false);

  const [selectedConsultationType, setSelectedConsultationType] = useState(0);
  const [consultationsData, setConsultationData] = useState([]);

  const [selectedUserData, setSelectedUserData] = useState({});
  const [selectedConsultationData, setSelectedConsultationData] = useState({});

  const [selectedConsultationId, setSelectedConsultationId] = useState();

  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  const [photoUrl, setPhotoUrl] = useState("");

  async function getConsultationFromDate(date) {
    try {
      const token = await userDecodeToken();
      const userId = token.id;

      const response = await BuscarConsultaPelaDataMedico(userId, date);

      console.log(JSON.stringify(response));

      const consultations = response.map((item) => ({
        consultationId: item.id,
        patientName: item.paciente.usuario.nome,
        patientEmail: item.paciente.usuario.email,
        patientAge:
          moment().diff(item.paciente.dataNascimento, "years") + " Anos",
        clinicId: item.medicoClinica.clinica.id,
        consultationType: getConsultationLevelById(item.prioridade.prioridade),
        consultationTime: moment(item.dataConsulta).format("HH:mm"),
        consultationStatus: item.situacao.situacao,
        descricao: item.descricao,
        diagnostico: item.diagnostico,
        foto: item.paciente.usuario.foto,
        receita:
          item.receita && item.receita.medicamento
            ? item.receita.medicamento
            : null,
      }));

      console.log(consultations);

      setConsultationData(consultations);
    } catch (error) {
      console.log(error);
    }
  }

  function filterConsultationsByStatus() {
    const isScheduledConsultation = (consultation) =>
      consultation.consultationStatus == "Pendentes";
    const isPerformedConsultation = (consultation) =>
      consultation.consultationStatus == "Realizados";
    const isCanceledConsultation = (consultation) =>
      consultation.consultationStatus == "Cancelados";

    switch (selectedConsultationType) {
      case 0:
        const scheduledConsultations = consultationsData.filter(
          isScheduledConsultation
        );
        setSelectedConsultationData(scheduledConsultations);
        break;
      case 1:
        const performedConsultations = consultationsData.filter(
          isPerformedConsultation
        );
        setSelectedConsultationData(performedConsultations);
        break;
      case 2:
        const canceledConsultations = consultationsData.filter(
          isCanceledConsultation
        );
        setSelectedConsultationData(canceledConsultations);
        break;
      default:
        console.log("Hey programmer, there is no state after 2 or before 0");
    }
  }

  async function UpdateConsultations() {
    await getConsultationFromDate(selectedDate);
    filterConsultationsByStatus();
  }

  useEffect(() => {
    UpdateConsultations();
  }, [selectedDate]);

  useEffect(() => {
    filterConsultationsByStatus();
  }, [selectedConsultationType, selectedDate]);

  async function getUserPhoto() {
    const token = await userDecodeToken();

    const doctorData = await BuscarMedicoPorId(token.id);
    setPhotoUrl(doctorData.usuario.foto);
  }

  useEffect(() => {
    getUserPhoto();
  }, []);

  return (
    <>
      <CancelConsultationModal
        active={isCancelConsultationModalActive}
        disableModalFn={() => setIsCancelConsultationModalActive(false)}
        consultationId={selectedConsultationId}
        updateConsultations={UpdateConsultations}
      />
      <InsertMedicalRecordModal
        active={isInsertMedicalRecordModalActive}
        disableModalFn={() => setIsInsertMedicalRecordModalActive(false)}
        userData={selectedUserData}
        navigation={navigation}
        consultationData={selectedConsultationData}
      />
      <MarkAsCompletedModal 
        active={isMarkAsCompletedModalActive}
        disableModalFn={() => setIsMarkAsCompletedModalActive(false)}
        userData={selectedUserData}
        consultationData={selectedConsultationData}
        updateConsultations={UpdateConsultations}
      />
      <ScreenContainer>
        <HomeHeader
          navigation={navigation}
          userName="Richard Kosta"
          userImageUri={photoUrl}
        />
        <Calendar setSelectedDate={setSelectedDate} />
        <Container>
          <ConsultationBar
            selectedType={selectedConsultationType}
            changeSelectedType={setSelectedConsultationType}
          />
          <ConsultationCarList
            data={selectedConsultationData}
            contentContainerStyle={{ gap: 12 }}
            keyExtractor={(item) => item.consultationId}
            renderItem={({ item }) => (
              <ConsultationCard
                consultationId={item.consultationId}
                userName={item.patientName}
                userAge={item.patientAge}
                userEmail={item.patientEmail}
                consultationType={item.consultationType}
                consultationTime={item.consultationTime}
                cardType={item.consultationStatus}
                foto={item.foto ? item.foto : null}
                activeCancelingModalFn={() => {
                  setSelectedConsultationId(item.consultationId);
                  setIsCancelConsultationModalActive(true);
                }}
                activeInsertMedicalRecordModalFn={() => {
                  setSelectedConsultationData({
                    consultationId: item.consultationId,
                    patientName: item.patientName,
                    patientAge: item.patientAge,
                    patientEmail: item.patientEmail,
                    descricao: item.descricao,
                    diagnostico: item.diagnostico,
                    receita: item.receita,
                    foto: item.foto ? item.foto : null,
                    selectedDate: selectedDate
                  });
                  setIsInsertMedicalRecordModalActive(true);
                }}
                setCurrentUserDataFn={setSelectedUserData}
                handleCardClick={() => {
                  setSelectedConsultationData({
                    consultationId: item.consultationId,
                    patientName: item.patientName,
                    patientAge: item.patientAge,
                    patientEmail: item.patientEmail,
                    descricao: item.descricao,
                    diagnostico: item.diagnostico,
                    receita: item.receita,
                    foto: item.foto ? item.foto : null,
                    selectedDate: selectedDate
                  });
                  setIsMarkAsCompletedModalActive(true);
                }}
              />
            )}
          />
        </Container>
      </ScreenContainer>
    </>
  );
}
