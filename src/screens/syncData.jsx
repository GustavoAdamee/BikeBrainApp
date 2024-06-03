import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useState } from 'react';

import useBLE from "../ble/useBLE";

import DeviceModal from "../components/DeviceConnectionModal";

import AsyncStorage from '@react-native-async-storage/async-storage';

const SyncDataScreen = () => {

    const {
        scanForPeripherals,
        requestPermissions,
        connectToDevice,
        device,
        dataArray,
        connectedDevice,
        disconnectFromDevice,
        clearDataArray,
        heartRate,
    } = useBLE();

    const storeNewActivity = async (newActivity) => {
      console.log("Storing New Activity");
      try{
        const activities = await AsyncStorage.getItem("Activities");
        if (!activities) {
            await AsyncStorage.setItem("Activities", JSON.stringify([]));
            console.log("Activities Initialized");
        }
        const parsedActivities = JSON.parse(activities);
        parsedActivities.push(newActivity);
        await AsyncStorage.setItem("Activities", JSON.stringify(parsedActivities)).then(() => {
            console.log("Activity Stored");
        });
      } catch (error) {
        console.log(error);
      }
    };


    if (heartRate === 60) {
        storeNewActivity(dataArray);
        clearDataArray();
        console.log("Disconnecting from Device");
        disconnectFromDevice();
      }
      else {
        // console.log("Heart Rate: " + heartRate);
      }

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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heartRateTitleWrapper}>
                {connectedDevice ? (
                <>
                    {/* <Text>{dataArray}</Text>
                    <Text style={styles.heartRateTitleText}>Your Heart Rate Is:</Text>
                    <Text style={styles.heartRateText}>{heartRate} bpm</Text> */}
                    <ActivityIndicator size="large" color="black" />
                    <Text style={styles.heartRateTitleText}>Syncing...</Text>
                </>
                ) : (
                <Text style={styles.heartRateTitleText}>
                    Sync to your last activity
                </Text>
                )}
            </View>

            <TouchableOpacity
                onPress={connectedDevice ? disconnectFromDevice : openModal}
                style={styles.ctaButton}
            >
                <Text style={styles.ctaButtonText}>
                {connectedDevice ? "Disconnect" : "Search bike module"}
                </Text>
            </TouchableOpacity>
            <DeviceModal
                closeModal={hideModal}
                visible={isModalVisible}
                connectToPeripheral={connectToDevice}
                device={device}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 50,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default SyncDataScreen;