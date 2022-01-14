import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Checkbox from "./Checkbox";
import Colors from "../constants/Colors";
import { useTheme , Card} from "react-native-paper";
import { color } from "react-native-reanimated";


const EditableText = ({ isChecked, onChangeText, text, ...props}) => {
    const [isEditMode, setEditMode] = useState(props.new);
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
                    onBlur={() => {
                        props.onBlur && props.onBlur()
                         setEditMode(false)
                          }}
                    style={styles.input}
                /> :
                <Text style={styles.text,
                {
                    color: isChecked ?
                        Colors.black :
                        "white",
                }
                }>{text}</Text>
            }
        </TouchableOpacity>
    );
}
export default ({ text, isChecked, onChecked, onChangeText, onDelete,...props }) => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
        <Card style = {[styles.container,{backgroundColor:props.color,color: isChecked ? props.color : "white"}]}>
            <View style={{ flexDirection: "row", flex: 1 }}>
                <Checkbox isChecked={isChecked} onChecked={onChecked} />
                <EditableText
                style = {{color: isChecked ? Colors.lightGray : "white"}}
                    text={text}
                    onChangeText={onChangeText}
                    isChecked={isChecked}
                    {...props}
                />
            </View>
            
                 <TouchableOpacity
                 style= {{flex:1,alignItems:"center"}}
                onPress={onDelete}>
             <Text style={[styles.icon,{color: Colors.red}]}>X</Text>
            </TouchableOpacity> 
        
            </Card>
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
        color: 'white',
        padding: 3,
        fontSize: 16,
    }
});