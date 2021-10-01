import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Expenditure" component={ExpenditureScreen} />
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
      </View>
      <Text style ={styles.main_text}>
        Hello, thank you for checking out this app. This is dedicated to personal expenditure tracking. It is a work in progress, but eventually it will help you keep track of your finances!
      </Text>
    </View>
  );
}

function ExpenditureScreen({navigation}) {
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
      </View>
      <TextInput
        style={styles.input}
        placeholder="How Much Did You Spend?"
        keyboardType="numeric"
      />
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
