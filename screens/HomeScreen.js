import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import
{
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  ImageBackground,
} from 'react-native';
import { Input, Button } from 'react-native-ui-kitten';
import { MonoText } from '../components/StyledText';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';


export default class HomeScreen extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      loggedIn: false,
      backgroundImage: require('./images/building.png')
    }
  }

  async componentDidMount()
  {
    try
    {
      let token = await AsyncStorage.getItem("token");
      this.setState({ loggedIn: true })
    } catch {
      this.setState({ loggedIn: false })
    }
  }
  getToken = async () =>
  {
    try
    {
      let token = await AsyncStorage.getItem("token");
      alert(token);
    } catch {
      alert("No token");
    }
  }

  getLocation = async () =>
  {
    try
    {
      let location = await AsyncStorage.getItem("location");
      alert(location);
    } catch {
      alert("No token");
    }
  }

  login = async (user) =>
  {
    try
    {
      let token = await fetch(`https://pilot.readylist.com/mobile/authorize/login.php`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "user_name": user.username,
          "password": user.password
        })
      }).then(res => res.json());
      //alert(token);
      //alert(JSON.stringify(token));
      return token
      return location
    } catch {
      alert('Incorrect Username or password');
    }
  }

  loginUser = async (values) =>
  {
    try
    {
      let token = await this.login(values);
      await AsyncStorage.setItem("token", token.jwt);
      this.setState({ loggedIn: true });
      //alert(token);

    } catch (error)
    {
      // alert (error);
    }
  }

  logout = async () =>
  {
    try
    {
      await AsyncStorage.removeItem('token');
      this.setState({ loggedIn: false })
    } catch {
      alert('You are already logged out!')
    }
  }



  setLocation = async (values) =>
  {
    try
    {
      let token = await this.login(values);
      await AsyncStorage.setItem("location", { location: location.name });
      this.setState({ loggedIn: true });
      alert(location);

    } catch (error)
    {
      // alert (error);
    }
  }


  render()
  {
    return (
      <View>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                // ? require('../assets/images/logo2.png')
                // : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>
          {!this.state.loggedIn ? (
            <View style={styles.getStartedContainer}>
              <DevelopmentModeNotice />
              <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={values => this.loginUser(values)}
              >
                {props => (
                  <View style={styles.helpContainer}>
                    <Input
                      placeholder="Username"
                      onChangeText={props.handleChange('username')}
                      onBlur={props.handleBlur('username')}
                      value={props.values.username}
                      autoCapitalize='none'
                    />

                    <Input
                      placeholder="Password"
                      onChangeText={props.handleChange('password')}
                      onBlur={props.handleBlur('password')}
                      value={props.values.password}
                      secureTextEntry={true}
                      autoCapitalize='none' />

                    <Button onPress={props.handleSubmit}>Login</Button>

                  </View>
                )}
              </Formik>
            </View>
          ) : (
              <View style={styles.helpContainer}>
                <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
                  <Text style={styles.helpLinkText}>
                    Help, it didn’t automatically reload!
              </Text>
                  <Button onPress={this.logout}>Logout</Button>
                </TouchableOpacity>
              </View>
            )}
        </ScrollView>
        <View style={styles.tabBarInfoContainer}>
          {/*<Text style={styles.tabBarInfoText}>*/}
          {/*  This is a tab bar. You can edit it in:*/}
          {/*</Text>*/}
          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>
              {/*navigation/MainTabNavigator.js*/}
            </MonoText>
          </View>
        </View>
      </View>
    )
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice()
{
  if (__DEV__)
  {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (



      <Text style={styles.developmentModeText}>


        <Image style={styles.logo} source={require('../assets/images/logo2-min.png')} />


      </Text>

    );
  } else
  {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>

    );

  }
}


function handleLearnMorePress()
{
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress()
{
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  bgImage: {
    flex: 1,

    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    resizeMode: 'cover',
  },

});
