import * as React from "react";
import { StyleSheet, Text,  View, TextInput, TouchableOpacity, StatusBar,} from "react-native";
import { Image} from 'react-native';
//import { authAsync } from "expo-app-auth";


class Footer extends React.Component<{}>
{





    render() {


        return (



            <View style={styles.container}>







                <Text style={styles.hairline}></Text>

                <Text style={styles.footer}>© 2019 ReadyList™ </Text>

            </View>






        );
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"


    },













    footer:
        {

            fontSize: 14,
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            position: 'absolute',
            bottom: 20,



        },
//This sets the line above the footer
    hairline: {
        position: 'absolute',
        bottom: 55,
        backgroundColor: 'black',
        height: .5,
        width: "100%",
    },









});

export default Footer;
