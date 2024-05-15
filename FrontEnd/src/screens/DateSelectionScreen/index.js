import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/style";
import { Title } from "../../components/Title/style";
import { ButtonLinkWrapper } from "../ClinicSelectionScreen/style";
import UnsignedButton from "../../components/UnsignedButton";
import UnsignedLink from "../../components/UnsignedLink";
import SelectInput from "../../components/SelectInput";
import FullCalender from "../../components/FullCalendar";
import ScheduleBriefModal from "../../components/ScheduleBriefModal";
import { Host } from "react-native-portalize";
import api, { apiUrlLocal } from "../../service/Service";
import { userDecodeToken } from "../../utils/Auth";
import moment from "moment";
import { ActivityIndicator } from "react-native";
import { PatientCreateScheduleNotify } from "../../../utils/notifications";

export default function DateSelectionScreen({ navigation, route }) {
  const [scheduleData, setScheduleData] = useState(route.params.scheduleData);

  const [avaliableTimesData, setAvaliableTimesData] = useState(null);
  const [isScheduleBriefActive, setIsScheduleBriefActive] = useState(false);

  const [token, setToken] = useState();

  async function getToken() {
    setToken(await userDecodeToken());
  }

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => console.log(scheduleData), [scheduleData]);

  function LoadOptions() {
    const dataAtual = moment().format('YYYY-MM-DD');
    const horasRestantes = moment(dataAtual)
      .add(24, "hours")
      .diff(moment(), "hours");
    console.log(horasRestantes);

    const options = Array.from({ length: horasRestantes }, (_, index) => {
      let valor = new Date().getHours() + (index + 1);
      return `${valor}:00`;
    });

    setAvaliableTimesData(options);
  }

  function formatDate(date) {
    let formattedDate = moment(date).format('DD MMMM YYYY')
    return formattedDate.replace(/\s/g, ' de ');
  }

  useEffect(() => LoadOptions(), {});
  return (
    <Host>
      <ScheduleBriefModal
        active={isScheduleBriefActive}
        disableModalFn={() => setIsScheduleBriefActive(false)}
        confirmModalFn={async () => {
          const response = await api.post(
            `${apiUrlLocal}/Consultas/Cadastrar`,
            {
              situacaoId: "0906A605-1206-47EA-B986-F8A3FB8CB549",
              pacienteId: token.id,
              medicoClinicaId: scheduleData.clinicDoctorId,
              receitaId: null,
              prioridadeId: scheduleData.priorityId,
              dataConsulta: `${scheduleData.consultationDate} ${scheduleData.consultationTime}`,
              descricao: null,
              diagnostico: null,
            }
          );

          console.log(response);

          await PatientCreateScheduleNotify(
            scheduleData.doctorName, 
            scheduleData.doctorSpecialtyName, 
            formatDate(scheduleData.consultationDate), 
            scheduleData.consultationTime
          );

          setIsScheduleBriefActive(false);
          navigation.navigate("Main");
        }}
        scheduleData={scheduleData}
      />
      <Container>
        <Title>Selecionar data</Title>

        <FullCalender
          selectedDate={scheduleData.consultationDate}
          handleSelectedDateFn={(date) =>
            setScheduleData({
              ...scheduleData,
              consultationDate: date,
            })
          }
        />
        {avaliableTimesData != null ? (
          <SelectInput
            labelText="Selecione um horário disponível"
            defaultText="Selecionar horário"
            handleSelectedFn={(time) => {
              setScheduleData({
                ...scheduleData,
                consultationTime: time,
              });
            }}
            data={avaliableTimesData}
          />
        ) : (
          <ActivityIndicator />
        )}

        <ButtonLinkWrapper>
          <UnsignedButton
            buttonText="Confirmar"
            handleClickFn={() => setIsScheduleBriefActive(true)}
          />
          <UnsignedLink
            linkText="Cancelar"
            handleClickFn={() => navigation.navigate("Main")}
          />
        </ButtonLinkWrapper>
      </Container>
    </Host>
  );
}
