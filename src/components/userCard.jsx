import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useBLE from "../ble/useBLE";

// TODO: Implement AsyncStorage here for the total numbers of the user

const UserCard = ({userTotalNumber}) => {

    useEffect(() =>{
        console.log("UserCard Mount");
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

                            <Text style={{fontSize:20, fontWeight: "bold"}}>{userTotalNumber.totalActivities}</Text>
                            {/* <Text style={{fontSize:20, fontWeight: "bold"}}>2</Text> */}
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
                            <Text style={{fontSize:20, fontWeight: "bold"}}>{userTotalNumber.totalTime}</Text>
                            {/* <Text style={{fontSize:20, fontWeight: "bold"}}>00:02:29</Text> */}
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
                            <Text style={{fontSize:20, fontWeight: "bold"}}>{userTotalNumber.totalCalories} cal</Text>
                            {/* <Text style={{fontSize:20, fontWeight: "bold"}}>14.7</Text> */}
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
                            <Text style={{fontSize:20, fontWeight: "bold"}}>{userTotalNumber.totalDistance} km</Text>
                            {/* <Text style={{fontSize:20, fontWeight: "bold"}}>0.433</Text> */}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default UserCard;