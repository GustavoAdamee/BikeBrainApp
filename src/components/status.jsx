import { Button, Text, View, TouchableHighlight } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';


const Status = (props) => {
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
                size={25} 
                color={"white"}
            />
        </View>
        <Text 
            style={{
                color: "white",
                fontSize: 16,
            }}
        >
            {props.location} - ({props.lastUpdate})
        </Text>
        <View>
            <Ionicons
                name="location"
                style={{marginRight: 10}}
                size={20}
                color={"white"}
            />
        </View>
    </View>
  );

}

export default Status;