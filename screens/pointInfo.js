import React, { Component } from 'react'
import { render } from 'react-dom'
import { View, Text, StyleSheet,  ScrollView, Linking, Image, Dimensions, Animated, Alert } from 'react-native'
import { Title, Avatar, Paragraph, Button } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase'
import 'firebase/firestore'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaskedText } from 'react-native-mask-text'

export default class pointInfo extends Component{
    constructor(props) {
        super(props)
        this.state = {
          id: '',
          imagem: null,
          nome: '',
          tipoResiduo: '',
          idUser: '',
          descricao: '',
          latitude: '',
          longitude: '',
          firstName: '',
          errorMessage: '',
          latitude: null,
          longitude: null,
          idCreator: '',
          email: '',
          firstName: '',
          lastName: '',
          telefone: ''
        }
        }
        async componentDidMount() {
          await this.getData()
        }

        getData = async () => {
          const id = firebase.auth().currentUser.uid;
          this.setState({
            idUser: id
          })
          const db = await firebase.firestore()
          const pointsRef = db.collection('collectPoints').doc(this.props.route.params.id);
          var vetorTemp = [];
      
          pointsRef.get().then((doc) => {
          
          const dados = doc.data()
          this.setState({
            imagem: dados.imagem == null || dados.imagem == undefined ? 'https://img2.gratispng.com/20180623/iqh/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c40ce333.6524068515297806760528.jpg' : dados.imagem 
          })


          if (pointsRef.empty) {
            console.log('Sem documentos correspondentes');
            return;
          }
          else if(doc.data().lixoOrganico === true && doc.data().lixoEletronico == true){
            this.setState({
              id: doc.id,
              nome: doc.data().nome,
              latitude: doc.data().localizacao.latitude,
              tipoResiduo: 'Lixo Orgânico, Lixo Eletrônico',
              descricao: doc.data().descricao,
              longitude: doc.data().localizacao.longitude,
              idCreator: doc.data().dadosPropretario.id,
            })
          } else if(doc.data().lixoEletronico === true){
            this.setState({
              id: doc.id,
              nome: doc.data().nome,
              latitude: doc.data().localizacao.latitude,
              tipoResiduo: 'Lixo Eletrônico',
              descricao: doc.data().descricao,
              longitude: doc.data().localizacao.longitude,
              idCreator: doc.data().dadosPropretario.id,
            })
          }else if(doc.data().lixoOrganico === true){
            this.setState({
              id: doc.id,
              nome: doc.data().nome,
              latitude: doc.data().localizacao.latitude,
              tipoResiduo: 'Lixo Orgânico',
              descricao: doc.data().descricao,
              longitude: doc.data().localizacao.longitude,
              idCreator: doc.data().dadosPropretario.id,
            })
          }else if(doc.data().lixoOrganico === false && doc.data().lixoEletronico == false){
            this.setState({
              id: doc.id,
              nome: doc.data().nome,
              latitude: doc.data().localizacao.latitude,
              tipoResiduo: 'Não declarado',
              descricao: doc.data().descricao,
              longitude: doc.data().localizacao.longitude,
              idCreator: doc.data().dadosPropretario.id,
            })
          } 
          this.forceUpdate()
        const pointRefPropretario = db.collection('users').doc(this.state.idCreator);
          pointRefPropretario.get().then((doc) => {
          if(pointRefPropretario.empty) {
            console.log('Sem documentos correspondentes');
          } else {
            this.setState({
              email: doc.data().email,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              telefone: doc.data().telefone

            })
          }

        }
        )
        })
        }

        confirmRemove = (id) => {
          Alert.alert('Confirmação:', 'Você tem certeza que deseja deletar este ponto de coleta?\n\n Obs: Ação Irreversível.',[
            {text: 'Sim', onPress: () => {var pointRef = firebase.firestore().collection("collectPoints").doc(id);
            pointRef.delete().then(() => {
            }).catch((error) => {
                console.log(error);
            })
            this.props.navigation.navigate('Dashboard')
          }},
          {text: 'Não'}
          ])
      }

        
    
