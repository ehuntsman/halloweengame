import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import Game from './src/components/Game';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class App extends React.Component{
  state= {
    gameId: 1,
  };
  resetGame = () => {
    this.setState( (prevState) => {
      return {
        gameId: prevState.gameId + 1
      };
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>This is Halloween!</Text>
        <Game key={this.state.gameId} onPlayAgain={this.resetGame} randomNumberCount={6} initialSeconds={10} />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffa500',
  },
  welcome: {
    fontSize: 20,
    marginTop: 30,
  },
  instructions: {
    color: '#333333',
  },
  trick: {
    width: '50%',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  mathContainer: {
    backgroundColor: '#ddd'
  }
});