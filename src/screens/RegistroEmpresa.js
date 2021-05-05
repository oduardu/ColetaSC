import * as React from 'react'
import { View, ScrollView, StyleSheet, Image} from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { TextInputMask } from "react-native-masked-text"
import { useNavigation } from '@react-navigation/native'
import * as firebase from 'firebase'

 var firebaseConfig = {
  apiKey: "AIzaSyA5MO-8OhIgudwgdeaIJB-YT4laoSGJotw",
  authDomain: "coleta-sc-77e99.firebaseapp.com",
  databaseURL: "https://coleta-sc-77e99-default-rtdb.firebaseio.com",
  projectId: "coleta-sc-77e99",
  storageBucket: "coleta-sc-77e99.appspot.com",
  messagingSenderId: "666493876031",
  appId: "1:666493876031:web:6eedb94524702fd699058a",
  measurementId: "G-SXN4360DY2"
}

try {
  firebase.initializeApp(firebaseConfig)
} catch(e) {
  console.log("App recarregou")
}

export default class RegistroEmpresa extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      arrayEmpresa: [],
      id: null,
      nomeEmpresa: null,
      cnpjEmpresa: null,
      emailEmpresa: null,
    }
  }
  
    salvar = () => {
      let itemId = this.state.id
      if(itemId != null) {
        
        let vetorEmpresa = [... this.state.arrayEmpresa]
        vetorEmpresa[itemId].nomeEmpresa = this.state.nomeEmpresa
        vetorEmpresa[itemId].cnpjEmpresa = this.state.cnpjEmpresa
        vetorEmpresa[itemId].emailEmpresa = this.state.emailEmpresa
        
      } else {
/*
          let objEmpresa = {
            nomeEmpresa: this.state.nomeEmpresa,
            cnpjEmpresa: this.state.cnpjEmpresa,
            emailEmpresa: this.state.emailEmpresa
          }*/
          firebase.database().ref("empresa").push({
            nomeEmpresa: this.state.nomeEmpresa,
            cnpjEmpresa: this.state.cnpjEmpresa,
            emailEmpresa: this.state.emailEmpresa
          })
          .then(() => {
            console.log('inserido!')
          })
          .catch((e) => {
            console.log(e)
          })
      }
      
      this.forceUpdate()
      }
    
  render() {
    return (
        <ScrollView>
            <View style={styles.container}>
              <Image style={styles.logo} source={require('../../assets/logo.png')}
              />
                
              <TextInput
                name="nomeEmpresa"
                placeholder={'Insira o nome da sua empresa'}
                value={this.state.nomeEmpresa}
                onChangeText={(text) => this.setState({nomeEmpresa: text})}
                style={styles.firstInput}
              >
              </TextInput>

              <TextInput 
                name="cnpjEmpresa"
                style={styles.input} 
                value={this.state.cnpjEmpresa}
                placeholder={'Insira o CNPJ da sua empresa'}
                onChangeText={(text) => this.setState({cnpjEmpresa: text})}
                keyboardType="numeric"
                render={(props) => (
                <TextInputMask
                {...props}
                type={"cnpj"}
                />)}
              /> 

              <TextInput
                name="emailEmpresa" 
                style={styles.input} 
                value={this.state.emailEmpresa}
                onChangeText={(text) => this.setState({emailEmpresa: text})}
                placeholder={'Insira o seu email'}
              >
              </TextInput>

              <TextInput 
              name="senha"
              style={styles.input} 
              placeholder={'Insira sua senha'} 
              secureTextEntry={true}>
              </TextInput>

              <Button 
                style={styles.bottomButtons} 
                color="#27AE60" 
                mode="contained"
                onPress={() => this.salvar()}
                >
                  Registrar-se
              </Button>
            </View>
          </ScrollView>
    )
    }
  }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

      logo: {
        width: 350,
        height: 150,
      },

      firstInput: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#d3e2e6',
        borderRadius: 20,
        height: 26,
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
        height: 26,
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