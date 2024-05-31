/* eslint-disable no-bitwise */
import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
  BleManager,
} from "react-native-ble-plx";

import * as ExpoDevice from "expo-device";

import base64 from "react-native-base64";

const DEVICE_SERVICE_UUID = "0000180d-0000-1000-8000-00805f9b34fb";               //Need the Raspberry Pi UUID
const DEVICE_SERVICE_CHARACTERISTIC = "00002a37-0000-1000-8000-00805f9b34fb";     //Need the Raspberry Pi Characteristic

function useBLE() {
  const bleManager = useMemo(() => new BleManager(), []);
  const [device, setDevice] = useState();
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [heartRate, setHeartRate] = useState(0);
  const [dataArray, setDataArray] = useState([]);
  
  // Request permissions for Android 31
  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  // Request permissions for Android
  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  // Check if the device is already in the list 
  const isDuplicteDevice = (devices, nextDevice) => {
    devices.map((device) => {
      if (device.id === nextDevice.id) {
        // console.log("device:")
        // console.log(device.id)
        // console.log("nextDevice:")
        // console.log(nextDevice.id)
        // console.log("Device already in list");
        return true;
      }
    })
    // console.log("Device not in list");
    return false;

    // devices.findIndex((device) => nextDevice.id === device.id) > -1;
  }

  // Scan for peripherals
  const scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // console.log("Error scanning for devices");
        // console.log(error);
      }
      if (device && device.name?.includes("Heart Rate")) {                                   //(device && device.name?.includes("{Raspberry Pi device name}"))
        // setDevice((prevState) => {
        //   if (isDuplicteDevice(prevState, device) === false) {
        //     // console.log("Device found");
        //     return [...prevState, device];
        //   }
        //   // console.log("Device already in list");
        //   return prevState;
        // });
        setDevice(device);
      }
    });

  // Connect to a device (scan)
  const connectToDevice = async (device) => {
    try {
      bleManager.stopDeviceScan();
      const deviceConnection = await bleManager.connectToDevice(device.id);
      console.log("conn->",deviceConnection);
      setConnectedDevice(deviceConnection);
      console.log("connected->",setConnectedDevice)
      // await deviceConnection.discoverAllServicesAndCharacteristics();
      await bleManager.discoverAllServicesAndCharacteristicsForDevice(device.id);
      const services = await device.services()
      console.log(services)
      startStreamingData(deviceConnection); //Data cant be streamed for now (missing UUID and Characteristic)
    
    } catch (e) {
      console.log("FAILED TO CONNECT", e);
    }
  };

  // Disconnect from a device
  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setHeartRate(0);
    }
  };

  // TODO: implement the data handle for the raspberry pi pico
  // Update the heart rate (The way the data is recieved varies on the device)
  const onDeviceUpdate = (
    error,
    characteristic
  ) => {
    if (error) {
      // console.log(error);
      return -1;
    } else if (!characteristic?.value) {
      console.log("No Data was received");
      return -1;
    }
    const rawData = base64.decode(characteristic.value);
    let innerHeartRate = -1;

    const firstBitValue = Number(rawData) & 0x01;

    if (firstBitValue === 0) {
      innerHeartRate = rawData[1].charCodeAt(0);
    } else {
      innerHeartRate =
        Number(rawData[1].charCodeAt(0) << 8) +
        Number(rawData[2].charCodeAt(2));
    }

    setHeartRate(innerHeartRate);
    
    // Testing the data array for the future data
    // heartRate = 60 is acting as a disconnect signal
    if (innerHeartRate !== 60) {
      const aux = dataArray;
      aux.push(innerHeartRate);
      setDataArray(aux);
      console.log(dataArray);
    }
  };

  // Clear the data array
  const clearDataArray = () => {
    setDataArray([]);
  };

  const startStreamingData = async (device) => {
    if (device) {
      device.monitorCharacteristicForService(
        DEVICE_SERVICE_UUID,
        DEVICE_SERVICE_CHARACTERISTIC,
        onDeviceUpdate
      );
    } else {
      console.log("No Device Connected");
    }
  };


  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    device,
    dataArray,
    connectedDevice,
    disconnectFromDevice,
    clearDataArray,
    heartRate,
  };

}

export default useBLE;
