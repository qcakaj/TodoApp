import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import { getAuth, signOut } from 'firebase/auth';
import { View } from 'react-native';

const colorList = [
    "blue",
    "teal",
    "green",
    "olive",
    "yellow",
    "orange",
    "red",
    "pink",
    "purple",
    "blueGray"
];
export default ({ navigation, route }) => {
    return (
        <View style={{ flex: 1 }}>
            <Button
                text="Log out"
                buttonStyle={{ backgroundColor: Colors.blueGray }}
                onPress={() => {
                    signOut(getAuth()).then(() => {
                        // Sign-out successful.
                    }).catch((error) => {
                        // An error happened.
                    });
                }}
            />
        </View>
    );
}
