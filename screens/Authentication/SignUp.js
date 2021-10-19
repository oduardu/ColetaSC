import React, { useState } from 'react';
import { View, Text, TextInput ,StyleSheet, ScrollView} from 'react-native';
import { HelperText, Checkbox} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { registration } from '../../API/firebaseMethods';
import { FontAwesome } from '@expo/vector-icons'
import validator from 'validator'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function SignUp({ navigation }) {

  const [visible, setVisible] = useState(false)
  const onToggleSnackBar = () => setVisible(!visible)
  const onDismissSnackBar = () => setVisible(false)
  let today = new Date();
  const getdate= (today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear()).replace('-','/')
  const [errortype, setErrortype] = useState('')
  const checklock = () => setEmpresa(!empresa)
  const [empresa, setEmpresa] = useState(false)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emptyState = () => {
    setErrortype('')
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setEmpresa(false)
  };


  const handlePress = () => {
    if(!firstName && !lastName && !email && !password && !confirmPassword){
      setErrortype("Você precisa preencher os campos!")
      onToggleSnackBar()
    } else if (!firstName) {
      setErrortype("Você deixou o campo nome em branco.")
      onToggleSnackBar()
    } else if(!lastName){
      setErrortype("Você deixou o campo sobrenome em branco.")
      onToggleSnackBar()
    } else if (!email) {
      setErrortype("Você deixou o campo e-mail em branco.")
      onToggleSnackBar()
    } else if (!validator.isEmail(email)) {
      setErrortype("Email Invalido!")
      onToggleSnackBar()
    }else if (!telefone) {
      setErrortype("Você deixou o campo telefone em branco.")
      onToggleSnackBar()
    }
    else if (!password) {
      setErrortype("Você deixou o campo senha em branco.")
      onToggleSnackBar()
    } else if (!confirmPassword) {
      setPassword('');
      setErrortype("Você precisa confirmar a senha.")
      onToggleSnackBar()
    } else if (password !== confirmPassword) {
      setConfirmPassword('');
      setErrortype("As senhas não coincidem, tente novamente.")
      onToggleSnackBar()
    } else {
      registration(
        email,
        password,
        lastName,
        firstName,
        telefone,
        getdate,
        empresa
      );
      navigation.navigate('Loading');
      emptyState();
    }
  };

  const definirEmpresa = (empresa) => {
    setEmpresa(empresa)
  }
  return (
    <ScrollView style={styles.container}>
          <FontAwesome name="angle-left" size={50} color="#99a7a8" style={styles.fab}
          onPress={() => navigation.navigate('Sign In')}
          />
                <View style={{marginTop: '40%' ,alignItems: 'center',
                justifyContent: 'center',}}>
                <View style={styles._input}> 
                <Checkbox
                onPress={checklock}
                status={empresa ? 'checked' : 'unchecked'}/>
                <Text>Conta Empresarial.</Text>
                </View>
                

          <View style={styles.searchBox}> 
                        <TextInput 
                        placeholder="Nome"
                        placeholderTextColor="#000"
                        value={firstName}
                        autoCapitalize="none"
                        style={{flex:1,padding:0}}
                        onChangeText={(name) => setFirstName(name)}
                        />
                        <Ionicons name="bookmark" size={20} />
          </View>
          <View style={styles.searchBox}> 
                        <TextInput 
                        placeholder="Sobrenome"
                        placeholderTextColor="#000"
                        value={lastName}
                        autoCapitalize="none"
                        style={{flex:1,padding:0}}
                        onChangeText={(name) => setLastName(name)}
                        />
                        <Ionicons name="bookmarks" size={20} />
          </View>
          <View style={styles.searchBox}> 
                        <TextInput 
                        placeholder="Email"
                        placeholderTextColor="#000"
                        value={email}
                        autoCapitalize="none"
                        style={{flex:1,padding:0}}
                        onChangeText={(email) => setEmail(email)}
                        keyboardType="email-address"
                        secureTextEntry={true}
                        />
                        <Ionicons name="mail" size={20} />
          </View>
          <View style={styles.searchBox}> 
                        <TextInput 
                        placeholder="Telefone"
                        placeholderTextColor="#000"
                        value={telefone}
                        keyboardType="phone-pad"
                        style={{flex:1,padding:0}}
                        maxLength={11}
                        onChangeText={(telefone) => setTelefone(telefone)}
                        />
                        <Ionicons name="phone-portrait" size={20} />
          </View>
          <View style={styles.searchBox}> 
                        <TextInput 
                        placeholder="Senha"
                        placeholderTextColor="#000"
                        value={password}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        style={{flex:1,padding:0}}
                        onChangeText={(password) => setPassword(password)}
                        />
                        <Ionicons name="apps" size={20} />
          </View>
          <View style={styles.searchBox}> 
                        <TextInput 
                        placeholder="Confirmar Senha"
                        placeholderTextColor="#000"
                        value={confirmPassword}
                        autoCapitalize="none"
                        style={{flex:1,padding:0}}
                        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                        />
                        <Ionicons name="apps" size={20} />
          </View>

         
      <HelperText type="error" visible={visible}>
      {errortype}
      </HelperText>

          <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Cadastrar-se</Text>
          </TouchableOpacity>

          
     </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowOpacity: 0,
    top: '5.5%',
    margin: 16,
    left: 0,
    position: 'absolute'
  },

  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF',
  },
  _input: {
    marginTop: 10, 
    flexDirection:"row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  button: {
    width: 250,
    borderRadius: 15,
    backgroundColor: '#27AE60',
    padding: 7,
    marginTop: '25%'
  },
  searchBox: {

    flexDirection:"row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 20
  },
  buttonText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },

  inlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: '5%',
  },

  text: {
    textAlign: 'center',
    fontSize: 25,
    margin: '5%',
    marginTop:'15%',
    fontWeight: 'bold',
    color: 'black',
  },

  textInput: {
    width: 300,
    height: 30,
    fontSize:18,
    borderWidth: 1,
    borderColor:'#a4eddf',
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 5,
  },
});