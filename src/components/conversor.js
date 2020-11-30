import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, Text, View, TextInput, Button, ImageBackground,TouchableHighlight } from 'react-native';

export default function Conversor({ navigation }, props) {

    //Gets data currency from the home screen
    const currency_home = navigation.state.params.currrency;
    //Declaring states 
    const [USD, setUSD] = useState('USD');
    const [EUR, setEUR] = useState(currency_home);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    //Boolean states to control the change of currency
    const [viceversa, setViceVersa] = useState(false);
    
    //Function that consumes the exchange rate API
    const currency = () => {
        
        //Sets "To" to blank so the vice versa can be done 
        setTo('');
        let url_formation = '';
        let converted = '';
        if(isFinite(from)){

            //verifies if is converting EUR to USD
            if(viceversa){
                url_formation = 'base';

            // //verifies if is converting USD to EUR
            }else {
                url_formation = 'symbols';
            }

            //Call to the ExchangeRate API 
            fetch('https://api.exchangeratesapi.io/latest?'+ url_formation +'=USD')
                    .then((response) => { return response.json() })
                    .then((json) => {
                        console.log(json);
                        console.log(url_formation);
                        if(url_formation === 'symbols'){
                            console.log(json.rates.USD);
                            converted = json.rates.USD;
                        }else {
                            console.log(json.rates.EUR);
                            converted = json.rates.EUR;
                        }
                        //Makes the conversion
                        console.log(converted * from);
                        setTo((converted * from).toString());
                });
        } else{
            //Throw this message in case the user type letters or invalid character
            setTo('INFORM A VALID NUMBER');
        }
    }

    //Function that reverses the order of currencies
    const changeOrder = () => {
        setViceVersa(!viceversa);
        //Sets the currencies in the opposite order
        setEUR(USD);
        setUSD(EUR);
    }

    return (
        <View style={styles.root}>
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
        <View style={styles.background}>
            <ImageBackground
            style={styles.rect}
            imageStyle={styles.rect_imageStyle}
            source={require("../../assets/rose.png")}
            >
            <View style={styles.logoColumn}>
            <View style={styles.logo}>
              <View style={styles.endWrapperFiller}></View>
              <View style={styles.text3Column}>
                <Text style={styles.team}>Converter</Text>
                <Text style={styles.small}>(convert usd to euro)</Text>
                <Text>THE CURRENCY IS {currency_home}</Text>
              </View>
            </View>
            <View style={styles.container}>
            <View style={styles.majorContainer}>
                <TouchableHighlight style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>{USD}</Text>
                </TouchableHighlight>
                    <TextInput style={styles.input} keyboardType="numeric" value={from} onChangeText={from => setFrom(from)}/>
            </View>
            <View style={styles.majorContainer}>
                <TouchableHighlight style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>{EUR}</Text>
                </TouchableHighlight>
                    <TextInput style={styles.input} value={to} editable={false} />
            </View>
            <View style={styles.bt}>
                <Button  color="black"  title="Convert"  onPress={currency} />
            </View>
            <Button style={styles.bt} color="black" title="Reverse currency"  onPress={changeOrder} />
            </View>
            </View>
            </ImageBackground>
            </View>
        </View>
    );
}
//App style
const styles = StyleSheet.create({
    background: {
        flex: 1,
      },
    team: {
        color: 'black',
        fontFamily: "notoserif",
        fontSize: 40,
        fontWeight: "bold",
    },
    small: {
        marginBottom:10,
        fontSize:7,
        alignSelf: "center"
    },
    majorContainer: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: 48,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 11,
    },
    buttonContainer: {
      height: 48,
      alignItems: 'center',
      justifyContent:'center',
      backgroundColor: '#ffffff',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4
    },
    buttonText: {
     fontWeight: '600',
     fontSize: 20,
     paddingHorizontal: 16,
     color: '#4F6D7A',
    },
    input: {
     height: 500,
     flex: 1,
     fontSize:18,
     paddingHorizontal: 8,
     color: '#797979',
     width: 500,
    },
    border: {
        height: 48,
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#E2E2E2',
    }, 
     root: {
        flex: 1,
        backgroundColor: "rgb(255,255,255)"
      },
      
      rect: {
        flex: 1
      },
      rect_imageStyle: {},
      logo: {
        height: 111,
        alignSelf: "center"
      },
      endWrapperFiller: {
        flex: 1
      },
      text3Column: {
        marginBottom: 6,
        marginLeft: 2,
        marginRight: -1
      },
      logoColumn: {
        marginTop: "15%",
        marginLeft: 41,
        marginRight: 41
      },
      bt: {
          marginBottom: 10,
          marginTop: 10
      }, 
});