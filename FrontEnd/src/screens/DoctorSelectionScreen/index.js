import { Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/style";
import { Title } from "../../components/Title/style";
import { ButtonLinkWrapper } from "../ClinicSelectionScreen/style";
import UnsignedButton from "../../components/UnsignedButton";
import UnsignedLink from "../../components/UnsignedLink";
import DoctorCard from "../../components/DoctorCard";
import { CardsList } from "../../components/Card/style";
import { ScrollContainer } from "../../components/ScrollContainer/style";
import api, {apiUrlLocal} from "../../service/Service";


export default function DoctorSelectionScreen({ navigation, route }) {
  const [scheduleData, setScheduleData] = useState(route.params.scheduleData);

  const [medicosLista, setMedicosLista] = useState([{ usuario: { id: '', foto: '', nome: '' }, especialidade: {especialidade1: ''} }]);
  const [someSelected, setSomeSelected] = useState(false);

  async function ListarMedicos() {
    const url = `${apiUrlLocal}/Medicos/BuscarPorIdClinica?id=${scheduleData.clinicId}`;
    const data = (await api.get(url)).data;

    setMedicosLista(data);
  }

  useEffect(() => {
    ListarMedicos();
  }, []);

  useEffect(() => {
    console.log(scheduleData);
  }, [scheduleData]);

  return (
    <Container>
      <Title>Selecionar médico</Title>

      <ScrollContainer horizontal showsVerticalScrollIndicator={false}>
        <CardsList
          data={medicosLista}
          keyExtractor={(doctor) => doctor.usuario.id}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item: medico }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSomeSelected(true);
                  setScheduleData({
                    ...scheduleData,
                    clinicDoctorId: medico.id,
                    doctorName: medico.usuario.nome,
                    doctorSpecialtyName: medico.especialidade.especialidade1
                  })
                }}
              >
                <DoctorCard
                  doctorImageUri={medico.usuario.foto}
                  isSelected={medico.id == scheduleData.clinicDoctorId}
                  medico={medico}
                />
              </TouchableOpacity>
            )
          }}
        />
      </ScrollContainer>

      <ButtonLinkWrapper>
        <UnsignedButton
          buttonText="Continuar"
          handleClickFn={() => {
            if (!someSelected)
                return;

            navigation.navigate("dateSelection", { scheduleData })}
          }
        />
        <UnsignedLink
          linkText="Cancelar"
          handleClickFn={() => navigation.navigate("Main")}
        />
      </ButtonLinkWrapper>
    </Container>
  );
}
