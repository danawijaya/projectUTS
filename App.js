import React from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import cerita from './src/cerita';
import data from './src/data';


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
          source={require('./image/images1.jpg')}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('cerita')}  >
          <Text style={styles.buttonText}>Mulai Baca</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles2.button} onPress={() => this.props.navigation.navigate('data')}  >
          <Text style={styles2.buttonText}>Input Cerita</Text>
        </TouchableOpacity>
      </View>
    );
  }
}



const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    cerita: {
      screen: cerita,
    },
    data: {
      screen: data,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#000080',
      paddingHorizontal: 70,
      paddingVertical: 30,
      borderRadius: 6,
      marginTop: 10
    },
    buttonText: {
      fontSize: 22,
      color: '#FFD700',
    }
  });
const styles2 = StyleSheet.create({
    button: {
      backgroundColor: '#000080',
      paddingHorizontal: 70,
      paddingVertical: 30,
      borderRadius: 6,
      marginTop: 10
    },
    buttonText: {
      fontSize: 22,
      color: '#FFD700',
    }
  });
