import React from 'react';
import { ScrollView, StyleSheet, FlatList, Text, AsyncStorage, View, Button, TextInput } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {Table} from "react-native-table-component";
import {Input} from "react-native-ui-kitten";
import Footer from '../constants/Footer'
import TouchableHighlight from "react-native-web/dist/exports/TouchableHighlight";

export default class switchLocations extends React.Component {
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
            let location = await AsyncStorage.getItem("location");
            await this.getlocation(location);
            this.setState({loggedIn: true });
        } catch {
            this.setState({ loggedIn: false });
        }
    }





    render() {

        return (













            <ScrollView style = { styles.container } >


                { !this.state.loggedIn ? (
                    <Text></Text>
                ): (







                    <FlatList
                        data={this.state.location}
                        renderItem={({ item }) => (
                            <>




                                <View style={styles.button}>

                                    <Button
                                        // onPress = {handlePress}
                                        title={item.name}
                                        color = "white"

                                    />



                                </View>


                            </>
                        )}
                        keyExtractor={item => item.id}
                    />

                )}
            </ScrollView>




        );

    }
}




switchLocations.navigationOptions = {
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





});
