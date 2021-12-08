import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import TodoItem from "../components/TodoItem";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "react-native-paper";





const renderAddListIcon = (addItem) => {
    const { colors } = useTheme();
    return (
      
        <TouchableOpacity onPress={() => addItem({ text: "", isChecked: false, isNewItem: true })} >
                <Ionicons name="add-outline" size={24} color={colors.background} style={{ marginEnd: 12 }}></Ionicons>
        </TouchableOpacity>
    );
}
export default ({ navigation,theme }) => {
    const [todoItems, setTodoItems] = useState(
        [{ text: "hello", isChecked: false }]
    );


    const addItemToLists = (item) => {
        todoItems.push(item);
        setTodoItems([...todoItems]);
    }

    const removeItemFromLists = (index) => {
        todoItems.splice(index, 1);
        setTodoItems([...todoItems]);
    }

    const updateItem = (index, item) => {
        todoItems[index] = item;
        setTodoItems([...todoItems]);
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => renderAddListIcon(addItemToLists)
        });
    });
    return (
        <View style={styles.container}>
            <FlatList
                data={todoItems}
                removeClippedSubviews={false}
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
                renderItem={({ item: { text, isChecked, isNewItem }, index }) => {
                    return <TodoItem
                        text={text}
                        isChecked={isChecked}
                        isNewItem={isNewItem}
                        onChecked={() => {
                            const todoItem = todoItems[index];
                            todoItem.isChecked = !isChecked;
                            updateItem(index, todoItem);
                        }}
                        onChangeText={(newText) => {
                            const todoItem = todoItems[index];
                            todoItem.text = newText;
                            updateItem(index, todoItem);
                        }}
                        onDelete={() => {
                            removeItemFromLists(index);
                        }} />
                }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        padding: 5,
        fontSize: 32,
    }
});