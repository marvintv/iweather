
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  AppRegistry,
  View,
  StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import {fetchWeather} from './weatherAPI'
import Highlight from 'react-native-highlight-words'


const phrases = {
    Default: {
      title: "Welcome to iWeather",
      subtitle: "Please wait, as I load",
      Highlight: "iWeather",
      color: "#f9f9f9",
      background: "#787878",

    },

    Clouds: {
      title: "It's very cloudy",
      subtitle: "Look out for the sun.. maybe",
      Highlight: "very",
      color: '#ffffff',
      background: '#0094dd',
    },
    Clear: {
      title: "The skys are clear",
      subtitle: "Blue skys remind me of the ocean",
      Highlight: "clear",
      color: '#ffffff',
      background: '#00dfff',
    },
    Drizzle: {
      title: "meh... It's Dizzling",
      subtitle: "Drizzle 'sizzle",
      Highlight: "meh...",
      color: '#cccccc',
      background: '#9a5bff',
    },
    Snow: {
      title: "It's a winter wonderland",
      subtitle: "go make build your fortresses",
      Highlight: "wonderland",
      color: '#eeeeee',
      background: '#4fa2d4',
    },
    Rain: {
      title: "Please rain, go away",
      subtitle: "It's pouring outside",
      Highlight: "go away",
      color: '#6300ff',
      background: '#676767',
    },
    Thunderstorm: {
      title: "Loud Thunderstrikes",
      subtitle: "Stay inside, kids",
      Highlight: "Loud",
      color: '#ffb605',
      background: '#4d4d4d',
    },
}

const iconNames = {
    Default: 'md-time',
    Clouds: 'ios-cloud',
    Clear: 'ios-sunny',
    Drizzle: 'md-rainy',
    Snow: 'ios-snow' ,
    Rain: 'ios-umbrella',
    Thunderstorm: 'ios-thunderstorm',

}



class App extends Component {



  componentWillMount(){
      this.state = 
    {
      temp: 0,
      weather: 'Default'  
    }
  }


  componentDidMount(){
    this.getLocation()


  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (posData) => fetchWeather(posData.coords.latitude,posData.coords.longitude)
        .then(res => this.setState({
          temp: Math.round(res.temp),
          weather: res.weather
        })),
      (error) => alert(error),
      {timeout:10000}
    )
  }

  render() {
    console.log('component is rendering')
    return(


      <View style={[styles.container, {backgroundColor: phrases[this.state.weather].background}]}>


        <StatusBar hidden={true}/>

        <View style={styles.header}>
           <Icon name={iconNames[this.state.weather]} size={80} color={'white'}/>
           <Text style={styles.temp}>{this.state.temp}° C</Text>
        </View>

         <View style={styles.body}>

            <Highlight 

              style = {styles.title}
              highlightStyle={{color: phrases[this.state.weather].color}}
              searchWords={[phrases[this.state.weather].Highlight]}
              textToHighlight={phrases[this.state.weather].title}
            />
            <Text style={styles.subtitle}>iWeather</Text>
        </View>
      </View>

    )

  }
}


const styles = StyleSheet.create(
  {

    container: {
      flex: 1,
      backgroundColor: '#ffd834',
    } ,      
    header: {
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'space-around',
      flex:1,
     // backgroundColor: 'blue'
    },
    temp: {
      fontFamily: 'HelveticaNeue-Bold',
      fontSize: 50,
      color: 'white',
    },
        
    body: {
      alignItems:'flex-start',
      justifyContent:'space-between',
      flex:2,

   //   backgroundColor: 'red',
      margin: 10,
        },
    title: {
      fontFamily: 'HelveticaNeue-Bold',
      fontSize: 70,
      color: 'white',

      marginBottom: 10,
      marginLeft: 35,
    },
    subtitle: {
      fontFamily: 'HelveticaNeue-Bold',
      fontSize: 16,
      color: 'white',
      marginLeft: 10,
    }
  }
)


AppRegistry.registerComponent('iweather', () => App)