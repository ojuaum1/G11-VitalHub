import React, { useEffect, useState } from "react";
import UserMainInfo from "../../components/UserMainInfo";
import {
  ContainerImage,
  UserProfileImage,
} from "../../components/UserImage/style";
import { Container } from "../../components/Container/style";
import {
  InputText,
  InternalInputsWrapper,
} from "../../components/InternalInput/style";
import InternalTextArea from "../../components/InternalTextArea";
import UnsignedButton from "../../components/UnsignedButton";
import { UnsignedButtonsWrapper } from "../../components/UnsignedButton/style";
import { ScrollContainer } from "../../components/ScrollContainer/style";
import { SplitedTextAreasContainer } from "../../components/InternalTextArea/style";
import { logout, userDecodeToken } from "../../utils/Auth";
import {
  AtualizarPerfilMedico,
  AtualizarPerfilPaciente,
  BuscarMedicoPorId,
  BuscarPacientePorId,
  GetSpecialties,
} from "../../service/userService";
import { SelectList } from "react-native-dropdown-select-list";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ButtonCamera } from "./style";
import { ScrollView } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from 'expo-media-library'; 
import api, { apiUrlLocal } from "../../service/Service";

export default function PatientProfileScreen({ navigation, route }) {
  // User data
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  // Patient data
  const [birthDate, setBirthDate] = useState("");
  const [cpf, setCpf] = useState("");

  // Doctor data
  const [specialty, setSpecialty] = useState("");
  const [specialtyId, setSpecialtyId] = useState("");
  const [crm, setCrm] = useState("");
  const [selectSpecialtiesData, setSelectSpecialtiesData] = useState([]);

  // General data
  const [neighborhood, setNeighborhood] = useState("");
  const [number, setNumber] = useState("");
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [token, setToken] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const params = route.params;

  async function loadData() {
    const token = await userDecodeToken();
    setUserName(token.name);
    setEmail(token.email);
    setId(token.id);
    setRole(token.role);
    setToken(token.token);

    if (token.role == "Paciente") {
      const patientData = await BuscarPacientePorId(token.id);

      setPhotoUrl(patientData.usuario.foto);

      setBirthDate(patientData.dataNascimento);
      setCpf(patientData.cpf);

      setNeighborhood(patientData.endereco.logradouro);
      setNumber(patientData.endereco.numero);
      setCep(patientData.endereco.cep);
      setCity(patientData.endereco.cidade);
    } else if (token.role == "Medico") {
      const doctorData = await BuscarMedicoPorId(token.id);
      const specialtiesData = await GetSpecialties();

      const specialtiesSelectData = specialtiesData.map((specialty) => ({
        key: specialty.id,
        value: specialty.especialidade1,
      }));

      setSelectSpecialtiesData(specialtiesSelectData);

      setPhotoUrl(doctorData.usuario.foto)

      setCrm(doctorData.crm);
      setSpecialtyId(doctorData.especialidade.id);
      setSpecialty(doctorData.especialidade.especialidade1);

      setNeighborhood(doctorData.endereco.logradouro);
      setNumber(doctorData.endereco.numero);
      setCep(doctorData.endereco.cep);
      setCity(doctorData.endereco.cidade);
    } else {
      alert("Invalid role!");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (params != null)
      if (params.newPhotoUri != null)
        AlterarFotoPerfil(params.newPhotoUri)
  }, [params])

  async function AlterarFotoPerfil(newPhotoUri){
    try {
      const formData = new FormData();
      formData.append("Arquivo", {
        uri : newPhotoUri,
        name : `image.${newPhotoUri.split(".").pop()}`,
        type:  `image/${newPhotoUri.split(".").pop()}`
      })

      await api.put(`${apiUrlLocal}/Usuario/AlterarFotoPerfil?id=${id}`, formData, {
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      })
  
      await loadData();

    } catch (error) {
      console.log(error);
    }

  }
  return (
    <ScrollContainer>
      <ContainerImage>
        <UserProfileImage
          resizeMode="cover"
          source={{
            uri: photoUrl
          }}
        />

        <ButtonCamera
          onPress={async () => {
            await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            navigation.navigate("Camera", {getMediaLibrary : true});
          }}
        >
          <MaterialCommunityIcons
            name="camera-plus"
            size={20}
            color={"#fbfbfb"}
          />
        </ButtonCamera>
      </ContainerImage>
      <ScrollView>
        <Container>
          <UserMainInfo username={userName} infoArr={[email]} />
          <InternalInputsWrapper>
            {role === "Paciente" ? (
              <>
                <InternalTextArea
                  labelText="Data de nascimento:"
                  textArea={birthDate ? new Date(birthDate).toLocaleDateString() : undefined}
                  handleChangeFn={setBirthDate}
                  isEditing={isEditing}
                />
                <InternalTextArea
                  labelText="CPF"
                  textArea={cpf ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : undefined}
                  handleChangeFn={setCpf}
                  isEditing={false}
                  keyboardType='number-pad'
                />
              </>
            ) : (
              <>
                {isEditing ? (
                  <>
                    <InputText fontSize={16}>Especialidade:</InputText>
                    <SelectList
                      setSelected={(key) => {
                        setSpecialtyId(key);
                      }}
                      data={selectSpecialtiesData}
                      save="key"
                      defaultOption={{ key: specialtyId, value: specialty }}
                    />
                  </>
                ) : (
                  <InternalTextArea
                    labelText="Especialidade:"
                    textArea={specialty}
                    handleChangeFn={setSpecialty}
                    isEditing={isEditing}
                  />
                )}
                <InternalTextArea
                  labelText="CRM"
                  textArea={crm}
                  handleChangeFn={setCrm}
                  isEditing={false}
                />
              </>
            )}
            <SplitedTextAreasContainer>
              <InternalTextArea
                labelText="Logradouro"
                textArea={neighborhood}
                widthPercentage={45}
                handleChangeFn={setNeighborhood}
                isEditing={isEditing}
              />
              <InternalTextArea
                labelText="Número"
                textArea={number}
                widthPercentage={45}
                handleChangeFn={setNumber}
                isEditing={isEditing}
                keyboardType='number-pad'
              />
            </SplitedTextAreasContainer>
            <SplitedTextAreasContainer>
              <InternalTextArea
                widthPercentage={45}
                labelText="Cep"
                textArea={cep ? cep.replace(/(\d{5})(\d{3})/, '$1-$2') : undefined}
                handleChangeFn={setCep}
                isEditing={isEditing}
                keyboardType='number-pad'
              />
              <InternalTextArea
                widthPercentage={45}
                labelText="Cidade"
                textArea={city}
                handleChangeFn={setCity}
                isEditing={isEditing}
              />
            </SplitedTextAreasContainer>
          </InternalInputsWrapper>
          <UnsignedButtonsWrapper>
            {isEditing ? (
              <UnsignedButton
                buttonText="Salvar"
                handleClickFn={async (setIsLoading) => {
                  setIsEditing(false);

                  if (role == "Paciente") {
                    await AtualizarPerfilPaciente(
                      token,
                      new Date(birthDate).toISOString(),
                      neighborhood,
                      number,
                      cep.replace('-', ''),
                      city
                    );
                  } else if (role == "Medico") {
                    await AtualizarPerfilMedico(
                      token,
                      specialtyId,
                      crm,
                      neighborhood,
                      number,
                      cep.replace('-', ''),
                      city
                    );
                  }

                  await loadData();

                  setIsLoading(false);
                }}
              />
            ) : (
              <UnsignedButton
                buttonText="Editar"
                handleClickFn={(setIsLoading) => {
                  setIsEditing(true);
                  setIsLoading(false);
                }}
              />
            )}
            <UnsignedButton
              handleClickFn={() => {
                logout();
                navigation.replace("login");
              }}
              buttonText="Sair"
            />
          </UnsignedButtonsWrapper>
        </Container>
      </ScrollView>
    </ScrollContainer>
  );
}
