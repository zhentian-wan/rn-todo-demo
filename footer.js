import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
export const Footer = ({filter = 'ALL', count, onClearComplete, onFilter}) => (
    <View style={styles.container}>
        <Text>Count: {count}</Text>
        <TouchableOpacity
            onPress={() => onFilter('ALL')}
            style={[styles.button, filter === 'ALL' && styles.selected]}>
            <Text >
                All
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onFilter('ACTIVATE')}
            style={[styles.button, filter === 'ACTIVATE' && styles.selected]}>
            <Text >
                Active
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onFilter('COMPLETED')}
            style={[styles.button, filter === 'COMPLETED' && styles.selected]}>
            <Text >
                Completed
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClearComplete}>
            <Text>
                Clear Completed
            </Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        paddingVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    selected: {
        borderColor: 'rgba(175, 47,47,.2)'
    }
})