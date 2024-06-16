import { Button, Text, View, TouchableHighlight, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import SmsRetriver from 'react-native-sms-retriever';
import { useState, useEffect } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geocoder from 'react-native-geocoding';
import MapModal from "./mapModal";

const Status = (props) => {

    // TODO: Add the API key on .env file
    Geocoder.init("AIzaSyDHeSBo--ARF7q6gXay0eKKvV2MwU9Sfd0", {language : "pt"})

    const [actualLocation, setActualLocation] = useState("No updates yet");
    const [lastUpdate, setLastUpdate] = useState("...");
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [backgroundColor, setBackgroundColor] = useState("black");
    const [actualLat, setActualat] = useState(0)
    const [actualLon, setActualLon] = useState(0)

    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => {
        console.log("openModal")
        setIsModalVisible(true)
    }

    const closeModal = () => {
        setIsModalVisible(false)
    }

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
                        // get the message from the event, extraxt the msg until the line break
                        let message = event.message.split("\n")[0];
                        console.log("Message recieved ->",message);
                        let msgArray = message.split("(");
                        let state = msgArray[0].replace(" ","")
                        let coordinates = msgArray[1].replace(")","");
                        let lat = Number(coordinates.split(",")[0]);
                        let long = Number(coordinates.split(",")[1]);
                        setActualat(lat)
                        setActualLon(long)
                        
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
                        if(String(state.trim()) === String("Exercisestarted")){
                            setBackgroundColor("blue");
                        }
                        else if(String(state.trim()) === String("Exercisestopped")){
                            setBackgroundColor("black");
                        }
                        else if(String(state.trim()) === String("Alarmon")){
                            setBackgroundColor("black");
                        }
                        else if(String(state.trim()) === String("Alarmoff")){
                            setBackgroundColor("black");
                        }
                        else if (String(state.trim()) === String("Alarmtriggered")){
                            setBackgroundColor("red");
                        }
                        else if (String(state.trim()) === String("Currentlocation:")){
                            setBackgroundColor("red");
                        }
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
        <SafeAreaView>     
            <TouchableOpacity
                onPress={()=>{
                    console.log("open")
                    openModal()
                }}
                // style={styles.ctaButton}
                style={{
                    backgroundColor: backgroundColor,
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
                {/* <Text style={styles.ctaButtonText}>
                {connectedDevice ? "Disconnect" : "Search bike module"}
                </Text> */}
                <View>
                    {backgroundColor === "red" && (
                        <Ionicons
                            name="alert"
                            style={{marginLeft: 10}}
                            size={18}
                            color={"white"}
                        />
                    )}
                    {backgroundColor === "blue" && (
                        <Ionicons
                            name="bicycle"
                            style={{marginLeft: 10}}
                            size={18}
                            color={"white"}
                        />
                    )}
                    {backgroundColor === "black" && (
                        <Ionicons
                            name="bicycle"
                            style={{marginLeft: 10}}
                            size={18}
                            color={"white"}
                        />
                    )}
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
            </TouchableOpacity>
            <MapModal 
                show={isModalVisible} 
                lat={actualLat} 
                long={actualLon}
                closeModal={closeModal}
            />
            {/* <View 
            >
            </View> */}
        </SafeAreaView>
    );

}

export default Status;