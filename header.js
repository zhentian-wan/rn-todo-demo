import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    TextInput,
    View
} from 'react-native';

export const Header = (props) => (
    <View>
        <TextInput
            style={styles.header}
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})