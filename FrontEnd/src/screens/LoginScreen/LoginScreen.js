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

export default function LoginScreen({ navigation }) {

  // martin_ferreira@gmail.com
  // carlos.roque@gmail.com
  // lucas.portal@gmail.com
  const [email, setEmail] =  useState('joao.oliv@gmail.com')
  const [senha, setSenha] =  useState('12345')


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
          value={senha}
          placeholder= "senha"
          onChangeText={(txt) => setSenha(txt)}
          secureTextEntry
        />
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
        <UnsignedButton 
          buttonText='Entrar com o Google'
          isGoogleButton={true}
        />
      </UnsignedButtonsWrapper>
      <UnsignedLink 
        additionalText='Não tem conta?'
        linkText='Crie uma conta agora!'
        handleClickFn={createAccount}
      />
    </Container>
  )
}