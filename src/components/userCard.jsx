import { View, Text } from "react-native";

const UserCard = ({ userNumbers }) => {
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

                            <Text style={{fontSize:20, fontWeight: "bold"}}>{userNumbers.totalActivities}</Text>
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
                            <Text style={{fontSize:20, fontWeight: "bold"}}>{userNumbers.totalHours}</Text>
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
                            <Text style={{fontSize:20, fontWeight: "bold"}}>{userNumbers.totalCalories} cal</Text>
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
                            <Text style={{fontSize:20, fontWeight: "bold"}}>{userNumbers.totalDistance} km</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default UserCard;