import React, { useState, useEffect } from "react";

import { FlatList } from "react-native";
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