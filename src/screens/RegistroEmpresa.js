import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Image} from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { TextInputMask } from "react-native-masked-text";
import { useNavigation } from '@react-navigation/native'
import Fire from "../firebase/Fire.js"

export default class RegistroEmpresa extends Component {

  constructor(props){
    super(props);
    this.state = {
        entidade: "empresa",
        id: null,
        nomeEmpresa: "",
        cnpjEmpresa: "",
        emailEmpresa: "",
        open: false,
    };
  
    this.tipoList = [
        {label: "Padrão", value: "padrao"},
        {label: "Administrador", value: "administrador"},
        {label: "Convidado", value: "convidado"},
    ];
  }

  salvar = () => {
    try {
        let label = "";
        let objItens = {
            id: this.state.id,
            nomeEmpresa: this.state.nome,
            cnpjEmpresa: this.state.cnpj,
            emailEmpresa: this.state.email
        };
  
        if (objItens.id === null) {
            Fire.save(this.state.entidade, objItens);
            label = "inserido";
        } else {
            Fire.update(this.state.entidade, objItens, objItens.id);
            label = "atualizado";
        }
  
        Alert.alert("Informação", "Registro " + label + " com sucesso!");
  
        this.props.navigation.navigate("UsuarioList");
    } catch (error) {
        console.log(error.message);
    }
  };
  render() {
    return (
        <ScrollView>
            <View style={styles.container}>
              <Image style={styles.logo} source={require('../../assets/logo.png')}
              />
                
              <TextInput
                name="nome"
                placeholder={'Insira o nome da sua empresa'}
                value={this.state.nomeEmpresa}
                onChangeText={(text) => this.setState({nomeEmpresa: text})}
                style={styles.firstInput}
              >
              </TextInput>

              <TextInput 
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
                style={styles.input} 
                value={this.state.emailEmpresa}
                onChangeText={(text) => this.setState({emailEmpresa: text})}
                placeholder={'Insira o seu email'}
              >
              </TextInput>

              <TextInput 
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
        width: 200,
        height: 200
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