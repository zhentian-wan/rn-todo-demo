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
    AsyncStorage,
    Animated,
    Easing,
    ActivityIndicator,
    View
} from 'react-native';

import {Header} from './header';
import {Footer} from './footer';
import {Row} from './row';


class App extends Component {
    state = {
        loading: true,
        selectedFilter: 'ALL',
        allCompleted: false,
        value: '',
        items: []
    };

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        AsyncStorage.getItem('items')
            .then(json => {
                try {
                    const items = JSON.parse(json);
                    items && this.setState({items, loading: false})
                } catch(err) {
                    this.setState({loading: false})
                }
            })
    }
    componentDidMount() {
        Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 2000,
            easing: Easing.easeIn
        }).start();
    }
    handleUpdateText = (key, text) => {
        const filteredItems = this.filteredItems(
            this.state.selectedFilter
        );
        const newItems = filteredItems.map((item) => {
            if (item.key !== key) {return item;}
            return {
                ...item,
                text
            }
        });
        this.setState({
            items: newItems
        })
    };
    handleToggleEditing = (key, editing) => {
        const filteredItems = this.filteredItems(
            this.state.selectedFilter
        );
        const newItems = filteredItems.map((item) => {
            if (item.key !== key) {return item;}
            return {
                ...item,
                editing
            }
        });
        this.setState({
            items: newItems
        })
    };
    handleAllCompleted = () => {
        const complete = !this.state.allCompleted;
        const newItems = this.state.items
            .map((item) => ({
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
        const newItems = this.state.items
            .filter((obj) => {
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
        const newItems = this.state.items
            .map((obj) => {
                if (obj.key !== item.key) {
                    return obj;
                }
                return newItem;
            });
        this.setState({
            items: newItems,
        });

        setTimeout(() => console.table(this.state.items), 0);
    };

    filteredItems = (filter) => {

        AsyncStorage.setItem('items', JSON.stringify(this.state.items));

        switch (filter) {
            case 'ALL':
                return this.state.items;
            case 'ACTIVATE':
                return this.state.items.filter((item) => {
                    return !item.complete
                });
            case 'COMPLETED':
                return this.state.items.filter((item) => {
                    return item.complete
                });
            default:
                return this.state.item;
        }
    };

    handlerFilter = (filter) => {
        this.setState({
            selectedFilter: filter,
        });
    };

    handleClearComplete = () => {
        const newItems = this.filteredItems('ACTIVATE');
        this.setState({
            items: newItems
        });
    };

    _renderRow = ({item}) => {
        return (
            <Row item={item} key={item.key}
                 onUpdate={(text) => this.handleUpdateText(item.key, text)}
                 onToggleEdit={(editing) => this.handleToggleEditing(item.key, editing)}
                 onRemove={() => this.handleRemove(item)}
                 onToggle={() => this.handleToggle(item)}/>
        );
    };

    _keyExtractor = (item, index) => item.key;

    render() {

        const animatedStyle = {
            opacity: this.animatedValue
        };

        return (
            <Animated.View style={[styles.container, animatedStyle]}>
                <Header
                    value={this.state.value}
                    onAddItem={this.handleAddItem}
                    toggleAllComplete={this.handleAllCompleted}
                    onChange={(value) => this.setState({value})}
                />
                <View style={styles.content}>
                    <FlatList
                        data={this.filteredItems(this.state.selectedFilter)}
                        renderItem={this._renderRow}
                        keyExtractor={this._keyExtractor}
                    />
                </View>
                <Footer
                    onClearComplete={this.handleClearComplete}
                    count={this.filteredItems('ACTIVATE').length}
                    filter={this.state.selectedFilter}
                    onFilter={this.handlerFilter}
                />
                {this.state.loading && <View style={styles.loading}>
                    <ActivityIndicator
                        animating
                        size="large"
                    />
                </View>}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        ...Platform.select({
            ios: {paddingTop: 30}
        })
    },
    content: {
        flex: 1
    },
    loading: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,.2)"
    }
});

export default App;