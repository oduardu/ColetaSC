import React from 'react';
import { ScrollView, SafeAreaView, KeyboardAvoidingView, StyleSheet, TextInput, Image} from 'react-native'
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function EsqueciSenha() {

    const navigation = useNavigation()

    function handleNavigateToLoginEmpresa() {
        navigation.navigate('LoginEmpresa')
    }

    return (
            <View style={styles.container}>
              <Image style={styles.logo} source={require('../../assets/logo.png')}
              />
                
              <TextInput 
                style={styles.firstInput} 
                placeholder={'Insira o nome da empresa'}
              >
              </TextInput>

              <TextInput 
                style={styles.input} 
                placeholder={'Insira o CNPJ da sua empresa'}
                keyboardType="numeric"
              >
              </TextInput>

              <TextInput 
                style={styles.input} 
                placeholder={'Insira o seu email'}
              >
              </TextInput>

              <TextInput 
              style={styles.input} 
              placeholder={'Insira sua senha'} 
              secureTextEntry={true}>
              </TextInput>

              <TextInput 
              style={styles.input} 
              placeholder={'Confirme sua senha'} 
              secureTextEntry={true}
              >
              </TextInput>

              <Button style={styles.bottomButtons} color="#27AE60" mode="contained" onPress={(handleNavigateToLoginEmpresa)}>
                Registrar-se
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

      logo: {
        width: 200,
        height: 200
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
        marginTop: 12
      },

      bottomButtons: {
        width: 170,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12
    },

    }

)