import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import RNFS from 'react-native-fs';

export default function App() {
  const createJsonFile = async (fileName: string, content: { mensaje: string; }) => {
    const path = RNFS.ExternalDirectoryPath + `/${fileName}.json`;

    try {
      await RNFS.writeFile(path, JSON.stringify(content), 'utf8');
      console.log(`Archivo ${fileName}.json creado en ${RNFS.ExternalDirectoryPath}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateJson = () => {
    createJsonFile('ejemplo2', { mensaje: 'Hola Mundo' });
  };

  useEffect(() => {
    // Llamar a la función createJsonFile cuando el componente se monta
    createJsonFile('ejemplo2', { mensaje: 'Hola Mundo' });
  }, []); // La dependencia vacía asegura que esto solo se ejecute una vez cuando se monta el componente

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Crear Archivo JSON" onPress={handleCreateJson} />
    </View>
  );
}
