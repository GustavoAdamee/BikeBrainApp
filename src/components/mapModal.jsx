import React, { useCallback, useEffect } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MapView, {Polyline, PROVIDER_GOOGLE} from "react-native-maps";
import {Marker} from 'react-native-maps';

const MapModal = ({ show, lat, long, closeModal }) => {

    useEffect(() => {
        console.log("modal");
    }
    , []);

    console.log(show)
    console.log(lat)
    console.log(long)

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={show}
            onRequestClose={closeModal}
        >
            <MapView
                style={{
                    flex: 0.7,
                }}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >

                {/* <Polyline
                    // coordinates={activity.coordinates}
                    strokeColor="#000" // fallback color
                    strokeWidth={4}
                /> */}
                <Marker
                    coordinate={{
                        latitude: lat,
                        longitude: long
                    }}
                />
            </MapView>
        </Modal>
    )
}

export default MapModal;