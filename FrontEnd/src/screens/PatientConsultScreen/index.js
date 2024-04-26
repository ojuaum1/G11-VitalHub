import React, { useEffect, useState } from 'react';
import { ScreenContainer } from '../../components/ScreenContainer/style';
import HomeHeader from '../../components/HomeHeader';
import Calendar from '../../components/Calendar';
import { Container } from '../../components/Container/style';
import ConsultationBar from '../../components/ConsultationBar';
import { ConsultationCarList } from '../../components/ConsultationCardList/style';
import ConsultationCard from '../../components/ConsultationCard';
import CancelConsultationModal from '../../components/CancelConsultationModal';
import { ScheduleConsultationButton } from './style';
import { FontAwesome6 } from '@expo/vector-icons';
import ScheduleConsultationModal, { getConsultationLevelById } from '../../components/ScheduleConsultationModal';
import ViewConsultationLocationModal from '../../components/ViewConsultationLocationModal';
import { Host } from 'react-native-portalize';
import { BuscarConsultaPelaData, BuscarConsultaPelaDataPaciente } from '../../service/userService';
import { userDecodeToken } from '../../utils/Auth';
import { Text } from 'react-native';
import moment from 'moment'

export default function PatientConsultScreen({ navigation, route }) {
  const [isCancelConsultationModalActive, setIsCancelConsultationModalActive] = useState(false);

  const [isSchedulingConsultationActive, setIsSchedulingConsultationActive] = useState(false);

  const [isViewConsultationLocationActive, setIsViewConsultationLocationActive] = useState(false);
  const [currentConsultationData, setCurrentConsultationData] = useState({});

  const [selectedConsultationType, setSelectedConsultationType] = useState(0);
  const [selectedConsultationData, setSelectedConsultationData] = useState([]);
  const [consultationsData, setConsultationData] = useState([]);

  const [selectedConsultationId, setSelectedConsultationId] = useState();

  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  async function getConsultationFromDate(date) {
    const token = await userDecodeToken();
    const userId = token.id;

    const response = await BuscarConsultaPelaDataPaciente(userId, date);

    console.log(response);

    const consultations = response.map(item => ({
      consultationId: item.id,
      doctorName: item.medicoClinica.medico.usuario.nome,
      doctorEmail: item.medicoClinica.medico.usuario.email,
      doctorAge: item.medicoClinica.medico.crm,
      doctorCRM: item.medicoClinica.medico.crm,
      clinicId: item.medicoClinica.clinica.id,
      longitude: item.medicoClinica.clinica.endereco.longitude,
      latitude: item.medicoClinica.clinica.endereco.latitude,
      selectedDoctorSpecialty: item.medicoClinica.medico.especialidade.especialidade1,
      consultationType: getConsultationLevelById(item.prioridade.prioridade),
      consultationTime: moment(item.dataConsulta).format('HH:mm'),
      consultationStatus: item.situacao.situacao
    }))

    console.log(consultations);

    setConsultationData(consultations);
  }

  function filterConsultationsByStatus() {
    const isScheduledConsultation = consultation => consultation.consultationStatus == 'Pendentes';
    const isPerformedConsultation = consultation => consultation.consultationStatus == 'Realizados';
    const isCanceledConsultation = consultation => consultation.consultationStatus == 'Cancelados';

    switch(selectedConsultationType) {
      case 0:
        const scheduledConsultations = consultationsData.filter(isScheduledConsultation);
        setSelectedConsultationData(scheduledConsultations);
        break;
      case 1:
        const performedConsultations = consultationsData.filter(isPerformedConsultation);
        setSelectedConsultationData(performedConsultations);
        break;
      case 2:
        const canceledConsultations = consultationsData.filter(isCanceledConsultation);
        setSelectedConsultationData(canceledConsultations);
        break;
      default:
        console.log('Hey programmer, there is no state after 2 or before 0');
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

  return (
    <>
      <CancelConsultationModal 
        active={isCancelConsultationModalActive} 
        disableModalFn={() => setIsCancelConsultationModalActive(false)}
        consultationId={selectedConsultationId}
        updateConsultations={UpdateConsultations}
      />
      <ScheduleConsultationModal 
        active={isSchedulingConsultationActive}
        disableModalFn={() => setIsSchedulingConsultationActive(false)}
        navigation={navigation}
      />
      <ViewConsultationLocationModal 
        active={isViewConsultationLocationActive}
        disableModalFn={() => setIsViewConsultationLocationActive(false)}
        doctorData={{ 
          doctorName: currentConsultationData.doctorName,
          doctorSpecialty: currentConsultationData.selectedDoctorSpecialty,
          doctorCRM: currentConsultationData.doctorCRM,
          clinicId: currentConsultationData.clinicId,
          latitude: currentConsultationData.latitude,
          longitude: currentConsultationData.longitude
         }}
         navigation={navigation}

      />
      <ScreenContainer>
          <HomeHeader navigation={navigation} userName='Richard Kosta' userImageUri='https://avatars.githubusercontent.com/u/125266412?v=4' />
          <Calendar 
            setSelectedDate={setSelectedDate}
          />
          <Container>
              <ConsultationBar 
                  selectedType={selectedConsultationType}
                  changeSelectedType={setSelectedConsultationType}
              />
              <ConsultationCarList
                data={selectedConsultationData}
                contentContainerStyle={{ gap: 12 }}
                keyExtractor={item => item.consultationId}
                renderItem={({ item }) => 
                  <ConsultationCard 
                    userName={item.doctorName}
                    userAge={item.doctorAge}
                    userEmail={item.doctorEmail}
                    consultationType={item.consultationType}
                    consultationTime={item.consultationTime}
                    cardType={item.consultationStatus}
                    activeCancelingModalFn={() => {
                      setSelectedConsultationId(item.consultationId)
                      setIsCancelConsultationModalActive(true)
                    }}
                    activeInsertMedicalRecordModalFn={() => navigation.navigate('patientViewMedicalRecord', { consultationId: item.consultationId })}
                    setCurrentUserDataFn={() => {}}
                    handleCardClick={() => {
                      setCurrentConsultationData(item);
                      if (item.consultationStatus === 'Pendentes') {
                        setIsViewConsultationLocationActive(true);
                      }
                    }}
                  />
                }
              />
              <ScheduleConsultationButton onPress={() => setIsSchedulingConsultationActive(true)}>
                <FontAwesome6 name="stethoscope" size={32} color="#FBFBFB" />
              </ScheduleConsultationButton>
          </Container>
      </ScreenContainer>
    </>
  );
}