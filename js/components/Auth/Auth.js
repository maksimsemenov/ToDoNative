import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin'
import { Text, TouchableHighlight, Image, View, StyleSheet } from 'react-native'
import SocialButton from './SocialButton/SocialButton'
import { getUser } from '../../redux/selectors/auth'
import { logIn, logOut } from '../../redux/reducers/auth'
import { colors } from '../../constants/styles'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    left: 10,
    flexDirection: 'row'
  },
  touchableContainer: {
    width: 40,
    height: 40,
    borderRadius: 25
  },
  innerContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.accent
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  userName: {
    fontSize: 14,
    color: '#fff'
  }
})

const formatName = name =>
  name
    .split(' ')
    .filter((w, i) => i < 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()

class Auth extends PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      displayName: PropTypes.string
    }),
    logIn: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired
  }
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      this.props.logIn(user)
    })
  }
  componentWillUnmount() {
    this.authSubscription()
  }

  handleFacebookAuth = async () => {
    try {
      await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      const data = await AccessToken.getCurrentAccessToken()
      const credential = await firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
      )
      firebase.auth().signInAndRetrieveDataWithCredential(credential)
    } catch (e) {
      console.log(e)
    }
  }
  handleGoogleAuth = async () => {
    try {
      await GoogleSignin.configure()
      const data = await GoogleSignin.signIn()
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      )
      firebase.auth().signInWithCredential(credential)
    } catch (e) {
      console.log(e)
    }
  }
  render() {
    const { user, logOut } = this.props
    if (user) {
      return (
        <View style={styles.container}>
          <TouchableHighlight onPress={logOut} underlayColor="#fff">
            <View style={styles.innerContainer}>
              <Text style={styles.userName}>
                {formatName(user.displayName)}
              </Text>
              {/* <Image style={styles.image} source={{ uri: user.phsotoURL }} /> */}
            </View>
          </TouchableHighlight>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <SocialButton provider="facebook" onPress={this.handleFacebookAuth} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state)
})

export default connect(mapStateToProps, { logIn, logOut })(Auth)
