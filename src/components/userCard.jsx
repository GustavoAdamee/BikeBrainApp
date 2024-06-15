import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useBLE from "../ble/useBLE";

// TODO: Implement AsyncStorage here for the total numbers of the user

const UserCard = () => {

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
    
    const [totalActivities, setTotalActivities] = useState("0");
    const [totalTime, setTotalTime] = useState("00:00:00");
    const [totalCalories, setTotalCalories] = useState("0");
    const [totalDistance, setTotalDistance] = useState("0");

    const fetchUserData = async () => {
        try {
            const user = await AsyncStorage.getItem("User");
            if (!user) {
                await AsyncStorage.setItem("User", JSON.stringify({
                    name: "User",
                    weight: "0",
                    phoneNumber: "00000000000",
                    totalActivities: "0",
                    totalCalories: "0",
                    totalDistance: "0",
                    totalTime: "00:00:00",
                }));
                console.log("User Initialized");
            }
            const parsedUser = JSON.parse(user);
            setTotalActivities(parsedUser.totalActivities);
            setTotalTime(parsedUser.totalTime);
            setTotalCalories(parsedUser.totalCalories);
            setTotalDistance(parsedUser.totalDistance);
        } catch (e) {
            console.log("Failed to fetch user data", e);
        }
    }

    if (isReceivingFinished === true) {
        fetchUserData();
        console.log("Disconnecting from Device");
    }
    else {
      console.log("Sending in Progress...");
    }

    useEffect(() =>{
        console.log("UserCard Mount");
        // load user data from AsyncStorage
        const loadUserData = async () => {
            try {
                const user = await AsyncStorage.getItem("User");
                if (!user) {
                    await AsyncStorage.setItem("User", JSON.stringify({
                        name: "User",
                        weight: "0",
                        phoneNumber: "00000000000",
                        totalActivities: "0",
                        totalCalories: "0",
                        totalDistance: "0",
                        totalTime: "00:00:00",
                    }));
                    console.log("User Initialized");
                }
                const parsedUser = JSON.parse(user);
                setTotalActivities(parsedUser.totalActivities);
                setTotalTime(parsedUser.totalTime);
                setTotalCalories(parsedUser.totalCalories);
                setTotalDistance(parsedUser.totalDistance);
            } catch (e) {
                console.log("Failed to fetch user data", e);
            }
        }
        loadUserData();
    }), [];

    return(
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 270,
            
            }}
        >
            <View
                style={{
                    flex: 0.5,
                    backgroundColor: 'lightgray',
                    width: '80%',
                    marginBottom: 10,
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        flex: 0.5,
                        flexDirection: 'row',
                        borderBottomWidth: 0.8,
                        borderBottomColor: 'black',
                    }}
                >
                    {/* TOP LEFT */}
                    <View
                        style={{
                            flex: 0.5,
                            borderRightWidth: 0.8,
                            borderRightColor: 'black',
                            alignItems: 'center',
                        }}
                    >
                        <Text>Total Activities:</Text>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingBottom: 10,
                            }}
                        >

                            <Text style={{fontSize:20, fontWeight: "bold"}}>{totalActivities}</Text>
                        </View>
                    </View>
                    {/* TOP RIGHT */}
                    <View
                        style={{
                            flex: 0.5,
                            alignItems: 'center',
                        }}
                    >
                        <Text>Total Hours:</Text>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingBottom: 10,
                            }}
                        >
                            <Text style={{fontSize:20, fontWeight: "bold"}}>{totalTime}</Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        flex: 0.5,
                        flexDirection: 'row',
                    }}
                >
                    {/* BOTTON LEFT */}
                    <View
                        style={{
                            flex: 0.5,
                            borderRightWidth: 0.8,
                            borderRightColor: 'black',
                            alignItems: 'center',
                        }}
                    >
                        <Text>Total Calories:</Text>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingBottom: 10,
                            }}
                        >
                            <Text style={{fontSize:20, fontWeight: "bold"}}>{totalCalories} cal</Text>
                        </View>
                    </View>
                    {/* BOTTON RIGHT */}
                    <View
                        style={{
                            flex: 0.5,
                            alignItems: 'center',
                        }}
                    >
                        <Text>Total Distance:</Text>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingBottom: 10,
                            }}
                        >
                            <Text style={{fontSize:20, fontWeight: "bold"}}>{totalDistance} km</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default UserCard;