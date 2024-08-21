import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import { useNavigation } from '@react-navigation/native';
import { BACKEND_URL } from '../utils/constants';

const Header = ({ route }) => {
  const navigation = useNavigation();
  const { name, image } = route.params.group;

  let imageSource = image 
    ? { uri: `${image.uri}` } 
    : require("../../assets/chatanony.png");

  if (image == 22){
    imageSource = require("../../assets/chatanony.png")
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.branding}>
        <View style={styles.left}>
          <ExpoFastImage
            style={styles.logo}
            source={imageSource}
          />
          <Text style={styles.brand}>
            {name}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#292f3f",    
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  branding: {
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20
  },
  brand: {
    color: "#fff",
    fontSize: 25,
  },
  logo: {
    width: 50,
    height: 50,
    padding: 0,
    marginRight: 20,
    borderRadius: 25, // Makes the image circular
  },
});

export default Header;
