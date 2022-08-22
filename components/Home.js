import React, { Component } from 'react'
import { View, ScrollView, RefreshControl, FlatList, Text, StatusBar, TextInput, TouchableOpacity, Image, AsyncStorage, Picker } from 'react-native'
import axios from 'axios'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icons from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-swiper'
import konfigurasi from '../config'
import GridList from 'react-native-grid-list'
import { StackActions } from '@react-navigation/native'
/*import {
    AudienceLatencyLevelType,
    ChannelProfile,
    ClientRole,
    RtcEngineContext,
    RtcLocalView,
    RtcRemoteView,
    VideoFrameRate,
    VideoOutputOrientationMode,
    VideoRenderMode,
} from 'react-native-agora'*/

export default class Navigasi extends Component{
    constructor(props){
        super(props)

        this.state = {
            role: "admin"
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(res => {
            if(res == null){
                this.props.navigation.dispatch(
                    StackActions.replace('Banner')
                )
            }
        })
    }

    render(){
        let Tab = createBottomTabNavigator();
        return(
            <Tab.Navigator initialRouteName="Home" screenOptions={({route}) => ({
                tabBarIcon: ({ focus, color, size }) => {
                    let icons;

                    if(route.name == 'Tryout'){
                        icons = 'clipboard-outline'
                    }else if(route.name == 'Belajar'){
                        icons = 'school-outline'
                    }

                    return <Icons name={icons} size={30} color="#982ce2" />
                }
            })}>
                <Tab.Screen name="Tryout" component={Home} />
                <Tab.Screen name="Belajar" component={Belajar} />
            </Tab.Navigator>
        )
    }
}


class Belajar extends Component{
    constructor(props){
        super(props)

        this.state = {
            jurusan: null,
            data_jurusan: [],
            username: null,
            pelajaran: [],
        }
    }
    
    async componentDidMount(){
        AsyncStorage.getItem('token').then(async token => {
            await axios.post(konfigurasi.server + 'auth/user', { token: token, secret: konfigurasi.secret }).then(res => {
                this.setState({ username: res.data.username })
            })

            await axios.post(konfigurasi.server + "pelajaran/getall", { token: token, secret: konfigurasi.secret }).then(res => {
                this.setState({ pelajaran: this.state.pelajaran.concat(res.data) })
            })

            await axios.post(konfigurasi.server + 'jurusan/getall', { token: token, secret: konfigurasi.secret }).then(res => {
                this.setState({ data_jurusan: this.state.data_jurusan.concat(res.data) })
            })
        })
    }

    jurusan(nama){
        this.setState({ pelajaran: [], jurusan: nama })
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'pelajaran/get', { token: token, secret: konfigurasi.secret, jurusan: nama }).then(res => {
                this.setState({ pelajaran: this.state.pelajaran.concat(res.data) })

            })
        })
    }

    ulangan(nama){
        this.props.navigation.navigate('Ulangan', { pelajaran: nama })
    }

    renderItem = ({ item, index  }) => {return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
            <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 20 }} onPress={() => this.ulangan(item.nama)}>
                <Image source={{ uri: item.gambar }} style={{ width: 50, height: 50 }} />
                <Text>{item.nama}</Text>
           </TouchableOpacity>

        </View>
    )};

    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#ededed' }}>
                <StatusBar animated={true} backgroundColor="#982CE6" barStyle="light-content" />
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ alignItems: 'center', backgroundColor: '#982ce6', borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }}>
                        <View style={{ backgroundColor: 'white', elevation: 15, padding: 10, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, width: 300 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <TextInput placeholder="Cari Pelajaran" style={{ marginTop: 3, marginLeft: 3, width: 240, fontWeight: 'italic' }} />
                                </View>

                                <View>
                                    <TouchableOpacity style={{ borderRadius: 10, backgroundColor: 'orange', padding: 5 }}>
                                        <Icons name="search-outline" size={20} color="black"/>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View>
 
                        <View style={{ backgroundColor: 'white', elevation: 15, padding: 10, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', marginBottom: -20, marginTop: 30, width: 300 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/icons/students.png')} style={{ width: 50, height: 50 }} />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Hi {this.state.username},</Text>
                                    <Text>Mau belajar apa hari ini ?</Text>
                                </View>
                            </View>

                            <View>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ padding: 12, backgroundColor: 'white', elevation: 15, marginTop: 40, width: 320, borderRadius: 10, paddingBottom: 14, paddingTop: 14 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Pilih Pelajaran</Text>
                            <View>
                                <View style={{ marginTop: 15, flexDirection: 'column' }}>
                                    <View style={{ borderWidth: 2, borderRadius: 10, borderColor: 'black' }}>
                                        <Picker style={{ borderWidth: 2, borderColor: 'black' }} selectedValue={this.state.jurusan} onValueChange={(val) => this.jurusan(val)} >
                                            {this.state.data_jurusan.map((x, y) => {
                                            return <Picker.Item label={"Jurusan " + x.jurusan} value={x.jurusan}/>
                                            })}
                                        </Picker>
                                    </View>
                                    <View>
                                        <FlatList data={this.state.pelajaran}
                                            numColumns={3}
                                            renderItem={this.renderItem}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        )
    }
}

