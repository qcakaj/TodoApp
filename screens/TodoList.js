import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { StyleSheet } from "react-native";
import { FlatList, Swipeable } from "react-native-gesture-handler";
import TodoItem from "../components/TodoItem";
import { Ionicons } from '@expo/vector-icons';
import { addDoc, collection, onSnapshot, setDoc, deleteDoc, doc } from "firebase/firestore";
import { useTheme } from "react-native-paper";
import { db } from "../constants/firebaseConfig";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";





const renderAddListIcon = (addItem, colors) => {

    return (

        <TouchableOpacity onPress={() => addItem()} >
            <Ionicons name="add-outline" size={24} color={colors.background} style={{ marginEnd: 12 }}></Ionicons>
        </TouchableOpacity>
    );
}
export default ({ navigation, route }) => {
    let [todoItems, setTodoItems] = useState([]);
    const [newItem, setNewItem] = useState();
    const userUid = useSelector(state => state.userReducer.userUid);
    const toDoListRef = collection(db, "users", userUid, "lists", route.params.listId, "todoList")
    const { colors } = useTheme();
    useEffect(() => {
        const subscribetoItems = onSnapshot(toDoListRef, (doc) => {
            let items = doc.docs.map((doc) => {
                const data = doc.data();
                data.id = doc.id;
                return data
            })
            items = items.sort((a, b) => {
                if (a.isChecked && !b.isChecked) {
                    return 1;
                }
                if (b.isChecked && !a.isChecked) {
                    return -1;
                }
                return 0;
            });
            setTodoItems(items);
        });

        return () => subscribetoItems();
    }, [])


    const addItemToLists = () => {
        // todoItems.push(item);
        // setTodoItems([...todoItems]);
        setNewItem({ text: "", isChecked: false, new: true })
    }

    const removeItemFromLists = (index) => {
        todoItems.splice(index, 1);
        setTodoItems([...todoItems]);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => renderAddListIcon(addItemToLists, colors)
        });
    });

    if (newItem) {
        todoItems = [newItem, ...todoItems]
    }
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
                renderItem={({ item: { id, text, isChecked, ...params }, index }) => {
                    return <Swipeable
                        onSwipeableLeftOpen={() => {
                            console.log("swipe right");
                        }}>

                        <TodoItem
                            color={isChecked ? Colors.lightGray : route.params.color}
                            text={text}
                            {...params}
                            isChecked={isChecked}
                            onChecked={() => {
                                // const todoItem = todoItems[index];
                                // todoItem.isChecked = !isChecked;
                                // updateItem(index, todoItem);
                                let data = { text, isChecked: !isChecked };
                                if (id) {
                                    data.id = id
                                }
                                setDoc(doc(db, "users", userUid, "lists", route.params.listId, "todoList", id), data).then(() => {
                                    console.log("Checked Item", data);
                                })

                            }}
                            onChangeText={(newText) => {
                                // const todoItem = todoItems[index];
                                // todoItem.text = newText;
                                // updateItem(index, todoItem);
                                if (params.new) {
                                    setNewItem({
                                        text: newText,
                                        isChecked,
                                        new: params.new
                                    })
                                } else {
                                    todoItems[index].text = newText;
                                    setTodoItems([...todoItems]);
                                }
                            }}
                            onDelete={() => {
                                params.new ? setNewItem(null) : removeItemFromLists(index);
                                try {
                                    if (id) {
                                        deleteDoc(doc(db, "users", userUid, "lists", route.params.listId, "todoList", id)).then(response => {
                                            console.log("removed");
                                        }).catch(error => {
                                            console.log("ERRROORRR", error);
                                        });
                                    }
                                } catch (error) {
                                    console.log("CAERRROORRR", error);
                                }
                            }
                            }
                            onBlur={() => {


                                if (text.length > 1) {
                                    if (newItem) {

                                        let tempItems = todoItems
                                        tempItems.splice(0, 1)

                                        let has = tempItems.some(item => item.text == newItem.text && item.isChecked == newItem.isChecked);
                                        if (has) {
                                            alert("You already have this task.");
                                            removeItemFromLists(index);
                                        } else {
                                            let data = { text, isChecked }
                                            if (id) {
                                                data.id = id;
                                            }
                                            addDoc(toDoListRef, data).then(() => {
                                            });
                                            params.new && setNewItem(null);
                                        }
                                    }

                                } else {
                                    params.new ? setNewItem() : removeItemFromLists(index);
                                }
                            }}

                        /></Swipeable>
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