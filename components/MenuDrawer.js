import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Platform,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { SplashScreen } from 'expo';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default class MenuDrawer extends React.Component {
    navLink(nav, text) {
        return(
            <TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate(nav)}>
                <Text style={styles.link}>{text}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <ScrollView style={styles.scroller}>
                    <View style={styles.topLinks}>
                        <View style={styles.profile}>
                            <View style={styles.imgView}>
                                <Image style={styles.img} source={require('../assets/RL_icon_v2.png')} />

                            </View>
                            <View style={styles.profileText}>
                                <Text style={styles.name}>ReadyList</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomLinks}>
                        {this.navLink('Home', 'Home')}
                        {this.navLink('Cleaning', 'Cleaning Rooms')}
                        {this.navLink('Daily', 'Daily Clean Logs')}
                        {this.navLink('Header', 'Header page')}
                        {this.navLink('Login', 'Login page')}
                        {this.navLink('Login2', 'Login page 2')}
                        {this.navLink('test1', 'test')}
                        {this.navLink( 'SplashA', 'Splash Screen A')}
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Text style={styles.description}>© 2019 ReadyList™</Text>
                    <Text style={styles.version}>v1.0</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
    },
    scroller: {

        flex: 1,
    },
    profile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#777777',
    },
    profileText: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        paddingBottom: 5,
        color: 'white',
        textAlign: 'left',
    },
    imgView: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    img: {
        height: 25,
        width: 25,
        borderRadius: 10,
    },
    topLinks:{
        height: 50,
        backgroundColor: 'white',
    },
    bottomLinks: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 450,
    },
    link: {
        flex: 1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        textAlign: 'left',
    },
    footer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: 'lightgray'
    },
    version: {
        flex: 1,
        textAlign: 'right',
        marginRight: 20,
        color: 'gray'
    },
    description: {
        flex: 1,
        marginLeft: 20,
        fontSize: 12,
    }
});
