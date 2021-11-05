import React, { Component } from 'react'
import { View, ScrollView, RefreshControl, Text, TextInput, StatusBar, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import axios from 'axios'
import Icons from 'react-native-vector-icons/Ionicons'
import konfigurasi from '../config'
import Modal from 'react-native-modal'

export default class Overview_Ulangan extends Component{
    constructor(props){
        super(props)

        this.state = {
            pelajaran: 'Pelajaran',
            materi: null,
            waktu: '00:00',
            icons: konfigurasi.server + 'ulangan/default.png',
            error: false
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'ulangan/getall', { 
                token: token,
                secret: konfigurasi.secret,
                pelajaran: this.props.route.params.pelajaran
            }).then(res => {
                this.setState({ 
                    pelajaran: res.data[0].pelajaran,
                    materi: res.data[0].description,
                    waktu: res.data[0].waktu,
                    icons: res.data[0].icons
                })
            }).catch(err => {
                this.setState({ error: true })
            })
        })
    }

    ulangan(nama){
        this.props.navigation.navigate('Ulangan', { pelajaran: this.state.pelajaran })
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 15, flexDirection: 'column', backgroundColor: 'white' }}>
                <StatusBar hidden={true}/>
                <Modal isVisible={this.state.error}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ padding: 13, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
                            <Text style={{ color: 'orange', fontWeight: 'bold', fontSize: 17 }}>Ulangan Belum Tersedia..</Text>
                            <Image source={require('../assets/illustrations/search.png')} style={{ width: 150, height: 140, marginTop: 15 }} />
                            <Text style={{ color: '#4a4a4a', textAlign: 'center', fontWeight: 'bold', marginTop: 5 }}>Upps, sepertinya ulangan </Text>
                            <Text style={{ color: '#4a4a4a', textAlign: 'center', fontWeight: 'bold', marginTop: 5 }}>belum di upload oleh admin</Text>
                            <TouchableOpacity style={{ backgroundColor: '#6ECB63', padding: 5, borderRadius: 10, marginTop: 10 }} onPress={() => this.props.navigation.navigate('Home')}>
                                <Text style={{ fontWeight: 'bold' }}>Balik Lagi ?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#6ECB63', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                    <View style={{ marginTop: 20 }}>
                        <Image source={{ uri: this.state.icons }} style={{ width: 150, height: 120 }} />
                    </View>

                    <View style={{ marginRight: 45, marginTop: 25, flexDirection: 'column' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Tryout</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{this.state.pelajaran}</Text>
                        <Text style={{ color: 'white' }}>Test Your Skills</Text>
                        <Text style={{ color: 'white' }}>In this tryout</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 25, marginLeft: 15, justifyContent: 'space-between' }}>

                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 19, padding: 5, paddingLeft: 9, paddingRight: 9, elevation: 5, borderRadius: 10, fontWeight: 'bold', backgroundColor: '#6ECB63' }}>{this.state.pelajaran}</Text>
                    </View>

                    <View style={{ alignItems: 'flex-start', marginTop: 15 }}>
                        <Text style={{ fontSize: 17, padding: 5, paddingLeft: 9, paddingRight: 9, elevation: 5, borderRadius: 10, fontWeight: 'bold', backgroundColor: '#6ECB63' }}><Icons name="time-outline" size={20} color="black" /> {this.state.waktu}</Text>
                    </View>

                    <View style={{ marginTop: 35, alignItems: 'flex-start' }}>
                        <Text style={{ backgroundColor: 'orange', fontSize: 17, fontWeight: 'bold', padding: 5, elevation: 5, borderRadius: 5 }}>Materi</Text>
                        <Text style={{ marginTop: 5 }}>{this.state.materi}</Text>
                    </View>

                    <View style={{ alignItems: 'center', marginTop: 25 }}>
                        <TouchableOpacity style={{ borderRadius: 10, backgroundColor: '#6ECB63', padding: 7 }} onPress={() => this.ulangan()}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}><Icons name="clipboard-outline" size={20} color="black" /> Mulai Tryout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
