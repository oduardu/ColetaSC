import * as React from 'react'
import { View, Alert, Platform, TextInput, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Modal } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { HelperText, Button, Checkbox, FAB } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import * as firebase from 'firebase'
import 'firebase/firestore'
import * as Location from 'expo-location'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class addCellectPoint extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lixoEletronico: false,
            lixoOrganico: false,
            lixoReciclavel: false,
            visible: false,
            id: null,
            nome: '',
            descricao: '',
            errorType: '',
            marker: null,
            latitude: null,
            longitude: null,
            dadosPropretario: {
                nome: '',
                sobrenome: '',
                id: ''
            },
            imagem: null,
            imagemPermissao: null,
            visibleModal: false,
        }
    }

    async getPermissao(){
        
        if (Platform.OS === "ios"){
            const {status} = 
            await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if(status !== 'granted'){
                //mensagem que aparece quando o usuário não aceita as permissões de galeria
                alert('Por favor, aceite as permissões!')
            }
        }
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({imagemPermissao: status === 'granted'})
    }

    async escolherImagem() {
        this.getPermissao();
        if (this.state.imagemPermissao) {
          let resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true
          });
    
          if (!resultado.cancelled) {
            await this.setState({ imagem: resultado.base64 });
          }
        }
      }
   

    async componentDidMount() {
        this.getData()
        const location = await Location.getCurrentPositionAsync();
        this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude});
        this.getPermissao()
        this.carrregarDados()
    }

    getData = async () => {
        const id = firebase.auth().currentUser.uid;
        const usersRef = firebase.firestore().collection('users').doc(id);
        const doc = await usersRef.get()
    
        this.setState({
          dadosPropretario: {
          nome: doc.data().firstName, 
          sobrenome: doc.data().lastName,
          id: doc.id,
        }
        })
      }

    emptyState = () => {
        this.setState({
            nome: '',
            tipoResiduos: '',
            errorType: '',
            marker: { latitude: null, longitude: null }
        })
    }

    salvar = async () => {
      
        if(!this.state.lixoEletronico && !this.state.lixoOrganico && !this.state.lixoReciclavel && !this.state.nome && !this.state.descricao && !this.state.marker) {
            this.setState({
                errorType: 'Você precisa inserir todos os dados para cadastrar um novo ponto de coleta!',
                visible: !this.state.visible
            })
        } else if(!this.state.lixoEletronico && !this.state.lixoOrganico && !this.state.lixoReciclavel) {
            this.setState({
                errorType: 'Você precisa inserir o tipo de resíduo coletado!',
                visible: !this.state.visible
            })
        } else if(this.state.imagem == null || this.state.imagem == undefined){
            this.setState({
                errorType: 'Você precisa inserir a imagem do ponto!',
                visible: !this.state.visible
            })
        } else if(!this.state.nome) {
            this.setState({
                errorType: 'Você precisa inserir o nome do ponto de coleta!',
                visible: !this.state.visible
            })
        } else if(!this.state.descricao) {
            this.setState({
                errorType: 'Você precisa inserir a descrição do ponto de coleta!',
                visible: !this.state.visible
            })
        } else if(!this.state.marker) {
            this.setState({
                errorType: 'Você precisa inserir um ponto no mapa!',
                visible: !this.state.visible
        })
        } else if (this.state.id == null){

        const currentUser = firebase.auth().currentUser;
        const db = firebase.firestore();
        db.collection('collectPoints').doc()
        .set({ 
          nome: this.state.nome,
          lixoEletronico: this.state.lixoEletronico,
          lixoOrganico: this.state.lixoOrganico,
          lixoReciclavel: this.state.lixoReciclavel,
          localizacao: this.state.marker,
          descricao: this.state.descricao,
          dadosPropretario: this.state.dadosPropretario,
          imagem: this.state.imagem
        })          
          this.emptyState();
          this.props.navigation.navigate('Dashboard');
        } else {
          var pontoRef = firebase.firestore().doc("collectPoints/" + this.state.id);
          pontoRef.update({
          nome: this.state.nome,
          lixoEletronico: this.state.lixoEletronico,
          lixoOrganico: this.state.lixoOrganico,
          lixoReciclavel: this.state.lixoReciclavel,
          localizacao: this.state.marker,
          descricao: this.state.descricao,
          imagem: this.state.imagem
          })
          this.emptyState();
          this.props.navigation.navigate('Dashboard');
        }
        
      }

      handleVisible = (visible) => {
        this.setState({
          visibleModal: visible
        })
      }

    carrregarDados = () => {
        let { route } = this.props;
        if (route.params != null) {
            if (route.params.id != null) {
                this.setState({
                    id: route.params.id,
                    nome: route.params.nome,
                    imagem: route.params.imagem,
                    descricao: route.params.descricao,
                    lixoEletronico: route.params.lixoEletronico,
                    lixoOrganico: route.params.lixoOrganico,
                    lixoReciclavel: route.params.lixoReciclavel,
                    marker: route.params.marker
                });
            }
        }
    }

    checkBoxEletronico = () => this.setState({ lixoEletronico: !this.state.lixoEletronico })
    checkBoxOrganico = () => this.setState({ lixoOrganico: !this.state.lixoOrganico})
    checkBoxReciclavel = () => this.setState({ lixoReciclavel: !this.state.lixoReciclavel })

        render() { 

            return (
            <ScrollView style={styles.container}> 
            <Modal
        style={styles.centeredView}
        animationType = {"fade"}  
        transparent={true}
        visible={this.state.visibleModal} 
        >
          <View style={styles.itemAlign}>
                    <MapView style={styles.map}
                    customMapStyle={mapViewCustom}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0,
                    }}
                    showsUserLocation={true}
                    onPress={(e) => this.setState({ marker: e.nativeEvent.coordinate
                     })
                    
                    }>
                {
                  
                    this.state.marker &&
                    <Marker coordinate={this.state.marker} 
                    image={require('../assets/map_markerc.png')}
                    />
                }
                    </MapView>
                    <Button style={styles.mapConfirmButton} mode="contained" onPress={() => this.handleVisible(!this.state.visibleModal)}>
                    {this.state.marker == null ? "Voltar" : "Confirmar"}
                </Button>
                    </View>
        </Modal>
            <View style={{marginTop: '10%'}}>
              
                <TouchableOpacity style={{
                alignItems: 'center',
              }}
              onPress={() => this.escolherImagem()}
              >
            <Image 
          source={{
          uri: this.state.imagem == null || this.state.imagem == undefined ? 'https://cdn-icons-png.flaticon.com/512/2983/2983067.png' : 'data:image/png;base64,'+this.state.imagem
        }}
          style={{
                marginTop: 2,
                width: 200,
                height: 200,
                borderRadius: 100,
                marginBottom: '2%',
                opacity: 0.8,
              }
            }
        />
        <Ionicons style={styles.fabFolder} name='folder-open' size={60} color='#343a40' 
             />
          </TouchableOpacity>
                <View style={styles._input}> 
                <TextInput
                placeholder="Nome do Ponto de Coleta"
                placeholderTextColor="#000"
                autoCapitalize="none"
                style={{flex:1,padding:0}}
                value={this.state.nome}
                onChangeText={(text) => this.setState({ nome: text })}
                />
                </View>
                <View style={styles._input}> 
                <TextInput
                placeholder="Descrição"
                placeholderTextColor="#000"
                autoCapitalize="none"
                
                style={{flex:1, marginBottom:20}}
                value={this.state.descricao}
                onChangeText={(text) => this.setState({ descricao: text })}
                />
                </View>
                <TouchableOpacity onPress={() => this.handleVisible(!this.state.visibleModal)}>
                  <Image 
                  source= {{
                    uri: 'https://subli.info/wp-content/uploads/2015/05/google-maps-blur.png'
                  }}
                  style={{
                    marginTop: 2,
                    width: '90%',
                    height: 200,
                    marginLeft: '5%',
                    opacity: 1,
                    borderRadius: 20,
                  }}
                  />
                
                </TouchableOpacity>
                <View style={{marginTop: 10, 
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
        }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                value={this.state.lixoEletronico}
                onPress={this.checkBoxEletronico}
                status={this.state.lixoEletronico ? 'checked' : 'unchecked'}/>
                <Text>Lixo Eletrônico </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                value={this.state.lixoOrganico}
                onPress={this.checkBoxOrganico}
                status={this.state.lixoOrganico ? 'checked' : 'unchecked'}/>
                <Text>Lixo Orgânico </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                value={this.state.lixoReciclavel}
                onPress={this.checkBoxReciclavel}
                status={this.state.lixoReciclavel ? 'checked' : 'unchecked'}/>
                
                <Text>Lixo Reciclável </Text>
                </View>
                </View>
                <Button style={styles.saveButton} mode="contained" onPress={() => this.salvar()}>
                    Salvar
                </Button>
                <View style={{alignItems: 'center', marginBottom: 10}}>
                    <HelperText type="error" visible={this.state.visible}
                    >
                    {this.state.errorType}
                    </HelperText>
                    </View>
            </View>
            </ScrollView>
            )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        width: '100%'
    },
    buttonBack: {
        position: 'absolute',
        margin: 16,
        marginBottom: 100,
        right: 1,
        bottom: 0,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalButton: {
      position: 'absolute',
      left: 1,
      bottom: 1,
      width: 45,
    },
    modal: {  
      justifyContent: 'center',  
      alignItems: 'center',   
      backgroundColor : "#FFF",   
      height: 200,  
      width: '90%',  
      borderRadius: 20,  
      marginTop: '80%',  
      marginLeft: '5%',  
       
       },  
    row: {
      flexDirection: 'row',
      marginBottom: 10
    },
    fab: {
      overflow: 'hidden',
      shadowOpacity: 0,
      marginTop: '32.5%',
      right: '30%',
      position: 'absolute',
    },
    fabFolder: {
      overflow: 'hidden',
      shadowOpacity: 0,
      marginTop: '32.5%',
      right: '30%',
      position: 'absolute',
      opacity: 0.8,
    },
    inputText: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#f0f0ee',
        borderRadius: 20,
        height: 26,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
        width: 750,
      },
    
    topText: {
        fontSize: 22,
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

    map: {
        width: '100%',
        height: '100%',
    },
    itemAlign: {
        alignItems: "center", 
        overflow: 'hidden' 
    },
    selectImageButton: {
        backgroundColor: "#27AE60",
        marginLeft: '5%',
        width: '90%',
        borderRadius:30
    },
    saveButton: {
      backgroundColor: "#27AE60",
      marginLeft: '5%',
      width: '90%',
      borderRadius:30,
      marginTop: 10
    },
    mapConfirmButton: {
      backgroundColor: "#27AE60",
      marginLeft: '15%',
      width: '60%',
      borderRadius:30,
      marginTop: 10,
      position: 'absolute',
      bottom: '10%'
    }
})

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