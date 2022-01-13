import { CommonActions, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import Colors from '../constants/Colors';
import ColorSelector from '../components/ColorSelector';
import Button from '../components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
    const [title, setTitle] = useState(route.params.title || "");
    const [color, setColor] = useState(route.params.color || Colors.blue);
    const [isValid, setValidity] = useState(true);
    const { colors } =useTheme();
    return (
        <KeyboardAwareScrollView
         contentContainerStyle={styles.container}
         resetScrollToCoords={{ x: 0, y: 0 }}  
         scrollEnabled={false}    >
            <View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.label,{color:colors.text}]}>List Name</Text>
                    {!isValid &&
                        <Text
                            style={{ color: Colors.red, fontSize: 12, marginLeft: 4 }}
                        >*List name cannot be empty
                        </Text>}
                </View>
                <TextInput
                    autoFocus={true}
                    value={title}
                    onChangeText={(text) => {
                        setTitle(text);
                        setValidity(true);
                    }}
                    placeholder={"New list name"}
                    maxLenth={30}
                    style={[styles.input,{color:colors.text}]}
                />
                <Text style={[styles.label,{color:colors.text}]}>Choose color</Text>
                <ColorSelector
                    onSelect={(color) => {
                        console.log(color);
                        setColor(color);
                        navigation.dispatch(CommonActions.setParams({color:color}));
                    }}
                    selectedColor={color}
                    colorOptions={colorList}
                />
            </View>
        <Button
        text="Save"
        buttonStyle={{ backgroundColor: color || Colors.blueGray} }
        onPress={() => {
            if (title.length > 1) {
                route.params.saveChanges({ title, color });
                navigation.dispatch(CommonActions.goBack());
            } else {
                setValidity(false);
            }

        }}
        />
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        justifyContent: "space-between"
    },
    input: {
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 0.5,
        marginHorizontal: 5,
        padding: 3,
        height: 30,
        fontSize: 18
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 12,
        marginTop : 12
    }
});