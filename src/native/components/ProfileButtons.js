import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

class ProfileButtons extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={this.props.icon} />
        <Text style={styles.value}>{this.props.value}</Text>
        <Text style={styles.label}>{this.props.label}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  icon: {
    flex: 1,
    alignSelf: 'center',
    height: 34,
    width: 34,
  },

  value: {
    flex: 1,
    fontSize: 19,
    fontWeight: '200',
    textAlign: 'center',
  },

  label: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ProfileButtons;
