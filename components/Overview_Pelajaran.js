import React, { Component } from 'react'
import { View, Text, TextInput, StatusBar, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import axios from 'axios'
import Icons from 'react-native-vector-icons/Ionicons'

export default class Overview_Pelajaran extends Component{
    componentDidMount(){
        
    }

    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                <StatusBar hidden={true}/>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#6ECB63', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                    <View style={{ marginTop: 10 }}>
                        <Image source={require('../assets/illustrations/study.png')} style={{ width: 150, height: 120 }} />
                    </View>

                    <View style={{ marginRight: 45, marginTop: 25, flexDirection: 'column' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Tryout</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Matematika</Text>
                        <Text style={{ color: 'white' }}>Test Your Skills</Text>
                        <Text style={{ color: 'white' }}>In this tryout</Text>
                    </View>
                </View> 
            </View>
        )
    }
}
