import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function Info() {
    return (
        <ScrollView style={{backgroundColor: '#FFF'}}>

            <View style={{
            backgroundColor: '#f2f9f2', 
            borderBottomEndRadius: 50, 
            borderBottomLeftRadius: 50,
            paddingTop: 20,
            paddingBottom: 20,  
            shadowColor: '#fff',
            shadowOffset: '#ffe',
            marginBottom: 10,
            alignItems: 'center',
            shadowOffset: {
                width: 0,
                height: 100
            },
            shadowOpacity: 0.5,
            shadowRadius: 3.5,
            elevation: 5
    }}>
            <Text style={styles.tText}>Algumas dicas e informações sobre coleta de residuos.</Text>
            </View>
            <View style={styles.cardInfo}>
                <Text style={{
                    marginLeft: '5%',
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: '#FFF',
                    textShadowColor: '#FFFFFc',
                    textShadowRadius: .1,
                    shadowOpacity: 0.02,
                    textShadowOffset: {
                        height: 1.2,
                    }
                    
                    }}>
                    Teste
                </Text>
            </View>
        </ScrollView>
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
    },
    tText: {
        fontSize: 30,
        fontWeight: 'bold',
        width: '75%'
    },
    cardInfo: {
        backgroundColor: '#095',
        width: '80%',
        height: 100,
        marginLeft: '10%',
        marginTop: '20%',
        borderRadius: 20,
    }
})

