
import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import ColorSelector from '../components/ColorSelector';

export default ({ buttonStyle, textStyle,onPress,text}) => {
    return (
        <TouchableOpacity
            style={[styles.button,buttonStyle]}
            onPress= {onPress}
        >
            <Text
                style={[styles.text,{textStyle}]}
            > {text} </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        borderRadius: 25,
        height: 48,
        margin: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold"
    }
});