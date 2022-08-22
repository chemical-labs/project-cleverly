import React, { Component } from 'react'
import { View, ScrollView, TextInput, Hr, Text, TouchableOpacity, Image, AsyncStorage, StatusBar } from 'react-native'
import { StackActions } from '@react-navigation/native'
import Icons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import konfigurasi from '../config'

export default class Profile extends Component{
    constructor(props){
        super(props)

        this.state = {
            nickname: null,
            pendidikan: null,
            email: null
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(data => {
            axios.post(konfigurasi.server + 'auth/profile', { token: data, secret: konfigurasi.secret }).then(res => {
                console.log(res.data)
                this.setState({ 
                    nickname: res.data.nama,
                    pendidikan: res.data.pendidikan,
                    email: res.data.email
                })
            })
        })
    }

    logout(){
        AsyncStorage.removeItem('token')
        this.props.navigation.dispatch(
            StackActions.replace('Banner')
        )
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', backgroundColor: '#ededed' }}>
                <StatusBar hidden={true}/>
                
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ alignItems: 'center', backgroundColor: '#982ce6', borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }}>

 
                        <View style={{ backgroundColor: 'white', elevation: 15, padding: 10, borderRadius: 15, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginBottom: -40, marginTop: 30, width: 300, paddingTop: 15, paddingBottom: 15 }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Image source={require('../assets/icons/students.png')} style={{ width: 70, height: 70, borderRadius: 100, padding: 5 }} />
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#982ce6' }}>{this.state.nickname}</Text>
                                    <TouchableOpacity style={{ marginTop: 8, borderRadius: 5, borderWidth: 2, borderColor: '#982ce6', padding: 3, paddingLeft: 5, paddingRight: 5, borderRadius: 15 }}>
                                        <Text style={{ color: '#982ce6' }}>Edit Profile</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginTop: 8, borderRadius: 5, borderWidth: 2, borderColor: 'red', padding: 3, paddingLeft: 5, paddingRight: 5, borderRadius: 15 }} onPress={() => this.logout()}>
                                        <Text style={{ color: 'red' }}>Logout</Text>
                                    </TouchableOpacity>
                                    <Text style={{ marginTop: 5, fontWeight: 'bold', color: '#b8b8b8', textTransform: "uppercase" }}>{this.state.pendidikan}</Text>
                                    <Text style={{ fontWeight: 'italic', color: '#b8b8b8' }}>{this.state.email}</Text>
                                </View>
                            </View>

                            <View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 90, marginLeft: 10 }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 5 }}>Status Berlangganan</Text>
                        <View style={{ backgroundColor: 'white', marginTop: 15, elevation: 5, padding: 15, borderRadius: 10, width: 330 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/berlangganan/pembelajaran.png')} style={{  width: 50, height: 50 }} />
                                <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Paket Belajar</Text>
                                    <Text style={{ marginTop: 5, fontWeight: 'bold', color: 'red' }}>Non Aktif</Text>
                                </View>
                            </View>

                            <View style={{ padding: 1, marginTop: 20, backgroundColor: '#ededed', width: 300, borderRadius: 10 }}></View>

                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <Image source={require('../assets/berlangganan/video.png')} style={{ width: 50, height: 50 }} />
                                <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Paket Video Pembelajaran</Text>
                                    <Text style={{ marginTop: 5, fontWeight: 'bold', color: 'red' }}>Non Aktif</Text>
                                </View>
                            </View>



                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
