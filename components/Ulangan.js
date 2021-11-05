import React, { Component } from 'react'
import { View, FlatList, StatusBar, Text, TouchableOpacity, ScrollView, AsyncStorage, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import Icons from 'react-native-vector-icons/Ionicons'
import Radio from 'react-native-simple-radio-button'
import axios from 'axios'
import Modal from 'react-native-modal'
import konfigurasi from '../config'

export default class Ulangan extends Component{
    constructor(props){
        super(props)

        this.state = {
            data: [],
            soal: [],
            jawab: null,
            jam: null,
            menit: null,
            detik: null,
            total_point: null,
            user_jawaban: [],
            done: false
        }
    }

    componentDidMount(){
        let s = setInterval(() => {
            let end = new Date('Sep 24, 2021, 20:30:20').getTime();
            let x = new Date().getTime();
            let d = end - x;
            var days = Math.floor(d / (1000 * 60 * 60 * 24));
            var hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((d % (1000 * 60)) / 1000);
            this.setState({ jam: hours, menit: minutes, detik: seconds })

        }, 1000)

        AsyncStorage.getItem('token').then(x => {
            axios.post(konfigurasi.server + 'ulangan/get/soal', { 
                token: x,
                secret: konfigurasi.secret,
                pelajaran: 'Matematika'//this.props.route.params.pelajaran
            }).then(response => {
                this.setState({ data: this.state.data.concat(response.data) })

            }).catch((e) => {
                alert('error')

            })
        })
    }


    update_jawaban(jawab, index){
        this.state.data[index].user_jawab = jawab
        if(this.state.data[index].jawaban == jawab){
            this.state.data[index].point = 10
            this.state.total_point += 10
            console.log(this.state.data)
        }else{
            alert('salah')
        }
    }

    renderOpsi = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', marginTop: 15, backgroundColor: 'white', padding: 10, elevation: 5, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => this.update_jawaban(item.pilihan, index)}>
                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>{item.pilihan}. {item.judul}</Text>
                <Icons name="checkmark-outline" size={20} color="black" style={{ marginRight: 10 }} />
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <ScrollView style={{ flexGrow: 1, flexDirection: 'column'}}>
                <StatusBar hidden={true} />
                <Modal isVisible={this.state.done}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ padding: 15, alignItems: 'center', backgroundColor: 'white', borderRadius: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Selesai ?</Text>
                            <Image source={require('../assets/illustrations/done.png')} style={{ width: 150, height: 120, marginTop: 10 }} />
                            <Text style={{ marginTop: 5 }}>Apakah kamu yakin ?</Text>
                            <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity style={{ marginRight: 20, borderRadius: 5, backgroundColor: 'orange', padding: 5 }} onPress={() => this.setState({ done: false })}>
                                    <Text style={{ fontWeight: 'bold' }}>Ragu</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginLeft: 20, borderRadius: 5, backgroundColor: 'green', padding: 5 }} onPress={() => this.props.navigation.navigate('Ulangan_Selesai')}>
                                    <Text style={{ fontWeight: 'bold' }}>Selesai</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between', backgroundColor: '#6ECB63', borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Tryout')}>
                            <Icons name='close-outline' size={27} color="white" />
                        </TouchableOpacity>
                        <Text style={{ marginTop: 3, color: 'white', fontWeight: 'bold', fontSize: 17, marginLeft: 5 }}>{this.state.jam}:{this.state.menit}:{this.state.detik}</Text>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => this.setState({ done: true })}>
                            <Icons name="checkmark-circle-outline" style={{ marginTop: 5, marginRight: 15 }} size={30} color='white'/>
                        </TouchableOpacity>
                    </View>
                </View>
                <Swiper showsButtons={false}>
                    
                    {this.state.data.map((x, y) => {
                    return <View style={{ flexShrink: 1, flexDirection: 'column', marginTop: 15 }}>
                        <View>
                            <View style={{ marginLeft: 34, marginTop: 10, alignSelf: 'flex-start' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, padding: 5, borderRadius: 5, backgroundColor: '#6ECB63', }}>Soal {y + 1}</Text>
                            </View>

                            <View style={{ alignItems: 'center' }}>
                                <View style={{ marginTop: 25,  backgroundColor: 'white', elevation: 5, borderRadius: 15, justifyContent: 'center', width: 300 }}>
                                    <ScrollView contentContainerStyle={{ flexDirection: 'column', marginLeft: 10, marginTop: 10 }}>
                                        <Text style={{ padding: 5, paddingBottom: 7 }}>{x.soal}</Text> 
                                    </ScrollView>
                                </View>
                            </View>

                            
                            <View style={{ marginLeft: 35, marginTop: 25, marginRight: 35, padding: 5 }}>
                                {/*
                                <Radio radio_props={[{ label: "A.10" }, { label: "B.20" }, { label: "C.50" }, { label: "D.100" }]} animation={true} onPress={(val) => this.update_jawaban(val) }/>*/}
                                <FlatList
                                    data={x.opsi}
                                    numColumns={1}
                                    renderItem={this.renderOpsi}
                                />
                            </View>
                            <View style={{ marginTop: 10, flexDirection: 'flex-end', marginLeft: 120, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Swipe ke kanan 👉</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                        })}
                </Swiper>
            </ScrollView>
       )
    }
}
