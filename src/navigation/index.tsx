import * as React from 'react';
import {SectionList, Appearance, useColorScheme } from 'react-native'; // Agrega Appearance aquí
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from '../../App';
import REBP01 from '../components/formularios/REBP-01';
import REBRP61COMP from '../components/formularios/REBRP6-1COMP';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';




const Stack = createNativeStackNavigator();

function Navigation() {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => {
      subscription.remove();
    };
  }, []);

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


