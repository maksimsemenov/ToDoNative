import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import {
  Text,
  Button,
  TouchableHighlight,
  Image,
  View,
  StyleSheet
} from 'react-native'
import { getUser } from '../../redux/selectors/auth'
import { logIn, logOut } from '../../redux/reducers/auth'
import { accentColor } from '../../constants/styles'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    left: 10
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
    backgroundColor: accentColor
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

  handleFacebokAuth = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then(result => {
        if (result.isCancelled) {
          return Promise.reject(new Error('The user cancelled the request'))
        }
        // Retrieve the access token
        return AccessToken.getCurrentAccessToken()
      })
      .then(data => {
        const credential = firebase.auth.FacebookAuthProvider.credential(
          data.accessToken
        )
        return firebase.auth().signInAndRetrieveDataWithCredential(credential)
      })
      .catch(error => {
        const { code, message } = error
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      })
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
    return <Button onPress={this.handleFacebokAuth} title="Facebook" />
  }
}

const mapStateToProps = state => ({
  user: getUser(state)
})

export default connect(mapStateToProps, { logIn, logOut })(Auth)
