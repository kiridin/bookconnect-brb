import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ChatApp from './src/screens/athena'; 
import RedefinirSenha from  './src/screens/redefinir';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RedefinirSenha /> 
      {/* você muda aqui dentro pro nome da função que quiser exibir  */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e5dc',
  },
});

export default App;
