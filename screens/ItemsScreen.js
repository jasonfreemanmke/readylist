import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Button,
    Alert,
    Text, ScrollView, TextInput,
} from 'react-native';

import ProgressBarAnimated from 'react-native-progress-bar-animated';
//import {CheckBox, Header} from 'react-native-elements';
import CheckBox from 'react-native-modest-checkbox';
import SelectMultiple from 'react-native-select-multiple';

const roomItems=['red', 'blue', 'gold']




export default class App extends React.Component {

    state = {
        progress: 20,
        progressWithOnComplete: 0,
        progressCustomized: 0,
        selectedItems: [],


    }

    onSelectionsChange = (selectedItems) => {
        this.setState({ selectedItems })
    }

    increase = (key, value) => {
        this.setState({
            [key]: this.state[key] + value,
        });
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

    getCleanItems = async (token) => {
        try{
            let cleans = await fetch('https://pilot.readylist.com/mobile/get_cleaning_items.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "jwt": token,
                    "room_id": "868",
                    "cleaning_version_id": "7"
                })
            }).then(res => res.json());
            this.setState({selctedItems: cleans.name});
        } catch(error){
            alert("You must be logged in")
        }
    }

    render() {
        const barWidth = Dimensions.get('screen').width - 30;
        const progressCustomStyles = {
            backgroundColor: '#0d76bc',
            borderRadius: 10,
            borderColor: '#0d76bc',
        };

        return (


        <View style={styles.container}>

            <Text style={styles.cleanVersion}>Clean Version: <Text style={styles.bold}>Discharge</Text></Text>
            <Text style={styles.room}>Room: <Text style={styles.bold}>C6971 - Bed 12</Text></Text>
                <View style ={styles. progressBar}>

                    <ProgressBarAnimated
                        {...progressCustomStyles}
                        width={barWidth}
                        maxValue={100}
                        value={this.state.progressCustomized}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonInner}>
                            <Button
                                title="Increase 25%"
                                onPress={this.increase.bind(this, 'progressCustomized', 25)}
                            />
                        </View>
                    </View>
                </View>
            <View style={styles.container}>
                <Text style={styles.blueline}></Text>
                <Text style={styles.cleanPage}>Assess and Order Equipment</Text>
                <Text style={styles.details}>Details</Text>


                {/*this section has fake data coded into it for demo purposes */}
                <View style={styles.checkbox}>

                <CheckBox
                    label='IV Stand [1]'
                    onChange={(checked) =>

                        alert('Checked!')}
                    // checked={this.state.checked}

                />
                    <View style={styles.separator} />


                    <CheckBox
                        style={{flex: 1, padding: 10}}
                        onClick={()=>{
                            this.setState({
                                isChecked:!this.state.isChecked
                            })
                        }}
                        isChecked={this.state.isChecked}
                        leftText={"CheckBox"}
                    />
                    <View style={styles.separator} />

                    <CheckBox
                        label='Alaris IV Pump (Brain) [2]'
                        onChange={(checked) =>

                           alert('Checked!')}
                        //checked={this.state.checked}

                    />
                    <View style={styles.separator} />


                    <CheckBox
                        label='Flip HOB signs, All notification flags in - Sign and place tent card'
                        onChange={(checked) =>

                            alert('Checked!')}
                        //checked={this.state.checked}
                    />

                    <View style={styles.separator} />



                    {/*this will be the rendering of items from the database when the API is ready and able to test */}
                    <SelectMultiple
                        items={roomItems}
                        selectedItems={this.state.selectedItems}
                        onSelectionsChange={this.onSelectionsChange} />
                </View>

                <ScrollView >
                

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
            </View>


</View>



        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: 20,
        padding: 15,
    },
    buttonContainer: {
        marginTop: 1,
    },
    separator: {
        marginVertical: 2,
        borderWidth: 0.5,
        borderColor: '#DCDCDC',
    },
    label: {
        color: 'red',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 10,
    },

    cleanVersion: {
        top: 18,
        left: 15,
        width: '50%',
        height: 17,
        color: "#121212",
        position: "absolute"
    },

    room: {
        top: 18,
        left: 205,
        width: '50%',
        height: 17,
        color: "#121212",
        position: "absolute"
    },
    progressBar:{
        marginTop: 57,
    },
    bold:{
        fontWeight: 'bold',
        fontSize: 14,
    },
    blueline:
        {
            position: 'absolute',

            backgroundColor: '#0B76BC',
            height: 26,
            width: 345,
            color: 'white',
            flexDirection: 'row',

        },
    cleanPage: {
        top: 5,
        left: 15,
        width: 200,
        height: 17,
        color: "#FFFFFF",
        position: "absolute"
    },

    details: {
        top: 5,
        left: 285,
        width: '50%',
        height: 17,
        color: "#FFFFFF",
        position: "absolute"
    },
    checkbox:{

        marginTop: 12,
        marginLeft: -15,
        backgroundColor: 'green',
        width: 285,
        height: 30,




    },
    cbText:{
        fontSize: 12,
        color: 'red',
    },

});
