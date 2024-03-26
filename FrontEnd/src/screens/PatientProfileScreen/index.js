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

export default function PatientProfileScreen({ navigation }) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");

    async function loadToken() {
        const token = await userDecodeToken();
        setUserName(token.name);
        setEmail(token.email);
    }

    useEffect(() => {
        loadToken();
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
                textArea="04/05/1999"
            />
            <InternalTextArea 
                inputText="CPF"
                textArea="859********"
            />
            <InternalTextArea 
                inputText="Endereço"
                textArea="Rua Vicenso Silva, 987"
            />
            <SplitedTextAreasContainer>
                <InternalTextArea 
                    widthPercentage={45}
                    inputText="Cep"
                    textArea="06548-909"
                />
                <InternalTextArea 
                    widthPercentage={45}
                    inputText="Cidade"
                    textArea="Moema-SP"
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