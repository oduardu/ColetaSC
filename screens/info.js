import React from 'react'
import { StyleSheet, View, Text, Linking, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Divider } from 'react-native-paper'

export default function Info() {
    return (
        <ScrollView style={{backgroundColor: '#FFF'}}>
            <View style={{
                paddingBottom: '25%'
            }}>
            <View style={{
            backgroundColor: '#f2f9f2', 
            borderBottomEndRadius: 50, 
            borderBottomLeftRadius: 50,
            paddingTop: '10%',
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
            <Text style={styles.tText}>Abaixo estão algumas informações úteis quanto á:</Text>
            </View>
            <TouchableOpacity style={styles.cardInfo}
                onPress ={() => Linking.openURL(`https://www.vgresiduos.com.br/blog/tudo-que-voce-precisa-saber-sobre-servico-de-coleta-de-material/`)}
            >
                <Text style={styles.text}>
                    COLETA DE MATERIAL 
                </Text>
                <Text style={{
                    marginLeft: '5%',
                    marginRight: '5%',
                    color: '#777c',
                    
                }}>
                O serviço de coleta de material engloba desde a partida do veículo que irá transportar o 
                resíduo, compreendendo todo o percurso gasto na viagem para remoção dos resíduos dos locais 
                onde foram acondicionados aos locais de descarga (podendo ser: aterros, usinas de reciclagem, 
                de incineração, etc.), até o retorno ao ponto de partida.
                </Text>
                <Text style={styles.link}>
                Toque no card para saber mais.
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardInfo}
                onPress={() => Linking.openURL(`https://ecoassist.com.br/como-e-onde-descartar-seu-lixo-eletronico/`)}
            >
                <Text style={styles.text}>
                    LIXO ELETRÔNICO
                </Text>
                <Text style={{
                    marginLeft: '5%',
                    marginRight: '5%',
                    
                    color: '#777c',
                    
                }}>
                O lixo eletrônico ou Resíduos de Equipamentos Elétricos e Eletrônicos (REEE) são todos os 
                dispositivos eletroeletrônicos, de celulares, tablets e computadores a TVs, lavadoras de louça e 
                de roupa, geladeiras e etc., que foram descartados por seus donos.
                </Text>
                <Text style={styles.link}>
                Toque no card para saber mais.
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardInfo}
                onPress={() => Linking.openURL(`https://tecnoblog.net/309683/o-que-e-lixo-eletronico/`)}
            >
                <Text style={styles.text}>
                    DESCARTE LIXO ELETRÔNICO
                </Text>
                <Text style={{
                    marginLeft: '5%',
                    marginRight: '5%',
                    color: '#777c',
                    
                }}>
                De acordo com o Artigo 33 da Lei N° 12.305/2010 (Política Nacional dos Resíduos Sólidos, ou PNRS), o fabricante é obrigado a fazer a logística reversa dos eletroeletrônicos que comercializa. Ou seja, é responsabilidade do dono procurar o fabricante, que é obrigado a recolher e descartar de forma ecologicamente correta.
                </Text>
                <Text style={styles.link}>
                Toque no card para saber mais.
                </Text>
            </TouchableOpacity>
            

            </View>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    text:{
        marginLeft: '5%',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#777',
        textShadowColor: '#FFFFFc',
        textShadowRadius: .1,
        marginBottom: 4,
        shadowOpacity: 0.02,
        textShadowOffset: {
        height: 1.2,
        }
        
    },
    link: {
        marginLeft: '10%',
        marginRight: '5%',
        marginTop: '2%',
        color: '#BBA7D9'
    },
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
        width: '75%',
        color: '#81c97f'
    },
    cardInfo: {
        backgroundColor: '#FFF',
        width: '90%',   
        marginLeft: '5%',
        marginTop: '3.5%',
        borderRadius: 20,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
        marginBottom: 20
    }
})

