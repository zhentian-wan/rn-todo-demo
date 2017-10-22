/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Header} from './header';
import {Footer} from './footer';

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