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
      connectedDevice,
      disconnectFromDevice,
      dataArray,
      clearDataArray,
      isSyncingFinished,
    } = useBLE();

    const storeNewActivity = async (newActivitiesArray) => {
      console.log("Storing New Activities");
      try{
        const activities = await AsyncStorage.getItem("Activities");
        if (!activities) {
            await AsyncStorage.setItem("Activities", JSON.stringify([]));
            console.log("Activities Initialized");
        }
        const parsedActivities = JSON.parse(activities);
        // push every new activity to the parsedActivities array
        for (const newActivity of newActivitiesArray) {
          // inserd id to the new activity based on the length of the parsedActivities array
          newActivity.id = parsedActivities.length;
          parsedActivities.push(newActivity);
          console.log(newActivity)
        }
        await AsyncStorage.setItem("Activities", JSON.stringify(parsedActivities)).then(() => {
            console.log("Activity Stored");
        });
      } catch (error) {
        console.log(error);
      }
    };

    const calculateAvgSpeed = (distance, timeString) => {
      const timeArray = timeString.split(":");
      const time = (Number(timeArray[2]) * 3600) + (Number(timeArray[1]) * 60) + Number(timeArray[0]);
      const speedMetersPerSecond = Number(distance) / time;
      const speed = speedMetersPerSecond * 3.6;
      const speedRounded = speed.toFixed(2);
      return String(speed) + " Km/h";
    }

    const prepareDataArray = (data) => {
      const activitiesArray = [];
      for (const activity of data){
        const activityString = activity.split("\n");
        const activityObject = {
          "id": -1,
          "startDate": activityString[0],
          "startTime": activityString[1],
          "endDate": activityString[2],
          "endTime": activityString[3],
          "elapsedTime": activityString[4],
          "distance": (Number(activityString[5]) / 1000) + " Km",
          "maxSpeed": activityString[6] + " Km/h",
          "avgSpeed": calculateAvgSpeed(activityString[5], activityString[4]),
          "calories": activityString[7],
          "coordinates": []
        };
        for (let i = 8; i < activityString.length-1; i += 1){
          const lat = Number(activityString[i].split(",")[0]);
          const lon = Number(activityString[i].split(",")[1]);
          activityObject.coordinates.push({
            "latitude": lat,
            "longitude": lon
          });
        }
        activitiesArray.push(activityObject);
        console.log(activityObject);
      }
      return activitiesArray;
    }

    if (isSyncingFinished === true) {
        const processedActivitiesArray = prepareDataArray(dataArray);
        storeNewActivity(processedActivitiesArray);
        clearDataArray();
        console.log("Disconnecting from Device");
        disconnectFromDevice();
    }
    else {
      console.log("Syncing in Progress...");
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