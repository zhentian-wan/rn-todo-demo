/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    FlatList,
    ScrollView,
    Text,
    View
} from 'react-native';

import {Header} from './header';
import {Footer} from './footer';
import {Row} from './row';

class App extends Component {

    state = {
        allCompleted: false,
        value: "",
        items: []
    };

    handleAllCompleted = () => {
        const complete = !this.state.allCompleted;
        const newItems = this.state.items.map((item) => ({
            ...item,
            complete
        }));
        this.setState({
            items: newItems,
            allCompleted: complete
        });
        console.table(this.state.items);
    };

    handleAddItem = () => {
        if (!this.state.value) return;
        const newItems = [
            ...this.state.items,
            {
                key: Date.now(),
                text: this.state.value,
                complete: false
            }
        ];

        this.setState({
            items: newItems,
            value: ''
        });

        setTimeout(() => console.log(this.state), 0);
    };

    handleRemove = (item) => {
        const newItems = this.state.items.filter((obj) => {
            return item.key !== obj.key;
        });
        this.setState({
            items: newItems
        });
    };

    handleToggle = (item) => {
        const complete = !item.complete;
        const newItem = {
            ...item,
            complete
        };
        const newItems = this.state.items.map((obj) => {
            if(obj.key !== item.key) {
                return obj;
            }
            return newItem;
        });
        this.setState({
            items: newItems,
        });

        setTimeout(() => console.table(this.state.items), 0);
    }

    _renderRow = ({item}) => {
        return (
            <Row item={item} key={item.key}
                 onRemove={() => this.handleRemove(item)}
                 onToggle={() => this.handleToggle(item)}/>
        );
    };

    _keyExtractor = (item, index) => item.key;

    render() {
        return (
            <View style={styles.container}>
                <Header
                    value={this.state.value}
                    onAddItem={this.handleAddItem}
                    toggleAllComplete={this.handleAllCompleted}
                    onChange={(value) => this.setState({ value })}
                />
                <View style={styles.content}>
                    <FlatList
                        data={this.state.items}
                        renderItem={this._renderRow}
                        extraData={this.state.items}
                        keyExtractor={this._keyExtractor}
                    />
                </View>
                <Footer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        ...Platform.select({
            ios: { paddingTop: 30 }
        })
    },
    content: {
        flex: 1
    }
})

export default App;