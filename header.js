import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export const Header = (props) => (
    <View style={styles.header}>
        <TouchableOpacity
            onPress={props.toggleAllComplete}>
            <Text style={styles.toggleIcon}>
                {String.fromCharCode(10003)}
            </Text>
        </TouchableOpacity>
        <TextInput
            style={styles.input}
            value={props.value}
            onChangeText={props.onChange}
            onSubmitEditing={props.onAddItem}
            blurOnSubmit={false}
            returnKeyType="done"
            placeholder="What need to be done?"
            />
    </View>
);

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    toggleIcon: {
        fontSize: 30,
        color: "#CCC"
    },
    input: {
        flex: 1,
        marginLeft: 16,
        height: 50
    }
})