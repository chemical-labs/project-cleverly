import React, { Component } from 'react'
import { View, Text, AsyncStorage, Image, TextInput } from 'react-native'
import axios from 'axios'

class Admin extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: null
        }
    }

    componentDidMount(){
        AsyncStorage.removeItem('token');
        /*
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'auth/profile', {
                token: token,
                secret: konfigurasi.secret
            }).then(res => {
                this.setState({
                    username: res.data.username
                })
            })
        })*/
    }

    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <StatusBar hidden={true}/>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ alignItems: 'center', backgroundColor: '#6ECB63', borderBottomRightRadius: 15, borderBottomLeftRadius: 15, paddingBottom: 40 }}>
                        <View style={{ backgroundColor: 'white', elevation: 15, padding: 10, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', marginBottom: -20, marginTop: 30, width: 300 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/icons/students.png')} style={{ width: 50, height: 50 }} />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Hi {this.state.username},</Text>
                                    <Text>Selamat Datang Admin</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <View style={{ marginTop: 25, borderRadius: 10, backgroundColor: 'white', elevation: 15, width: 300,  padding: 10 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 5 }}>Menu Materi</Text>
                        </View>

                        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', marginTop: 25, marginLeft: 14, marginRight: 14, justifyContent: 'space-between' }}>
                                <TouchableOpacity style={{ alignItems: 'center' }}>
                                    <Image source={require('../assets/icons/admin/books.png')} style={{ width: 50, height: 50 }} />
                                    <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Upload</Text>
                                    <Text style={{ fontWeight: 'bold' }}>Materi</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ alignItems: 'center' }}>
                                    <Image source={require('../assets/icons/admin/paper.png')} style={{ width: 50, height: 50 }} />
                                    <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Upload</Text>
                                    <Text style={{ fontWeight: 'bold' }}>Ulangan</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ alignItems: 'center' }}>
                                    <Image source={require('../assets/icons/admin/whiteboard.png')} style={{ width: 50, height: 50 }} />
                                    <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Upload</Text>
                                    <Text style={{ fontWeight: 'bold' }}>Pelajaran</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 25, marginLeft: 14, marginRight: 14, justifyContent: 'space-between' }}>
                                <TouchableOpacity style={{ alignItems: 'center' }}>
                                    <Image source={require('../assets/icons/admin/teaching.png')} style={{ width: 50, height: 50 }} />
                                    <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Video</Text>
                                    <Text style={{ fontWeight: 'bold' }}>Materi</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ alignItems: 'center' }}>
                                    <Image source={require('../assets/icons/admin/paper.png')} style={{ width: 50, height: 50 }} />
                                    <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Upload</Text>
                                    <Text style={{ fontWeight: 'bold' }}>Ulangan</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ alignItems: 'center' }}>
                                    <Image source={require('../assets/icons/admin/whiteboard.png')} style={{ width: 50, height: 50 }} />
                                    <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Upload</Text>
                                    <Text style={{ fontWeight: 'bold' }}>Pelajaran</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

