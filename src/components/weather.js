import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
//Import SQLite
import * as SQLite from 'expo-sqlite'; 
//Create DB
const db = SQLite.openDatabase("jacksonapp.db"); 

export default function Weather({ navigation }, props) {

  //Declaring states 
  const [cityName, setCityName] = useState(null);
  const [wheater, setWheater] = useState(null);
  const [date_date, setDate] = useState(null);
  const [hour_hour, setHour] = useState(null);
  const [celsiusNumber, setCelsius] = useState(null);

  //Gets data currency and city from the home screen
  const  city_navigator = navigation.state.params.city;
  const  currency_home = navigation.state.params.currrency;
  


  //Get weather information with the key and city
  //provided from the getCity function
  let getWeather = (cityKey) =>{
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
      const query = `${cityKey}?apikey=${key}`;
      fetch(base + query)
      .then((response) => { return response.json() })
      .then((json) => {
        console.log(json);
        const data = json;
        //Sets climate
        const climate = data[0].WeatherText;
        //Sets celsius
        const celsius_api = data[0].Temperature.Metric.Value;
        //Sets dayHour
        const dayHour = data[0].LocalObservationDateTime;
        //Stes date
        const date = dayHour.split("-");
        setWheater(climate);
        setCelsius(celsius_api);
        setDate(date[2].slice(0,2) +'/'+date[1]+'/'+date[0]);
        setHour(date[2].slice(3,8));
        
      });
  } 

  //First piece of code to be run
  useEffect(() => {
    //Calls function to get the city
    getCity(city_navigator);
    //Command that creates the table as soon as the screen is displayed if doesnt exist already
    db.transaction(tx => {
        tx.executeSql(
            'CREATE table if not exists records (id integer primary key not null, city text, weather text, celsius text, currency text, date text, hour text);'
        );
    });
}, [])

const showAlert = () =>{
  Alert.alert(
     'Register successfully added!'
  )
}

//function to add register
const add = () => {
  //Setting variables to insert to the records table
  const city = cityName;
  const weather = wheater;
  const celsius = celsiusNumber;
  const currency = currency_home;
  const date = date_date;
  const hour = hour_hour;

  //Setting parameters
  const params = [city, weather, celsius, currency, date, hour]

  //Proper insertion to the table
  const query = 'INSERT INTO records (city,weather,celsius,currency,date,hour) VALUES (?,?,?,?,?,?)';
    db.transaction(
      tx => {
        tx.executeSql(query, params,
          (tr,resultset) => showAlert()
        ,(tr,err) => console.log('An error was found', err));
    });
  
};

  //Accuweather APIkey
  const key = '0KPyIT4OjYR0nmKStAFe2XN3L0klqAEL';
  //Get city information
  const getCity = (city) => {
      const base = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey='+key+'&q='+city;
      fetch(base)
      .then((response) => { return response.json() })
      .then((json) => {
        const data = json;
        //Get key and city information to get the weather
        const cityKey = data[0].Key;
        const cityName = data[0].LocalizedName;
        //Setting information
        setCityName(cityName);
        getWeather(cityKey);
      });
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
            <View style={styles.text3Column}></View>
            <Text style={styles.team}>Weather info</Text>
            <View style={styles.fadingContainer}>
              <Text style={styles.response}>City: {cityName}</Text>
            </View>
            <View style={styles.fadingContainer}>
              <Text style={styles.response}>Weather: {wheater}</Text>
            </View>
            <View style={styles.fadingContainer}>
              <Text style={styles.response}>Celsius: {celsiusNumber}</Text>
            </View>
            <View style={styles.fadingContainer}>
              <Text style={styles.response}>Date: {date_date}</Text>
            </View>
            <View style={styles.fadingContainer}>
              <Text style={styles.response}>Hour: {hour_hour}</Text>
            </View>
            <View style={styles.bt}>
                <Button color="black" title="ADD register?" onPress={add} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
    </View>
  );
}

//App Style
const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontFamily: "notoserif",
    fontSize: 35,
    fontWeight: "bold",
    paddingTop: 45,
    paddingBottom: 15,
    alignSelf: "center"
  },
  fadingContainer: {
    paddingHorizontal: 16,
    backgroundColor: "white",
    color: "#E9967A",
    borderWidth: 2,
    borderColor: "#E9967A",
    borderRadius: 41,
},
  background: {
    flex: 1,
    
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
  usernameColumn: {},
  usernameColumnFiller: {
    flex: 1
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
  response: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginTop: 1,
    color: "#E9967A"
},
bt: {
  marginBottom: 15,
  marginTop: 15
},
team: {
  color: 'black',
  fontFamily: "notoserif",
  fontSize: 40,
  fontWeight: "bold",
  alignSelf: "center"
},
});