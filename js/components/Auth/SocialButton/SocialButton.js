import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Svg, { Path } from 'react-native-svg'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { colors } from '../../../constants/styles'

const socialColors = {
  facebook: '#3C5A96',
  twitter: '#2AA3EF',
  google: '#E9453C'
}

const socialIcons = {
  facebook:
    'M23,15 L23,12 C23,10.7 23.3,10 25.4,10 L28,10 L28,5 L24,5 C19,5 17,8.3 17,12 L17,15 L13,15 L13,20 L17,20 L17,35 L23,35 L23,20 L27.4,20 L28,15 L23,15 Z',
  twitter:
    'M35.2,10.7 C34.1,11.2 33,11.5 31.7,11.7 C32.9,10.9 33.9,9.8 34.4,8.4 C33.2,9.1 31.9,9.6 30.6,9.9 C29.5,8.7 27.9,8 26.2,8 C22.9,8 20.2,10.7 20.2,14.1 C20.2,14.6 20.2,15 20.4,15.5 C15.4,15.3 10.9,12.8 7.9,9.2 C7.4,10.1 7.1,11.1 7.1,12.2 C7.1,14.3 8.2,16.2 9.8,17.2 C8.8,17.2 7.9,16.9 7,16.4 C7,16.4 7,16.4 7,16.5 C7,19.4 9.1,21.9 11.9,22.4 C11.4,22.5 10.9,22.6 10.3,22.6 C9.9,22.6 9.5,22.6 9.2,22.5 C10,24.9 12.2,26.7 14.9,26.7 C12.8,28.3 10.2,29.3 7.4,29.3 C6.9,29.3 6.4,29.3 6,29.2 C8.7,30.9 11.8,31.9 15.3,31.9 C26.4,31.9 32.5,22.7 32.5,14.7 L32.5,13.9 C33.4,13 34.4,12 35.2,10.7 Z',
  google:
    'M20,18 L20,22.8 L27.9,22.8 C27.6,24.9 25.5,28.8 20,28.8 C15.2,28.8 11.3,24.8 11.3,20 C11.3,15.2 15.2,11.2 20,11.2 C22.7,11.2 24.5,12.4 25.6,13.4 L29.4,9.7 C27,7.4 23.8,6 20,6 C12.3,6 6,12.3 6,20 C6,27.7 12.3,34 20,34 C28.1,34 33.4,28.3 33.4,20.3 C33.4,19.4 33.3,18.7 33.2,18 L20,18 Z'
}

const styles = StyleSheet.create({
  touchContainer: {
    width: 40,
    height: 40
  },
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center'
  },
  svg: {
    width: 25,
    height: 25
  }
})

const container = {
  width: 40,
  height: 40,
  borderRadius: 20,
  borderWidth: 1,
  borderStyle: 'solid',
  alignItems: 'center',
  justifyContent: 'center'
}

export default class SocialButton extends PureComponent {
  static propTypes = {
    provider: PropTypes.oneOf(['facebook', 'twitter', 'google']).isRequired,
    onPress: PropTypes.func.isRequired
  }
  state = { isPressed: false }
  handlePressIn = () => this.setState({ isPressed: true })
  handlePressOut = () => this.setState({ isPressed: false })

  render() {
    const { provider, onPress } = this.props
    const { isPressed } = this.state
    const mainColor = socialColors[provider]

    const viewStyle = {
      ...container,
      borderColor: isPressed ? mainColor : colors.lightGary,
      backgroundColor: isPressed ? mainColor : 'transparent'
    }

    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        style={styles.touchContainer}
      >
        <View style={viewStyle}>
          <Svg viewBox="0 0 40 40" style={styles.svg}>
            <Path
              d={socialIcons[provider]}
              fill={isPressed ? '#fff' : colors.lightGary}
            />
          </Svg>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
