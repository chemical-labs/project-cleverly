import React, { Component } from 'react'
import { View, Text, StatusBar, AsyncStorage, ScrollView, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import Icons from 'react-native-vector-icons/Ionicons'
import konfigurasi from '../config'
import axios from 'axios'

export default class Search extends Component{
    constructor(props){
        super(props)

        this.state = {
            search: null,
            data: []
        }
    }

    componentDidMount(){
        this.setState({ search: this.props.route.params.search })
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'pelajaran/search', { token: token, secret: konfigurasi.secret, name: this.props.route.params.search }).then(res => {
                this.setState({ data: this.state.data.concat(res.data) })

            })
        })
    }

    search(){
        AsyncStorage.getItem('token').then(token => {
            axios.post(konfigurasi.server + 'pelajaran/search', { token: token, secret: konfigurasi.secret, name: this.state.search }).then(res => {
                this.setState({ data: [], search: null })
                this.setState({ data: this.state.data.concat(res.data) })
            })
        })
    }

    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#ededed' }}>
                <StatusBar hidden={true} />
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ alignItems: 'center', backgroundColor: '#6ECB63', borderBottomRightRadius: 15, borderBottomLeftRadius: 15, paddingBottom: 25, }}>
                        <View style={{ backgroundColor: 'white', elevation: 15, padding: 10, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, width: 300 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <TextInput placeholder="Cari Pelajaran" style={{ marginTop: 3, marginLeft: 3, width: 240, fontWeight: 'italic' }} onChangeText={(val) => this.setState({ search: val })} value={this.state.search} />
                                </View>

                                <View>
                                    <TouchableOpacity style={{ borderRadius: 10, backgroundColor: 'orange', padding: 5 }} onPress={() => alert(this.state.search)} onPress={() => this.search()}>
                                        <Icons name="search-outline" size={20} color="black"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ alignItems: 'center', marginTop: 45 }}>
                    <View style={{ padding: 5, backgroundColor: 'white', width: 300, borderRadius: 15, elevation: 5 }}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', backgroundColor: 'white', padding: 5 }}>
                            {this.state.data.map((x,y) => {
                                return <TouchableOpacity style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }} onPress={() => this.props.navigation.navigate('Overview_Ulangan', { pelajaran: x.nama })}>
                                    <View>
                                        <Image source={{ uri: x.gambar }} style={{ width: 50, height: 50 }} />
                                    </View>

                                    <View style={{ marginLeft: 20, flexDirection: 'column' }}>
                                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{x.nama}</Text>
                                        <Text>{x.jurusan}</Text>
                                    </View>
                                </TouchableOpacity>
                            })}

                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}
