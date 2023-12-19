import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Uno from '../recuadros/Uno';
import Dos from '../recuadros/Dos';
import Tres from '../recuadros/Tres';
import Cuatro from '../recuadros/Cuatro';

 const REBRP61COMP = ({navigate}) =>{
    const [checkBoxStates, setCheckBoxStates] = useState([false, false]);
    const [text, onChangeText] = React.useState('');
    const [text1, onChangeText1] = React.useState('');
    const [text2, onChangeText2] = React.useState('');
    const [text3, onChangeText3] = React.useState('');
    const [text4, onChangeText4] = React.useState('');
    const [text5, onChangeText5] = React.useState('');
    const [text6, onChangeText6] = React.useState('');
    const [text7, onChangeText7] = React.useState('');
    const [text8, onChangeText8] = React.useState('');

    const elementosizq2 = ['JCManzana','JCPera','JCFrambuesa','JCDurazno','Aroma','Manz Cloudy','JCFrutilla'];
    const elementosDer2 = ['JCCiruelas secas','JCUva','JCCiruela','Pasta Tomate','Pulpa Manzana','Pulpa Durazno'];
    const elementosIzq3 = ['51,8','52','53,7','54,7','55','60','300','Flexi','Otro'];

    const elementosFinal  = ['REVISION PESO ETIQUETA DE ENVASADO', 'REVISION FECHA ETIQUETA DE ENVASADO']


  return (
    <ScrollView> 
      <View style = {styles.fondo}>
            <View >
              <Uno></Uno>
            </View>

            <View>
              <Dos></Dos>
            </View>
            <View >
              <Tres></Tres>
            </View>
            <View >
              <Cuatro></Cuatro>
            </View>
        
      </View>
    </ScrollView> 
  )}


export default REBRP61COMP;

  const styles = StyleSheet.create({
    fondo:{
      backgroundColor:'#f9fdee',
    },
    Container: {
      flex:1,
    },
    containerDrop:{
      paddingLeft: 10,
    },
    
    firstContainer:{
        borderWidth:1,
        width:'97%',
        margin:"1.5%"
    },
    


    box:{
        backgroundColor:'white',
        width: '95%',


    },
    titulo: {
      fontWeight: 'bold', 
      fontSize: 17,
      paddingLeft:'1%',
      paddingBottom: 10,
      paddingRight:4,
    },

    inputOtros: {
      width: "90%",
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: 'white',
      borderRadius:10,
      borderColor:'red',
    },
    selectList:{
      backgroundColor:'white',
      width: '95%',
    }
  });