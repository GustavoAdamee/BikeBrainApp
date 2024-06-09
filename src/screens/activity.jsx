import { View, Text } from "react-native";
import MapView, {Polyline, PROVIDER_GOOGLE} from "react-native-maps";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ActivityScreen = ({navigation, route}) => {
    
    // const [activity, setActivity] = useState({
    //     "startDate": "",
    //     "startTime": "",
    //     "endDate": "",
    //     "endTime": "",
    //     "elapsedTime": "",
    //     "distance": "",
    //     "maxSpeed": "",
    //     "avgSpeed": "",
    //     "calories": "",
    //     "coordinates": [
    //         {
    //             "latitude": 0,
    //             "longitude": 0
    //         }
    //     ]
    // });

    if (!route.params) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Select an activity first!</Text>
            </View>
        );
    }
    console.log(route.params)

    const {activity} = route.params;
    // const fetchActivity = async () => {
    //     // this could be optimized by fetcing directly the activity instead of all activities
    //     const activities = await AsyncStorage.getItem('Activities');
    //     console.log(activities);
    //     const parsedActivities = JSON.parse(activities);
    //     const activity = parsedActivities.find(activity => activity.id === activityId);
    //     setActivity(activity);
    // }

    // const [routeCoordinates, setRouteCoordinates] = useState([]);

    // // Fetch route coordinates (example)
    // useEffect(() => {
    //     fetchActivity();
    //     setRouteCoordinates(activity.coordinates);
    // }, []);

    // All the code above is for testing purposes only and should be replaced with actual data fetching logic

    return (
        <>
            <View
                style={{
                    flex: 1,
                }}
            >
                {/* NOT ON USE NOW BECAUSE OF API KEY MISSING */}
                <MapView
                    style={{
                        flex: 0.7,
                    }}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: activity.coordinates[0].latitude,
                        longitude: activity.coordinates[0].longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Polyline
                        coordinates={activity.coordinates}
                        strokeColor="#000" // fallback color
                        strokeWidth={4}
                    />
                </MapView>
                <View
                    style={{
                        flex: 0.05,
                        justifyContent: "space-around",
                        borderBottomColor: "black",
                        borderBottomWidth: 0.8,
                        paddingVertical: 5,
                        flexDirection: "row",
                        marginTop: 5
                    }}
                >
                    <Text
                        style={{
                            marginLeft: 10,
                            textAlign: "justify",
                        }}
                    >
                        {activity.startDate}
                    </Text>
                    <Text
                        style={{
                            marginLeft: 10
                        }}
                    >
                        {activity.startTime} - {activity.endTime}
                    </Text>
                </View>
                <View
                    style={{
                        flex: 0.4,
                        marginTop: 30,
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
                        }}
                    >
                        {/* BOTTOM LEFT */}
                        <View
                            style={{
                                flex:0.5,
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
            </View>
        </>
    );
};

export default ActivityScreen;