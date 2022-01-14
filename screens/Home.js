import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { db } from '../constants/firebaseConfig';
import { collection,setDoc, doc, onSnapshot, deleteDoc  } from 'firebase/firestore';
import { useSelector  } from 'react-redux';

const ListButton = ({ title, color, onPress, onDelete, onOptions,colors}) => {
    
    return (
        <TouchableOpacity
            style={[styles.itemContainer, { backgroundColor: color }]}
            onPress={onPress}>
            <View>
                <Text style={[styles.itemTitle, { color: colors.text }]}> {title} </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={onOptions} disallowInterruption={true}>
                    <Ionicons name="options-outline" size={32} color="white"></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} disallowInterruption={true}>
                    <Ionicons name="trash-outline" size={32} color="white"></Ionicons>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const renderAddListIcon = (navigation, addItemToLists,colors) => {
  

    return (
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => { navigation.navigate("Edit", { saveChanges: addItemToLists }) }} >
                <Ionicons name="add-outline" size={24} color={colors.text} style={{ marginEnd: 12 }}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate("Settings") }} >
                <Ionicons name="settings-outline" size={24} color={colors.text} style={{ marginEnd: 12 }}></Ionicons>
            </TouchableOpacity>
        </View>
    );
}
export default ({ navigation }) => {

    const [lists, setLists] = useState([]);
    const userUid = useSelector(state => state.userReducer.userUid);
    const { colors } = useTheme();
    const listsRef = collection(db, "users", userUid, "lists");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => renderAddListIcon(navigation, addItemToLists, colors)
        });
    });
        useEffect(() => {
          const subscribetoItems =   onSnapshot(listsRef, (doc) => {
                let items = doc.docs.map((doc)=> {
                    const data = doc.data();
                    data.id = doc.id;
                    return data
                })
                items = items.sort((a, b) => {
                    if (a.index < b.index) {
                        return -1
                    }
                    if (a.index > b.index) {
                        return 1
                    }
                    return 0
                });
                  setLists(items);
            });

            return () => subscribetoItems();
    }, [])
    const addItemToLists = ({title, color }) => {
        const index = lists.length > 1 ? lists[lists.length - 1].index + 1 : 0 ;
        const document = title ? doc(db,"users",userUid,"lists", title) : collection(db,"users",userUid,"lists");
        setDoc(document,{title,color,index}).then(()=> {
           console.log("Add new item");
        })
    }

    const removeItemFromLists = (id) => {
        // lists.splice(index, 1);
        // setLists([...lists]);
        //deleteDoc(doc(db, "cities", "DC"));
        deleteDoc(doc(db,"users",userUid,"lists", id)).then(()=> {
            console.log("removed");
        })
    }

    const updateItemFromLists = (id, item) => {

        setDoc(doc(db,"users",userUid,"lists", id),item).then(()=>{
            console.log("id: ", id);
            console.log("index: ", item.index);
        })
    }

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
                renderItem={({ item: { title, color ,id , index} }) => {
                    return (
                        <ListButton
                            title={title}
                            color={color}
                            colors={colors}
                            onPress={() => { navigation.navigate("Todo List", { title, color, listId:id }) }}
                            onDelete={() => removeItemFromLists(id)}
                            onOptions={() => {
                                navigation.navigate(
                                    "Edit",
                                    {
                                        title,
                                        color,
                                        saveChanges: (newItem) => updateItemFromLists(id, {index,...newItem})
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