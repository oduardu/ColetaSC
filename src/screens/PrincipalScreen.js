import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function PrincipalScreen() {

    const navigation = useNavigation()

    function handleNavigateToLoginEmpresa() {
        navigation.navigate('LoginEmpresa')
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -26.8900271,
                    longitude: -52.4145824,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}  
            >
            </MapView>
        <View>
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={(handleNavigateToLoginEmpresa)}
            />
        </View>

    </View>
        
    )
}

const styles = StyleSheet.create({  
    container: {
        flex: 1,
      },

    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#27AE60'
      },

} 

)