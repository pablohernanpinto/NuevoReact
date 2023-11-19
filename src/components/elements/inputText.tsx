import React, { useState } from 'react';
import { StyleSheet, Text, View,TextInput } from 'react-native';


export default function InputText({nombre,ancho,place}){
    const [text, onChangeText] = React.useState('');
    const placeholder = place || 'Escribe aquí...   ';

    return (
        <View style={styles.body}>
          <Text style={[styles.styText, { width: ancho, textAlign: 'left' }]}>{nombre}</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder={placeholder}
            placeholderTextColor="#a9a9a9"
          />
      </View> 
    )
}


const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius:10,
  },
    styText:{
      width: "90%",
      paddingRight:4,
      fontSize: 15,
      paddingLeft: 15,
      fontWeight: 'bold', 

    },
    titulo: {
      fontWeight: 'bold', 
      fontSize: 17,
      paddingLeft:10,
      paddingBottom: 10,
      paddingRight:4,
    },

    body:{

      flexDirection: 'column',
      

    }
  });
  