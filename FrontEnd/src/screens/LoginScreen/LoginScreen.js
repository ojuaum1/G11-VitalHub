import React, { useEffect, useState } from 'react'
import { Container } from '../../components/Container/style'
import Logo from '../../components/Logo'
import { Title } from '../../components/Title/style'
import { BasicInput, BasicInputWrapper } from '../../components/BasicInput/style'
import UnsignedLink from '../../components/UnsignedLink'
import UnsignedButton from '../../components/UnsignedButton'
import { UnsignedButtonsWrapper } from '../../components/UnsignedButton/style'

import api from '../../service/Service'

export default function LoginScreen({ navigation }) {

  const [email, setEmail] =  useState('')
  const [senha, setSenha] =  useState('')


  async function login() { 
    const response = await api.post('/login', {
    email: email, 
    senha : senha 
  })
  console.log(response);
    // navigation.replace('Main');
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