import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import { getAuth, signOut } from 'firebase/auth';
import { View } from 'react-native';
import { setIsLoading } from '../store/actions';
import { useDispatch } from 'react-redux';

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
    const dispatch = useDispatch();

    return (
        <View style={{ flex: 1 }}>
            <Button
                text="Log out"
                buttonStyle={{ backgroundColor: Colors.blueGray }}
                onPress={() => {
                    dispatch(setIsLoading(true))
                    signOut(getAuth()).then(() => {
                        dispatch(setIsLoading(false))
                    }).catch((error) => {
                        dispatch(setIsLoading(false))
                    });
                }}
            />
        </View>
    );
}
