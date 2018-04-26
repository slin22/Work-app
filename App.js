import React, { Component } from 'react';
import { DatePickerIOS, StyleSheet, Text, View, TouchableOpacity, TextInput, ListItem } from 'react-native';
import { Button } from 'react-native';
import {Alert} from 'react-native';


export default class App extends Component {
  state = { chosenDate: new Date(), tasks: [], text: '', completed: 0, showAdder: false, startTime: null, endTime: null, res:'', start:'', end:'', time: 0 }
  onPressAdd = () => {
   this.setState({showAdder: true});
}

  onPressSubmit = () => {
    this.setState({showAdder: false})
    this.setState({tasks: this.state.tasks.concat([this.state.text])})
    this.setState({text: ''})
  }


  getstarttime = () => {
    var date1 = Date.now();
    this.setState({startTime: date1});
    var date4 = Date(Date.now());
    this.setState({start:date4.toString()});
  }

  getendtime = () => {
    var date2 = Date.now();
    var date3 = Date(Date.now());
    this.setState({endTime: date2});
    this.setState({end:date3.toString()})

    if (date2 < this.state.startTime) {
      date2.setDate(date2.getData() + 1);
    }

    var diff = date2-this.state.startTime;
    this.setState({time:this.state.time+diff});
    var msec = this.state.time+diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    this.setState({res: hh.toString() + " hours " + mm.toString() + " minutes " + ss.toString() + " seconds "});
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate})
  }

    constructor(props) {
      super(props);
        this.setDate = this.setDate.bind(this);
      
    }

  render() {
    return (

      <View style={styles.container}>
        <Text style={styles.title}>My Tasks</Text>
          {
            
            this.state.showAdder && <View style={styles.submitcontainer}> <TextInput style={styles.textinput} placeholder="Enter a task name..." onChangeText={(text) => this.setState({text})} value={this.state.text} />
            this.state.showAdder && 
            <View style={styles.date}>
            <DatePickerIOS date={this.state.chosenDate} onDateChange={this.setDate}/>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={this.onPressSubmit} color="#2196F3">
              <Text>Submit</Text>
            </TouchableOpacity>
            </View>
          }
           
          <TouchableOpacity style={styles.button} onPress={this.onPressAdd} color="blue">
            <Text> Add a task </Text>
          </TouchableOpacity>

          {
            this.state.tasks.map((task) => (
              <View>
              <View style = {styles.taskname}>
                <Text style = {styles.tasktext}>{task}</Text>
              </View>

              <View style={styles.taskinfo}>
                <Text style={styles.infotext}>Due date: {this.state.chosenDate.getMonth()+1}/{this.state.chosenDate.getDate()} {this.state.chosenDate.getHours()}:{this.state.chosenDate.getMinutes()}</Text>
                <Text style={styles.infotext}>Completed: <View style={{height: 10, width: this.state.completed*20, backgroundColor: 'black'}}></View><View style={{height: 10, width: 200-this.state.completed*20, backgroundColor: 'white', borderWidth:2, borderColor:'black'}}></View> </Text>
                
                <Text style={styles.infotext}>Time Spent: {this.state.res}</Text>

                <Text style={styles.infotext}>Est Time Remaining:</Text>
              </View>

              <TouchableOpacity style={styles.startbutton} onPress={this.getstarttime}><Text>Start</Text></TouchableOpacity>
              <TouchableOpacity style={styles.stopbutton} onPress={this.getendtime}><Text>Stop</Text></TouchableOpacity>
              
              </View>
            ))
          }
           
      </View>
    );
  }
}

const styles = StyleSheet.create({
  taskname: {
    padding: 5,
    height: 37,
    marginTop: 13,
    backgroundColor: 'lightblue',
    alignItems: 'center',
  },

  startbutton: {
    padding: 4,
    height: 30,
    width: 193,
    backgroundColor: 'lightgreen',
    borderColor: 'grey',
    borderWidth: 2,
    alignItems: 'center',
  },

  stopbutton: {
    padding: 4,
    height: 30,
    width: 183,
    backgroundColor: 'pink',
    borderWidth: 2,
    borderColor: 'grey',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    marginTop: 136,

  },

  container: {
    flex: 1,
    backgroundColor: 'antiquewhite',

  },

  textinput: {
    height: 40,
    width: 200,
    marginLeft: 23,
    marginTop: 25,
    borderColor: 'gray',
    textAlign: 'center',
    borderWidth: 2,
    padding: 10,
  },

  infotext: {
    margin: 2,
  },

  submitButton: {
     height: 30, 
     width: 70,
     right: 10, 
     padding: 5,
     marginTop: 20,
     marginLeft: 100,
     alignItems: 'center', 
     borderColor: 'gray', 
     borderWidth: 2,
     zIndex: 1,
  },


  button: {
    height: 40,
    width: 100,
    marginLeft: 10,
    marginTop: 40,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#DDDDDD',
    padding: 10,
    zIndex: 1,
  },

  tasktext: {
    color:'black',
    fontSize: 20,
  },

  submitcontainer: {
    marginTop: 20,
    marginLeft: 60,
    height: 400,
    width: 250,
    zIndex:2,
    backgroundColor: 'white',
    position: 'relative',
  },

  title: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 80,

  },

  date: {
    margin: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

  taskinfo: {
    width: 400,
    height: 86,
    backgroundColor: 'lightgrey',
  },

});
