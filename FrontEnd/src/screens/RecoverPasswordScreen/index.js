import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Container } from '../../components/Container/style'
import Logo from '../../components/Logo'
import { Title } from '../../components/Title/style'
import { BasicInput, BasicInputWrapper } from '../../components/BasicInput/style'
import { UnsignedButtonsWrapper } from '../../components/UnsignedButton/style'
import UnsignedButton from '../../components/UnsignedButton'
import { CommandText } from '../../components/CommandText/style'
import api, {apiUrlLocal} from '../../service/Service';

export default function RecoverPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');

    async function passToEmailCode() {
        try {
            await api.post(`${apiUrlLocal}/RecuperarSenha?email=${email}`);
    
            navigation.navigate('emailCode', { email });
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Container>
        <Logo />
        <Title>
            Recuperar senha
        </Title>
        <CommandText>
            Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha.
        </CommandText>
        <BasicInputWrapper>
            <BasicInput 
                placeholder='E-mail'
                value={email}
                onChangeText={setEmail}
            />
        </BasicInputWrapper>
        <UnsignedButtonsWrapper>
            <UnsignedButton 
                buttonText='Continuar'
                handleClickFn={passToEmailCode}
            />
        </UnsignedButtonsWrapper>
    </Container>
  )
}