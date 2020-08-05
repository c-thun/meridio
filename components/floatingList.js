import React from "react";
import PropTypes from "prop-types";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    SafeAreaView,
    ScrollView,
    FlatList,
    Button
} from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    connect
} from 'react-redux';

import {
    useDarkMode,
    DynamicStyleSheet,
    DynamicValue,
    useDynamicValue
} from 'react-native-dynamic';

import UserAvatar from './userItem';
import FileItem from './fileItem';
import OngoingShare from './ongoingShare';
import CompletedShare from './completedShare';
import { theme } from '../defaults/theme';
import { addFiles } from './pickFiles';
import { color } from "react-native-reanimated";

// Stylesheets
const container = (viewFlex) => {
    return {
        flex: viewFlex,
        textAlign: "center",
        marginBottom: "2%",
    };
}

const dynamicStyles = new DynamicStyleSheet({
    container: {
        backgroundColor: new DynamicValue(theme.light.background, theme.dark.background)
    },
    listStyle: {
        marginHorizontal: 12,
        backgroundColor: new DynamicValue(theme.light.tertiaryBackground, theme.dark.tertiaryBackground),
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        paddingBottom: 4,
        paddingTop: 4,
        marginBottom: "1%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    heading: {
        fontSize: 16,
        marginHorizontal: 12,
        color: new DynamicValue(theme.light.primary, theme.dark.primary),
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 2.5,
        borderBottomLeftRadius: 2.5,
        paddingLeft: 12,
        marginTop: '1%',
        paddingBottom: 4,
        paddingTop: 4,
        lineHeight: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    }
})

const emptyListDynamic = new DynamicStyleSheet({
    textContainer: {
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        flex: 1,
        width: 300,
        paddingHorizontal: 40,
        justifyContent: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    text: {
        color: new DynamicValue(theme.light.tertiary, theme.dark.tertiary),
        textAlignVertical: "center",
        alignSelf: "stretch",
        flex: 1,
        flexGrow: 1,
        flexWrap: 'wrap',
        textAlign: "center",    
        backgroundColor: new DynamicValue(theme.light.tertiaryBackground, theme.dark.tertiaryBackground)
    },
    buttonContainer: {
        justifyContent: 'center',
        flex: 1,
        flexGrow: 1,
        textAlignVertical: 'center',
        flexDirection: 'column',
    },
    button: {
        marginBottom: "20%",
        alignItems: 'center',
        width: 100,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 50
    }
});

// Default view for when there is nothing in the list
const ListEmptyView = (props) => {
    const {
        listComponentType,
        accent
    } = props;

    const emptyListStyles = useDynamicValue(emptyListDynamic);

    const isDarkMode = useDarkMode();

    switch (listComponentType) {
        case "UserAvatar":
            return (
                <View style={emptyListStyles.textContainer}>
                    <Text style={emptyListStyles.text}>No users found nearby{"\n"}{"\n"}Nearby devices who have the Meridio app open will be shown here</Text>
                </View>
            )
        case "FileItem":
            return (
                <View style={emptyListStyles.buttonContainer}>
                    <Text style={emptyListStyles.text}>You have not selected any files for sharing{"\n"}{"\n"}{"\n"}Click on the button below to add files for sending</Text>
                    <TouchableOpacity onPress={addFiles} style={[emptyListStyles.button, { backgroundColor: isDarkMode ? accent.dark : accent.light }]}>
                        <Text style={{ color: isDarkMode ? theme.dark.label : theme.light.primary }}> Add Files </Text>
                    </TouchableOpacity>
                </View>
            );
        case "OngoingShare":

        case "CompletedShare":
    }
}

// Intelligently select the type of item in the list to be rendered
const ListItem = (props) => {
    const {
        item,
        listComponentType
    } = props;

    switch (listComponentType) {
        case "UserAvatar":
            return (
                <UserAvatar
                    id={item.id}
                    avatarIcon={item.icon}
                    userName={item.name}
                />
            );
        case 'FileItem':
            return (
                <FileItem
                    id={item.id}
                    fileType={item.type}
                    fileName={item.name}
                    fileSize={item.size}
                />
            );
        case 'OngoingShare':
            return (
                <OngoingShare
                    id={item.id}
                    userName={item.type}
                    completedPercentage={item.percent}
                    itemsDone={item.done}
                    itemsTotal={item.total}
                />
            );
        case 'CompletedShare':
            return (
                <CompletedShare
                    id={item.id}
                    avatarIcon={item.icon}
                    userName={item.name}
                />
            );
        default:
            return (
                <Text> {listComponentType} {item.name} </Text>
            );
    }
}

const FloatingList = (props) => {
    const {
        dataSrc,
        listTitle,
        isHorizontal,
        listElementType,
        emptyMessage,
        flex,
        accentColor
    } = props;

    const styles = useDynamicValue(dynamicStyles);

    const isDarkMode = useDarkMode();

    return (
        <View style={[container(flex), styles.container]}>
            <Text style={[styles.heading, { backgroundColor: isDarkMode ? accentColor.dark : accentColor.light }]}>
                {listTitle}
                <Ionicons name="chevron-forward"> </Ionicons>
            </Text>
            <FlatList
                horizontal={isHorizontal}
                style={styles.listStyle}
                contentContainerStyle={{flexGrow: 1}}
                data={dataSrc}
                renderItem={({ item, index, separators }) => (
                    <ListItem
                        item={item}
                        listComponentType={listElementType}
                    />
                )}
                ListEmptyComponent={
                    <ListEmptyView
                        listComponentType={listElementType}
                        accent={accentColor}
                    />
                }
                keyExtractor={item => item.id}
            />
        </View>
    );
};

FloatingList.propTypes = {
    listTitle: PropTypes.string,
    isHorizontal: PropTypes.bool,
    listElementType: PropTypes.string
};

FloatingList.defaultProps = {
    listTitle: "Meridio",
    isHorizontal: false,
    dataSrc: [],
    emptyMessage: "Sorry, nothing here",
    height: 100,
};

const mapStateToProps = (state) => {
    return {
        accentColor: state.prefs.accentColor
    }
}

export default connect(mapStateToProps)(FloatingList);