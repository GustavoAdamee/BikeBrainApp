import { View, ScrollView, Text, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import UserInfos from "../components/userInfos";
import UserCard from "../components/userCard";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserScreen = ({navigation}) => {

    const [refreshing, setRefreshing] = React.useState(false);
    const [userNumbers, setUserNumbers] = React.useState({
        totalActivities: "0",
        totalCalories: "0",
        totalDistance: "0",
        totalTime: "00:00:00",
    });

    const timeStringToSeconds = (timeString) => {
        if (timeString === "00:00:00") {
            return 0;
        }
        const timeStringSplit = timeString.split(":");
        return (Number(timeStringSplit[2])) + (Number(timeStringSplit[1]) * 60) + Number(timeStringSplit[0] * 3600);
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // fetch the activities from the async storage and sum them up
        AsyncStorage.getItem("Activities").then((activities) => {
            if (activities) {
                const parsedActivities = JSON.parse(activities);
                let totalCalories = 0;
                let totalDistance = 0;
                let totalTime = 0;
                for (const activity of parsedActivities) {
                    totalCalories += Number(activity.calories);
                    totalDistance += Number(activity.distance.replace(" Km", ""));
                    console.log(activity.distance.replace(" km", ""));
                    totalTime += timeStringToSeconds(activity.elapsedTime);
                }
                setUserNumbers({
                    totalActivities: parsedActivities.length.toString(),
                    totalCalories: totalCalories.toString(),
                    totalDistance: totalDistance.toFixed(2).toString(),
                    totalTime:  (new Date(totalTime * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0],
                });
            }
        }).finally(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView
            automaticallyAdjustKeyboardInsets = {true}
            style={{
                flex: 1,
                marginTop: 20,
            }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <UserInfos/>
            <UserCard
                userTotalNumber={userNumbers}
            />

            {/* <Text>{testUser().name}</Text> */}

        </ScrollView>
    );
};

export default UserScreen;