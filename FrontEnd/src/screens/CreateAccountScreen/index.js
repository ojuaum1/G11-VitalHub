import React, { useEffect, useState } from "react";
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
import { ActivityIndicator, Text, View } from "react-native";
import { Icon } from "@rneui/themed";
import { CreateUser } from "../../service/userService";
import { ScrollContainer1 } from '../../components/ScrollContainer/style'
// import { createUser } from "../../services/userService"; // Importe a função para criar usuário

export default function CreateAccountScreen({ navigation }) {
  const [loading, setLoading] = useState(false); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 

  const [errors, setErrors] = useState({});
  const [haveSomeError, setHaveSomeError] = useState(false);

  function handleAddUser() {
    // Verificar se as senhas coincidem
    if (haveSomeError) {
      return;
    }
    
    setLoading(true);

    CreateUser(name, email, password)
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

  function validateForm() {
    let errors = {};

    if (!name) {
      errors.name = 'O nome é requirido.';
    }

    if (!email) {
      errors.email = 'O e-mail é requirido.';
    }

    if (!password) {
      errors.password = 'A senha é requirida.';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'A confirmação da senha é requerida';
    }

    if (password !== confirmPassword) {
      errors.password = 'As senhas devem coincidir';
    }

    setErrors(errors);
    setHaveSomeError(Object.keys(errors).length >= 1);
  }

  useEffect(() => {
    validateForm();
  }, [name, email, password, confirmPassword])

  function returnToLogin() {
    navigation.navigate("login");
  }

  return (
    <ScrollContainer1>
      <Container>
        <Logo />
        <Title>Criar conta</Title>
        <CommandText>
          Insira seu endereço de e-mail e senha para realizar seu cadastro.
        </CommandText>
        <BasicInputWrapper>
          <BasicInput
            placeholder="Nome:"
            value={name}
            onChangeText={setName}
          />
          <BasicInput
            placeholder="E-mail:"
            value={email}
            onChangeText={setEmail}
          />
          <BasicInput
            placeholder="Senha:"
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
            buttonText='Cadastrar'
            isLoading={loading}
            handleClickFn={handleAddUser}
          />
      
        </UnsignedButtonsWrapper>
        
        <UnsignedLink linkText="Cancelar" handleClickFn={returnToLogin} />
      </Container>
    </ScrollContainer1>
  );
}
