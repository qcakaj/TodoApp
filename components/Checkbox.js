import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default ({ isChecked, onChecked, ...props }) => {
    return (
        <TouchableOpacity
            style={styles.checkbox}
            onPress={onChecked}>
            <Text style= {{color: Colors.lightGray}}>{isChecked ? "🗸" : "" }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    checkbox: {
        width: 20,
        height: 20,
        margin: 5,
        backgroundColor: "#fff0",
        color: "#ccc",
        borderWidth: 1,
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center"
    }
});