import React from 'react';
import { ScrollView, StyleSheet, FlatList, Text, AsyncStorage, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {Table} from "react-native-table-component";
import {Input} from "react-native-ui-kitten";
import Footer from '../constants/Footer'
import TouchableHighlight from "react-native-web/dist/exports/TouchableHighlight";

export default class RecentCleans extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            cleans: [],
            error: null,
            loggedIn: false
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
            let cleans = await fetch('https://pilot.readylist.com/mobile/get_cleaning_versions.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "jwt": token,
                    "room_id": "25"
                })
            }).then(res => res.json());
            this.setState({cleans: cleans.cleaning_versions});
        } catch(error){
            alert("You must be logged in")
        }
    }

    render() {

        return (













            <ScrollView style = { styles.container } >
                <View style={styles.container2}>
                    <TextInput style = {styles.input}
                               underlineColorAndroid = "transparent"
                               placeholder = "A2250"
                               placeholderTextColor = "#000000"
                               autoCapitalize = "none"
                               onChangeText = {this.handleRoomNumber}/>
                </View>

                { !this.state.loggedIn ? (
                    <Text></Text>
                ): (





                    <FlatList
                        data={this.state.cleans}
                        renderItem={({ item }) => (
                            <>


<TouchableOpacity>

                                <View style={styles.button}>

                                    <Button
                                        // onPress = {handlePress}
                                        title={item.name}
                                    color = "white"

                                    />



                                </View>
</TouchableOpacity>

                            </>
                        )}
                        keyExtractor={item => item.id}
                    />

                )}



            </ScrollView>





        );

    }
}




RecentCleans.navigationOptions = {
    title: 'Cleaning Versions',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
        width: "90%"
    },
    button: {
        backgroundColor: '#0d76bc',
        alignItems: 'center',
        marginTop: 25,
        marginLeft: 36,
        borderRadius: 15,
        height: 57,
        paddingTop: 10,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:0,
        borderBottomWidth: 1,
        width:300,
        height:45,
        marginBottom:0,
        flexDirection: 'row',
        alignItems:'center',
        marginTop: 50,

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    input: {
        width: 300,
        margin: 10,
        marginLeft: 36,
        marginTop: 5,
        height: 51,
        borderColor: '#7a42f4',
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 31,
        backgroundColor: '#AAAAAA',


        position: "absolute",

    },
    container2: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff', marginTop: 20, marginBottom: 71, },





});
