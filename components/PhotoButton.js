import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class QRScanButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.menuIcon}
        onPress={() => {
          this.props.callback();
        }}
      >
        <Icon name="camera" color="#000" size={30} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  menuIcon: {
    height: 35,
    width: 35
  }
});
