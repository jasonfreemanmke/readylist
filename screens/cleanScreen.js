import React from 'react';
import { ScrollView, StyleSheet, FlatList, Text, AsyncStorage, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class RoomsScreen extends React.Component {
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
      let cleans = await fetch('https://pilot.readylist.com/mobile/get_rooms.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "jwt": token
        })
      }).then(res => res.json());
      this.setState({cleans: cleans.rooms});
    } catch(error){
      alert("You must be logged in")
    }
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
                        {/*<Text>{item.date}</Text>*/}
                        {/*<Text>{item.room}</Text>*/}
                        <Text>{item.name}</Text>
                      </>
                  )}
                  keyExtractor={item => item.id}
              />
          )}
        </ScrollView>


    );
  }
}




RoomsScreen.navigationOptions = {
  title: 'Rooms',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    width: "90%"
  },

});
