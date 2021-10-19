import * as React from 'react'
import { View, TextInput, StyleSheet, Text, ScrollView } from 'react-native'
import { HelperText, Button, Icon, Checkbox,  } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import { addCollectPoint } from '../API/firebaseMethods';
import * as firebase from 'firebase'
import 'firebase/firestore'
import { TouchableOpacity } from 'react-native-gesture-handler';
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
            }
        }
    }
   

    async componentDidMount() {
        this.getData()
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
                errorType: 'Você precisa preencher todos os dados para cadastrar um novo ponto de coleta!',
                visible: !this.state.visible
            })
        } else if(!this.state.lixoEletronico && !this.state.lixoOrganico) {
            this.setState({
                errorType: 'Você precisa colocar o tipo de resíduo coletado!',
                visible: !this.state.visible
            })
        } else if(!this.state.nome) {
            this.setState({
                errorType: 'Você precisa colocar o nome do ponto de coleta!',
                visible: !this.state.visible
            })
        } else if(!this.state.descricao) {
            this.setState({
                errorType: 'Você precisa colocar a descrição do ponto de coleta!',
                visible: !this.state.visible
            })
        } else if(!this.state.latitude && !this.state.longitude) {
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
                    <MapView style={styles.map} initialRegion={{
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
                    <View style={{alignItems: 'center',marginBottom: 10}}>
                    <HelperText type="error" visible={this.state.visible}
                    >
                    {this.state.errorType}
                    </HelperText>
                    </View>
                <Button style={styles.buttonSave} mode="contained" onPress={() => this.salvar()}>
                    Salvar
                </Button>
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
    buttonSave: {
        backgroundColor: "#27AE60",
        marginLeft: '5%',
        width: '90%',
        borderRadius:30
        
    }
})
