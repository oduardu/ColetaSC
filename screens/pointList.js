import * as React from "react"
import { SafeAreaView,View, Animated, TouchableOpacity, Alert, StyleSheet, ScrollView, Linking, TextInput } from 'react-native' 
import { Card,
    Divider,
    Text,
    Title,
    Paragraph,
    Button,
    List,
    FAB,
    IconButton, } from 'react-native-paper'
import firebase from 'firebase'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class pointList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: null,
            empresa: false,
            pointList: [],
        };
    }
    async componentDidMount() {

        await
        this.getData();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getData();
          });
    }

   

    getData = async () => {

        const id = firebase.auth().currentUser.uid;
        const usersRef = firebase.firestore().collection('users').doc(id);
        const doc = await usersRef.get()
    
        this.setState({
         empresa: doc.data().empresa,
        })

        const db = firebase.firestore()
        const pointsRef = db.collection('collectPoints');
        const snapshot = await pointsRef.get();
        var vetorTemp = []

        if (snapshot.empty) {
        console.log('Sem documentos correspondentes');
        return;
        }
        snapshot.forEach(doc => {
            
            if(doc.data().lixoOrganico === true && doc.data().lixoEletronico == true){  
                vetorTemp.push({
                    id: doc.id,
                    nome: doc.data().nome,
                    tipoResiduo: 'Lixo Organico, Lixo Eletronico',
                    latitude: doc.data().localizacao.latitude,
                    longitude: doc.data().localizacao.longitude,
                })  
                
            }else if(doc.data().lixoEletronico === true){
                vetorTemp.push({
                    id: doc.id,
                    nome: doc.data().nome,
                    tipoResiduo: 'Lixo Eletronico',
                    latitude: doc.data().localizacao.latitude,
                    longitude: doc.data().localizacao.longitude,
                })  
            }else if(doc.data().lixoOrganico === true){
                vetorTemp.push({
                    id: doc.id,
                    nome: doc.data().nome,
                    tipoResiduo: 'Lixo Organico',
                    latitude: doc.data().localizacao.latitude,
                    longitude: doc.data().localizacao.longitude,
                })  
            }else if(doc.data().lixoOrganico === false && doc.data().lixoEletronico == false){
                vetorTemp.push({
                    id: doc.id,
                    nome: doc.data().nome,
                    tipoResiduo: 'Não declarado',
                    latitude: doc.data().localizacao.latitude,
                    longitude: doc.data().localizacao.longitude,
                })  
            }
            this.setState({ pointList: vetorTemp })
          });
          
    };
    

    filtrar = () => {
        let novoPoint = this.state.pointList.filter(
            (item) => item.nome.length > 4
        );

        this.setState({ pointList: novoPoint });
    };


    remover = (id) => {
        var pointRef = firebase.firestore().collection("collectPoints").doc(id);
        pointRef.delete().then(() => {
        }).catch((error) => {
            console.log(error);
        });
        this.getData();
    };

    pesquisar = async (text) => {
        if (text != '') {
            const newArray = this.state.pointList.filter((item) => {
                const itemDado = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
                const textDado = text.toUpperCase();
                return itemDado.indexOf(textDado) > -1;
            });
            this.setState({
                pointList: newArray,
                search: text,
            });
        } else {
            await this.getData();
            this.setState({ search: null });
        }

    }

        rightActions = (progress, dragX, vetorPoint) => {
            const scale = dragX.interpolate({
                inputRange: [-100, 0],
                outputRange: [0.7, 0]
            })

            return (
                <>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                "Remover ponto",
                                "Deseja realmente remover o ponto?",
                                [
                                    {
                                        text: "Cancelar",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                    },
                                    { text: "OK", onPress: () => this.remover(vetorPoint.id) }
                                ]
                            );
                        }
                        }
                    >
                        <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', borderRadius: 30, marginBottom: 20 }}>
                            <Animated.Text
                                style={{
                                    color: 'white',
                                    paddingHorizontal: 10,
                                    fontWeight: '600',
                                    transform: [{ scale }]
                                }}>
                                Deletar
                        </Animated.Text>
                        </View>
                    </TouchableOpacity>
                </>
            )
        }
    
    render() {

        const contaEmpresa = this.state.empresa
        let addPontoButton
        if(contaEmpresa == true){
            addPontoButton =                     <View style={styles.searchBox} >
          <Text style={{flex: 1, padding: 0}}  onPress={() => { this.props.navigation.navigate('Adicionar Ponto de Coleta') }}>
          Adicionar Ponto de Coleta
          </Text>
          <Ionicons name='add-circle-outline' size={20}  onPress={() => { this.props.navigation.navigate('Adicionar Ponto de Coleta') }} />
      </View>
        }

        return (
            <ScrollView style={styles.container}>


                <View style={{marginTop: 40}}>
                    <View style={styles.searchBox}> 
                        <TextInput 
                        placeholder="Pesquisar"
                        placeholderTextColor="#000"
                        autoCapitalize="none"
                        style={{flex:1,padding:0}}
                        onChangeText={(text) => this.pesquisar(text)}
                        />
                        <Ionicons name="ios-search" size={20} />
                    </View>
                    {addPontoButton}
                </View>

                <View>
             
                        <List.Section style={{ borderRadius: 30, width: '90%', marginLeft: '5%', marginBottom: '20%',}}>
                       
                            {this.state.pointList?.map((item, i) => (
                                <>
                                   
              
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Informacoes do Ponto de Coleta', item)}>
                                        <View style={{backgroundColor: '#FFF', marginBottom: '5%', borderRadius: 30}}>
                                        <View style={{marginLeft: '5%'}}>
                                        <Title>{item.nome},</Title> 
                                        <Title style={{fontSize: 15}}>Tipo de resíduo coletado:</Title>
                                        <Paragraph>{item.tipoResiduo}</Paragraph>
                                        <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <IconButton icon="map-marker-radius" color={"#7c7aff"} size={15} onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${item?.latitude},${item?.longitude}`)}/><Paragraph style={{color:"#7c7aff", fontSize:15 }} onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${item?.latitude},${item?.longitude}`)}> Ir para o Google Maps</Paragraph>
                                        </View>
                                        </View>
                                        <Paragraph></Paragraph>
                                        </View>
                                   </TouchableOpacity>
                                </>
                            ))}
                        {/*<Card.Content>
                    </Card>*/}
                        </List.Section>

            </View>
            </ScrollView>
        );
}

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    fab: {
        margin: 16,
        right: 0,
        bottom: 0,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#27AE60'
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

        fab: {
        position: 'absolute',
        margin: 16,
        marginBottom: 20,
        right: 0,
        bottom: 0,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#27AE60'
},
    topText: {
        fontSize: 18
    },
});