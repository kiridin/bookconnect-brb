import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const RedefinirSenha = () => {
  return (
    <View style={styles.container}>
      {/*  título */}
      <Text style={styles.title}>Redefinir senha</Text>
      
      {/* Descrição */}
      <Text style={styles.description}>
        Digite seu e-mail para enviarmos o link para a redefinição de senha.
      </Text>
      
      {/* Campo de entrada de e-mail */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-MAIL:</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      {/*Link para voltar ao login */}
      <TouchableOpacity onPress={() => {/*  aqui  a gente bota depois  a função para voltar ao login */}}>
        <Text style={styles.backToLogin}>Voltar para o login</Text>
      </TouchableOpacity>
      
      {/* Botão de enviar */}
      <TouchableOpacity style={styles.button} onPress={() => {/* aqui  a gente bota depois  a função para enviar e-mail de redefinição */}}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b97a57', // cor de fundo semelhante à da imagem
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  backToLogin: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    width: '50%',
    height: 40,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RedefinirSenha;
