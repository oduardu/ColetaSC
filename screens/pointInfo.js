import React, { Component } from 'react'
import { render } from 'react-dom'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Title } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase'
import 'firebase/firestore'

export default class pointInfo extends Component{
    constructor(props) {
        super(props)
        this.state = {
          id: '',
          nome: '',
          tipoResiduo: '',
          latitude: '',
          longitude: '',
          firstName: '',
          errorMessage: '',
          latitude: null,
          longitude: null,
        }
        }
        async componentDidMount() {
          await this.getData()
        }

        getData = async () => {

          const db = await firebase.firestore()
          const pointsRef = db.collection('collectPoints').doc(this.props.route.params.id);
          var vetorTemp = [];
      
          pointsRef.get().then((doc) => {
            
          if (pointsRef.empty) {
            console.log('Sem documentos correspondentes');
            return;
          }
          else if(doc.data().lixoOrganico === true && doc.data().lixoEletronico == true){
            this.setState({
              id: doc.id,
              nome: doc.data().nome,
              latitude: doc.data().localizacao.latitude,
              tipoResiduo: 'Lixo Organico, Lixo Eletronico',
              longitude: doc.data().localizacao.longitude,
            })
          } else if(doc.data().lixoEletronico === true){
            this.setState({
              id: doc.id,
              nome: doc.data().nome,
              latitude: doc.data().localizacao.latitude,
              tipoResiduo: 'Lixo Eletronico',
              longitude: doc.data().localizacao.longitude,
            })
          }else if(doc.data().lixoOrganico === true){
            this.setState({
              id: doc.id,
              nome: doc.data().nome,
              latitude: doc.data().localizacao.latitude,
              tipoResiduo: 'Lixo Organico',
              longitude: doc.data().localizacao.longitude,
            })
          }else if(doc.data().lixoOrganico === false && doc.data().lixoEletronico == false){
            this.setState({
              id: doc.id,
              nome: doc.data().nome,
              latitude: doc.data().localizacao.latitude,
              tipoResiduo: 'Não declarado',
              longitude: doc.data().localizacao.longitude,
            })
          } 
          this.forceUpdate()
          
        })
        }
    
    render() {
    return (
        <ScrollView style={styles.container}>
        <View style={styles.top}>
            <Ionicons style={styles.fab} name='chevron-back-outline' size={34} color='#192819' onPress={() => this.props.navigation.navigate('Dashboard')} />
        <View style={{
          alignItems: 'center'
        }}>
        <Title style={styles.title}>{this.state.nome}</Title>
        </View> 
        </View>
        <Text>Ponto de Coleta</Text>
        </ScrollView>
    )
}

}

const styles = StyleSheet.create({
    fab: {
      overflow: 'hidden',
      shadowOpacity: 0,
      marginTop: '7.5%',
      marginLeft: '2%',
      position: 'absolute'
    },
  
    container: {
      flex: 1,
      height: '100%',
      width: '100%',
      backgroundColor: '#fff',
    },

    top: {
      width: '100%',
      height: 100,
      backgroundColor: '#f2f9f2',
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50,
    },

    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: '7.5%',
      color: '#81c97f',
    },
  })
