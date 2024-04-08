import React, { useEffect, useState } from 'react'
import HomeHeader from '../../components/HomeHeader'
import { ScreenContainer } from '../../components/ScreenContainer/style'
import Calendar from '../../components/Calendar'
import ConsultationBar from '../../components/ConsultationBar'
import { Container } from '../../components/Container/style';
import ConsultationCard from '../../components/ConsultationCard'
import { ConsultationCarList } from '../../components/ConsultationCardList/style'
import CancelConsultationModal from '../../components/CancelConsultationModal'
import InsertMedicalRecordModal from '../../components/InsertMedicalRecordModal'
import { Host } from 'react-native-portalize'
import { BuscarConsultaPelaDataMedico } from '../../service/userService'
import { userDecodeToken } from '../../utils/Auth'
import moment from 'moment'
import { getConsultationLevelById } from '../../components/ScheduleConsultationModal'

export default function DoctorConsultScreen({ navigation }) {
  const [isCancelConsultationModalActive, setIsCancelConsultationModalActive] = useState(false);

  const [isInsertMedicalRecordModalActive, setIsInsertMedicalRecordModalActive] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState({})

  const [selectedConsultationType, setSelectedConsultationType] = useState(0);
  const [selectedConsultationData, setSelectedConsultationData] = useState([]);
  const [consultationsData, setConsultationData] = useState([]);

  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  
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

  function convertBirthDateToAge(birthDateText) {
    const currentDate = moment();
    const birthDate = moment(birthDateText);

    const diff = currentDate.diff(birthDate, 'years');

    return diff;
  }

  async function getConsultationFromDate(date) {
    const token = await userDecodeToken();
    const userId = token.id;

    const response = await BuscarConsultaPelaDataMedico(userId, date);

    const consultations = response.map(item => ({
      consultationId: item.id,
      patientName: item.paciente.usuario.nome,
      patientEmail: item.paciente.usuario.email,
      patientAge: convertBirthDateToAge(item.paciente.dataNascimento),
      consultationType: getConsultationLevelById(item.prioridade.prioridade),
      consultationTime: moment(item.dataConsulta).format('HH:mm'),
      consultationStatus: item.situacao.situacao
    }))
    console.log(consultations);
    setConsultationData(consultations);
  }

  useEffect(() => {
    filterConsultationsByStatus();
  }, [selectedConsultationType, selectedDate]);

  useEffect(() => {
    getConsultationFromDate(selectedDate)
    filterConsultationsByStatus();
  }, [selectedDate])

  return (
    <>
      <CancelConsultationModal 
        active={isCancelConsultationModalActive} 
        disableModalFn={() => setIsCancelConsultationModalActive(false)}
      />
      <InsertMedicalRecordModal 
        active={isInsertMedicalRecordModalActive} 
        disableModalFn={() => setIsInsertMedicalRecordModalActive(false)} 
        userData={selectedUserData}
        navigation={navigation}
      />
      <ScreenContainer>
          <HomeHeader navigation={navigation} userName='Dr. Lucas' userImageUri='https://avatars.githubusercontent.com/u/125275518?v=4' />
          <Calendar 
            setSelectedDate={setSelectedDate}
          />
          <Container>
            <ConsultationBar
              selectedType={ selectedConsultationType }
              changeSelectedType={ setSelectedConsultationType }
            />
            <ConsultationCarList 
              data={selectedConsultationData}
              contentContainerStyle={{ gap: 12 }}
              keyExtractor={item => item.consultationId}
              renderItem={({ item }) => 
                <ConsultationCard 
                  userName={item.patientName}
                  userAge={item.patientAge}
                  userEmail={item.patientEmail}
                  consultationType={item.consultationType}
                  consultationTime={item.consultationTime}
                  cardType={item.consultationStatus}
                  activeCancelingModalFn={() => setIsCancelConsultationModalActive(true)}
                  activeInsertMedicalRecordModalFn={() => setIsInsertMedicalRecordModalActive(true)}
                  setCurrentUserDataFn={setSelectedUserData}
                />
              }
            />
          </Container>
      </ScreenContainer>
    </>
  )
}