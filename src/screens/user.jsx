import { View, ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import UserInfos from "../components/userInfos";
import UserCard from "../components/userCard";

const userNumbersMock = {
    totalActivities: "24",
    totalHours: "10:32:41",
    totalCalories: "7543",
    totalDistance: "132",
};

const UserScreen = ({navigation}) => {

    return (
        <ScrollView
            automaticallyAdjustKeyboardInsets = {true}
            style={{
                flex: 1,
                marginTop: 20,
            }}
        >
            <UserInfos/>
            <UserCard 
                userNumbers={userNumbersMock}
            />

            {/* <Text>{testUser().name}</Text> */}

        </ScrollView>
    );
};

export default UserScreen;