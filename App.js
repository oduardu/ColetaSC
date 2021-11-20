import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View,Image,StyleSheet, TouchableOpacity,Text,NetInfo,StackNavigator,ImageBackground } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { LogBox } from 'react-native';
import apiKeys from './config/keys';

import SignUp from './screens/Authentication/SignUp'
import SignIn from './screens/Authentication/SignIn'
import LoadingScreen from './screens/Authentication/LoadingScreen'
import Dashboard from './screens/Dashboard'
import Info from './screens/info'
import User from './screens/Authentication/User'
import Profile from './screens/profile'
import Tabs from './Tabs'
import addCellectPoint from './screens/addCollectPoint'
import pointList from './screens/pointList'
import pointInfo from './screens/pointInfo'


const Stack = createStackNavigator()

export default function App() {
  if (!firebase.apps.length) {
    console.log('Conectado com o Firebase...')
    firebase.initializeApp(apiKeys.firebaseConfig);
    LogBox.ignoreAllLogs();
    console.disableYellowBox = true;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'Loading'} component={LoadingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name={'Sign In'} component={SignIn} options={{ headerShown: false }}/>
        <Stack.Screen name={'Sign Up'} component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name={'Adicionar Ponto de Coleta'} component={addCellectPoint} options={{ headerShown: false }}/>
        <Stack.Screen name={'Listagem Pontos de Coleta'} component={pointList} options={{ headerShown: false }} />
        <Stack.Screen name={'User'} component={User} options={{ headerShown: false }} />
        <Stack.Screen name={'Tabs'} component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name={'Informacoes do Ponto de Coleta'} component={pointInfo} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
