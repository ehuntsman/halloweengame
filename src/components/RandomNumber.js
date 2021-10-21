import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import PropTypes from 'prop-types';

class RandomNumber extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
    selectTheNumber: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
  };
  handlePress = () => {
    if(this.props.isSelected){return};
    this.props.selectTheNumber(this.props.id)
  }
  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={[styles.guess, this.props.isSelected && styles.selected]}>{this.props.number}</Text>
      </TouchableOpacity>
    );
  }
}

export default RandomNumber;

const styles = StyleSheet.create({
  guess: {
    fontSize: 30,
    width: 100,
    marginHorizontal: 15,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 10,
    textAlign: 'center',
  },
  selected: {
    backgroundColor: '#ff7000',
    borderColor: '#ff7000',
    opacity: 0.75
  }
});