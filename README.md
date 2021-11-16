# ColetaSC

 ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ¨ ![Node.Js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)              ¨  ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

O aplicativo ColetaSC foi desenvolvido como um projeto de graduação do ensino médio por alunos do Instituto Federal de Santa Catarina, a ideia do projeto consiste em um mapa que mostrará ao usuário onde ele pode fazer o descarte correto de seus resíduos, sejam orgânicos ou eletrônicos.

O projeto foi desenvolvido ao longo de 2021, com base nas aulas ministradas pela Rocketseat, além dos conhecimentos adquiridos nas aulas do instituto.

O projeto foi desenvolvido pelos alunos: Eduardo Pazzini Zancanaro, Filipe Medeiros de Almeida, Leonardo Moreschi e Vitor Albara, tendo como orientadores os professores Jackson Meires e Luciane Belmonte
___
## Instalação 
##### 1. CLONE O REPOSITÓRIO 
	git clone https://github.com/oduardu/ColetaSC.git
	cd ColetaSC
##### 2. INSTALE AS DEPENDÊNCIAS GLOBAIS E LOCAIS
	npm install -g expo-cli
	npm install --save

##### 3. Configuração do Firebase:

###### 3.1 Crie um banco de dados no Firebase, no site (https://firebase.google.com/)
###### 3.2 Ative o Firestore Database dentro de seu projeto.

###### 3.3 Ative a autenticação com email e senha.
###### 3.4 Configuração dentro do projeto

Crie uma pasta chamada '**config**' em seu projeto, dentro da mesma crie um arquivo com o nome de '**keys.js**' e insira o código abaixo com as **suas chaves do firebase**:
```javascript
export default {
   firebaseConfig: {
	apiKey: "SUAS CHAVES DO FIREBASE",
	authDomain: "SUAS CHAVES DO FIREBASE",
	databaseURL: "SUAS CHAVES DO FIREBASE",
	projectId: "SUAS CHAVES DO FIREBASE",
	storageBucket: "SUAS CHAVES DO FIREBASE",
	messagingSenderId: "SUAS CHAVES DO FIREBASE",
	appId: "SUAS CHAVES DO FIREBASE",
	measurementId: "SUAS CHAVES DO FIREBASE",
 }
}
```
##### 4. INICIE A APLICAÇÃO UTILIZANDO O EXPO CLI
	expo start
##### 5. ABRA O SEU PROJETO NO SEU SMARTPHONE COM O APLICATIVO EXPO GO
> [Expo – Apps on the Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
> 
> [Expo Go on the App Store](https://apps.apple.com/us/app/expo-go/id982107779)
