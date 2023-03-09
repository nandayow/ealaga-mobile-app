import React, { useCallback, useContext, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Container, Input } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from "react-native-toast-message";

import mime from "mime";
import Spinner from "react-native-loading-spinner-overlay";

import { Entypo } from "@expo/vector-icons";
// Color
import Colors from "../../../Shared/Color";

// Fething Data
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";

import AuthGlobal from "../../../Context/store/AuthGlobal";
import { logoutUser } from "../../../Context/actions/Auth.actions";

// Shared
import FormContainerProfile from "../../../Shared/Form/FormContainerProfile";
import InputModal from "../../../Shared/Form/InputModal";
import FormContainerModal from "../../../Shared/Form/FormContainerModal";
import SuperAlert from "react-native-super-alert";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Dimensions
const windowWidth = Dimensions.get("window").width;

function Personal() {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [first_name, setFirstname] = useState("");
  const [middle_name, setMiddlename] = useState("");
  const [last_name, setLastname] = useState("");
  const [birth_date, setBirthday] = useState("");
  const [age, setAge] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [mainImage, setMainImage] = useState();
  const [validId, setValidId] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date(1963, 10, 1));
  const [gender, setGender] = useState("");
  const [genderoption, setGenderOption] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Bagumbayan", value: "Bagumbayan" },
    { label: "Bambang", value: "Bambang" },
    { label: "Calzada", value: "Calzada" },
    { label: "Central Bicutan", value: "Central Bicutan" },
    { label: "Central Signal Village", value: "Central Signal Village" },
    { label: "Fort Bonifacio", value: "Fort Bonifacio" },
    { label: "Hagonoy", value: "Hagonoy" },
    { label: "Ibayo-tipas", value: "Ibayo-tipas" },
    { label: "Katuparan", value: "Katuparan" },
    { label: "Ligid-tipas", value: "Ligid-tipas" },
    { label: "Lower Bicutan", value: "Lower Bicutan" },
    { label: "Maharlika Village", value: "Maharlika Village" },
    { label: "Napindan", value: "Napindan" },
    { label: "New Lower Bicutan", value: "New Lower Bicutan" },
    { label: "North Daang Hari", value: "North Daang Hari" },
    { label: "North Signal Village", value: "North Signal Village" },
    { label: "Palingon", value: "Palingon" },
    { label: "Pinagsama", value: "Pinagsama" },
    { label: "San Miguel", value: "San Miguel" },
    { label: "Santa Ana", value: "Santa Ana" },
    { label: "South Daang Hari", value: "South Daang Hari" },
    { label: "South Signal Village", value: "South Signal Village" },
    { label: "Tanyag", value: "Tanyag" },
    { label: "Tuktukan", value: "Tuktukan" },
    { label: "Upper Bicutan", value: "Upper Bicutan" },
    { label: "Ususan", value: "Ususan" },
    { label: "Wawa", value: "Wawa" },
    { label: "Western Bicutan", value: "Western Bicutan" },
  ]);
  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("User");
      }
      setLoading(true);
      AsyncStorage.getItem("jwt")
        .then((res) => {
          axios
            .get(
              `${baseURL}users/profile/edit/${context.stateUser.user.userId}`,
              {
                headers: { Authorization: `Bearer ${res}` },
              }
            )
            .then((user) => [
              setUserProfile(user.data),
              setFirstname(context.stateUser.user.firstname),
              setMiddlename(context.stateUser.user.middlename),
              setLastname(context.stateUser.user.lastname),
              setToken(res),
              setGender(context.stateUser.user.gender),
              setHouseNumber(context.stateUser.user.address.house_purok_no),
              setStreet(context.stateUser.user.address.street),
              setValue(context.stateUser.user.address.barangay),
              setLoading(false),
            ]);
        })
        .catch((error) => console.log(error));

      // Image Picker
      (async () => {
        if (Platform.OS !== "web") {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
          }
        }
      })();
    }, [])
  );
  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setMainImage(result.uri);
    }
  };

  const pickIValidId = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setValidId(result.uri);
    }
  };

  const pullMe = () => {
    setRefresh(true);
    AsyncStorage.getItem("jwt")
      .then((res) => {
        axios
          .get(
            `${baseURL}users/profile/edit/${context.stateUser.user.userId}`,
            {
              headers: { Authorization: `Bearer ${res}` },
            }
          )
          .then(
            (user) => setUserProfile(user.data),
            setFirstname(context.stateUser.user.firstname),
            setMiddlename(context.stateUser.user.middlename),
            setLastname(context.stateUser.user.lastname),
            setToken(res),
            setGender(context.stateUser.user.gender),
            setHouseNumber(context.stateUser.user.address.house_purok_no),
            setStreet(context.stateUser.user.address.street),
            setValue(context.stateUser.user.address.barangay)
          );
        setTimeout(() => {
          setRefresh(false);
        }, 500);
      })
      .catch((error) => console.log(error));
    return () => {
      setUserProfile();
    };
  };

  const showModal = () => {
    setFirstname(userProfile ? userProfile.user.first_name : " ");
    setMiddlename(userProfile ? userProfile.user.middle_name : " ");
    setLastname(userProfile ? userProfile.user.last_name : "");
    setGender(userProfile ? userProfile.user.gender : ""),
      setHouseNumber(
        userProfile ? userProfile.user.address.house_purok_no : ""
      ),
      setStreet(userProfile ? userProfile.user.address.street : ""),
      setValue(userProfile ? userProfile.user.address.barangay : ""),
      setModalVisible(true);
  };

  const UpdateProfile = () => {
    var oras = new Date(); //Current Hours
    let getYearNow = moment(oras).format("YYYY");
    let getYearBirthdate = moment(date).format("YYYY");
    let edad = getYearNow - getYearBirthdate;

    let newBirtdate = moment(date).format();
    setBirthday(date);
    setAge(edad);

    if (userProfile && userProfile.user.account_verified !== "not verified") {
      let formData = new FormData();
      if (validId !== undefined && mainImage !== undefined) {
        const newValidIdUri = "file:///" + validId.split("file:/").join("");

        formData.append("valid_id", {
          uri: newValidIdUri,
          type: mime.getType(newValidIdUri),
          name: newValidIdUri.split("/").pop(),
        });

        const newImageUri = "file:///" + mainImage.split("file:/").join("");
        formData.append("profile_picture", {
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: newImageUri.split("/").pop(),
        });

        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("middle_name", middle_name);
        formData.append("birth_date", newBirtdate);
        formData.append("age", edad);
        formData.append("gender", gender);
        formData.append("house_purok_no", houseNumber);
        formData.append("street", street);
        formData.append("barangay", value);

        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .put(
            `${baseURL}users/profile/updateSubmit/${context.stateUser.user.userId}`,
            formData,
            config
          )
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Profile successfuly updated",
                text2: "Great!",
              });
              setLoading(false);
              // props.navigation.navigate("User");
              pullMe();
            }
          })
          .catch((error) => {
            setLoading(false);
            Toast.show({
              topOffset: 60,
              type: "error",
              text1: "Something went wrong",
              text2: "Please try again",
            });
          });
        setModalVisible(false);
      } else if (validId === undefined && mainImage === undefined) {
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("middle_name", middle_name);
        formData.append("birth_date", newBirtdate);
        formData.append("age", edad);
        formData.append("gender", gender);
        formData.append("house_purok_no", houseNumber);
        formData.append("street", street);
        formData.append("barangay", value);

        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .put(
            `${baseURL}users/profile/updateSubmit/${context.stateUser.user.userId}`,
            formData,
            config
          )
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Profile successfuly updated",
                text2: "Great!",
              });
              setLoading(false);
              // props.navigation.navigate("User");
              pullMe();
            }
          })
          .catch((error) => {
            setLoading(false);
            Toast.show({
              topOffset: 60,
              type: "error",
              text1: "Something went wrong",
              text2: "Please try again",
            });
          });
        setModalVisible(false);
      } else if (validId !== undefined && mainImage === undefined) {
        const newValidIdUri = "file:///" + validId.split("file:/").join("");

        formData.append("valid_id", {
          uri: newValidIdUri,
          type: mime.getType(newValidIdUri),
          name: newValidIdUri.split("/").pop(),
        });

        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("middle_name", middle_name);
        formData.append("birth_date", newBirtdate);
        formData.append("age", edad);
        formData.append("gender", gender);
        formData.append("house_purok_no", houseNumber);
        formData.append("street", street);
        formData.append("barangay", value);

        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .put(
            `${baseURL}users/profile/updateSubmit/${context.stateUser.user.userId}`,
            formData,
            config
          )
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Profile successfuly updated",
                text2: "Great!",
              });
              setLoading(false);
              // props.navigation.navigate("User");
              pullMe();
            }
          })
          .catch((error) => {
            setLoading(false);
            Toast.show({
              topOffset: 60,
              type: "error",
              text1: "Something went wrong",
              text2: "Please try again",
            });
          });
        setModalVisible(false);
      } else {
        const newImageUri = "file:///" + mainImage.split("file:/").join("");
        formData.append("profile_picture", {
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: newImageUri.split("/").pop(),
        });

        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("middle_name", middle_name);
        formData.append("birth_date", newBirtdate);
        formData.append("age", edad);
        formData.append("gender", gender);
        formData.append("house_purok_no", houseNumber);
        formData.append("street", street);
        formData.append("barangay", value);

        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .put(
            `${baseURL}users/profile/updateSubmit/${context.stateUser.user.userId}`,
            formData,
            config
          )
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Profile successfuly updated",
                text2: "Great!",
              });
              setLoading(false);
              // props.navigation.navigate("User");
              pullMe();
            }
          })
          .catch((error) => {
            setLoading(false);
            Toast.show({
              topOffset: 60,
              type: "error",
              text1: "Something went wrong",
              text2: "Please try again",
            });
          });
        setModalVisible(false);
      }
    }

    if (userProfile && userProfile.user.account_verified === "not verified") {
      let formData = new FormData();
      if (
        newBirtdate === "" ||
        value === "" ||
        gender === "" ||
        houseNumber === "" ||
        street == ""
      ) {
        alert("Warning!!!", "Kindly complete the required information", {
          type: "type: 'bottomsheet",
          option: "danger", // danger | warning | info | success
          timeout: 3,
        });
      } else if (validId === undefined || mainImage === undefined) {
        alert("Warning!!!", "Please upload your Profile and Senior ID photo", {
          type: "type: 'bottomsheet",
          option: "danger", // danger | warning | info | success
          timeout: 3,
        });
      } else if (age < 60) {
        alert("Warning!!!", "You must 60 years or above", {
          type: "type: 'bottomsheet",
          option: "danger", // danger | warning | info | success
          timeout: 3,
        });
      } else {
        const newValidIdUri = "file:///" + validId.split("file:/").join("");
        formData.append("valid_id", {
          uri: newValidIdUri,
          type: mime.getType(newValidIdUri),
          name: newValidIdUri.split("/").pop(),
        });

        const newImageUri = "file:///" + mainImage.split("file:/").join("");
        formData.append("profile_picture", {
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: newImageUri.split("/").pop(),
        });

        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("middle_name", middle_name);
        formData.append("birth_date", newBirtdate);
        formData.append("age", edad);
        formData.append("gender", gender);
        formData.append("house_purok_no", houseNumber);
        formData.append("street", street);
        formData.append("barangay", value);

        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .put(
            `${baseURL}users/profile/update/${context.stateUser.user.userId}`,
            formData,
            config
          )
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Profile successfuly updated",
                text2: "Great!",
              });
              setLoading(false);
              // props.navigation.navigate("User");
              pullMe();
            }
          })
          .catch((error) => {
            setLoading(false);
            Toast.show({
              topOffset: 60,
              type: "error",
              text1: "Something went wrong",
              text2: "Please try again",
            });
          });
        setModalVisible(false);
      }
    }
  };

  return (
    <SafeAreaProvider
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
      }
    >
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Loading..."}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />

      <Container style={styles.ImageContainer}>
        <View style={styles.ImageCircle}>
          <Image
            source={{
              uri: userProfile
                ? userProfile.user.profile_picture.url
                : "https://th.bing.com/th/id/OIP.NVgDAkBBANO4lnKq3Xqg1wHaHa?w=194&h=195&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            }}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
      </Container>

      <FormContainerProfile
        title={userProfile ? userProfile.user.user_name : ""}
      >
        {userProfile && userProfile.user.account_verified === "verified" ? (
          <Text style={styles.verifiedText}>
            {userProfile ? userProfile.user.account_verified.toUpperCase() : ""}
          </Text>
        ) : userProfile && userProfile.user.account_verified === "pending" ? (
          <Text style={styles.pending}>
            {userProfile ? userProfile.user.account_verified.toUpperCase() : ""}
          </Text>
        ) : (
          <Text style={styles.NotverifiedText}>
            {userProfile ? userProfile.user.account_verified.toUpperCase() : ""}
          </Text>
        )}

        {userProfile && userProfile.user.account_verified === "not verified" ? (
          <View>
            <TouchableOpacity
              style={styles.getVerify}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.appButtonTextRegister}>Verify Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.getLogout}
              onPress={() => [
                AsyncStorage.removeItem("jwt"),
                logoutUser(context.dispatch),
              ]}
            >
              <Entypo name="log-out" size={18} color={Colors.TextColor}>
                <Text> SIGN OUT</Text>
              </Entypo>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.personalinformation}>
            <View style={styles.infoContainer}>
              <Input style={styles.info} isDisabled="true">
                {userProfile ? userProfile.user.first_name.toUpperCase() : ""}{" "}
                {userProfile ? userProfile.user.middle_name.toUpperCase() : ""}{" "}
                {userProfile ? userProfile.user.last_name.toUpperCase() : ""}
              </Input>

              {userProfile && userProfile.user.birth_date === undefined ? (
                <Input style={styles.info} isDisabled="true">
                  Update your BirthDate
                </Input>
              ) : (
                <Input style={styles.info} isDisabled="true">
                  BirthDate:{" "}
                  {moment(
                    userProfile ? userProfile.user.birth_date : ""
                  ).format("MMM DD YYYY")}
                </Input>
              )}

              {userProfile && userProfile.user.age === undefined ? (
                <Input style={styles.info} isDisabled="true">
                  Update your Age
                </Input>
              ) : (
                <Input style={styles.info} isDisabled="true">
                  {userProfile ? userProfile.user.age : ""} years old
                </Input>
              )}

              {userProfile && userProfile.user.gender === undefined ? (
                <Input style={styles.info} isDisabled="true">
                  Update your Gender
                </Input>
              ) : (
                <Input style={styles.info} isDisabled="true">
                  {userProfile ? userProfile.user.gender.toUpperCase() : ""}
                </Input>
              )}

              {userProfile && userProfile.user.address === undefined ? (
                <Input style={styles.info} isDisabled="true">
                  Update your Address
                </Input>
              ) : (
                <Input style={styles.infobrgy} isDisabled="true">
                  Purok #
                  {userProfile ? userProfile.user.address.house_purok_no : " "}{" "}
                  {userProfile ? userProfile.user.address.street : ""} St.
                  {"\n"} Brgy.
                  {userProfile ? userProfile.user.address.barangay : ""}{" "}
                </Input>
              )}
            </View>

            <View style={[styles.Lowercontainer, { flex: 3 }]}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.appButtonContainerLogin}
                  onPress={() => showModal()}
                >
                  <Text style={styles.appButtonTextLogin}>Edit</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.appButtonContainerRegister}
                  onPress={() => [
                    AsyncStorage.removeItem("jwt"),
                    logoutUser(context.dispatch),
                  ]}
                >
                  <Text style={styles.appButtonTextRegister}>Sign Out</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.Line}></View>
            </View>
          </View>
        )}
      </FormContainerProfile>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Container style={styles.ImageContainerModal}>
              <View style={styles.ImageCircleModal}>
                <Image
                  source={{
                    uri: mainImage
                      ? mainImage
                      : "https://th.bing.com/th/id/OIP.NVgDAkBBANO4lnKq3Xqg1wHaHa?w=194&h=195&c=7&r=0&o=5&dpr=1.3&pid=1.7",
                  }}
                  resizeMode="cover"
                  style={styles.image}
                />
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.imagePicker}
                >
                  <Icon style={{ color: "white" }} name="camera" />
                </TouchableOpacity>
              </View>
            </Container>
            <Container style={styles.ImageContainerModal}>
              <View style={styles.ImageCircleModal}>
                <TouchableOpacity
                  onPress={pickIValidId}
                  style={styles.ValidIdPicker}
                >
                  <Text style={styles.ValidIdText}>
                    Click to Upload Senior ID
                  </Text>
                </TouchableOpacity>
              </View>
            </Container>
            <FormContainerModal>
              <InputModal
                placeholder={"Firstname"}
                name={"firstname"}
                id={"firstname"}
                value={first_name}
                onChangeText={(text) => setFirstname(text)}
              />

              <InputModal
                placeholder={"Middlename"}
                name={"middlename"}
                id={"middlename"}
                value={middle_name}
                onChangeText={(text) => setMiddlename(text)}
              />

              <InputModal
                placeholder={"Lastname"}
                name={"lastname"}
                id={"lastname"}
                value={last_name}
                onChangeText={(text) => setLastname(text)}
              />

              <View style={styles.MainContainer}>
                {datePicker && (
                  <DateTimePicker
                    value={date}
                    mode={"date"}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    is24Hour={true}
                    onChange={onDateSelected}
                    style={styles.datePicker}
                  />
                )}

                {!datePicker && (
                  <View>
                    <TouchableOpacity
                      style={styles.datePickerButton}
                      title={date.toISOString()}
                      // color="white"
                      onPress={showDatePicker}
                    >
                      <Text>
                        BirthDate :
                        {moment(date.toISOString()).format("MMM DD YYYY")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View>
                <DropDownPicker
                  placeholder="Select Gender"
                  open={openGender}
                  value={gender}
                  items={genderoption}
                  setOpen={setOpenGender}
                  setValue={setGender}
                  setItems={setGenderOption}
                  style={styles.GenderPickerButton}
                  dropDownContainerStyle={{ width: "73%" }}
                />
              </View>

              <InputModal
                placeholder={"House No/ Purok No"}
                name={"houseNumber"}
                id={"houseNumber"}
                value={houseNumber}
                onChangeText={(text) => setHouseNumber(text)}
              />

              <InputModal
                placeholder={"Street"}
                name={"street"}
                id={"street"}
                value={street}
                onChangeText={(text) => setStreet(text)}
              />
              <View>
                <DropDownPicker
                  placeholder="Select Barangay"
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  style={styles.datePickerButton}
                  dropDownContainerStyle={{ width: "73%" }}
                />
              </View>
            </FormContainerModal>

            <View style={[styles.LowerModalcontainer, { flex: 3 }]}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.appButtonContainerModalCancel}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.appButtonTextLogin}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.appButtonContainerModalUpdate}
                  onPress={() => UpdateProfile()}
                >
                  <Text style={styles.appButtonTextRegister}>Submit</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.Line}></View>
            </View>
          </View>
        </View>
      </Modal>
      <SuperAlert customStyle={customStyle} />
    </SafeAreaProvider>
  );
}

