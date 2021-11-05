import React, { Component } from 'react'
import { View, FlatList, ScrollView, Picker, TextInput, StatusBar, Text, TouchableOpacity, Image } from 'react-native'
import axios from 'axios'
import Icons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'

export default class Admin extends Component{
    constructor(props){
        super(props)

        this.state = {
            data_jurusan: [],
            jurusan: '',
            username: ''
        }
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', backgroundColor: '#ededed' }}>
                <StatusBar hidden={true} />
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ alignItems: 'center', backgroundColor: '#6ECB63', borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }}>
 
                        <TouchableOpacity style={{ backgroundColor: 'white', elevation: 15, padding: 10, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', marginBottom: -20, marginTop: 30, width: 300 }} onPress={() => this.props.navigation.navigate('Profile')}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../assets/icons/students.png')} style={{ width: 50, height: 50 }} />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Hi {this.state.username},</Text>
                                    <Text>Selamat Datang Admin</Text>
                                </View>
                            </View>

                        </TouchableOpacity>
                    </View>
                    
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ padding: 12, backgroundColor: 'white', elevation: 15, marginTop: 40, width: 320, borderRadius: 10, paddingBottom: 14, paddingTop: 14 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 17 }}>Admin Menu</Text>
                            </View>


                            <View>
                                <View style={{ marginTop: 15, flexDirection: 'column',  alignItems: 'center'}}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', marginRight: 15 }}>
                                            <Image source={require('../../assets/icons/admin/books.png')} style={{ width: 50, height: 50 }} />
                                            <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Upload </Text>
                                            <Text style={{ fontWeight: 'bold', }}>Pelajaran</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 15, marginRight: 15 }}>
                                            <Image source={require('../../assets/icons/admin/teaching.png')} style={{ width: 50, height: 50 }} />
                                            <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Upload Video</Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 20 }}>
                                            <Image source={require('../../assets/icons/admin/paper.png')} style={{ width: 50, height: 50 }} />
                                            <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Upload </Text>
                                            <Text style={{ fontWeight: 'bold' }}>Ulangan</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', marginRight: 15 }}>
                                            <Image source={require('../../assets/icons/admin/whiteboard.png')} style={{ width: 50, height: 50 }} />
                                            <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Upload </Text>
                                            <Text style={{ fontWeight: 'bold', }}>Materi</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 15, marginRight: 15 }}>
                                            <Image source={require('../../assets/icons/admin/teaching.png')} style={{ width: 50, height: 50 }} />
                                            <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Upload Video</Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 20 }}>
                                            <Image source={require('../../assets/icons/admin/paper.png')} style={{ width: 50, height: 50 }} />
                                            <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Upload </Text>
                                            <Text style={{ fontWeight: 'bold' }}>Ulangan</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
