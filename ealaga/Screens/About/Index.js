import { ScrollView } from "native-base";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Colors from "../../Shared/Color";

// Shared
import Header from "../../Shared/Header";

// Dimensions
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AboutContainer = (props) => {
  const [modalVisible, setModalVisible] = useState(true);
  const position = new Animated.Value(0);

  Animated.loop(
    Animated.sequence([
      Animated.timing(position, {
        toValue: 10,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(position, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }),
    ])
  ).start();

  return (
    <SafeAreaProvider style={styles.container}>
      <Header navigation={props.navigation} />
      <ScrollView>
        <View style={styles.imagecontainer}>
          <Animated.Image
            source={require("../../assets/center.png")}
            style={[
              styles.imahe,
              {  bottom: position },
            ]}
             
          />
        </View>
        <Text style={styles.title}>Taguig City Center for the Elderly</Text>

        <Text style={styles.description}>
          The five-storey wellness hub for Taguigeño senior citizens was opened
          last April, and features a therapy pool, a massage room, two saunas, a
          yoga room, a gym, and cinema for relaxation purposes. It also comes
          with a dialysis center to accommodate 15 patients at a time, and a
          multi-purpose hall for city programs and recreational activities.
        </Text>
        <Text style={styles.title1}>Organizations</Text>
        <View style={styles.rowcontainer}>
          <View style={styles.firstrow}>
            <Image
              source={require("../../assets/favicon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.secondrow}>
            <Image
              source={require("../../assets/osca-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.thirdrow}>
            <Image
              source={require("../../assets/tup.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.fourthrow}>
            <Image
              source={require("../../assets/ilovetaguig.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        style={styles.modalView}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalBody}>
            <Image
              source={require("../../assets/giphy.gif")}
              resizeMode="contain"
              style={styles.image}
            />
            <Text style={styles.headertitle}>Well done!</Text>
            <Text style={styles.subheader}>
              You have successfully logged in
            </Text>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.closebutton}
              onPress={() => [setModalVisible(false)]}
            >
              <Text style={styles.closebuttonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  title: {
    textAlign: "center",
    color: Colors.TextColor,
    fontSize: 24,
    // fontWeight:"500",
    fontWeight: "bold",
  },
  title1: {
    textAlign: "center",
    color: Colors.TextColor,
    fontSize: 24,
    fontWeight: "bold",
    margintop: 20,
  },
  imagecontainer: {
    backgroundColor: Colors.main,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  imahe: {
    width: 300,
    height: 200,
  },
  description: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 25,
    marginTop: 10,
    marginBottom: 20,
  },
  rowcontainer: {
    marginTop: -10,
    flex: 1,
    flexDirection: "row",
    // backgroundColor: '#1f2041',
  },
  firstrow: {
    width: windowWidth / 4,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  secondrow: {
    width: windowWidth / 4,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  thirdrow: {
    width: windowWidth / 4,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  fourthrow: {
    width: windowWidth / 4,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 100,
    // borderRadius:100
  },
  centeredView: {
    alignItems: "center",
    width: "90%",
    // minHeight: 300,
    alignSelf: "center",
    elevation: 20,
    borderColor: "#c5c5c5",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.main,
    position: "absolute",
    bottom: 200,
  },
  modalBody: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
  },
  image: {
    height: 250,
    width: 250,
    alignSelf: "center",
  },
  footer: {
    backgroundColor: Colors.main,
    width: "100%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  headertitle: {
    fontSize: 20,
    color: Colors.gray,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closebutton: {
    backgroundColor: "#EF3A47",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#ff1717",
    paddingVertical: 10,
    // position: "absolute",
    // right: 0,
    // margin: 10,
    padding: 10,
    width: 70,
  },
  closebuttonText: {
    color: Colors.TextWhite,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default AboutContainer;
