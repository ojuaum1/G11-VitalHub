import React, { useEffect, useState } from 'react';
import { Header, NameText, UserContainer, UserImage, UserInfoContainer, WelcomeText } from './style';
import { Ionicons } from '@expo/vector-icons';

import { userDecodeToken } from '../../utils/Auth';
import { ActivityIndicator, View } from 'react-native';

export default function HomeHeader({ userImageUri, navigation}) {
    const [userName, setUserName] = useState("");

    async function profileLoad() {
        const token = await userDecodeToken();
        setUserName(token.name);
    }

    useEffect(()=>{
        profileLoad()
    }, [])
  return (
    <Header
        colors={['#60BFC5', '#496BBA']}
        start={{x: -0.05, y: 1.08}}
        end={{x: 1, y: 0}}
    >
        <UserContainer onPress={() => navigation.navigate('PatientProfile')}>
            { userImageUri ? (
                <UserImage 
                    source={{ uri: userImageUri }}
                />
            ) : (
                <View style={{ height: 60, width: 60, borderRadius: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            ) }
            <UserInfoContainer>
                <WelcomeText>Bem vindo</WelcomeText>
                <NameText>{ userName }</NameText>
            </UserInfoContainer>
        </UserContainer>
        { /*<Ionicons name="notifications" size={28} color="#fff" />*/ }
    </Header>
  )
}