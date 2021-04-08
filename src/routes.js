import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator()

import PrincipalScreen from './screens/PrincipalScreen'
import LoginEmpresa from './screens/LoginEmpresa'
import RegistroEmpresa from './screens/RegistroEmpresa'
import EsqueciSenha from './screens/EsqueciSenha'

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator 
            screenOptions={{ headerShown: false, cardStyle: {backgroundColor: '#f2f3f5'} }}>
                <Screen 
                  name="PrincipalScreen" 
                  component={PrincipalScreen}
                />
                <Screen 
                  name="LoginEmpresa" 
                  component={LoginEmpresa}
                />
                <Screen 
                  name="RegistroEmpresa" 
                  component={RegistroEmpresa}
                />
                <Screen 
                  name="EsqueciSenha" 
                  component={EsqueciSenha}
                />
            </Navigator>
        </NavigationContainer>
    )

}





