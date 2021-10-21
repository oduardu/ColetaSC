import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dashboard from './Dashboard';
import pointList from './pointList'
import Profile from './profile';
import Info from './info';

export default function Tabs() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
        initialRouteName="Dashboard"
        tabBarOptions={{
            showLabel: false,
            style: {
                position: 'absolute',
                bottom: 25,
                left: 20,
                right: 20,
                elevation: 0,
                backgroundColor: '#fff',
                borderRadius: 15,
                height: 60,
                ...styles.shadow
            }
        }}
        >
                <Tab.Screen name="Profile" component={Profile} 
                options={{
                  tabBarIcon: ({focused}) =>  (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                        source={require('../assets/profile.png')}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: focused ? '#27AE60' : '#616161'
                        }}
                        />
                        <Text
                        style={{color: focused ? '#27AE60' : '#616161', fontSize: 10}}
                        >PERFIL</Text>
                    </View>
                  )
                }}                
                />

                <Tab.Screen name="Dashboard" component={Dashboard} 
                    options={{
                  tabBarIcon: ({focused}) =>  (
                    <View style={{alignItems: 'center', justifyContent: 'center', }}>
                        <Image
                        source={require('../assets/map.png')}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? '#27AE60' : '#616161',
                        }}
                        />
                        <Text
                        style={{color: focused ? '#27AE60' : '#616161', fontSize: 10}}
                        >MAPA</Text>
                    </View>
                  )
                }}                
                />
                
                <Tab.Screen name="Settings" component={pointList}
                  options={{
                  tabBarIcon: ({focused}) =>  (
                    <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        <Image
                        source={require('../assets/list.png')}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? '#27AE60' : '#616161',
                        }}
                        />
                        <Text
                        style={{color: focused ? '#27AE60' : '#616161', fontSize: 10}}
                        >LISTA</Text>
                    </View>
                  )
                }}                
                />
                    <Tab.Screen name="Info" component={Info}
                  options={{
                  tabBarIcon: ({focused}) =>  (
                    <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        <Image
                        source={require('../assets/info.png')}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? '#27AE60' : '#616161',
                        }}
                        />
                        <Text
                        style={{color: focused ? '#27AE60' : '#616161', fontSize: 10}}
                        >INFO</Text>
                    </View>
                  )
                }}                
                />
        </Tab.Navigator>


    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowOffset: '#ffe',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.5,
        elevation: 5
    }
})