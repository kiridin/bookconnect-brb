import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient'; // Importe o componente LinearGradient

const Navbar = () => {
  return (
    <LinearGradient
      colors={['#4b3832', '#d7b8a1']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.navbar}
    >
      <TouchableOpacity>
        <Icon name="search" size={28} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="home" size={28} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="book" size={28} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="user" size={28} color="#ffffff" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default Navbar;
