import React, { useEffect, useState } from 'react'
import { Container } from '../../components/Container/style'
import Logo from '../../components/Logo'
import { Title } from '../../components/Title/style'
import { BasicInput, BasicInputWrapper } from '../../components/BasicInput/style'
import UnsignedLink from '../../components/UnsignedLink'
import UnsignedButton from '../../components/UnsignedButton'
import { UnsignedButtonsWrapper } from '../../components/UnsignedButton/style'
import AsyncStorage from'@react-native-async-storage/async-storage'
import api, {apiUrlLocal} from '../../service/Service'
import { token } from 'stylis'
import { Text, View } from 'react-native'
import { ScrollContainer1 } from '../../components/ScrollContainer/style'

export default function LoginScreen({ navigation }) {

  // martin_ferreira@gmail.com
  // carlos.roque@gmail.com
  // lucas.portal@gmail.com
  const [email, setEmail] =  useState('martin_ferreira@gmail.com')
  const [password, setPassword] =  useState('12345')

  const [errors, setErrors] = useState({});
  const [haveSomeError, setHaveSomeError] = useState(false);

  function validateForm() {
    let errors = {};

    if (!email) {
      errors.email = 'O e-mail é requirido.';
    }

    if (!password) {
      errors.password = 'A senha é requirida.';
    }

    setErrors(errors);
    setHaveSomeError(Object.keys(errors).length >= 1);
  }

  useEffect(() => {
    validateForm();
  }, [email, password])

  async function login() { 
    try {
      const response = await api.post(apiUrlLocal + '/Login', {
        email: email, 
        senha : senha 
      });


  //guardar token na asyncstorage
      await AsyncStorage.setItem('token', JSON.stringify(response.data))

      navigation.replace('Main');
    } catch (error) {
      console.log(error);
    }
  }


  function forgotPassword() {
    navigation.navigate('recoverPassword');
  }

  function createAccount() {
    navigation.navigate('createAccount');
  }

 
  return (
    <ScrollContainer1>
      <Container>
        <Logo />
        <Title>
          Entrar ou criar conta
        </Title>
        <BasicInputWrapper>
          <BasicInput 
            placeholder='e-mail'
            value={email}
            onChangeText={(txt) => setEmail(txt)}
          />
          <BasicInput
            value={password}
            placeholder= "senha"
            onChangeText={(txt) => setPassword(txt)}
            secureTextEntry
          />
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 60 }}>
            {Object.values(errors).map((error, index) => ( 
                <Text key={index} style={{ color: 'red'}}> 
                    *{error} 
                </Text> 
            ))} 
          </View>
        </BasicInputWrapper>
        <UnsignedLink 
          linkText='Esqueceu sua senha?'
          isGreyLink={true}
          handleClickFn={forgotPassword}
        />
        <UnsignedButtonsWrapper>
          <UnsignedButton
            buttonText='Entrar'
            handleClickFn={login}
          />
          {/*<UnsignedButton 
            buttonText='Entrar com o Google'
            isGoogleButton={true}
          />*/}
        </UnsignedButtonsWrapper>
        <UnsignedLink 
          additionalText='Não tem conta?'
          linkText='Crie uma conta agora!'
          handleClickFn={createAccount}
        />
      </Container>
    </ScrollContainer1>
  )
}