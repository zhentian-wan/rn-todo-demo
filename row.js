import React from 'react';
import {
    View,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export const Row = ({item, onToggle, onRemove, onUpdate, onToggleEdit}) => {
    const textComponent = (
        <View style={styles.textWrapper}>
            <TouchableOpacity
                onLongPress={() => onToggleEdit(true)}>
                <Text
                    style={[styles.text, item.complete && styles.complete]}
                >{item.text}</Text>
            </TouchableOpacity>
        </View>
    );
    const removeButton = (
        <TouchableOpacity onPress={onRemove}>
            <Text style={styles.remove}>
                X
            </Text>
        </TouchableOpacity>
    );
    const editingComponent = (
        <View style={styles.textWrapper}>
            <TextInput
                autoFocus
                style={styles.text}
                onChangeText={onUpdate}
                value={item.text}
                multiline
            />
        </View>
    );
    const doneButton = (
        <TouchableOpacity
            style={styles.doneButton}
            onPress={() => onToggleEdit(false)}
        >
            <Text style={styles.doneText}>Save</Text>
        </TouchableOpacity>
    );
    return (
        <View style={styles.row}>
            <Switch value={item.complete} onValueChange={onToggle}/>

            {
                item.editing ?
                    editingComponent:
                    textComponent
            }

            {
                item.editing ?
                    doneButton:
                    removeButton
            }
        </View>
    );
};

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
    input: {
        height: 100,
        flex: 1,
        color: "#4d4d4d",
        padding: 0
    },
    complete: {
        textDecorationLine: 'line-through'
    },
    remove: {
        fontSize: 20,
        color: '#4d4d4d'
    },
    doneButton: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#7be290",
        padding: 7
    },
    doneText: {
        color: "#4d4d4d",
        fontSize: 20
    }
});