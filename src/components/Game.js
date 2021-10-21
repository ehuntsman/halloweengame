import React, { Component } from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
  };
  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds,
  }
  gameStatus = 'playing';
  randomNumbers = Array
    .from({ length: this.props.randomNumberCount })
    .map(() => 1 + Math.floor( 10 * Math.random() ))
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce( (acc, curr) => acc + curr, 0);
    shuffleRandomNumbers = shuffle(this.randomNumbers);

  componentDidMount(){
    this.intervalId = setInterval( () => {  
      this.setState( (prevState) => {
        return{
          remainingSeconds: prevState.remainingSeconds - 1
        };
      }, () => {
        if(this.state.remainingSeconds === 0){
          clearInterval(this.intervalId);
        }
      })
    }, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  }

  selectNumber = (numberIndex) => {
    this.setState( (prevState) => ({ selectedIds: [...prevState.selectedIds, numberIndex] }));
  }

  componentWillUpdate(nextPoprs, nextState){
    if(nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0){
      this.gameStatus = this.calcGameStatus(nextState);
      if(this.gameStatus !== 'playing'){
        clearInterval(this.intervalId);
      }
    }
  }

  calcGameStatus = (nextState) => {
    const sumSelected = nextState.selectedIds.reduce( (acc, curr) => {
      return acc + this.shuffleRandomNumbers[curr];
    }, 0);
    if(nextState.remainingSeconds === 0){
      return 'lost';
    }
    if(sumSelected < this.target){
      return 'playing';
    }
    if(sumSelected === this.target){
      return 'won';
    }
    if(sumSelected > this.target){
      return 'lost';
    }
    // console.warn(sumSelected, "wwwwwweeeeeeeeeeeee")
  }

  render() {
    const gameStatus = this.gameStatus;
    return (
      <View style={styles.mathcontainer}>
        <Text style={[styles.target, styles[`${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.guessContainer}>
          {this.shuffleRandomNumbers.map((randomNum, index) => 
            <RandomNumber
              key={index}
              id={index}
              number={randomNum}
              isSelected={this.isNumberSelected(index) || gameStatus !== 'playing'}
              selectTheNumber={this.selectNumber}
            />
            // <Text style={styles.guess} key={index}>{randomNum}</Text>
          )}
        </View>
        {this.gameStatus !== 'playing' && (
          <Button title="Play Again" onPress={this.props.onPlayAgain} />
        )}
        <Text>{this.state.remainingSeconds}</Text>
      </View>
    );
  }
}

export default Game;

const styles = StyleSheet.create({
  mathcontainer: {
    flex: 1,
    // backgroundColor: '#ddd',
  },
  target: {
    fontSize: 42,
    padding: 10,
    color: '#fff',
    textAlign: 'center',
    margin: 50,
  },
  guessContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  guess: {
    fontSize: 30,
    width: 100,
    marginHorizontal: 15,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 10,
    textAlign: 'center'
  },
  playing: {
    backgroundColor: '#000',
  },
  won: {
    backgroundColor: 'green',
  },
  lost: {
    backgroundColor: 'red',
  },
});