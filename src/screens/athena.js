import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import { FontAwesome } from '@expo/vector-icons';
import InputWithHamburgerMenu from '../components/input';
import Navbar from '../components/navbar'
import { LinearGradient } from 'expo-linear-gradient'; 


function ChatApp() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Oi, eu sou Athena a IA da BookConnect, que te indica o melhor livro pra sua melhor leitura. Sobre o que gostaria de ler?',
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const scrollViewRef = useRef();

  const sendMessage = async () => {
    if (isRequestInProgress) return;

    const userInputValue = userInput.trim();
    if (userInputValue !== '') {
      addMessageToChat(userInputValue, 'user');

      setUserInput('');
      setIsRequestInProgress(true);

      const typingIndicator = { role: 'assistant', content: 'typing...' };
      setMessages((prevMessages) => [...prevMessages, typingIndicator]);

      try {
        const response = await fetch('http://127.0.0.1:5000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userInputValue }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const result = await response.json();
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.content !== 'typing...'));
        addMessageToChat(result.response, 'assistant');
      } catch (error) {
        console.error('Fetch error: ', error);
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.content !== 'typing...'));
        addMessageToChat('Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente mais tarde.', 'assistant');
      } finally {
        setIsRequestInProgress(false);
      }
    }
  };

  const addMessageToChat = (message, role) => {
    setMessages((prevMessages) => [...prevMessages, { role, content: message }]);
  };

  const startVoiceRecognition = async () => {
    Speech.speak('Sistema de voz ainda está sendo criado');
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <InputWithHamburgerMenu />
        <LinearGradient
          colors={['#EBDACC', '#EBDACC']}
          start={[0, 0]}
          end={[0, 1]}
          style={styles.titleContainer}
        >
          <Text style={styles.title}>ATHENA</Text>
        </LinearGradient>
        <ScrollView
          style={styles.chatMessages}
          contentContainerStyle={styles.chatMessagesContent}
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                message.role === 'user' ? styles.userMessageContainer : styles.assistantMessageContainer,
              ]}
            >
              <Image
                source={message.role === 'user' ? require('../../assets/user.png') : require('../../assets/athena.png')}
                style={styles.avatar}
              />
              <View style={[styles.message, message.role === 'user' ? styles.userMessage : styles.assistantMessage]}>
                {message.content === 'typing...' ? (
                  <View style={styles.typingContainer}>
                    <View style={styles.typingDot} />
                    <View style={styles.typingDot} />
                    <View style={styles.typingDot} />
                  </View>
                ) : (
                  <Text style={message.role === 'user' ? styles.userMessageText : styles.assistantMessageText}>{message.content}</Text>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.userInput}
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity style={styles.voiceButton} onPress={startVoiceRecognition}>
            <FontAwesome name="microphone" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={isRequestInProgress}>
            {isRequestInProgress ? <ActivityIndicator color="#fff" /> : <FontAwesome name="paper-plane" size={24} color="white" />}
          </TouchableOpacity>
        </View>
        <Text style={styles.disclaimer}>As respostas da IA podem conter informações incorretas ou imprecisas.</Text>
      </View>
      <Navbar />
    </KeyboardAvoidingView>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBDACC',
    padding: 20,
  },
  titleContainer: {
    marginBottom: 10,
   
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 470,
    // borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#5A0F19',
    textAlign: 'center',
  },
  chatMessages: {
    flex: 1,
    width: '100%',
  },
  chatMessagesContent: {
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse',
    marginLeft: 'auto',
  },
  assistantMessageContainer: {},
  message: {
    maxWidth: '70%',
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  userMessage: {
    backgroundColor: '#8A3119',
  },
  assistantMessage: {
    backgroundColor: '#E0E0E0',
  },
  userMessageText: {
    color: 'white',
  },
  assistantMessageText: {
    color: '#000',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    borderRadius: 20,
  },
  userInput: {
    flex: 1,
    padding: 15,
    borderRadius: 30,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 60,
  },
  voiceButton: {
    backgroundColor: '#5A0F19',
    borderRadius: 30,
    padding: 15,
    paddingLeft: 19,
    paddingRight: 19,
    marginRight: 10,
    marginBottom: 60,
  },
  sendButton: {
    backgroundColor: '#5A0F19',
    borderRadius: 30,
    padding: 15,
    marginBottom: 60,
  },
  sendButtonText: {
    color: 'white',
  },
  disclaimer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#888',
    marginTop: -50,
    marginBottom: 40,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    width: 8,
    height: 8,
    backgroundColor: '#ccc',
    borderRadius: 50,
    marginHorizontal: 2,
  },
});


export default ChatApp;
