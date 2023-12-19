
import { StyleSheet, Text, View, TouchableOpacity, ScrollView,Image } from 'react-native'; // Añade ScrollView
import { useState } from 'react';
import REBRP61COMP from './formularios/REBRP6-1COMP' 
import REBP01 from './formularios/REBP-01';


export default function FormsComp() { // Cambiado el nombre a "App" en lugar de "app"
    const [indexColor, SetKey] = useState(0);
    const colors = ['#f7f9f1', '#efeff7'];
    const backgroundColor = colors[indexColor] || 'a';
    const borderColorLeft = indexColor === 0 ? '#d2e1b1' : 'black';
    const borderColorRight = indexColor === 1 ? '#e6e6fa' : 'black';
    const visible = indexColor === 0 ? true : false;
  
    function section(indexColor) {
      SetKey(indexColor = indexColor);
    }

    return (
        <View style={[styles.container, { backgroundColor }]}>
          <View style={{ alignItems: 'center',paddingBottom:'5%'}}> 
            {/* <Image source={require('./../../assets/')} /> */}
          </View>
          <View style={{ flexDirection: 'row'}}>
    
            <TouchableOpacity
              onPress={() => section(0)}
              style={[styles.touchableStyleLeft, { borderColor: borderColorLeft }]}>
              <Text style={styles.textTouch}>RE.BP-06</Text>
            </TouchableOpacity>
    
            <TouchableOpacity
              onPress={() => section(1)}
              style={[styles.touchableStyleRight, { borderColor: borderColorRight }]}>
              <Text style={styles.textTouch}>RE.BP-01</Text>
            </TouchableOpacity>
    
          </View>
    
          <ScrollView> 
            <View>
    
              {visible === true &&
                <View style={styles.elementsOfPage}>
                  <REBRP61COMP />
                </View>
    
                
              }
    
              {visible === false &&
                <View style={styles.elementsOfPage}>
                  <REBP01></REBP01>
                </View>
              }
            </View>
          </ScrollView> 
    

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