import React from 'react';
import { ScrollView, StyleSheet, FlatList, Text, AsyncStorage, View, ImageBackground, CheckBox} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { ExpoLinksView } from '@expo/samples';
import {Table} from "react-native-table-component";
import Autocomplete from "react-native-autocomplete-input";


export default class test2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            cleans: [],
            error: null,
            loggedIn: false,

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
            let cleans = await fetch('https://pilot.readylist.com/mobile/get_cleaning_items.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // "jwt": token

                    "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Njc2MTEyNTcsImRhdGEiOnsiaWQiOiI3MTEiLCJmaXJzdF9uYW1lIjoiVGVzdCIsImxhc3RfbmFtZSI6IlNtaXRoMSIsIm9yZ19pZCI6IjQiLCJ1c2VyX3R5cGVfaWQiOiIyIn19.7nyIdSSaOVwcd-EA6nM-ZR3Gbwhvg8JPkfZ51tUrL70",
                    "room_id": "921",
                    "cleaning_version_id": "8"
                })
            }).then(res => res.json());
            this.setState({cleans: cleans.items});
        } catch(error){
            alert("You must be logged in")
        }
    }

    getHeader(){

    }

    render() {
        return (

            <ScrollView style = { styles.container } >


                { !this.state.loggedIn ? (
                    <Text></Text>

                ): (

                    <FlatList
                        data={this.state.cleans}
                        renderItem={({ item }) => (
                            <>

                                <View/>
                                <CheckBox>{item.name} </CheckBox>
                                <View style={styles.separator} />
                            </>

                        )}
                        keyExtractor={item => item.room}
                    />
                )}

                <View>
                    <View style={styles.autocompleteContainer}>
                        <Autocomplete {/* your props */} />
                    </View>
                    <View>
                        <Text>Some content</Text>
                    </View>
                </View>
            </ScrollView>



        );

    }
}




test2.navigationOptions = {
    title: 'test2',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
        width: "90%"
    },
    separator: {
        marginVertical: 5,
        borderWidth: 0.5,
        borderColor: '#DCDCDC',
    },

    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },

});
