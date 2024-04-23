import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Container } from '../../components/Container/style'
import Logo from '../../components/Logo'
import { Title } from '../../components/Title/style'
import { CommandText } from '../../components/CommandText/style'
import { BasicInput, BasicInputWrapper } from '../../components/BasicInput/style'
import { UnsignedButtonsWrapper } from '../../components/UnsignedButton/style'
import UnsignedButton from '../../components/UnsignedButton'
import api, {apiUrlLocal} from '../../service/Service';

export default function RedefinePasswordScreen({ navigation, route }) {
    const { email } = route.params;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function redefinePassword() {
        if (newPassword !== confirmPassword)
            alert('A senha e sua confirmação diferem');

        await api.put(`${apiUrlLocal}/Usuario/AlterarSenha?email=${email}`, {
            senhaNova: newPassword
        })
        
        navigation.navigate('login');
    }

  return (
    <Container>
        <Logo />
        <Title>
            Redefinir senha
        </Title>
        <CommandText>
            Insira e confirme a sua nova senha.
        </CommandText>
        <BasicInputWrapper>
            <BasicInput 
                placeholder='Nova Senha'
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <BasicInput 
                placeholder='Confirmar Nova Senha'
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
        </BasicInputWrapper>
        <UnsignedButtonsWrapper>
            <UnsignedButton 
                buttonText='Confirmar nova senha'
                handleClickFn={redefinePassword}
            />
        </UnsignedButtonsWrapper>
    </Container>
  )
}