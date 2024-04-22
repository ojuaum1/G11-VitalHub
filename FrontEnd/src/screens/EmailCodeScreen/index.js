import React, { useState } from 'react';
import { Container } from '../../components/Container/style';
import Logo from '../../components/Logo';
import { Title } from '../../components/Title/style';
import { CommandText, CommandTextHighlight } from '../../components/CommandText/style';
import { UnsignedButtonsWrapper } from '../../components/UnsignedButton/style';
import UnsignedButton from '../../components/UnsignedButton';
import UnsignedLink from '../../components/UnsignedLink';
import CodeInput from '../../components/CodeInput';
import api, { apiUrlLocal } from '../../service/Service';

export default function EmailCodeScreen({ navigation, route }) {
    const { email } = route.params;
    const [code, setCode] = useState('');

    async function passToRedefinePassword() {
        try {
            const url = `${apiUrlLocal}/RecuperarSenha/ValidateRecoveryCode?email=${email}&code=${code}`;

            await api.post(url)
    
            navigation.navigate('redefinePassword', { email });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <Logo />
            <Title>
                Verifique seu e-mail
            </Title>
            <CommandText>
                Digite o código de 4 dígitos enviado para 
                <CommandTextHighlight> {email}</CommandTextHighlight>
            </CommandText>
            <CodeInput 
                code={code}
                setCode={setCode}
            />
            <UnsignedButtonsWrapper>
                <UnsignedButton 
                    buttonText='Entrar'
                    handleClickFn={passToRedefinePassword}
                />
            </UnsignedButtonsWrapper>
            <UnsignedLink 
                linkText='Reenviar Código'
            />
        </Container>
    )
}