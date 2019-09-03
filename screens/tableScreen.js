import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Text, TextInput, Image, Button, FlatList } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Input } from 'react-native-elements';

export default class ExampleOne extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading: true,
            cleans: [],
            error: null,
            loggedIn: false,
            tableHead: ['DATE', 'ROOM', 'SCORE'],
            tableData: [
                ['07/29/2016', 'JEFF', '100%'],
                ['07/29/2016', 'JEFF', '83%'],
                ['07/29/2016', 'JEFF', '100%'],
                // [ {items.date}, {items.room}, {items.inspection_score}],

            ]
        }
    }


    async componentDidMount()
    {
        try
        {
            let token = await AsyncStorage.getItem("token");
            await this.getRecentCleans(token);
            await this.getRooms(token);
            this.setState({ loggedIn: true });
        } catch {
            this.setState({ loggedIn: false });
        }
    }

    getRecentCleans = async (token) =>
    {
        try
        {
            let cleans = await fetch('https://pilot.readylist.com/mobile/get_recent_cleans.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "jwt": token
                })
            }).then(res => res.json());
            this.setState({ cleans: cleans.recent_cleans });
        
        } catch (error)
        {
            alert("You must be logged in")
        }
    }

    getRooms = async (token) =>
    {
        try{
            let rooms = await fetch('https://pilot.readylist.com/mobile/get_rooms.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "jwt": token
                })
            }).then(res => res.json());
            this.setState({ rooms: rooms.rooms});
        } catch (error){
            alert("You must be logged in")
        }
    }

    render()
    {
        const state = this.state;
        return (
            <View style={{ flexDirection: 'column'}}>
                
                    <FlatList 
                        data={state.rooms}
                        renderItem={({item}) => <Text>{item.name}</Text>}
                    />
                <View style={styles.table}>
                    <Table borderStyle={{borderWidth: -1, borderColor: '#c8e1ff', borderBottomWidth: 1}}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text1} />
                        <Rows data={state.cleans} textStyle={styles.text} />
                    </Table>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { padding: 16, paddingTop: 30, backgroundColor: '#fff', marginTop: 50, flexDirection: 'row' },
    head: { height: 20, backgroundColor: 'blue' },
    text: { margin: 6 },
    text1: { color: 'white', alignItems: 'center', marginLeft: 5 },

table: {
    marginTop: 50, width: '95%', position: "absolute", borderBottomWidth: 2, borderBottomColor: '#c8e1ff', marginLeft: 10, flex:1
    },
});
