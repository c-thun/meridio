import React, { Component } from 'react';

import {
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    View,
    FlatList
} from 'react-native';

import UserAvatar from './userItem';
import FileItem from './fileItem';
import FloatingList from './floatingList';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'First Item',
        icon: '0'
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'Second Item',
        icon: '1'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        name: 'Third Item',
        icon: '2'
    },
]

const container = () => {
    return {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        margin: 8,
        borderRadius: 10,
        borderBottomWidth: 3,
        alignItems: "flex-start",
        justifyContent: "space-between"
    };
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 18,
        marginHorizontal: 8,
        backgroundColor: "silver",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingLeft: 10,
        paddingBottom: 4,
        paddingTop: 4
    },
    incoming: {
        marginHorizontal: 8,
        paddingTop: 4,
        backgroundColor: "silver",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        paddingLeft: 10,
        paddingBottom: 4,
        marginBottom: 10
    },
    notifications: {
        marginHorizontal: 8,
        paddingTop: 4,
        backgroundColor: "silver",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        paddingLeft: 10,
        paddingBottom: 4,
    }
});
export default function ReceiveScreen() {
    return (
        <SafeAreaView>
            <FloatingList 
                dataSrc={DATA}
                isHorizontal={true}
                listTitle="Ongoing Shares"
                listElementType="UserAvatar"
                titleBackground="teal"
                titleColor="white"
            />
            <FloatingList 
                listTitle="Incoming"
                listElementType="FileItem"
                emptyMessage="No files received so far"
                height={400}
            />
        </SafeAreaView>
    );
}