import * as React from 'react';
import {View, Image, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Text,
  FAB,
  
} from 'react-native-paper'
import * as firebase from 'firebase'
import 'firebase/firestore'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { loggingOut } from '../API/firebaseMethods'
import { MaskedText } from 'react-native-mask-text'

export default class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    nome: '',
    sobrenome: '',
    email: '',
    data: '',
    telefone: '',
    empresa: '',
    tipoConta: ''
    }

  }

  async componentDidMount(){
    await this.getData()
  }


  logout = () => {
    loggingOut();
    this.props.navigation.replace('Sign In')
  };

  getData = async () => {
    const id = firebase.auth().currentUser.uid;
    const usersRef = firebase.firestore().collection('users').doc(id);
    const doc = await usersRef.get()

    this.setState({
      nome: doc.data().firstName, 
      sobrenome: doc.data().lastName,
      email: doc.data().email,
      data: doc.data().data,
      telefone: doc.data().telefone,
      empresa: doc.data().empresa,
    })
    if(this.state.empresa == true){
      this.setState({
        tipoConta: 'Conta de Empresa'
      })
    }else{
      this.setState({
        tipoConta: 'Conta de Usuario'
      })
    }
  }

  render() {
    return (
        <SafeAreaView style={styles.container}>
         
        <View style={{backgroundColor: '#f2f9f2', borderBottomEndRadius: 50, borderBottomLeftRadius: 50,  shadowColor: '#fff',shadowOffset: '#ffe',
      shadowOffset: {
          width: 0,
          height: 10
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.5,
      elevation: 5}}> 
        <View style={styles.userInfoSection}>
         <View style={{flexDirection: 'row', marginTop: 35}}>
           <Avatar.Image 
             source={{
               uri: 'https://img2.gratispng.com/20180623/iqh/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c40ce333.6524068515297806760528.jpg',
             }}
             size={80}
           />
           <View style={{marginLeft: 20}}>
          
             <Title style={[styles.title, {
               marginBottom: 5,
               fontSize: 20
             }]}>{this.state.nome},</Title>
             <Text style={{fontSize:15}}>{this.state.sobrenome}</Text>
           </View>
           </View>
         </View>
         </View>
         <View style={styles.userInfoSection}>
         <View style={styles.email}>

         <View style={styles.row}>
           <Icon name="email" color="#27AE60" size={25}/>
           <Text style={{color:"#777777", marginLeft: 10, fontSize: 15}}>{this.state.email}</Text >
         </View>

         <View style={styles.row}>
           <Icon name="account" color="#27AE60" size={25}/>
           <Text style={{color:"#777777", marginLeft: 10, fontSize: 15}}>{this.state.tipoConta}</Text >
         </View>
         
         <View style={styles.row}>
           <Icon name="phone" color="#27AE60" size={25}/>
           <MaskedText  mask="(+99) 999999999" style={{color:"#777777", marginLeft: 10, fontSize: 15}}>{this.state.telefone}</MaskedText>
         </View>
         <View style={{flexDirection: 'row'}}>
           <Icon name="calendar" color="#27AE60" size={25}/>
           <Text style={{color:"#777777", marginLeft: 10, fontSize: 15}}>Conta criada em:</Text>
           </View>
           <View style={styles.row,{marginLeft: '7.3%'}}>
           <Text style={{color:"#777777", marginLeft: 10, fontSize: 15}}>{(this.state.data).replace('-','/')}</Text>
           </View>
          </View>
          </View>
          
       <FAB
          style={styles.fab}
          small
          icon="logout"
          onPress={() => { this.logout()} }
      />
        </SafeAreaView>
    )}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
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

    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
      marginTop: 20,
      
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10
    },
    box: {
      flexDirection:"row",
      backgroundColor: '#fff',
      alignSelf:'center',
      borderRadius: 10,
      padding: 2,
      shadowColor: '#ccc',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 10,
      width: '95%'
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 50,
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },

    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 80,
      width: 45,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red'
  },
    email: {
      marginTop: 50
    },
  });