import React from 'react';
import {
    View,
    Switch,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export const Row = ({item, onToggle, onRemove}) => (
    <View style={styles.row}>
        <Switch value={item.complete} onValueChange={onToggle}/>
        <View style={styles.textWrapper}>
            <Text style={[styles.text, item.complete && styles.complete]}>
                {item.text}
            </Text>
        </View>
        <TouchableOpacity onPress={onRemove}>
            <Text style={styles.remove}>
                X
            </Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    row: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    textWrapper: {
        marginHorizontal: 10,
        flex: 1
    },
    text: {
        fontSize: 24,
        color: '#4d4d4d'
    },
    complete: {
        textDecorationLine: 'line-through'
    },
    remove: {
        fontSize: 20,
        color: '#4d4d4d'
    },
});