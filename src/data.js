import React, { Component } from 'react';
import { Alert, Button, Text, View, Image, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; 

class HomeScreen extends React.Component {
  constructor()
    {
        super();
 
        this.state = { 
          judu_cerita: '',
          isi_cerita: '', 
          asal_cerita: '', 
          ActivityIndicator_Loading: false, 

        }
    }
 Insert_Data_Into_MySQL = () =>
    {
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
            fetch('http://gusnando.com/mobile/dana/inputcerita.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                  judul_cerita : this.state.judul_cerita,
                  isi_cerita : this.state.isi_cerita,
                  asal_cerita : this.state.asal_cerita,
                })
 
            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                Alert.alert(responseJsonFromServer);
                this.setState({ ActivityIndicator_Loading : false });
            }).catch((error) =>
            {
                console.error(error);
                this.setState({ ActivityIndicator_Loading : false});
            });
        });
    }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style = { styles.MainContainer }>
                <Image
                    source={require('../image/images4.jpg')}
                  />
                <TextInput 
                  placeholder = "Judul Cerita"
                  style = { styles.TextInputStyleClass } 
                  underlineColorAndroid = "transparent"
                  returnKeyType="next"
                  autoCapitalize="words"
                  ref={(input) => this.judul_ceritaInput = input}
                  onSubmitEditing={() => this.isi_ceritaInput.focus()}
                  onChangeText = {(TextInputText) => this.setState({ judul_cerita: TextInputText })} />
                
                <TextInput 
                  placeholder = "Isi Cerita"
                  style = { styles.TextInputStyleClass } 
                  underlineColorAndroid = "transparent"
                  returnKeyType="next"
                  autoCapitalize="words"
                  ref={(input) => this.isi_ceritaInput = input}
                  onSubmitEditing={() => this.asal_ceritaInput.focus()}
                  onChangeText = {(TextInputText) => this.setState({ isi_cerita: TextInputText })} />
 
                <TextInput  
                  placeholder = "Asal Cerita" 
                  style = { styles.TextInputStyleClass } 
                  underlineColorAndroid = "transparent"
                  returnKeyType="next"
                  ref={(input) => this.asal_ceritaInput = input}
                  onChangeText = {(TextInputText) => this.setState({ asal_cerita: TextInputText })} />
 
                <TouchableOpacity 
                  activeOpacity = { 0.5 }
                  style = { styles.TouchableOpacityStyle } 
                  onPress = { this.Insert_Data_Into_MySQL }>
                    <Text style = { styles.TextStyle }>Input Cerita</Text>
                </TouchableOpacity>

                {
                  this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#2196F3' size='large'style={styles.ActivityIndicatorStyle} /> : null
                }
                
            </KeyboardAvoidingView> //penutup containerMain
     
      
    );
  }
}
export default HomeScreen;

const styles = StyleSheet.create(
{
    MainContainer:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20

    },
 
    TextInputStyleClass:
    {
      textAlign: 'center',
      height: 40,
      backgroundColor : "#90A4AE",
      borderWidth: 1,
      borderColor: '#3949AB',
      borderRadius: 7 ,
      marginBottom: 10,
      width: '95%'
    },

    BoxClass:
    {
      alignItems: 'center',
      height: 40,
      backgroundColor : "#90A4AE",
      borderWidth: 1,
      borderColor: '#3949AB',
      borderRadius: 7 ,
      marginBottom: 10,
      width: '95%'
    },
 
    TouchableOpacityStyle:
   {
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#3949AB',
      marginBottom: 20,
      width: '70%',
      borderRadius: 7 
 
    },
 
    TextStyle:
    {
       color: '#90A4AE',
        textAlign: 'center',
        fontSize: 18
    },

    ActivityIndicatorStyle:{
      
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    
  }, 
  Header: {
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextHeader: {
        fontSize: 30,
        color: '#3949AB'
    },
});