import React, { useState, useEffect } from "react";

import { FlatList, Pressable } from "react-native";
import Status from "../components/status";
import ActivityCard from "../components/activityCard";

import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({navigation}) => {

    const [refreshing, setRefreshing] = useState(false);
    const [activities, setActivities] = useState([]);

    const fetchActivities = async () => {
        try {
            const activities = await AsyncStorage.getItem("Activities");
            console.log("HOME -> ", activities);
            if (!activities) {
                await AsyncStorage.setItem("Activities", JSON.stringify([]));
                console.log("Activities Initialized");
            }
            const parsedActivities = JSON.parse(activities);
            setActivities(parsedActivities);
            return parsedActivities;
        } catch (e) {
            console.log("Failed to fetch activities", e);
            return null;
        }
    }

    const handleRefresh = () => {
        setRefreshing(true);
        fetchActivities().then((activities) => {
            if (activities) {
                console.log("Activities fetched");
                setRefreshing(false);
            }
            else {
                console.log("Failed to fetch activities");
                setRefreshing(false);
            }
        });
    }

    useEffect(() => {
        console.log("HOME Mount");
        fetchActivities();
    }
    , []);

    return (
        <>
            <Status />
            {/* <ActivityCard 
                navigation={navigation}
                activity={{
                    "startDate": "2021-10-10",
                    "startTime": "10:00",
                    "endDate": "2021-10-10",
                    "endTime": "12:00",
                    "elapsedTime": "2:00",
                    "distance": "10 km",
                    "maxSpeed": "20 km/h",
                    "avgSpeed": "10 km/h",
                    "calories": "1000",
                    "coordinates": [
                        {
                            "latitude": 0,
                            "longitude": 0
                        }
                    ]
                }}
            /> */}
            <FlatList
                data={activities}
                renderItem={({ item }) => (
                    <ActivityCard
                        navigation={navigation}
                        activity={item}
                    />
                )}
                // keyExtractor={(item, index) => index.toString()}
                refreshing={refreshing}
                onRefresh={handleRefresh}
            />
        </>
    );
};

export default HomeScreen;