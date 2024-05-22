import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,
  Animated,
  Easing,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const InputWithHamburgerMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [translateX] = useState(new Animated.Value(-300));

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
      toValue: -300,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchBar}>
          <TouchableOpacity onPress={openMenu}>
            <Icon name="bars" size={24} color="#4b3832" />
          </TouchableOpacity>
          <TextInput style={styles.searchInput} placeholder="Pesquisar..." placeholderTextColor="#4b3832"/>
          <Icon name="search" size={24} color="#4b3832" />
        </View>
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
              <View style={styles.menuItem}>
                <Icon name="book" size={22} color="#ffffff" style={styles.menuIcon} />
                <Text style={styles.menuText}>Atena</Text>
              </View>
              <View style={styles.menuItem}>
                <Icon name="list" size={22} color="#ffffff" style={styles.menuIcon} />
                <Text style={styles.menuText}>Catálogo</Text>
              </View>
              <View style={styles.menuItem}>
                <Icon name="comments" size={22} color="#ffffff" style={styles.menuIcon} />
                <Text style={styles.menuText}>Chat</Text>
              </View>
              <View style={styles.menuItem}>
                <Icon name="map-marker" size={22} color="#ffffff" style={styles.menuIcon} />
                <Text style={styles.menuText}>Localização</Text>
              </View>
              <View style={styles.menuItem}>
                <Icon name="bookmark" size={22} color="#ffffff" style={styles.menuIcon} />
                <Text style={styles.menuText}>Minha Estante</Text>
              </View>
              <View style={styles.menuItem}>
                <Icon name="info-circle" size={22} color="#ffffff" style={styles.menuIcon} />
                <Text style={styles.menuText}>Quem somos?</Text>
              </View>
            </Animated.View>
          </Pressable>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '',
  },
  searchBarWrapper: {
    backgroundColor: '',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 999,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: '#4b3832',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  sideMenu: {
    height: '100%',
    width: 230,
    backgroundColor: '#4b3832',
    paddingTop: 60,
    paddingHorizontal: 20,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingRight: 20,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 18,
    color: '#ffffff',
    flexShrink: 1,
    width: 200,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: -160,
    backgroundColor: '#4b1a21',
    borderRadius: 50,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default InputWithHamburgerMenu;
