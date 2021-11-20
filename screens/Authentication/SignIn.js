import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {signIn} from '../../API/firebaseMethods';

export default function SignIn() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false)
  const onToggleSnackBar = () => setVisible(!visible)
  const onDismissSnackBar = () => setVisible(false)
  const [loading, setLoading] = useState(false)

  const [errortype, setErrortype] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
    if (!email) {
      setErrortype("Preencha o campo do e-mail.")
      onToggleSnackBar()
    }
    else if (!password) {
      setErrortype("Preencha o campo da senha.")
      onToggleSnackBar()
    }

    signIn(email, password);
    setLoading(true)
    setEmail('');
    setPassword('');
    navigation.navigate('Loading');
  };

  return (
    <View style={styles.container}>
       <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={styles.icon} source={require('../../assets/logo.png')}></Image>
        </View>
    <View>
    <View style={styles.searchBox}>
      <TextInput
        selectionColor='#bfbfbf'
        underlineColor='#27AE60'
        style={{flex:1,padding:0}}
        placeholder="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
      />
      </View>
      <View style={styles.searchBox}>
      <TextInput
        selectionColor='#bfbfbf'
        underlineColor='#27AE60'
        placeholder="Senha"
        value={password}
        style={{flex:1,padding:0}}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />
      </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={
        handlePress
        }>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign Up')} >
       <Text style={styles.buttonText}>Cadastrar-se</Text>
      </TouchableOpacity>

      <Snackbar visible={visible}
      onDismiss={onDismissSnackBar}
      duration={5000}
      action={{
        label: 'x',
        onPress: () => {
        },
      }}
      theme={{
        colors: {
            onSurface: "#f0f0ee",
            surface: "#616161",
            accent: "#27AE60",
        },
    }}>
      {errortype}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  
  button: {
    width: 200,
    borderRadius: 15,
    backgroundColor: '#27AE60',
    padding: 5,
    margin: '2%'
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },

  icon: {
    width: 400,
    height: 80,
    marginBottom: '20%'
  },

  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
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
  formInput: {
    width: 300,
    height: 30,
    fontSize:18,
    borderWidth: 1,
    borderColor:'#a4eddf',
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  inlineText: {
    color: '#3F71A9'
  }
});