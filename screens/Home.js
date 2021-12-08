import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useTheme } from 'react-native-paper';

const ListButton = ({ title, color, onPress, onDelete, onOptions }) => {
    const { colors } = useTheme();


    return (
        <TouchableOpacity
            style={[styles.itemContainer, { backgroundColor: color }]}
            onPress={onPress}>
            <View>
                <Text style={[styles.itemTitle,{color:colors.surface }]}> {title} </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={onOptions} disallowInterruption={true}>
                    <Ionicons name="options-outline" size={32} color={colors.background}></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} disallowInterruption={true}>
                    <Ionicons name="trash-outline" size={32} color={colors.background}></Ionicons>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const renderAddListIcon = (navigation, addItemToLists) => {
    const {colors} =useTheme();

    return (
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => { navigation.navigate("Edit", { saveChanges: addItemToLists }) }} >
                <Ionicons name="add-outline" size={24} color={colors.backdrop} style={{ marginEnd: 12 }}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate("Settings") }} >
                <Ionicons name="settings-outline" size={24} color={colors.backdrop} style={{ marginEnd: 12 }}></Ionicons>
            </TouchableOpacity>
        </View>
    );
}
export default ({ navigation }) => {

    const [lists, setLists] = useState([
        { title: "School", color: Colors.blue },
        { title: "Work", color: Colors.green }
    ]);

    const addItemToLists = (item) => {
        lists.push(item);
        setLists([...lists]);
    }

    const removeItemFromLists = (index) => {
        lists.splice(index, 1);
        setLists([...lists]);
    }

    const updateItemFromLists = (index, item) => {
        lists[index] = item
        setLists([...lists])
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => renderAddListIcon(navigation, addItemToLists)
        });
    });
    return (
        <View style={styles.container}>
            <FlatList
                data={lists}
                contentContainerStyle={{ flexGrow: 1 }}
                ListEmptyComponent={() => {
                    return (
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}><Text >Empty list</Text></View>
                    );
                }}
                renderItem={({ item: { title, color }, index }) => {
                    return (
                        <ListButton
                            title={title}
                            color={color}
                            onPress={() => { navigation.navigate("Todo List", { title, color }) }}
                            onDelete={() => removeItemFromLists(index)}
                            onOptions={() => {
                                navigation.navigate(
                                    "Edit",
                                    {
                                        title,
                                        color,
                                        saveChanges: (item) => updateItemFromLists(index, item)
                                    })
                            }
                            } />
                    );
                }} />


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    itemTitle: {
        fontSize: 24,
        padding: 5,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        flex: 1,
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
    },
    icon: {
        padding: 5,
        fontSize: 24
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    }
});