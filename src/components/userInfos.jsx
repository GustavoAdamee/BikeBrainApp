import { View, TextInput, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import useBLE from "../ble/useBLE";
import DeviceModal from "../components/DeviceConnectionModal";

// TODO: ADD HASH ON THE DATA TO BE SENT FOR THE SMS

const UserInfos = () => {
    const {
        scanForPeripherals,
        requestPermissions,
        connectToDeviceOnReceiving,
        connectToDeviceOnSending,
        device,
        connectedDevice,
        disconnectFromDevice,
        dataArray,
        clearDataArray,
        isReceivingFinished,
        isSendingFinished,
        sendDataToDevice
      } = useBLE();  
    
    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [isModalVisible, setIsModalVisible] = useState(false);
    const scanForDevices = async () => {
        const isPermissionsEnabled = await requestPermissions();
        if (isPermissionsEnabled) {
            console.log("Scanning for Devices");
            scanForPeripherals();
        }
    };
    const openModal = async () => {
        console.log("Opening Modal & Scanning for Devices")
        scanForDevices();
        setIsModalVisible(true);
    };
    const hideModal = () => {
        setIsModalVisible(false);
    };
    if (isSendingFinished === true) {
        storeNewUserData();
        console.log("Disconnecting from Device");
        disconnectFromDevice();
    }
    else {
      console.log("Sending in Progress...");
    }

    const storeNewUserData = async () => {
        const userData = await AsyncStorage.getItem("User");
        const newUserData = {
            name: name,
            weight: weight,
            phoneNumber: phoneNumber,
            totalActivities: userData.totalActivities,
            totalCalories: userData.totalCalories,
            totalDistance: userData.totalDistance,
            totalTime: userData.totalTime,
        };
        await AsyncStorage.setItem("User", JSON.stringify(newUserData));
    }


    const preProcessUserData = () => {
        const formattedPhorneNumber = "+55"+phoneNumber;
        const formattedWeight = weight;
        const formattedHash = "#EOPBpWiEtOx"
        return formattedPhorneNumber + ',' + formattedWeight + ',' + formattedHash;
    }


    useEffect(() => {
        // Load user data from AsyncStorage
        const loadUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem("User");
                if (userData !== null) {
                    const parsedUserData = JSON.parse(userData);
                    setName(parsedUserData.name);
                    setWeight(parsedUserData.weight);
                    setPhoneNumber(parsedUserData.phoneNumber);
                }
                else {
                    // Create a new user data with default values
                    const newUserData = {
                        name: "",
                        weight: "",
                        phoneNumber: "",
                        totalActivities: 0,
                        totalCalories: 0,
                        totalDistance: 0,
                        totalTime: 0,
                    };
                    await AsyncStorage.setItem("User", JSON.stringify(newUserData));
                }
            } catch (error) {
                console.log(error);
            }
        };
        loadUserData();
    }
    , []);


    return(
        <View
            style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    flex: 0.25,
                    width: '80%',
                    marginBottom: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                    }}
                >
                    Name:
                </Text>
                <TextInput
                    style={{
                        backgroundColor: 'lightgray',
                        borderRadius: 5,
                        flex: 1,
                        padding: 10,
                    }}
                    onChangeText={setName}
                    value={name}
                    placeholder="..."
                    keyboardType="default"
                >
                </TextInput>
            </View>
            <View
                style={{
                    flex: 0.25,
                    width: '80%',
                    marginBottom: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                    }}
                >
                    Weight:
                </Text>
                <TextInput
                    style={{
                        backgroundColor: 'lightgray',
                        borderRadius: 5,
                        flex: 1,
                        padding: 10,
                    }}
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="..."
                    keyboardType="numeric"
                >
                </TextInput>
            </View>
            <View
                style={{
                    flex: 0.25,
                    width: '80%',
                    marginBottom: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                    }}
                >
                    Phone number:
                </Text>
                <TextInput
                    style={{
                        backgroundColor: 'lightgray',
                        borderRadius: 5,
                        flex: 1,
                        padding: 10,
                    }}
                    onChangeText={setPhoneNumber}
                    value={phoneNumber}
                    placeholder="useless placeholder"
                    keyboardType="phone-pad"
                >
                </TextInput>
            </View>
            <Pressable
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 35,
                    borderRadius: 4,
                    width: 200,
                    backgroundColor: 'black',
                    alignSelf: 'center',
                    marginBottom: -20,
                }}
                onPress={() => {
                    openModal();
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                >
                    Sync User Data
                </Text>
            </Pressable>
            <DeviceModal
                closeModal={hideModal}
                visible={isModalVisible}
                connectToPeripheral={connectToDeviceOnSending}
                device={device}
                dataOnSending={preProcessUserData()}
            />
            
        </View>
    )
}

export default UserInfos;