import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Alert, BackHandler, Animated, StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity } from 'react-native';
//Import location
import * as Location from 'expo-location';

export default function Home({ navigation }) {

    //Declaring states 
    const [latitude, setLatitude] = useState(null);
    const [longitude, setlongitude] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [country, setCountry] = useState(' Your Country here');
    const [district, setDistrict] = useState('Your District here');
    const [city, setCity] = useState('Your City here');
    const [currency, setCurrency] = useState('Your Currency here');
    const [county, setCounty] = useState(' Your county here');

    //Boolean states to control the display of buttons and location flex box
    const [shouldShow, setShouldShow] = useState(false);
    const [ShowMain, setShowMain] = useState(true);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    
    //Manages the fadein effect for the box 
    //with the location info
    const fadeIn = () => {
        if (!errorMsg) {
            opencage();
            setShouldShow(!shouldShow);
            setShowMain(!ShowMain);
        }
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true
        }).start();
    };

    //Call to the OpenCage API passing the longitude and latitude
    let opencage = () => {
        fetch('https://api.opencagedata.com/geocode/v1/json?key=2e98cc940e59428184be10136e65bc1b&q=' + latitude + '+' + longitude)
            .then((response) => { return response.json() })
            .then((json) => {
                console.log(json);
                //Sets country
                setCountry(json.results[0].components.country);
                //Sets disctrict
                setDistrict(json.results[0].components.city_district);
                //Sets county
                setCounty(json.results[0].components.county);
                //Sets city
                setCity(json.results[0].components.city);
                //Sets currency
                setCurrency(json.results[0].annotations.currency.iso_code);
            });
    }

    //First piece of code to be run
    useEffect(() => {
        (geolocationfunction = async () => {
          try{
            let { status } = await Location.requestPermissionsAsync();
            //Checks if the location permission was allowed
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
            //Calls to get the latitude and longitude
            let location = await Location.getCurrentPositionAsync({});
            setLatitude(location.coords.latitude);
            setlongitude(location.coords.longitude);
          } catch(err) {
              Alert.alert(
                "Location Services",
                "Please urn the location service on for this app to work",
                [
                  {
                    text: "Quit",
                    onPress: () => BackHandler.exitApp(),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => geolocationfunction() }
                ],
                { cancelable: false }
              );
          } 
        })();
    }, []);
    let user_location;

    //Treats if get error or the proper location
    if (errorMsg) {
        user_location = errorMsg;
    } else if (latitude) {
        //Appends the result of the display flex box
        user_location = 'City: ' + city + "\n" +'Country: ' + country + "\n" + "County: " + county + "\n" + "District: " + district
    }

    return (
        <View style={styles.root}>
          <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
          <View style={styles.background}>
          <ImageBackground
            style={styles.rect}
            imageStyle={styles.rect_imageStyle}
            source={require("../../assets/rose.png")}>
            <View style={styles.logoColumn}>
              <View style={styles.logo}>
                <View style={styles.endWrapperFiller}></View>
                <View style={styles.text3Column}>
                  <Text style={styles.team}>MulTiT@sker</Text>
                </View>
              </View>
                <View style={styles.usernameColumnFiller}></View>
                {ShowMain ? ( <TouchableOpacity
                  onPress={fadeIn}
                  style={styles.button}
                >
                  <Text style={styles.text2}>My location</Text>
                </TouchableOpacity>) : null}
              <Animated.View
                  style={[
                      styles.fadingContainer,
                      {
                          opacity: fadeAnim // Bind opacity to animated value
                      }
                  ]}>
                  <Text style={styles.response}>{user_location}</Text>
              </Animated.View>
              {shouldShow ? (<Button color="#E9967A" variant="contained"
                  onPress={() => {
                      navigation.navigate('Weather', {city: city, currrency: currency})
                  }}
                  title='Check weather'
              />) : null}
              <View style={styles.padd}>
                  {shouldShow ? (<Button color="#E9967A" variant="contained"
                      onPress={() => {
                          navigation.navigate('Conversor', {currrency: currency})
                      }}
                      title='Conversor'
                  />) : null}
              </View>
              <View style={styles.padd}>
                  {shouldShow ? (<Button color="#E9967A" variant="contained"
                      onPress={() => {
                          navigation.navigate('Records')
                      }}
                      title='Where have I been?'
                  />) : null}
              </View>
              </View>
            <View style={styles.logoColumnFiller}></View>
            
        </ImageBackground>
      </View>
    </View>
    );
}
//App style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C0C0C0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    padd: {
        marginTop: 10,
        paddingTop: 10

    },
    fadingContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "white",
        marginTop: 20,
        color: "#E9967A",
        marginBottom:20,
        borderWidth: 5,
        borderColor: "#E9967A",
        borderRadius: 41,
    },
    response: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 1,
        color: "#E9967A"
    },
    root: {
        flex: 1,
        backgroundColor: "rgb(255,255,255)"
      },
      background: {
        flex: 1
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
      text3: {
        color: "black",
        fontSize: 40,
        marginBottom: 4
      },
      
      text3Column: {
        marginBottom: 6,
        marginLeft: 2,
        marginRight: -1
      },
      usernameColumn: {},
      usernameColumnFiller: {
        flex: 1
      },
      button: {
        height: 35,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center"
      },
      text2: {
        color: "#E9967A",
        alignSelf: "center"
      },
      logoColumn: {
        marginTop: "15%",
        marginLeft: 41,
        marginRight: 41
      },
      logoColumnFiller: {
        flex: 1
      },
      footerTexts: {
        height: 14,
        flexDirection: "row",
        marginBottom: 36,
        marginLeft: 37,
        marginRight: 36
      },
      button2: {
        width: 104,
        height: 14,
        alignSelf: "flex-end"
      },
      image: {
        width: 70,
        height: 70
      },
      team: {
        color: 'black',
        fontFamily: "notoserif",
        fontSize: 40,
        fontWeight: "bold",
        alignSelf: "center"
    },
});