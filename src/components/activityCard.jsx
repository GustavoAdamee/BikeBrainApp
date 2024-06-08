import { View, Text, Pressable } from "react-native";

const ActivityCard = ({ navigation, activity }) => {
    return(
        <View
            style={{
                flex: 0,
                backgroundColor: "lightgrey",
                height: 170,
                flexDirection: "column",
                marginHorizontal: 20,
                borderRadius: 15,
                marginTop: 5,
                marginBottom: 30,
            }}
        >
            {/* DATE */}
            <View
                style={{
                    flex: 1,
                    justifyContent: "space-around",
                    borderBottomColor: "black",
                    borderBottomWidth: 0.8,
                    paddingVertical: 5,
                    flexDirection: "row",
                }}
            >   
                <Text>
                    {activity.startTime}
                </Text>
                <Text>
                    {activity.startDate}
                </Text>
                <Text>
                    {activity.endTime}
                </Text>
            </View>
            
            <View
                style={{
                    flex: 6,
                }}
            >
                <View
                    style={{
                        flex:0.5,
                        flexDirection: "row",
                    }}
                >   
                    {/* TOP LEFT */}
                    <View
                        style={{
                            flex:0.5,
                            borderRightColor: "black",
                            borderRightWidth: 0.8,
                            alignItems: "center",
                        }}
                    >
                        <Text>Time Elapsed:</Text>
                        <Text style={{fontSize:16, fontWeight: "bold"}}>{activity.elapsedTime}</Text>
                    </View>
                    {/* TOP RIGHT */}
                    <View
                        style={{
                            flex:0.5,
                            alignItems: "center",
                        }}
                    >
                        <Text>Average Speed:</Text>
                        <Text style={{fontSize:16, fontWeight: "bold"}}>{activity.avgSpeed}</Text>
                    </View>
                </View>
                
                <View
                    style={{
                        flex:0.5,
                        flexDirection: "row",
                        borderTopColor: "black",
                        borderTopWidth: 0.8,
                    }}
                >
                    {/* BOTTOM LEFT */}
                    <View
                        style={{
                            flex:0.5,
                            borderRightColor: "black",
                            borderRightWidth: 0.8,
                            alignItems: "center",
                        }}
                    >
                        <Text>Calories:</Text>
                        <Text style={{fontSize:16, fontWeight: "bold"}}>{activity.calories} cal</Text>
                    </View>
                    {/* BOTTOM RIGHT */}
                    <View
                        style={{
                            flex:0.5,
                            alignItems: "center",
                        }}
                    >
                        <Text>Distance:</Text>
                        <Text style={{fontSize:16, fontWeight: "bold"}}>{activity.distance}</Text>
                    </View>
                </View>
            </View>
            
            {/* VIEW BUTTON */}
            <View
                style={{
                    flex: 2,
                    flexDirection: "row",
                    borderTopColor: "black",
                    borderTopWidth: 0.8,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Pressable
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 25,
                        borderRadius: 4,
                        backgroundColor: 'black',
                        flex: 0.3,
                    }}
                    onPress={() => navigation.navigate('Activity', {activityId: activity.id})}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        View
                    </Text>
                </Pressable>
            </View>
        </View>
    )
};

export default ActivityCard;