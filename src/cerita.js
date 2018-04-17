import React, { Component } from 'react';
import { RefreshControl, Button, Text, View, Image, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, FlatList, List, ListItem } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json 
export default class ListData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      cari: ''
    };
}

cariData = () => {
            this.setState({ ActivityIndicator_Loading: true },
                () => {
                    this.setState({ refreshing: true });
                    fetch(
                            "http://gusnando.com/mobile/dana/search.php", {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    cari: this.state.cari
                                })
                            }
                        )
                        .then(response => response.json())
                        .then(responseJson => {
                            console.log("comp");
                            console.log(responseJson);
                            this.setState({
                                data: responseJson,
                                error: responseJson.error || null,
                                loading: false,
                                refreshing: false,
                                ActivityIndicator_Loading: false
                            });
                        });
                }
            );
        };

  componentDidMount()  {
      const url = 'http://gusnando.com/mobile/dana/daftarcerita.php';
       this.setState({ loading: true });
      fetch (url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("comp");
        console.log(responseJson);
        this.setState({
          data: responseJson,
          error: responseJson.error || null,
          loading: false,
          refreshing: false
        });
      }
    );
  }
   _keyExtractor = (item, index) => item.id_cerita;

GetIDFunction=(id_cerita, judul_cerita, isi_cerita, asal_cerita)=>{

          this.props.navigation.navigate('edit', { 

            id_cerita : id_cerita,
            judul_cerita : judul_cerita,
            isi_cerita : isi_cerita,
            asal_cerita : asal_cerita,

          });
        }
  render() {
    return (
<View style={ styles.MainContainer }>

      <Image
          source={require('../image/images4.jpg')}
        />
      <View style={ styles.Header }>
        <Text style={ styles.TextHeader }> Dunia Punya Cerita </Text>
      </View>

      <TextInput  
        placeholder = "Masukan Kata Kunci" 
        style = { styles.TextInputStyleClass } 
        underlineColorAndroid = "transparent"
        returnKeyType="done"
        onChangeText = {(TextInputText) => this.setState({ cari
          : TextInputText })} 
        onChange = {this.cariData}
                    />
                  
 
         
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>
            <View style={styles.BoxClass}>
              <Text>Judul : {item.judul_cerita}</Text>
              <Text>Isi : {item.isi_cerita}</Text>
              <Text>Asal : {item.asal_cerita}</Text>
              <View style={styles.EditClass}>
              
                </View>
            </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.componentDidMount.bind(this)}
          />
        }
        /> 
        

   </View>   
      
    );
  }
}
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
      borderColor: '#2196F3',
      borderRadius: 7 ,
      marginBottom: 10,
      width: '95%'
    },

    BoxClass:
    {
      alignItems: 'flex-start',
      height: 150,
      backgroundColor : "#90A4AE",
      borderWidth: 1,
      borderColor: '#3949AB',
      borderRadius: 7 ,
      marginBottom: 10,
      width: 270,
      paddingTop: 5,
      paddingBottom: 5
    },
    EditClass:
    {
      flexDirection: 'row',
      alignItems: 'flex-start',
      height: 30,
      backgroundColor : "#90A4AE",
      borderColor: '#90A4AE',
      borderRadius: 7 ,
      marginTop: 15,
      marginBottom: 1,
      width: 260,
      paddingTop: 10,
      justifyContent: 'center',
      alignItems: 'center'
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
      DeleteOpacity:
   {
      paddingTop:10,
      paddingBottom:10,
      paddingLeft: 10,
      backgroundColor:'red',
      marginBottom: 20,
      width: '40%',
      borderRadius: 7 
 
    },
    UpdateOpacity:
   {
      paddingTop:10,
      paddingBottom:10,
      paddingRight: 10,
      backgroundColor:'#3949AB',
      marginBottom: 20,
      width: '40%',
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
        fontSize: 20,
        color: '#3949AB'
    },
});