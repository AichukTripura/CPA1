import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Expenditure from "./components/Expenditure";
import { PieChart } from 'react-minimal-pie-chart';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Expenditure" component={ExpenditureScreen} />
        <Stack.Screen name="Graph" component={GraphScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({navigation}) {
  return (
    <View style = {styles.container}>
      <View style={styles.button_row}>
        <Button
          title="Home"
          disabled
        />
        <Text> </Text>
        <Button
          title="About"
          onPress={() => navigation.navigate('About')}
        />
        <Text> </Text>
        <Button
          title="Expenditure"
          onPress={() => navigation.navigate('Expenditure')}
        />
        <Button
          title="Graph"
          onPress={() => navigation.navigate('Graph')}
        />
      </View>
      <Image
          style= {{flex: 7, flexDirection: 'column', justifyContent: 'center', width: 450}}
          source={{uri:'https://2015mirimstudent12.files.wordpress.com/2015/02/income.jpg'}}
        />
    </View>
  );

  
}

function AboutScreen({navigation}) {
  return (
    <View style = {styles.container}>
      <View style={styles.button_row}>
        <Button
          title="Home"
          onPress={() => navigation.navigate('Home')}
        />
        <Text> </Text>
        <Button
          title="About"
          disabled
        />
        <Text> </Text>
        <Button
          title="Expenditure"
          onPress={() => navigation.navigate('Expenditure')}
        />
        <Button
          title="Graph"
          onPress={() => navigation.navigate('Graph')}
        />
      </View>
      <Text style ={styles.main_text}>
        Hello, thank you for checking out this app. This is dedicated to personal expenditure tracking. It is a work in progress, but eventually it will help you keep track of your finances!
      </Text>
    </View>
  );
}

function GraphScreen({navigation}) {
  return (
    <View style = {styles.container}>
      <View style={styles.button_row}>
        <Button
          title="Home"
          onPress={() => navigation.navigate('Home')}
        />
        <Text> </Text>
        <Button
          title="About"
          onPress={() => navigation.navigate('About')}
        />
        <Text> </Text>
        <Button
          title="Expenditure"
          onPress={() => navigation.navigate('Expenditure')}
        />
        <Button
          title="Graph"
          disabled
        />
      </View>
      <PieChart
        data={[
          { title: 'Food', value: 10, color: '#E38627' },
          { title: 'Rent', value: 15, color: '#C13C37' },
          { title: 'Luxuries', value: 10, color: '#6A2135' },
        ]}
      />;
    </View>
  );
}

function ExpenditureScreen({navigation}) {
  const [expenditure, setExpenditure] = useState("");
  const [history, setHistory] = useState([]);
  const [sum, setSum] = useState(0);
  

  

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@history', jsonValue)
    } catch (e) {
      console.dir(e)
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@history')
      let data = null
      if (jsonValue!=null) {
        data = JSON.parse(jsonValue)
        setHistory(data.history)
        setSum(data.sum)
      } else {
        setHistory([])
        setSum(0)
      }
    } catch(e) {
      console.dir(e)
    }
  }
  

  const onPressOut = () => {  
    history.push(expenditure);
    setSum(parseInt(sum)+parseInt(expenditure))
    storeData({history, sum});
    setExpenditure(0);
  }
  const clearData  = () => {
    setHistory([]);
    setSum(0);
    setExpenditure(0);
  }
  useEffect(() => {getData()}
           ,[])
           
  let history_arr = history.map((a) => {
    return <View style={{ height:40, borderBottomWidth:2, borderBottomColor: '#ededed' }}><Text>{ a }</Text></View>                            
  })  

  return (
    <View style={styles.container}>
      <View style={styles.button_row}>
        <Button
          title="Home"
          onPress={() => navigation.navigate('Home')}
        />
        <Text> </Text>
        <Button
          title="About"
          onPress={() => navigation.navigate('About')}
        />
        <Text> </Text>
        <Button
          title="Expenditure"
          disabled
        />
        <Button
          title="Graph"
          onPress={() => navigation.navigate('Graph')}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="How Much Did You Spend?"
        keyboardType="numeric"
        onChangeText ={text => {setExpenditure(text)}}
        value = {expenditure}
      />
      <View style={{flexDirection: "row"}}>
        <Button
          title ="Enter"
          onPress = {() => {
            onPressOut();
            }
          }
        />
        <Button title ="Clear"
          onPress = {() => {
            clearData();

            }
          }
        />
      </View>
      <ScrollView style = {{maxHeight: 500}}>
        {history_arr}
        <Text style={{color:"#FF0000"}}>Sum: {sum}</Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button_row: { 
    flex: 1, 
    alignItems: 'flex-start', 
    justifyContent: 'center', 
    flexDirection: 'row' 
  },

  main_text: { 
    flex: 2, 
    alignItems: 'flex-start', 
    justifyContent: 'center', 
    flexDirection: 'row',
    fontSize: 30,
    color: '#FF0000'
  },

  input: {
    flex: 2,
    fontSize: 30
  }
});
