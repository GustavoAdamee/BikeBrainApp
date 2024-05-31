import React, { useState, useEffect } from "react";

import { FlatList } from "react-native";
import Status from "../components/status";
import ActivityCard from "../components/activityCard";

import AsyncStorage from '@react-native-async-storage/async-storage';

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


const HomeScreen = ({navigation}) => {

    const [refreshing, setRefreshing] = useState(false);

    const fetchActivities = async () => {
        try {
            const activities = await AsyncStorage.getItem("Activities");
            console.log("HOME -> ", activities);
            return activities;
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
            <Status 
                location="Rua Colombo 585"
                lastUpdate="10min ago"
            />

            <FlatList
                data={activitiesData}
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