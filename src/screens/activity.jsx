import { View, Text } from "react-native";
import MapView, {Polyline} from "react-native-maps";
import { useEffect, useState } from "react";

// Data for the activity cards (FOR TESTING)
const activitiesData = [
    {
        "id": 1,
        "date": "12/12/2024",
        "startTime": "12:00",
        "endTime": "12:30",
        "timeElapsed": "00:32:00",
        "averageSpeed": "10",
        "calories": "284",
        "distance": "5.28"
    },
    {
        "id": 2,
        "date": "12/13/2024",
        "startTime": "09:00",
        "endTime": "09:45",
        "timeElapsed": "00:45:00",
        "averageSpeed": "12",
        "calories": "320",
        "distance": "6.5"
    },
    {
        "id": 3,
        "date": "12/14/2024",
        "startTime": "08:30",
        "endTime": "09:15",
        "timeElapsed": "00:45:00",
        "averageSpeed": "11.5",
        "calories": "310",
        "distance": "6.2"
    },
    {
        "id": 4,
        "date": "12/15/2024",
        "startTime": "07:45",
        "endTime": "08:30",
        "timeElapsed": "00:45:00",
        "averageSpeed": "9.8",
        "calories": "290",
        "distance": "5.8"
    },
    {
        "id": 5,
        "date": "12/16/2024",
        "startTime": "10:15",
        "endTime": "11:00",
        "timeElapsed": "00:45:00",
        "averageSpeed": "11.2",
        "calories": "315",
        "distance": "6.4"
    },
    {
        "id": 6,
        "date": "12/17/2024",
        "startTime": "11:30",
        "endTime": "12:15",
        "timeElapsed": "00:45:00",
        "averageSpeed": "10.7",
        "calories": "305",
        "distance": "6.0"
    }
]

const ActivityScreen = ({navigation, route}) => {
    
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

    const {activityId} = route.params;
    const activity = activitiesData.find(activity => activity.id === activityId);

    const [routeCoordinates, setRouteCoordinates] = useState([]);

    // Fetch route coordinates (example)
    useEffect(() => {
        const coordinates = [
            { latitude: 40.7128, longitude: -74.0060 }, // New York City
            { latitude: 40.7130, longitude: -74.0062 }, 
            { latitude: 40.7133, longitude: -74.0065 }, 
            { latitude: 40.7136, longitude: -74.0068 }, 
            { latitude: 40.7139, longitude: -74.0072 }, 
            { latitude: 40.7142, longitude: -74.0076 }, 
            { latitude: 40.7145, longitude: -74.0080 }, 
            { latitude: 40.7148, longitude: -74.0084 }, 
            { latitude: 40.7151, longitude: -74.0088 }, 
            { latitude: 40.7154, longitude: -74.0092 }, 
            { latitude: 40.7157, longitude: -74.0096 }, 
            { latitude: 40.7160, longitude: -74.0100 }, 
            { latitude: 40.7163, longitude: -74.0104 }, 
            { latitude: 40.7166, longitude: -74.0108 }, 
            { latitude: 40.7169, longitude: -74.0112 }, 
            { latitude: 40.7172, longitude: -74.0116 }, 
            { latitude: 40.7175, longitude: -74.0120 }, 
            { latitude: 40.7178, longitude: -74.0124 }, 
            { latitude: 40.7181, longitude: -74.0128 }, 
            { latitude: 40.7184, longitude: -74.0132 }, 
            { latitude: 40.7187, longitude: -74.0136 }, 
            { latitude: 40.7190, longitude: -74.0140 }, 
            { latitude: 40.7193, longitude: -74.0144 }, 
            { latitude: 40.7196, longitude: -74.0148 }, 
            { latitude: 40.7199, longitude: -74.0152 }, 
            { latitude: 40.7202, longitude: -74.0156 }, 
            { latitude: 40.7205, longitude: -74.0160 }, 
            { latitude: 40.7208, longitude: -74.0164 }, 
            { latitude: 40.7211, longitude: -74.0168 }, 
            { latitude: 40.7214, longitude: -74.0172 }, 
            { latitude: 40.7217, longitude: -74.0176 }, 
            { latitude: 40.8220, longitude: -74.2180 }, 
            { latitude: 40.6223, longitude: -74.5184 }, 
            { latitude: 40.3226, longitude: -74.3188 }, 
            { latitude: 40.2229, longitude: -74.2192 }, 
            { latitude: 40.7232, longitude: -74.0196 }, 
            { latitude: 40.7235, longitude: -74.0200 }, 
            { latitude: 40.7238, longitude: -74.0204 }, 
            { latitude: 40.7241, longitude: -74.0208 }, 
            { latitude: 40.7244, longitude: -74.0212 }, 
            { latitude: 40.7247, longitude: -74.0216 }, 
            { latitude: 40.7250, longitude: -74.0220 }, 
            { latitude: 40.7253, longitude: -74.0224 }, 
            { latitude: 40.7256, longitude: -74.0228 },
        ];
        setRouteCoordinates(coordinates);
    }, []);

    // All the code above is for testing purposes only and should be replaced with actual data fetching logic

    return (
        <>
            <View
                style={{
                    flex: 1,
                }}
            >
                {/* NOT ON USE NOW BECAUSE OF API KEY MISSING */}
                {/* <MapView
                    style={{
                        flex: 0.7,
                    }}
                    initialRegion={{
                        latitude: 40.7128,
                        longitude: -74.0060,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="#000" // fallback color
                        strokeWidth={4}
                    />
                </MapView> */}
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
                        {activity.date}
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
                            <Text style={{fontSize:16, fontWeight: "bold"}}>{activity.timeElapsed}</Text>
                        </View>
                        {/* TOP RIGHT */}
                        <View
                            style={{
                                flex:0.5,
                                alignItems: "center",
                            }}
                        >
                            <Text>Average Speed:</Text>
                            <Text style={{fontSize:16, fontWeight: "bold"}}>{activity.averageSpeed} Km/h</Text>
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
                            <Text style={{fontSize:16, fontWeight: "bold"}}>{activity.distance} Km</Text>
                        </View>
                    </View>

                </View>
            </View>
        </>
    );
};

export default ActivityScreen;