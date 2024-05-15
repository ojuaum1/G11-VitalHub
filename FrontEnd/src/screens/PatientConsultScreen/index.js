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
import { BuscarConsultaPelaDataPaciente, BuscarPacientePorId } from '../../service/userService';
import { userDecodeToken } from '../../utils/Auth';
import moment from 'moment';

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

  const [photoUrl, setPhotoUrl] = useState('');

  async function getConsultationFromDate(date) {
    try {
      const token = await userDecodeToken();
      const userId = token.id;
  
      const response = await BuscarConsultaPelaDataPaciente(userId, date);

      console.log(JSON.stringify(response));
  
      const consultations = response.map(item => {
        return {
          consultationId: item.id,
          doctorName: item.medicoClinica.medico.usuario.nome,
          doctorEmail: item.medicoClinica.medico.usuario.email,
          doctorAge: item.medicoClinica.medico.crm,
          doctorCRM: item.medicoClinica.medico.crm,
          clinicId: item.medicoClinica.clinica.id,
          longitude: item.medicoClinica.clinica.endereco.longitude,
          latitude: item.medicoClinica.clinica.endereco.latitude,
          descricao: item.descricao,
          diagnostico: item.diagnostico,
          receita: item.receita.medicamento || null,
          selectedDoctorSpecialty: item.medicoClinica.medico.especialidade.especialidade1,
          consultationType: getConsultationLevelById(item.prioridade.prioridade),
          consultationTime: moment(item.dataConsulta).format('HH:mm'),
          consultationStatus: item.situacao.situacao
        }
      });
  
      setConsultationData(consultations);
    } catch (error) {
      console.log(error);
    }
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

  async function getUserPhoto() {
      const token = await userDecodeToken();

      const patientData = await BuscarPacientePorId(token.id);
      setPhotoUrl(patientData.usuario.foto);
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
        consultationData={selectedConsultationData}
        isDoctor={false}
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
          <HomeHeader navigation={navigation} userName='Richard Kosta' userImageUri={photoUrl} />
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
                      setSelectedConsultationData(item);
                      setIsCancelConsultationModalActive(true)
                    }}
                    activeInsertMedicalRecordModalFn={() => navigation.navigate('patientViewMedicalRecord', { consultationData: item })}
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