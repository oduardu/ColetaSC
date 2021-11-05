import React, { Component } from 'react';
import { View, StyleSheet, Dimensions , TouchableOpacity, TextInput } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as firebase from 'firebase'
import 'firebase/firestore'
import * as Location from 'expo-location'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pointData: [],
      firstName: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      empresa: false,
      search: null,
      stateLE: false,
      stateLR: false,
      stateLO: false
    }
  }

  async componentDidMount() {
    const location = await Location.getCurrentPositionAsync()
    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
    
    await this.getData();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData();
    });
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {

      this.setState({
        errorMessage: 'PERMISSÃO NÃO CONCEDIDA'
      })
    }
  }

  getData = async () => {
    const id = firebase.auth().currentUser.uid;
    const usersRef = firebase.firestore().collection('users').doc(id);
    const doc = await usersRef.get()

    this.setState({
     empresa: doc.data().empresa,
    })

    const db = await firebase.firestore()
    const pointsRef = db.collection('collectPoints');
    const snapshot = await pointsRef.get();
    var vetorTemp = [];

    if (snapshot.empty) {
      console.log('Sem documentos correspondentes');
      return;
    }
    snapshot.forEach(doc => {
      vetorTemp.push({
        id: doc.id,
        nome: doc.data().nome,
        latitude: doc.data().localizacao.latitude,
        longitude: doc.data().localizacao.longitude,
        lixoEletronico: doc.data().lixoEletronico,
        lixoReciclavel: doc.data().lixoReciclavel,
        lixoOrganico: doc.data().lixoOrganico
      })
    });
    this.setState({ pointData: vetorTemp })
    this.forceUpdate()
  }

  selectButton(botao){
    if(botao == "LE"){
      this.setState({
        stateLE: !this.state.stateLE
      })
      this.filtrar()
    } else if(botao == "LO") {
      this.setState({
        stateLO: !this.state.stateLO
      })
      this.filtrar()
    } else if(botao == "LR"){
      this.setState({
        stateLR: !this.state.stateLR
      })
      this.filtrar()
    }
  }

  filtrar(){
    const vetorTemp = []
    if(this.state.stateLR == true && this.state.stateLE == true && this.state.stateLO == true) { 
      for(let i = 0; i < this.state.pointData.length; i++){
        if(this.state.pointData[i].lixoEletronico && this.state.pointData[i].lixoOrganico && this.state.pointData[i].lixoReciclavel){
          vetorTemp.push(
            this.state.pointData[i]
          ) 
        }
      }
    } else if (this.state.stateLO == true && this.state.stateLR == false && this.state.stateLE == true) { 
      for(let i = 0; i < this.state.pointData.length; i++){
        if(this.state.pointData[i].lixoEletronico && this.state.pointData[i].lixoOrganico){
          vetorTemp.push(
            this.state.pointData[i]
          ) 
        }
      }
    } else if (this.state.stateLO == false && this.state.stateLR == true && this.state.stateLE == true) {
      for(let i = 0; i < this.state.pointData.length; i++){
        if(this.state.pointData[i].lixoEletronico && this.state.pointData[i].lixoReciclavel){
          vetorTemp.push(
            this.state.pointData[i]
          ) 
        }
      }
    } else if (this.state.stateLO == true && this.state.stateLR == true && this.state.stateLE == false) {
      for(let i = 0; i < this.state.pointData.length; i++){
        if(this.state.pointData[i].lixoReciclavel && this.state.pointData[i].lixoOrganico){
          vetorTemp.push(
            this.state.pointData[i]
          ) 
        }
      }
    } else if(this.state.stateLR == false &&  this.state.stateLE == true && this.state.stateLO == false) { 
      for(let i = 0; i < this.state.pointData.length; i++){
        if(this.state.pointData[i].lixoEletronico){
          vetorTemp.push(
            this.state.pointData[i]
          ) 
        }
      }
    } else if (this.state.stateLR == false &&  this.state.stateLE == false && this.state.stateLO == true) {
      for(let i = 0; i < this.state.pointData.length; i++){
        if(this.state.pointData[i].lixoOrganico){
          vetorTemp.push(
            this.state.pointData[i]
          ) 
        }
      }
    } else if (this.state.stateLR == true && this.state.stateLE == false && this.state.stateLO == false) {
      for(let i = 0; i < this.state.pointData.length; i++){
        if(this.state.pointData[i].lixoReciclavel){
          vetorTemp.push(
            this.state.pointData[i]
          ) 
        }
      }
    }
    else {
      this.getData();
  }
   this.setState({
     pointData: vetorTemp
   })
  }

  pesquisar = (text) => {
    if (text != '') {
        const newArray = this.state.pointData.filter((item) => {
            const itemDado = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
            const textDado = text.toUpperCase();
            return itemDado.indexOf(textDado) > -1;
        });
        this.setState({
            pointData: newArray,
            search: text,
        });
    } else {
        this.getData();
        this.setState({ search: null });
    }

}

  handlePress = () => {
    navigation.navigate('Adicionar Ponto de Coleta')
  };

  render() {
    
    const contaEmpresa = this.state.empresa
    let fabButton
    if(contaEmpresa == true){
      fabButton = <View>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => {     this.filtrar() }}//this.props.navigation.navigate('Adicionar Ponto de Coleta') }}
      />
    </View>
    }

    return (
      <View style={styles.container}>
        <MapView
        style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapViewCustom}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0,
          }}
        >
          {this.state.pointData?.map((item, i) => (
            <Marker
              key={item.id}
              title={item.nome}
              image={require('../assets/map_markerc.png')}
              style={styles._marker}
              coordinate={{ latitude: item.latitude, longitude: item.longitude }}
              onCalloutPress={() => this.props.navigation.navigate('Informacoes do Ponto de Coleta', item)}
            />
          ))}
        </MapView>
        <View style={styles.searchBox}> 
        <TextInput 
          placeholder="Pesquisar"
          autoCapitalize="none"
          keyboardType="default"
          style={{flex: 1, padding: 0}}
          onChangeText={(text) => this.pesquisar(text)}
          />
          <Ionicons name="ios-search" size={20} />
        </View>
        <View>
          <View
          style={{
            borderColor: '#ced4da',
            borderWidth: 2,
            borderRadius: 30,
            backgroundColor: 'rgb(108, 117, 125, 0.4)',
            position: 'absolute',
            bottom: 750,
            left: '5%', 
            width: '26%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <TouchableOpacity
        onPress={() => this.selectButton("LE") }
        style={{
          width: '100%',
          alignItems: 'center'
        }}>
          <Text style={{color: '#6c757d', fontSize: 12}}>Lixo Eletrônico</Text>
          </TouchableOpacity>
          </View>
          <View
          style={{
            borderColor: '#ced4da',
            borderWidth: 2,
            borderRadius: 30,
            backgroundColor: 'rgb(108, 117, 125, 0.4)',
            position: 'absolute',
            bottom: 750,
            right: '38%',
            width: '26%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
          <TouchableOpacity
                onPress={()=> {this.selectButton('LR')}}
        style={{
          width: '100%',
          alignItems: 'center'
        }}>
          <Text style={{color: '#6c757d', fontSize: 12}}>Lixo Reciclável</Text>
          </TouchableOpacity>
          </View>

          <View
          style={{
            borderColor: '#ced4da',
            borderWidth: 2,
            borderRadius: 30,
            backgroundColor: 'rgb(108, 117, 125, 0.4)',
            position: 'absolute',
            bottom: 750,
            right: '5%',
            width: '28%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
             <TouchableOpacity
                onPress={() => {this.selectButton('LO')}}
        style={{
          width: '100%',
          alignItems: 'center'
        }}>
          <Text style={{color: '#6c757d', fontSize: 12}}>Lixo Orgânico</Text>
          </TouchableOpacity>
          </View>
        </View>
            {fabButton}
        </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },

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
  searchBox: {
    position: 'absolute',
    marginTop: 40,
    flexDirection: "row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  _marker: {
    width: 30,
    height: 30,
  },
  formInput: {
    width: '70%',
    height: 30,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: '15%',
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: '#a4eddf',
    backgroundColor: '#FFFFFF',
    padding: 10,

  },
  fab: {
    position: 'absolute',
    margin: 16,
    marginBottom: 100,
    right: 1,
    bottom: 0,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#27AE60'
  }

}

)

const mapViewCustom = [
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]