import React, { useState } from "react";
import { Container } from "../../components/Container/style";
import Logo from "../../components/Logo";
import { Title } from "../../components/Title/style";
import { CommandText } from "../../components/CommandText/style";
import {
  BasicInput,
  BasicInputWrapper,
} from "../../components/BasicInput/style";
import UnsignedButton from "../../components/UnsignedButton";
import { ButtonText, UnsignedButtonsWrapper } from "../../components/UnsignedButton/style";
import UnsignedLink from "../../components/UnsignedLink";
import { ActivityIndicator } from "react-native";
import { Icon } from "@rneui/themed";
import { CreateUser } from "../../service/userService";
// import { createUser } from "../../services/userService"; // Importe a função para criar usuário

export default function CreateAccountScreen({ navigation }) {
  const [loading, setLoading] = useState(false); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 

  function handleAddUser() {
    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
    
    setLoading(true);


    CreateUser(email, password)
      .then(() => {
        navigation.navigate("login");
      })
      .catch((error) => {
        alert("Erro ao criar usuário: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function returnToLogin() {
    navigation.navigate("login");
  }

  return (
    <Container>
      <Logo />
      <Title>Criar conta</Title>
      <CommandText>
        Insira seu endereço de e-mail e senha para realizar seu cadastro.
      </CommandText>
      <BasicInputWrapper>
        <BasicInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <BasicInput
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <BasicInput
          placeholder="Confirmar Senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </BasicInputWrapper>

      <UnsignedButtonsWrapper>
        <UnsignedButton 
        buttonText='Cadastrar'
        isLoading={loading}
        handleClickFn={handleAddUser}
        />
    
      </UnsignedButtonsWrapper>
      
      <UnsignedLink linkText="Cancelar" handleClickFn={returnToLogin} />
    </Container>
  );
}
