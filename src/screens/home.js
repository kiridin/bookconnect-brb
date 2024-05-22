import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Bookconnect = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [translateX] = useState(new Animated.Value(-250));

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(translateX, {
      toValue: -250,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  return (
    
    <SafeAreaView style={styles.container}>
       
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={openMenu}>
          <Icon name="bars" size={24} color="#4b3832" />
        </TouchableOpacity>
        <TextInput style={styles.searchInput} placeholder="Pesquisar..." placeholderTextColor="#4b3832"/>
        <Icon name="search" size={24} color="#4b3832" />
      </View>
      <Text style={styles.sectionTitle}>Populares</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bookRow}>
        <Image style={styles.bookImage} source={{ uri: 'https://via.placeholder.com/120x180?text=Capa+1' }} />
        <Image style={styles.bookImage} source={{ uri: 'https://via.placeholder.com/120x180?text=Capa+2' }} />
        <Image style={styles.bookImage} source={{ uri: 'https://via.placeholder.com/120x180?text=Capa+3' }} />
        <Image style={styles.bookImage} source={{ uri: 'https://via.placeholder.com/120x180?text=Capa+4' }} />
      </ScrollView>
      <Text style={styles.sectionTitle}>Adicionados Recentemente</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bookRow}>
        <Image style={styles.bookImage} source={{ uri: 'https://via.placeholder.com/120x180?text=Capa+5' }} />
        <Image style={styles.bookImage} source={{ uri: 'https://via.placeholder.com/120x180?text=Capa+6' }} />
        <Image style={styles.bookImage} source={{ uri: 'https://via.placeholder.com/120x180?text=Capa+7' }} />
        <Image style={styles.bookImage} source={{ uri: 'https://via.placeholder.com/120x180?text=Capa+8' }} />
      </ScrollView>
      <View style={styles.navbar}>
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
      </View>

      {menuVisible && (
        <Modal
          transparent={true}
          animationType="none"
          visible={menuVisible}
          onRequestClose={closeMenu}>
          <Pressable style={styles.overlay} onPress={closeMenu}>
            <Animated.View style={[styles.sideMenu, { transform: [{ translateX }] }]}>
              <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
                <Icon name="times" size={36} color="#ffffff" />
              </TouchableOpacity>
              <Text style={styles.menuItem}>Atena</Text>
              <Text style={styles.menuItem}>Catálogo</Text>
              <Text style={styles.menuItem}>Chat</Text>
              <Text style={styles.menuItem}>Localização</Text>
              <Text style={styles.menuItem}>Quem somos</Text>
            </Animated.View>
          </Pressable>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e5dc',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 20,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: '#4b3832',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 20,
    color: '#4b3832',
    textTransform: 'uppercase',
    letterSpacing: 1,
    position: 'relative',
    marginHorizontal: 20,
  },
  bookRow: {
    flexDirection: 'row',
    paddingBottom: 10,
    marginHorizontal: 20,
  },
  bookImage: {
    width: 120,
    height: 180,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#4b3832',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
  },
  sideMenu: {
    height: '100%',
    width: 250,
    backgroundColor: '#4b3832',
    paddingTop: 60,
    paddingHorizontal: 25,
    position: 'absolute',
    left: 0,
    top: 0,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  menuItem: {
    fontSize: 22,
    color: '#ffffff',
    marginVertical: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#4b3832',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default Bookconnect;
