import * as React from 'react'
import { View, Alert, Platform, TextInput, StyleSheet, Text, ScrollView } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { HelperText, Button, Icon, Checkbox,  } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import * as firebase from 'firebase'
import 'firebase/firestore'
import * as Location from 'expo-location'

export default class addCellectPoint extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lixoEletronico: false,
            lixoOrganico: false,
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
            imagem: null, //dados da imagem
            imagemPermissao: null, //permissao pra abrir a galeria e ver os nuds
        }
    }

    async getPermissao(){
        
        if (Platform.OS === "ios"){
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
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

    salvar = () => {

        if(!this.state.lixoEletronico && !this.state.lixoOrganico && !this.state.nome && !this.state.descricao && !this.state.latitude && !this.state.longitude) {
            this.setState({
                errorType: 'Você precisa inserir todos os dados para cadastrar um novo ponto de coleta!',
                visible: !this.state.visible
            })
        } else if(!this.state.lixoEletronico && !this.state.lixoOrganico) {
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
        } else {
        const currentUser = firebase.auth().currentUser;
        const db = firebase.firestore();
        db.collection('collectPoints').doc()
        .set({ 
          nome: this.state.nome,
          lixoEletronico: this.state.lixoEletronico,
          lixoOrganico: this.state.lixoOrganico,
          localizacao: this.state.marker,
          descricao: this.state.descricao,
          dadosPropretario: this.state.dadosPropretario,
          imagem: 'data:image/png;base64,'+this.state.imagem
        })          
          this.emptyState();
          this.props.navigation.navigate('Dashboard');
        }
        };
/*
    carrregarDados() {
        let { route } = this.props;

        if (route.params) {
            let { pontoDeColeta } = route.params;

            if (pontoDeColeta.id != null) {
                this.setState({
                    id: pontoDeColeta.id,
                    nome: pontoDeColeta.nome,
                    tipoResiduos: pontoDeColeta.tipoResiduos,
                    marker: pontoDeColeta.marker
                    
                })
                ;
            }
        }

    }
    */

    trocarOBaguiDoCheckBox = () => this.setState({ lixoEletronico: !this.state.lixoEletronico })
    trocarOBaguiDoCheckBoxDoOrganico = () => this.setState({ lixoOrganico: !this.state.lixoOrganico})

        render() { 

            return (
                <ScrollView style={styles.container}> 
            <View style={{marginTop: '25%'}}>
                <View style={styles._input}> 
                <TextInput
                placeholder="Nome do Ponto de Coleta"
                placeholderTextColor="#000"
                autoCapitalize="none"
                style={{flex:1,padding:0}}
                value={this.nome}
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

                <View style={styles._input}> 
                <Checkbox
                value={this.state.lixoEletronico}
                onPress={this.trocarOBaguiDoCheckBox}
                status={this.state.lixoEletronico ? 'checked' : 'unchecked'}/>
                <Text>Lixo Eletronico </Text>
                <Checkbox
                value={this.state.lixoOrganico}
                onPress={this.trocarOBaguiDoCheckBoxDoOrganico}
                status={this.state.lixoOrganico ? 'checked' : 'unchecked'}/>
                <Text>Lixo Organico </Text>
                </View>
                
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
                    onPress={(e) => this.setState({ marker: e.nativeEvent.coordinate })}>
                {
                    this.state.marker &&
                    <Marker coordinate={this.state.marker} />
                }
                    </MapView>
                    </View>
                    <View>
                    <Button style={styles.selectImageButton} mode="contained" onPress={() => this.escolherImagem()}>
                        Selecionar Imagem
                    </Button>
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
        width: '90%',
        height: 300,
        marginBottom: 20,
        borderRadius: 30,
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