class Home extends Component{
    constructor(props){
        super(props)

        this.state = {
            jurusan: null,
            data_jurusan: [],
            username: null,
            search: null,
            pelajaran: [],
            refresh: false
        }
    }

    async componentDidMount(){

        AsyncStorage.getItem('token').then(async token => {
            await axios.post(konfigurasi.server + 'auth/user', { token: token, secret: konfigurasi.secret }).then(res => {
                this.setState({ username: res.data.username })
            })

            await axios.post(konfigurasi.server + "pelajaran/getall", { token: token, secret: konfigurasi.secret }).then(res => {
                this.setState({ pelajaran: this.state.pelajaran.concat(res.data) })
            })

            await axios.post(konfigurasi.server + 'jurusan/getall', { token: token, secret: konfigurasi.secret }).then(res => {
                console.log(res.data)
                this.setState({ data_jurusan: this.state.data_jurusan.concat(res.data) })
            })
        })
    }

    jurusan(nama){
        this.setState({ pelajaran: [], jurusan: nama })
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'pelajaran/get', { token: token, secret: konfigurasi.secret, jurusan: nama }).then(res => {
                this.setState({ pelajaran: this.state.pelajaran.concat(res.data) })

            })
        })
    }

    ulangan(nama){
        this.props.navigation.navigate('Overview_Ulangan', { pelajaran: nama })
    }

    search(){
        this.props.navigation.navigate('Search', { search: this.state.search })
    }

    renderItem = ({ item, index  }) => {return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
            <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 20 }} onPress={() => this.ulangan(item.nama)}>
                <Image source={{ uri: item.gambar }} style={{ width: 50, height: 50 }} />
                <Text>{item.nama}</Text>
           </TouchableOpacity>

        </View>
    )};


    render(){
        return(
            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', backgroundColor: '#ededed' }}>
                <StatusBar animated={true} backgroundColor="#982CE6" barStyle="light-content" />
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ alignItems: 'center', backgroundColor: '#982ce6', borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }}>
                        <View style={{ backgroundColor: 'white', elevation: 15, padding: 10, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, width: 300 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <TextInput placeholder="Cari Ulangan" style={{ marginTop: 3, marginLeft: 3, width: 240, fontWeight: 'italic' }} onChangeText={(val) => this.setState({ search: val })} />
                                </View>

                                <View>
                                    <TouchableOpacity style={{ borderRadius: 10, backgroundColor: 'orange', padding: 5 }} onPress={() => this.search()}>
                                        <Icons name="search-outline" size={20} color="black"/>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View>
 
                        <TouchableOpacity style={{ backgroundColor: 'white', elevation: 15, padding: 10, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', marginBottom: -20, marginTop: 30, width: 300 }} onPress={() => this.props.navigation.navigate('Profile')}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/icons/students.png')} style={{ width: 50, height: 50 }} />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Hi {this.state.username},</Text>
                                    <Text>Mau ulangan apa hari ini ?</Text>
                                </View>
                            </View>

                            <View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ padding: 12, backgroundColor: 'white', elevation: 15, marginTop: 40, width: 320, borderRadius: 10, paddingBottom: 14, paddingTop: 14 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Cek Tryout</Text>
                            <View>
                                <View style={{ marginTop: 15, flexDirection: 'column' }}>
                                    <View style={{ borderWidth: 2, borderRadius: 10, borderColor: 'black' }}>
                                        <Picker style={{ borderWidth: 2, borderColor: 'black' }} selectedValue={this.state.jurusan} onValueChange={(val) => this.jurusan(val)} >
                                            {this.state.data_jurusan.map((x, y) => {
                                            return <Picker.Item label={"Jurusan " + x.jurusan} value={x.jurusan}/>
                                            })}
                                        </Picker>
                                    </View>
                                    <View>
                                        <FlatList data={this.state.pelajaran}
                                            numColumns={3}
                                            renderItem={this.renderItem}
                                        />
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
