import React, { Component } from 'react';
import {AsyncStorage, StyleSheet, View, Text, TextInput, Image} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

export default class ExampleOne extends Component {
    constructor(props){
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


    async componentDidMount(){
        try {
            let token = await AsyncStorage.getItem("token");
            await this.getRecentCleans(token);
            this.setState({loggedIn: true });
        } catch {
            this.setState({ loggedIn: false });
        }
    }

    getRecentCleans = async (token) => {
        try{
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
            this.setState({cleans: cleans.recent_cleans});
        } catch(error){
            alert("You must be logged in")
        }
    }








    render() {
        const state = this.state;
        return (

            <View style={styles.logo}>
                <Image source = {require('../assets/images/logo2-min.png')}
                       // style={{width: 218, height: 62  }}
                />

            <View style={styles.container}>
                <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholder = "Type Room Number"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           onChangeText = {this.handleRoomNumber}/>


            <View style={styles.table}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text1}/>
                    <Rows data={state.tableData} textStyle={styles.text}/>
                </Table>
            </View>
            </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff', marginTop: 50 },
    head: { height: 20, backgroundColor: 'blue', color: 'white' },
    text: { margin: 6 },
    text1: {color: 'white', alignItems: 'center'},
     logo:{
    flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff',

    marginLeft: 30,

    },
    input: {
        width: 275,
        margin: 10,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        textAlign: 'center',
        marginBottom: 60,

        position: "absolute",

    },
    table:{
        flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff', marginTop: 50, width: 275,position: "absolute",
    },
});
