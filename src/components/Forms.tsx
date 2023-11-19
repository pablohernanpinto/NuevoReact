
import { StyleSheet, Text, View, TouchableOpacity, ScrollView,Image } from 'react-native'; // Añade ScrollView
import { useState } from 'react';
import REBRP61COMP from './formularios/REBRP6-1COMP' 
import REBP01 from './formularios/REBP-01';


export default function FormsComp({navigation}) { // Cambiado el nombre a "App" en lugar de "app"

    

    return (
        <View style={[styles.container, { backgroundColor }]}>
          <Button color={'green'} title="Ingresar" onPress={() =>  navigation.navigate('REBP-01')}/>
          <Button color={'green'} title="Ingresar" onPress={() =>  navigation.navigate('REBP-06')}/>
        </View>
      );
}



const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      flex: 1,
    },
    elementsOfPage: {
      flexDirection: 'column',
      paddingTop: 30,
    },
    touchableStyleLeft: {
      backgroundColor: '#f9fdee',
      alignItems: 'flex-start',
      borderWidth: 3,
      margin: 3,
      flex: 1,
      borderRadius: 10,
    },
    touchableStyleRight: {
      backgroundColor: '#efeff7',
      alignItems: 'flex-end',
      margin: 3,
      borderWidth: 3,
      flex: 1,
      borderRadius: 10,
    },
    textTouch: {
      alignSelf: 'center',
      fontSize: 20,
    }
  });