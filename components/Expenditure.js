import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Expenditure = () => {
    return (
        <View>
            <TextInput
        style={styles.input}
        placeholder="How Much Did You Spend?"
        keyboardType="numeric"
        onChangeText ={text => {setExpenditure(text)}}
        value = {expenditure}
      />
      <Button
        title ="Enter"
        onPress = {() => {
          onPressOut();
          setExpenditure(0)
          }
        }
      />
      <ScrollView style = {{maxHeight: 500}}>
        {history_arr}
        <Text>Sum: {sum}</Text>
      </ScrollView>
      </View>
    )
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

export default Expenditure;