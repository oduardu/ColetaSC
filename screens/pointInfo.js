import React, { Component } from 'react'
import { View, Text, StyleSheet, Modal, ScrollView, Linking, Image, Dimensions, Alert } from 'react-native'
import { Title, Paragraph, Button } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase'
import 'firebase/firestore'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaskedText } from 'react-native-mask-text'
import StarRating from 'react-native-star-rating';

export default class pointInfo extends Component {
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
      telefone: '',
      lixoEletronico: '',
      lixoOrganico: '',
      lixoReciclavel: '',
      starCount: 0,
      visible: false,
      meAvaliacoes: 0,
    }
  }
  async componentDidMount() {
    await this.getData()
    this.calcRating()
  }

  getData = async () => {
    const id = await firebase.auth().currentUser.uid;
    this.setState({
      idUser: id
    })
    const db = await firebase.firestore()
    const pointsRef = db.collection('collectPoints').doc(this.props.route.params.id);

    pointsRef.get().then((doc) => {
      const dados = doc.data()
      this.setState({
        imagem: dados.imagem == null || dados.imagem == undefined ? 'https://img2.gratispng.com/20180623/iqh/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c40ce333.6524068515297806760528.jpg' : dados.imagem
      })

      if (pointsRef.empty) {
        console.log('Sem documentos correspondentes');
        return;
      }
      else if (doc.data().lixoOrganico === true && doc.data().lixoEletronico === true && doc.data().lixoReciclavel === true) {
        this.setState({
          id: doc.id,
          nome: doc.data().nome,
          lixoEletronico: doc.data().lixoEletronico,
          lixoOrganico: doc.data().lixoOrganico,
          lixoReciclavel: doc.data().lixoReciclavel,
          tipoResiduo: 'Lixo Orgânico, Lixo Reciclável e Lixo Eletrônico',
          descricao: doc.data().descricao,
          latitude: doc.data().localizacao.latitude,
          longitude: doc.data().localizacao.longitude,
          idCreator: doc.data().dadosPropretario.id,
        })
      } else if (doc.data().lixoEletronico === true) {
        this.setState({
          id: doc.id,
          nome: doc.data().nome,
          lixoEletronico: doc.data().lixoEletronico,
          lixoOrganico: doc.data().lixoOrganico,
          lixoReciclavel: doc.data().lixoReciclavel,
          tipoResiduo: 'Lixo Eletrônico',
          descricao: doc.data().descricao,
          latitude: doc.data().localizacao.latitude,
          longitude: doc.data().localizacao.longitude,
          idCreator: doc.data().dadosPropretario.id,
        })
      } else if (doc.data().lixoOrganico === true) {
        this.setState({
          id: doc.id,
          nome: doc.data().nome,
          lixoEletronico: doc.data().lixoEletronico,
          lixoOrganico: doc.data().lixoOrganico,
          lixoReciclavel: doc.data().lixoReciclavel,
          tipoResiduo: 'Lixo Orgânico',
          descricao: doc.data().descricao,
          latitude: doc.data().localizacao.latitude,
          longitude: doc.data().localizacao.longitude,
          idCreator: doc.data().dadosPropretario.id,
        })
      } else if (doc.data().lixoOrganico === false && doc.data().lixoEletronico === false && doc.data().lixoReciclavel === false) {
        this.setState({
          id: doc.id,
          nome: doc.data().nome,
          lixoEletronico: doc.data().lixoEletronico,
          lixoOrganico: doc.data().lixoOrganico,
          lixoReciclavel: doc.data().lixoReciclavel,
          tipoResiduo: 'Não declarado',
          descricao: doc.data().descricao,
          latitude: doc.data().localizacao.latitude,
          longitude: doc.data().localizacao.longitude,
          idCreator: doc.data().dadosPropretario.id,
        })
      } else if (doc.data().lixoReciclavel === true) {
        this.setState({
          id: doc.id,
          nome: doc.data().nome,
          latitude: doc.data().localizacao.latitude,
          lixoEletronico: doc.data().lixoEletronico,
          lixoOrganico: doc.data().lixoOrganico,
          lixoReciclavel: doc.data().lixoReciclavel,
          tipoResiduo: 'Lixo Reciclável',
          descricao: doc.data().descricao,
          longitude: doc.data().localizacao.longitude,
          idCreator: doc.data().dadosPropretario.id,
        })
      }
      this.forceUpdate()
      const pointRefPropretario = db.collection('users').doc(this.state.idCreator);
      pointRefPropretario.get().then((doc) => {
        if (pointRefPropretario.empty) {
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
    Alert.alert('Confirmação:', 'Você tem certeza que deseja deletar este ponto de coleta?\n\n Obs: Ação Irreversível.', [
      {
        text: 'Sim', onPress: () => {
          var pointRef = firebase.firestore().collection("collectPoints").doc(id);
          pointRef.delete().then(() => {
          }).catch((error) => {
            console.log(error);
          })
          this.props.navigation.navigate('Dashboard')
        }
      },
      { text: 'Não' }
    ])
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  confiarmarAv = () => {
    const db = firebase.firestore()
    const pointsRef = db.collection('collectPoints').doc(this.props.route.params.id);
    pointsRef.collection('avaliacoes').doc(this.state.idUser).set({
      rating: this.state.meAvaliacoes,
    })
    this.setState({
      visible: !this.state.visible
    })
    this.calcRating()
  }

  onStarRatingPressMeAv(rating) {
    this.setState({
      meAvaliacoes: rating,
    });
  }

  handleVisible = (visible) => {
    this.setState({
      visible: visible
    })
  }

  calcRating = async () => {
    const db = firebase.firestore()
    db.collection('collectPoints').doc(this.props.route.params.id)
    const pointsRef = db.collection('collectPoints').doc(this.props.route.params.id);
    const snapshot = await pointsRef.collection('avaliacoes').get()
    var vetorTemp = [];
    if (snapshot.empty) {
      return;
    }
    snapshot.forEach(doc => {
      vetorTemp.push({
        id: doc.id,
        rating: doc.data().rating,
        comentario: doc.data().comentario,
      })
    })
    var varRating = 0
    var i = 0
    for (var x = 0; x < vetorTemp.length; x++) {
      varRating = varRating + vetorTemp[x].rating
    }
    varRating = Math.round(varRating * 100) / 100
    varRating = varRating / vetorTemp.length
    this.setState({
      starCount: varRating
    })
  }

  render() {
    let fabButton
    let vetorPointEdit = {
      nome: this.state.nome,
      descricao: this.state.descricao,
      lixoOrganico: this.state.lixoOrganico,
      lixoEletronico: this.state.lixoEletronico,
      imagem: this.state.imagem,
      marker: {
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }
    }

    if (this.state.idUser == this.state.idCreator) {

      fabButton = <View>
        <Button style={{
          backgroundColor: '#e9c46a',
          width: '80%',
          height: 50,
          marginTop: '2%',
          marginLeft: '10%',
          color: '#FFFFFF',
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center'
        }}
          color={'#fff'}
          onPress={() => this.props.navigation.navigate('Adicionar Ponto de Coleta', {
            id: this.state.id,
            nome: this.state.nome,
            descricao: this.state.descricao,
            lixoOrganico: this.state.lixoOrganico,
            lixoEletronico: this.state.lixoEletronico,
            lixoReciclavel: this.state.lixoReciclavel,
            imagem: this.state.imagem,
            marker: {
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }
          })
          }
        >
          Editar Ponto
        </Button>

        <Button style={{
          backgroundColor: '#e76f51',
          width: '80%',
          height: 50,
          marginTop: '2%',
          marginLeft: '10%',
          color: '#FFFFFF',
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center'
        }}
          color={'#fff'}
          onPress={() => this.confirmRemove(this.state.id)}
        >
          Deletar Ponto
        </Button>
      </View>
    } else {
      fabButton = <View>
        <Button style={{
          backgroundColor: '#76c893',
          width: '80%',
          height: 50,
          marginTop: '2%',
          marginLeft: '10%',
          color: '#FFFFFF',
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center'
        }}
          color={'#fff'}
          onPress={() => {
            this.handleVisible(!this.state.visible)
          }
          }
        >
          Avaliar
        </Button>
      </View>
    }
    return (
      <ScrollView style={styles.container}>

        <Modal
          style={styles.centeredView}
          animationType={"fade"}
          transparent={true}
          visible={this.state.visible}
          onRequestClose={() => {
            this.handleVisible(!this.state.visible)
          }}>

          <View style={{
            flex: 1,
            backgroundColor: 'hsla(145, 63%, 42%, 0.2)'
          }}>
            <View
              style={styles.modal}
            >
              <View>
                <Ionicons style={styles.modalButton} name='chevron-back-outline' size={34} color='#192819'
                  onPress={() => this.handleVisible(!this.state.visible)} />
                <Text style={styles.modalText}>
                  O que você achou deste ponto de coleta?
                </Text>
                <StarRating
                  maxStars={5}
                  rating={this.state.meAvaliacoes}
                  fullStarColor={"#27AE60"}
                  selectedStar={(rating) => this.onStarRatingPressMeAv(rating)}
                />
              </View>
              <Button style={{backgroundColor: "#27AE60", marginLeft: '15%', width: '60%', borderRadius:30, marginTop: 10, position: 'absolute', bottom: '10%'}} mode="contained" onPress={() => {this.state.meAvaliacoes == 0 ? this.handleVisible(!this.state.visible) : this.confiarmarAv()}}>
                    {this.state.meAvaliacoes == 0 ? "Voltar" : "Confirmar"}
                </Button>
            </View>
          </View>
        </Modal>
        <View style={styles.top}>
          <Ionicons style={styles.fab} name='chevron-back-outline' size={34} color='#192819'
            onPress={() => this.props.navigation.goBack()} />
          <View style={{
            alignItems: 'center'
          }}>
            <Title style={styles.title}>{this.state.nome}</Title>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: '5%', justifyContent: 'center' }}>
          <Image
            source={{
              uri: 'data:image/png;base64,' + this.state.imagem,
            }}
            style={{
              marginTop: 2,
              width: '60%',
              height: 240,
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
            <Icon name="format-list-bulleted" color="#27AE60" size={25} />
            <Text style={{ color: "#777777", marginLeft: 10, fontSize: 15 }}>{this.state.descricao}</Text >
          </View>

          <View style={styles.row}>
            <Icon name="delete" color="#27AE60" size={25} />
            <Text style={{ color: "#777777", marginLeft: 10, fontSize: 15 }}>{this.state.tipoResiduo}</Text >
          </View>

          <View style={styles.row}>
            <Icon name="map-marker" color="#27AE60" size={25} />
            <Paragraph style={{ color: "#7c7aff", fontSize: 15, fontFamily: 'sans-serif', textTransform: 'uppercase' }} onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${this.state.latitude},${this.state.longitude}`)}> Traçar rota até o ponto</Paragraph>
          </View>
          <View style={{
            marginTop: 5,
            marginBottom: 5
          }}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={this.state.starCount}
              fullStarColor={"#27AE60"}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
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
              <Icon name="account" color="#27AE60" size={25} />
              <Text style={{ color: "#777777", marginLeft: 10, fontSize: 15 }}>{this.state.firstName} {this.state.lastName}</Text >
            </View>

            <View style={styles.row}>
              <Icon name="email" color="#27AE60" size={25} />
              <Text style={{ color: "#777777", marginLeft: 10, fontSize: 15 }}>{this.state.email}</Text >
            </View>

            <View style={styles.row}>
              <Icon name="phone" color="#27AE60" size={25} />

              <MaskedText mask="(+99) 999999999" style={{ color: "#777777", marginLeft: 10, fontSize: 15 }}>{this.state.telefone}</MaskedText>
            </View>
          </View>
        </View>
        <View style={{
          justifyContent: 'center',
          marginBottom: 20,
        }}>
          {fabButton}

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
  modalButton: {
    position: 'absolute',
    right: '80%',
    bottom: '120%',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 32.5,
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
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFF",
    height: 250,
    width: '90%',
    borderRadius: 20,
    marginTop: '80%',
    marginLeft: '5%',

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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '7.5%',
    color: '#81c97f',
  },
})
