import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';
import ReactNativeBlobUtil from 'react-native-blob-util'

const App = ({ route }) => {
  const [path, setPath] = React.useState();
  const { updatedContentAfterWrite } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    generatePDF();
    
  }, []);

  const generatePDF = async () => {
    const htmlContent = 
    '';
    const options = {
      html: htmlContent,
      fileName: String(updatedContentAfterWrite?.index),
      directory: 'Document',
    };

    try {
      const pdf = await RNHTMLtoPDF.convert(options);
      setPath(pdf);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };

  const viewPDF = async () => {
    try {
      console.log(path?.filePath);
      const pdfPath = path?.filePath;
  
      const fileExists = await RNFS.exists(pdfPath);
  
      if (fileExists) {
        // Abre el PDF utilizando react-native-file-viewer con tipo MIME especificado
        await FileViewer.open(pdfPath, { showOpenWithDialog: true, onDismiss: () => {} });
        console.log('Archivo abierto con éxito');
      } else {
        console.error('El archivo PDF no existe.');
      }
    } catch (error) {
      console.error('Error al abrir el PDF:', error);
    }
  };
  
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Ver PDF" onPress={viewPDF} />
    </View>
  );
};

export default App;
