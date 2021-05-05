/*import FirebaseKey from "./config";
import firebase from "firebase";
//import firestore from "firebase/firestore";

class Fire {
    constructor() {
        //verifica se o firebase já foi inicializado
        if (!firebase.apps.length) {
            firebase.initializeApp(FirebaseKey);
        }
    }

    save = async (refName, dataForm) => {
        delete dataForm.id; //deleta o atributo id por ser um insert

        //uma promese que realiza o salvamento do formulário
        return new Promise((res, rej) => {
            firebase
                .database()
                .ref(refName) //passa a referencia entidade
                .push(dataForm) // passa o objeto com os dados do formulário
                .then((snapshot) => {
                    console.log("Inserido! - " + snapshot.key);

                    res(snapshot.key); // retorna o id salvo

                    dataForm.id = snapshot.key;
                    //atualizando os dados para acrescentar o id
                    this.update(refName, dataForm, dataForm.id);
                })
                .catch((error) => {
                    rej(error);
                    console.log(error.code);
                    console.log(error.message);
                });
        });
    };

    //update do formulário
    update = (entidade, dataForm, keyRef) => {
        var updates = {};
        //verifica se o id é indefinido ou nulo se sim, pega a id do form que é uma atualização, se não, é um novo id então é uma nova inserção
        var key = keyRef === undefined || keyRef === null ? dataForm.id : keyRef;

        //adiciona os dados do form no indice que receberá a edição
        updates[entidade + "/" + key] = dataForm;

        //realiza a edição no firebase passando o vetor com os dados
        firebase.database().ref().update(updates);

        return key;
    };

    remove = async (refName, key) => {
        //remove os registros da entidade
        await this.db(refName + "/" + key) //passa a referencia da entidade e concatena com o id a ser removido
            .remove()
            .then(() => {
                console.log("Removido..");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    search = (text, field, arrayData) => {
        //realiza o filtro da pesquisa referente ao campo
        const data = arrayData.filter((item) => {
            //Coloca o campo do array em caixa alta
            const itemDado = item[field]
                ? item[field].toUpperCase()
                : "".toUpperCase();

            //coloca o texto digitado em caixa alta
            const textDado = text.toUpperCase();

            //indexOf retorna possição inicial do vetor passando os dados do vetor
            return itemDado.indexOf(textDado) > -1;
        });

        //objeto com o novo vetor filtrado e o texto digitado
        return {
            dataArray: data,
            search: text,
        };
    };

    // carrega os dados a partir de uma referencia de documento
    load = async (refName) => {
        const ref = this.db(refName);
        var vetorTemp = [];

        await ref.on("value", (snapshot) => {
            if (snapshot) {
                let data = {};
                snapshot.forEach((child) => {
                    //if (child.key !== data.id) {
                    data.id = child.key;
                    data = child.val();
                    // }
                    vetorTemp.push(data);

                    //delete data.id; //deleta o atributo id por ser um insert
                });
            }
        });

        return vetorTemp;
    };
    //############ Fim CRUD sem Imagens ############

    firestore() {
        return firebase.firestore();
    }

    db(document = null) {
        return firebase.database().ref(document);
    }

    storage() {
        return firebase.storage().ref();
    }

    uid() {
        return 1;
        // (firebase.auth().currentUser || {}).uid;
    }

    timestemp() {
        //retorna a data atual
        return Date.now()
    }
}

//cria o objeto da classe Fire
Fire = new Fire()
//exporta o objeto Fire para ficar visivel aos demais arquivos do projeto
export default Fire
*/