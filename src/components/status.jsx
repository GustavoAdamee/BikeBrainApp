import { Button, Text, View, TouchableHighlight } from "react-native";
import React from "react";
import SmsRetriver from 'react-native-sms-retriever';
import { useState, useEffect } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geocoder from 'react-native-geocoding';

const Status = (props) => {

    // TODO: Add the API key on .env file
    Geocoder.init("AIzaSyDHeSBo--ARF7q6gXay0eKKvV2MwU9Sfd0", {language : "pt"})

    const [actualLocation, setActualLocation] = useState("No updates yet");
    const [lastUpdate, setLastUpdate] = useState("...");
    const [currentTime, setCurrentTime] = useState(Date.now());

    const _onSmsListenerPressed = async () => {
        try {
            const registered = await SmsRetriver.startSmsRetriever();
            if (registered) {
                console.log('SMS Retriever has been started');
                SmsRetriver.addSmsListener(event => {
                    
                    if (!event.message) {
                        return;
                    }
                    else{
                        // TODO: Adapt the message to the format of the SMS received from the bike
    
                        // get the message from the event, extraxt the msg until the line break
                        const message = event.message.split("\n")[0];
                        console.log("Message recieved ->",message);
                        const lat = Number(message.split(",")[0]);
                        const long = Number(message.split(",")[1]);
                        
                        // get the location from the message
                        Geocoder.from(lat, long).then(json => {
                            var addressComponent = json.results[0].address_components;
                            console.log(addressComponent);
                            const number = addressComponent[0].long_name;
                            const street = addressComponent[1].short_name;
                            const neighborhood = addressComponent[2].long_name;
                            const returnAdress = street + ", " + number + " - " + neighborhood;
                            setLastUpdate(Date.now());
                            setActualLocation(returnAdress);
                        })
                        console.log("Adress ->",actualLocation);
                        // setActualLocation(adress._z);
                        SmsRetriver.removeSmsListener();
                    }

                });
            } else {
                console.log('SMS Retriever failed to start');
            }
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    }

    const getTimeAgo = (time) => {
        if (time === "...") {
            return "...";
        }
        const elapsed = currentTime - time;
        const minutes = Math.floor(elapsed / 60000);
        if (minutes < 1) {
            return "now";
        }
        if (minutes < 60) {
            return `${minutes}min ago`;
        }
    }

    useEffect(() => {
        console.log("APP Mount");
        const timer = setInterval(() => {
            setCurrentTime(Date.now());
        }, 60000); // 1 minute
        return () => clearInterval(timer);
    }
    , []);

    _onSmsListenerPressed();

    return (
    <View 
        style={{
            backgroundColor: "black",
            height: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            borderRadius: 15,
            marginTop: 20,
            marginBottom: 20,
        }}
    >
        <View>
            <Ionicons 
                name="bicycle"
                style={{marginLeft: 10}}
                size={18} 
                color={"white"}
            />
        </View>
        <Text 
            style={{
                color: "white",
                fontSize: 12,
            }}
        >
            {actualLocation} -- ({getTimeAgo(lastUpdate)})
        </Text>
        <View>
            <Ionicons
                name="location"
                style={{marginRight: 10}}
                size={15}
                color={"white"}
            />
        </View>
    </View>
    );

}

export default Status;