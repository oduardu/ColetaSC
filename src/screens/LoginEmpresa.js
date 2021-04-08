import React from 'react';
import { StyleSheet, Text, TextInput, View, Image} from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function LoginEmpresa() {

  const navigation = useNavigation()

  function handleNavigateToEsqueciSenha() {
    navigation.navigate('EsqueciSenha')
  }

  function handleNavigateToRegistroEmpresa() {
    navigation.navigate('RegistroEmpresa')
  }

    return (
        <View style={styles.container}>
           <Image style={styles.logo} source={require('../../assets/logo.png')}
           />

           <Text style={styles.firstText}>CNPJ</Text>
           <TextInput 
           style={styles.firstInput} 
           placeholder={'Insira seu CNPJ'}
           keyboardType="numeric"
           >
        
           </TextInput>

           <Text>E-mail</Text>
           <TextInput 
           style={styles.input} 
           placeholder={'Insira seu e-mail'}
           >
           </TextInput>

           <Text>Senha</Text>
           <TextInput 
           style={styles.input} 
           placeholder={'Insira sua senha'} 
           secureTextEntry={true}>
           </TextInput>

           <View style={styles.forgetPassword}>
           <Button color="#fff" mode="contained" onPress={(handleNavigateToEsqueciSenha)}>
              Esqueci minha senha
            </Button>

            <View style={styles.bottomButtons}>
            <Button color="#27AE60" mode="contained" onPress={() => console.log('Pressed')}>
              Entrar
            </Button>

            <Button style={styles.register} color="#27AE60" mode="contained" onPress={(handleNavigateToRegistroEmpresa)}>
              Registrar
            </Button>

            </View>

           </View>

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
        width: 300,
        height: 300
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

      forgetPassword: {
        flexDirection: 'column',
        width: 240
    },

      bottomButtons: {
        width: 170,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12
    },

      register: {
        marginLeft: 12
      }
}

)