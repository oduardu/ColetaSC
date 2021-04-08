import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

export default function EsqueciSenha() {
    return (
        <View styles={styles.container}>
            <Text>Esqueci minha senha</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      },

    }

)   