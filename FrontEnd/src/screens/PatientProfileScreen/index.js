import React, { useEffect, useState } from 'react'
import UserMainInfo from '../../components/UserMainInfo'
import { UserProfileImage } from '../../components/UserImage/style'
import { Container } from '../../components/Container/style'
import { InternalInputsWrapper } from '../../components/InternalInput/style'
import InternalTextArea from '../../components/InternalTextArea'
import UnsignedButton from '../../components/UnsignedButton'
import { UnsignedButtonsWrapper } from '../../components/UnsignedButton/style'
import { ScrollContainer } from '../../components/ScrollContainer/style';
import { SplitedTextAreasContainer } from '../../components/InternalTextArea/style'
import { logout, userDecodeToken } from '../../utils/Auth'
import { BuscarPacientePorId } from '../../service/userService'

export default function PatientProfileScreen({ navigation }) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");

    const [address, setAddress] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [cep, setCep] = useState('');
    const [cpf, setCpf] = useState('');
    const [city, setCity] = useState('Moema-SP');

    async function loadData() {
        const token = await userDecodeToken();
        setUserName(token.name);
        setEmail(token.email);
        setId(token.id);
        
        const patientData = await BuscarPacientePorId(token.id);

        setAddress(patientData.address);
        setBirthDate(patientData.birthDate);
        setCep(patientData.cep);
        setCpf(patientData.cpf);

    }

    useEffect(() => {
        loadData();
    }, [])
    
  return (
    <ScrollContainer>
      <UserProfileImage 
          resizeMode="cover"
          source={require('../../assets/user-profile-image.png')} 
      />
      <Container>
          <UserMainInfo 
              username={userName}
              infoArr={[ 
                  email
              ]}
          />
          <InternalInputsWrapper>
           
            <InternalTextArea 
                inputText="Data de nascimento:"
                textArea={birthDate}
            />
            <InternalTextArea 
                inputText="CPF"
                textArea={cpf}
            />
            <InternalTextArea 
                inputText="Endereço"
                textArea={address}
            />
            <SplitedTextAreasContainer>
                <InternalTextArea 
                    widthPercentage={45}
                    inputText="Cep"
                    textArea={cep}
                />
                <InternalTextArea 
                    widthPercentage={45}
                    inputText="Cidade"
                    textArea={city}
                />
            </SplitedTextAreasContainer>
          </InternalInputsWrapper>
          <UnsignedButtonsWrapper>
              <UnsignedButton 
                  buttonText='Salvar'
              />
              <UnsignedButton 
                  buttonText='Editar'
              />
              <UnsignedButton 
                handleClickFn={() => {
                    logout();
                    navigation.replace('login');
                }}
                buttonText='Sair'
              />
          </UnsignedButtonsWrapper>
      </Container>
    </ScrollContainer>
  )
}