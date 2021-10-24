import React, { Component } from 'react';
import { TextInput, View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { FAB, HelperText } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as firebase from 'firebase'
import 'firebase/firestore'
import SearchInput from '../components/SearchInput';
import * as Location from 'expo-location'
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pointData: [],
      firstName: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      empresa: false
    }
  }

  



  async componentDidMount() {

    await this.getData();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData();
    });
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {

      this.setState({
        errorMessage: 'PERMISSION NOT GRANTED'
      })
    }

    const location = await Location.getCurrentPositionAsync();
    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
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
      })
    });
    this.setState({ pointData: vetorTemp })
    this.forceUpdate()
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
        onPress={() => { this.props.navigation.navigate('Adicionar Ponto de Coleta') }}
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