const customStyle = {
  container: {
    backgroundColor: Colors.main,
    borderRadius: 10,
  },
  buttonConfirm: {
    backgroundColor: Colors.red,
    borderRadius: 10,
    width: 70,
  },
  textButtonConfirm: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  title: {
    color: Colors.TextColor,
    fontSize: 24,
    fontWeight: "bold",
  },
  message: {
    color: "#4f4f4f",
    fontSize: 18,
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.main,
  },

  ImageContainer: {
    maxWidth: windowWidth,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  ImageCircle: {
    backgroundColor: Colors.light,
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  image: {
    height: 100,
    maxWidth: 100,
    minWidth: 100,
    borderRadius: 50,
  },

  info: {
    // fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    maxWidth: "90%",
    height: 40,
    margin: 10,
    paddingLeft: 20,
    // borderWidth :1,
    borderColor: Colors.underline,
    borderRadius: 10,
  },
  infobrgy: {
    textAlign: "center",
    fontSize: 14,
  },
  infoContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  Lowercontainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 80,
    padding: 15,
  },
  buttonContainer: {
    flex: 1,
  },
  appButtonContainerLogin: {
    backgroundColor: "#fff",
    borderWidth: 2,
    height: 50,
    width: windowWidth / 2.3,
    borderRadius: 5,
    borderColor: "#ff1717",
    paddingVertical: 10,
    paddingHorizontal: 12,
    position: "absolute",
    bottom: 10,
    margin: 5,
  },
  appButtonTextLogin: {
    fontSize: 14,
    color: "#ff1717",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  appButtonContainerRegister: {
    backgroundColor: "#ff1717",
    borderWidth: 2,
    height: 50,
    width: windowWidth / 2.3,
    borderRadius: 5,
    borderColor: "#ff1717",
    paddingVertical: 10,
    paddingHorizontal: 12,
    position: "absolute",
    bottom: 10,
    margin: 5,
  },
  logoutbtn: {
    backgroundColor: "#ff1717",
    borderWidth: 2,
    height: 50,
    width: windowWidth / 2,
    borderRadius: 5,
    borderColor: "#ff1717",
    paddingVertical: 10,
    paddingHorizontal: 12,
    // position: "absolute",
    // bottom: 10,
    // margin: 5,
  },
  appButtonTextRegister: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center" 
  },
  modalView: {
    width: "90%",
    height:"90%",
    margin: 25,
    backgroundColor:Colors.main,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: "#c5c5c5",
    borderWidth: 1,
  },
  infoedit: {
    backgroundColor: "red",
  },
  LowerModalcontainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    paddingTop: 15,
    // backgroundColor: "grey",
  },
  appButtonContainerModalCancel: {
    backgroundColor: "#fff",
    borderWidth: 2,
    height: 50,
    width: windowWidth / 2.9,
    borderRadius: 5,
    borderColor: "#ff1717",
    paddingVertical: 10,
    paddingHorizontal: 12,
    position: "absolute",
    bottom: 1,
    margin: 1,
  },
  appButtonContainerModalUpdate: {
    backgroundColor: "#ff1717",
    borderWidth: 2,
    height: 50,
    width: windowWidth / 2.9,
    borderRadius: 5,
    borderColor: "#ff1717",
    paddingVertical: 10,
    paddingHorizontal: 12,
    position: "absolute",
    bottom: 1,
    margin: 1,
  },
  ImageContainerModal: {
    maxWidth: windowWidth,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    // marginBottom: 10,
    // backgroundColor: "red",
  },
  ImageCircleModal: {
    backgroundColor: "Colors.light",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 10,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
  ValidIdPicker: {
    padding: 8,
    borderRadius: 100,
    backgroundColor: Colors.rose_300,
    elevation: 10,
    marginTop: 10,
  },
  ValidIdText: {
    color: Colors.red,
    fontSize: 18,
    fontWeight: "bold",
  },
  MainContainer: {
    // flex: 1,
    // padding: 6,
    // alignItems: "center",
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 80,
    height: 260,
    display: "flex",
  },
  datePickerButton: {
    // backgroundColor: "red",
    fontSize: 18,
    width: "73%",
    height: 40,
    marginBottom: 10,
    paddingLeft: 20,
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 10,
    paddingTop: 5,
  },
  GenderPickerButton: {
    fontSize: 18,
    width: "73%",
    height: 40,
    marginBottom: 20,
    paddingLeft: 20,
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 10,
    paddingTop: 5,
  },
  verifiedText: {
    color: "green",
  },
  NotverifiedText: {
    color: Colors.red,
  },
  pending: {
    color: Colors.warning,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerTextStyle: {
    color: "red",
  },
  personalinformation: {
    width: windowWidth,
  },
  getVerify: {
    backgroundColor: "#ff1717",
    borderWidth: 2,
    height: 50,
    width: windowWidth / 2,
    borderRadius: 5,
    borderColor: "#ff1717",
    paddingVertical: 10,
    paddingHorizontal: 12,
    // position: "absolute",
    // bottom: 10,
    margin: 10,
    alignItems: "center",
  },
  getLogout: {
    // backgroundColor: "#ff1717",
    // borderWidth: 2,
    height: 50,
    width: windowWidth / 2,
    // borderRadius: 5,
    // borderColor: "#ff1717",
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    alignItems: "center",
  },
});

export default Personal;
