import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { DangerZone } from 'expo';
import { Expo } from 'expo';
const { Lottie } = DangerZone;

let anim2 = require('../assets/checked_done');
console.log('anim2', anim2);
export default class LottieScreen extends React.Component {
  state = {
    animation: null,
  };
  
  componentWillMount() {
    this._playAnimation();
  }

  render() {
    return (
      <View style={styles.animationContainer}>
        {this.state.animation &&
          <Lottie
          loop 
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 100,
              height: 100,
              backgroundColor: '#fff',
            }}
            source={anim2}
          />}
        <View style={styles.buttonContainer}>
        <Button
          title="Restart Animation"
          onPress={this._playAnimation}
        />
        </View>
      </View>
    );
  }
  
  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimationAsync();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _loadAnimationAsync = async () => {
    this.setState(
      { animation: anim2 },
      this._playAnimation
    );
  };
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
