import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button } from 'react-native'
import firebase from 'react-native-firebase'
import { AccessToken, LoginManager } from 'react-native-fbsdk'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
})

type Props = {}
export default class App extends Component<Props> {
  state = { user: undefined }
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      this.setState({
        loading: false,
        user
      })
    })
  }

  componentWillUnmount() {
    this.authSubscription()
  }
  onLoginOrRegister = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then(result => {
        if (result.isCancelled) {
          return Promise.reject(new Error('The user cancelled the request'))
        }
        // Retrieve the access token
        return AccessToken.getCurrentAccessToken()
      })
      .then(data => {
        // Create a new Firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
        // Login with the credential
        return firebase.auth().signInWithCredential(credential)
      })
      .then(user => {
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch(error => {
        const { code, message } = error
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button onPress={this.onLoginOrRegister} title="Facebook" />
        {this.state.user && <Text>{this.state.user.toString()}</Text>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
