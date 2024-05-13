import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Container } from '../../components/Container/style'
import Logo from '../../components/Logo'
import { Title } from '../../components/Title/style'
import { BasicInput, BasicInputWrapper } from '../../components/BasicInput/style'
import { UnsignedButtonsWrapper } from '../../components/UnsignedButton/style'
import UnsignedButton from '../../components/UnsignedButton'
import { CommandText } from '../../components/CommandText/style'
import api, {apiUrlLocal} from '../../service/Service';
import UnsignedLink from '../../components/UnsignedLink'

export default function RecoverPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');
    
    const [errors, setErrors] = useState({});
    const [haveSomeError, setHaveSomeError] = useState(false);

    async function passToEmailCode() {
        if (haveSomeError)
            return;

        try {
            await api.post(`${apiUrlLocal}/RecuperarSenha?email=${email}`);
    
            navigation.navigate('emailCode', { email });
        } catch (error) {
            console.log(error);
        }
    }

  function validateForm() {
    let errors = {};

    if (!email) {
      errors.email = 'O e-mail é requirido.';
    }

    setErrors(errors);
    setHaveSomeError(Object.keys(errors).length >= 1);
  }

    useEffect(() => {
        validateForm();
    }, [email])

  function returnToLogin() {
    navigation.navigate("login");
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
                buttonText='Continuar'
                handleClickFn={passToEmailCode}
            />
        </UnsignedButtonsWrapper>
        <UnsignedLink linkText="Cancelar" handleClickFn={returnToLogin} />
    </Container>
  )
}