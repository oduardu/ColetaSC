import React from 'react';
import { StyleSheet, Text, TextInput, View} from 'react-native';
import { Button } from 'react-native-paper';

export default function LoginEmpresa() {
    return (
        <View style={styles.container}>
           <Text style={styles.title}>LOGO</Text>

           <Text style={styles.firstText}>CNPJ</Text>
           <TextInput 
           style={styles.firstInput} 
           placeholder={'Insira seu CNPJ'}
           >
        
           </TextInput>

           <Text>E-mail</Text>
           <TextInput style={styles.input} placeholder={'Insira seu e-mail'}></TextInput>

           <Text>Senha</Text>
           <TextInput style={styles.input} placeholder={'Insira sua senha'}></TextInput>

           <Button color="#27AE60" mode="contained" onPress={() => console.log('Pressed')}>
            Entrar
           </Button> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

      firstInput: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#d3e2e6',
        borderRadius: 20,
        height: 56,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
        width: 300,
        marginTop: 20
      },

      input: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#d3e2e6',
        borderRadius: 20,
        height: 56,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
        width: 300,
        marginTop: 15
      },

      firstText: {
        marginTop: 12
      },

      title: {
        fontSize: 20,
        marginBottom: 50
    },
}

)