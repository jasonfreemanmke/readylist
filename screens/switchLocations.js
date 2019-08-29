import React from 'react';
import { ScrollView, StyleSheet, FlatList, Text, AsyncStorage, View, Button, TextInput, Image } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {Table} from "react-native-table-component";
import {Input} from "react-native-ui-kitten";
import Footer from '../constants/Footer'
import TouchableHighlight from "react-native-web/dist/exports/TouchableHighlight";
import * as item from "expo";

// const logos= {
//  UCSF: <Image style={styles.logo}source={require('../assets/images/UCSF_196X19.png')} />,
//  NYU: <Image style={styles.logoNYU}source={require('../assets/images/NYU_116X61.png')} />,
// };
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
                    "room_id": "2740"
                })
            }).then(res => res.json());
            this.setState({cleans: cleans.cleaning_versions});
        } catch(error){
            alert("You must be logged in")
        }
    }

//   getImage = (image){
//         switch (image){
//             case "UCSF":
//                 return require ('../assets/images/UCSF_MedCtr_black_RGB.png')
//                 break;
//              case "NYU":
//                  return require('../assets/images/NYU_Langone.png')
//
//         }
// }




    render()

{

        return (



            <View>

                {/*<Image style={styles.logo}source={require('../assets/images/UCSF_196X19.png')} />*/}

                <Image style={styles.logoNYU}source={require('../assets/images/NYU_116X61.png')} />





            <ScrollView style = { styles.container } >


                { !this.state.loggedIn ? (
                    <Text></Text>
                ): (







                    <FlatList
                        data={this.state.cleans}
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


            </View>



        );

    }
}




switchLocations.navigationOptions = {
    title: 'Switch Locations',
    //<Image source={require('../assets/images/logo.png')}/>
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

    logo:{
        marginTop: 13,
        marginLeft: 89,

        flexDirection: 'row',
        alignItems:'center',
    },

    logoNYU:{
        marginTop: 13,
        marginLeft: 129,
        flexDirection: 'row',
        alignItems:'center',
    },




});
