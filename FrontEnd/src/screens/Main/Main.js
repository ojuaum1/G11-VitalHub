import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Host } from 'react-native-portalize';
import { PatientCancelNotify } from '../../../utils/notifications';
import { userDecodeToken } from '../../utils/Auth';
import DoctorConsultScreen from '../DoctorConsultScreen';
import PatientConsultScreen from '../PatientConsultScreen';
import PatientProfileScreen from '../PatientProfileScreen';
import { ContentIcon, TextIcon } from './style';

const BottomTab = createBottomTabNavigator();

export const Main = ({ navigation, route }) => {
    const [userType, setUserType] = useState('patient');
    const routeParms = route.params

    const getUserType = async () => { 
        const SaveToken = await userDecodeToken();

        if (SaveToken) { 
            setUserType(SaveToken.role); 
        } else {
            setUserType('Paciente');
        }
    }

    useEffect(() => {
        getUserType();
    }, []);

    return (
        <Host>
            <BottomTab.Navigator
                initialRouteName={routeParms != undefined ? routeParms.screen : "Home"}

                screenOptions={({ route }) => ({
                    tabBarStyle: { backgroundColor: '#fff', height: 80, paddingTop: 10 },
                    tabBarActiveBackgroundColor: 'transparent',
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        const getBackgroundColor = () => focused ? '#ECF2FF' : 'transparent';

                        if (route.name === "Home") {
                            return (
                                <ContentIcon
                                    tabBarActiveBackgroundColor={getBackgroundColor()}
                                >
                                    <FontAwesome name='calendar' size={18} color='#4E4B59' />
                                    {focused && <TextIcon>Agenda</TextIcon>}
                                </ContentIcon>
                            )
                        } else {
                            return (
                                <ContentIcon
                                    tabBarActiveBackgroundColor={getBackgroundColor()}
                                >
                                    <FontAwesome5 name='user-circle' size={18} color='#4E4B59' />
                                    {focused && <TextIcon>Perfil</TextIcon>}
                                </ContentIcon>
                            )
                        }
                    }
                })}
            >
                <BottomTab.Screen
                    name='Home'
                    component={userType === 'Paciente' ? PatientConsultScreen : DoctorConsultScreen}
                />
                <BottomTab.Screen
                    name='PatientProfile'
                    initialParams={{ newPhotoUri: '' }}
                >
                    { (props) => <PatientProfileScreen navigation={navigation} route={route} />}
                </BottomTab.Screen>
            </BottomTab.Navigator>
        </Host>
    );
}
