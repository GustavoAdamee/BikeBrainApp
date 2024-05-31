import { View, TextInput, Text } from "react-native";
import React, { useState } from "react";

const UserInfos = () => {
    // Infos here are just for testing purposes
    // Infos should be fetched from the database in a real scenario
    const [name, setName] = useState("Gustavo");
    const [weight, setWeight] = useState("70");
    const [phoneNumber, setPhoneNumber] = useState("41996781599");

    return(
        <View
            style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    flex: 0.25,
                    width: '80%',
                    marginBottom: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                    }}
                >
                    Name:
                </Text>
                <TextInput
                    style={{
                        backgroundColor: 'lightgray',
                        borderRadius: 5,
                        flex: 1,
                        padding: 10,
                    }}
                    onChangeText={setName}
                    value={name}
                    placeholder="..."
                    keyboardType="default"
                >
                </TextInput>
            </View>
            <View
                style={{
                    flex: 0.25,
                    width: '80%',
                    marginBottom: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                    }}
                >
                    Weight:
                </Text>
                <TextInput
                    style={{
                        backgroundColor: 'lightgray',
                        borderRadius: 5,
                        flex: 1,
                        padding: 10,
                    }}
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="..."
                    keyboardType="numeric"
                >
                </TextInput>
            </View>
            <View
                style={{
                    flex: 0.25,
                    width: '80%',
                    marginBottom: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                    }}
                >
                    Phone number:
                </Text>
                <TextInput
                    style={{
                        backgroundColor: 'lightgray',
                        borderRadius: 5,
                        flex: 1,
                        padding: 10,
                    }}
                    onChangeText={setPhoneNumber}
                    value={phoneNumber}
                    placeholder="useless placeholder"
                    keyboardType="phone-pad"
                >
                </TextInput>
            </View>
            
        </View>
    )
}

export default UserInfos;