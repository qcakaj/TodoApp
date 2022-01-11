import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Checkbox from "./Checkbox";
import Colors from "../constants/Colors";
import { useTheme } from "react-native-paper";


const EditableText = ({ isChecked, onChangeText, text,isNewItem }) => {
    const [isEditMode, setEditMode] = useState(isNewItem);

    return (
        <TouchableOpacity style={{ flex: 1 }} onPress={() => !isChecked && setEditMode(true)}>
            {isEditMode ?
                <TextInput
                    autoFocus={true}
                    value={text}
                    onChangeText={onChangeText}
                    placeholder={"Add new item here"}
                    onSubmitEditing={() => { }}
                    maxLenth={30}
                    onBlur={() => { setEditMode(false) }}
                    style={styles.input}
                /> :
                <Text style={styles.text,
                {
                    color: isChecked ?
                        Colors.lightGray :
                        Colors.black,
                    textDecoration: isChecked ? "line-through" : "none"
                }
                }>{text}</Text>
            }
        </TouchableOpacity>
    );
}
export default ({ text, isChecked, onChecked, onChangeText, onDelete,isNewItem }) => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", flex: 1 }}>
                <Checkbox isChecked={isChecked} onChecked={onChecked} />
                <EditableText
                    text={text}
                    onChangeText={onChangeText}
                    isNewItem={isNewItem}
                    isChecked={isChecked}
                />
            </View>
            <TouchableOpacity
                onPress={onDelete}>
             <Text style={[styles.icon,{color: Colors.red}]}>X</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    icon: {
        padding: 5,
        fontSize: 16
    },

    input: {
        color: Colors.black,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 0.5,
        marginHorizontal: 5,
        padding: 3,
        height: 25,
        fontSize: 16,
    },
    text: {
        padding: 3,
        fontSize: 16,
    }
});