    render() {
      let fabButton
      if(this.state.idUser == this.state.idCreator){
        fabButton = <View>
          <Button style={{
            backgroundColor: '#e83845',
            width: '80%',
            height: 50,
            marginTop: '5%',
            marginLeft: '10%',
            color: '#FFFFFF',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          color= {'#fff'}
          onPress={() => this.confirmRemove(this.state.id)}
          >
            Deletar Ponto
          </Button>
      </View>
      }
    return (
        <ScrollView style={styles.container}>
        <View style={styles.top}>
            <Ionicons style={styles.fab} name='chevron-back-outline' size={34} color='#192819' 
            onPress={() => this.props.navigation.goBack()} />
        <View style={{
          alignItems: 'center'
        }}>
        <Title style={styles.title}>{this.state.nome}</Title>
        </View> 
        </View>
        <View style={{flexDirection: 'row', marginTop: '5%', justifyContent: 'center'}}>
        <Image 
          source={{
          uri: this.state.imagem,
        }}
          style={{
                marginTop: 2,
                width: '60%',
                height: 250,
                borderRadius: 20,
                marginBottom: '5%',
              }
            }
        />

        </View>
        <View style={{
          margintop: '20%',
          alignItems: 'center'
        }}>
          
        <Text style={{
            color: '#27AE60',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
            Dados do Ponto de Coleta:
          </Text>
          </View>
        <View style={styles.userInfoSection}>
        <View style={styles.row}>
           <Icon name="format-list-bulleted" color="#27AE60" size={25}/>
           <Text style={{color:"#777777", marginLeft: 10, fontSize: 15}}>{this.state.descricao}</Text >
         </View>
         
         <View style={styles.row}>
           <Icon name="delete" color="#27AE60" size={25}/>
           <Text style={{color:"#777777", marginLeft: 10, fontSize: 15}}>{this.state.tipoResiduo}</Text >
         </View>

         <View style={styles.row}>
           <Icon name="map-marker" color="#27AE60" size={25}/>
           <Paragraph style={{color:"#7c7aff", fontSize:15 }} onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${item?.latitude},${item?.longitude}`)}> Ir para o Google Maps</Paragraph>
         </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={{
            alignItems: 'center'
          }}>
          <Text style={{
            color: '#27AE60',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: '5%',
          }}>
            Dados do Propretário:
          </Text>
          </View>
         <View>

         <View style={styles.row}>
           <Icon name="account" color="#27AE60" size={25}/>
           <Text style={{color:"#777777", marginLeft: 10, fontSize: 15}}>{this.state.firstName}{this.state.lastName}</Text >
         </View>
         
         <View style={styles.row}>
           <Icon name="email" color="#27AE60" size={25}/>
           <Text style={{color:"#777777", marginLeft: 10, fontSize: 15}}>{this.state.email}</Text >
         </View>

         <View style={styles.row}>
           <Icon name="phone" color="#27AE60" size={25}/>
           
           <MaskedText  mask="(+99) 999999999" style={{color:"#777777", marginLeft: 10, fontSize: 15}}>{this.state.telefone}</MaskedText>
         </View>

         {fabButton}
        </View>
        </View>
        </ScrollView>
    )
}

}
const screen = Dimensions.get('window');
const styles = StyleSheet.create({
    fab: {
      overflow: 'hidden',
      shadowOpacity: 0,
      marginTop: '12.5%',
      marginLeft: '2%',
      position: 'absolute',
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
      marginTop: 20,
      backgroundColor: '#F7FFFA',
      borderRadius: 20,
      margin: 20
    },
    container: {
      flex: 1,
      height: '100%',
      width: '100%',
      backgroundColor: '#fff',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10
    },
    top: {
      width: '100%',
      height: 100,
      backgroundColor: '#f2f9f2',
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50,
      paddingTop: '5%'
    },

    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: '7.5%',
      color: '#81c97f',
    },
  })
