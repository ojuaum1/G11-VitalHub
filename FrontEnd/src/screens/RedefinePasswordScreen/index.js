import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
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

    const [errors, setErrors] = useState({});
    const [haveSomeError, setHaveSomeError] = useState(false);

  function validateForm() {
    let errors = {};

    if (!newPassword) {
      errors.password = 'A senha é requirida.';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'A confirmação da senha é requerida';
    }

    if (newPassword !== confirmPassword) {
      errors.password = 'As senhas devem coincidir';
    }

    setErrors(errors);
    setHaveSomeError(Object.keys(errors).length >= 1);
  }

  useEffect(() => {
    validateForm();
  }, [newPassword, confirmPassword])


    async function redefinePassword() {
        if (haveSomeError)
            return;

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
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 60 }}>
            {Object.values(errors).map((error, index) => ( 
                <Text key={index} style={{ color: 'red'}}> 
                    *{error} 
                </Text> 
            ))} 
          </View>
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