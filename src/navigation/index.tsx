import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from '../../App';
import REBP01 from '../components/formularios/REBP-01';
import REBRP61COMP from '../components/formularios/REBRP6-1COMP';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Formularios" component={App} />
        <Stack.Screen name="REBP-01" component={REBP01} />
        <Stack.Screen name="REBP-06" component={REBRP61COMP} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;