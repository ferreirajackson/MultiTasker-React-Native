import React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
//Import SQLite
import * as SQLite from 'expo-sqlite';
//Create DB 
const db = SQLite.openDatabase("jacksonapp.db"); 

export default function Records({ navigation }) {
    //Declaring states 
    const [keep, setKeep] = useState([]);
    const [showEmpty, setShowEmpty] = useState(true);

    //First piece of code to be run
    useEffect(() => {
        //Access table to get all the registers (SELECT)
        db.transaction(tx => { //a transaction object is past to call back function as parameter to execute the sql statement
            tx.executeSql(
              "SELECT * FROM records;",[],
              (txt, results) => {
                  //Get an array with all the lines from the table
                  const tmp = []
                  var loaded = false;
                  console.log(results.rows.length);
                  console.log(results.rows.item(1));
                  for (let i = results.rows.length - 1; i >= 0; i--) {
                    tmp.push({
                      ...results.rows.item(i),
                    });
                     loaded = true;
                  }
                  //Variable that controls if there is registers or not in the database
                  if(loaded){
                    setShowEmpty(!showEmpty)
                  }
                  //Setting the array to be displayed in the frontend
                  setKeep(tmp);
            });
          });
    }, [])

   

    return (
      <ImageBackground
            style={styles.rect}
            imageStyle={styles.rect_imageStyle}
            source={require("../../assets/rose.png")}>
        <ScrollView style={{backgroundColor:'#00000000'}} >
          <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
            <View style={styles.logoColumn}>
            <View style={styles.endWrapperFiller}></View>
            <View style={styles.text3Column}></View>
              <Text style={styles.team}>Records</Text>
              <Text style={styles.small}>Records details</Text>
              {showEmpty ?(<View style={styles.fadingContainer}>
                <Text style={styles.responseError}>NO REGISTERS ADDED</Text>
              </View>): null}
              {keep.map((i) => 
                <View style={styles.fadingContainer} key={i.id}>
                  <Text style={styles.response}>ID: {i.id}</Text>
                  <Text style={styles.response}>City: {i.city}</Text>
                  <Text style={styles.response}>Weather: {i.weather}</Text>
                  <Text style={styles.response}>Celsius: {i.celsius}°</Text>
                  <Text style={styles.response}>Currency: {i.currency}</Text>
                  <Text style={styles.response}>Date: {i.date}</Text>
                  <Text style={styles.response}>Hour: {i.hour}</Text>
                </View>
              )}
            </View>
        </ScrollView>
      </ImageBackground>
    );
}

//App Style
const styles = StyleSheet.create({
  fadingContainer: {
    paddingHorizontal: 16,
    backgroundColor: "white",
    color: "#E9967A",
    borderWidth: 2,
    borderColor: "#E9967A",
    borderRadius: 41,
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 10
},
  background: {
    flex: 1,
  },
team: {
    color: 'black',
    fontFamily: "notoserif",
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center"
},
small: {
    marginBottom:10,
    fontSize:7,
    alignSelf: "center"
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
  button: {
    height: 35,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center"
  },
  logoColumn: {
    marginTop: "15%",
    marginLeft: 41,
    marginRight: 41
  },
  response: {
    paddingHorizontal: 16,
    color: "#E9967A"
},
bt: {
  marginBottom: 15,
  marginTop: 15
},
responseError: {
  alignSelf: 'center',
  color: "#E9967A"
},
});