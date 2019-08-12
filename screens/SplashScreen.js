import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

export default function SplashScreenA() {
    return (



        // <View style={styles.container}>
        //   <Image style={styles.bgImage} source={require('../assets/window.png')} />





        // </View>

        <ImageBackground
            style={styles.container}
            source={require('../assets/images/window.jpg')}
            imageStyle={{ resizeMode: 'cover' }}
        >


            <Image style={styles.logo}source={require('../assets/images/logo2.png')} />
            <Text style={styles.textStyle}>Advancing healthcare quality by transforming hospital service teams.</Text>
        </ImageBackground>




    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    bgImage:{
        flex: 1,
        resizeMode: 'cover',

    },

    logo:
        {

            width: "75%",
            marginTop: 10,
            padding: 25,
            marginBottom: 80,
        },
    textStyle:{
        fontSize: 20,
        textAlign: "center",
        color: "black",
    }
});
