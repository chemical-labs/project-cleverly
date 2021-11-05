import React, { Component } from 'react'
import { Text, ScrollView, StatusBar, TextInput, View, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import axios from 'axios'
import { FloatingLabelInput } from 'react-native-floating-label-input'
import konfigurasi from '../config'
import { StackActions } from '@react-navigation/native'
import Icons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import Radio from 'react-native-simple-radio-button'

export default class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: null,
            password: null,
            wrong: false,
            pendidikan: null,
            sekolah: null,
            email: null,
            nama_lengkap: null
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(data => {
            if(data){
                this.props.navigation.dispatch(
                    StackActions.replace('Home')
                )
            }
        })
    }

    register(){
        AsyncStorage.removeItem('token')
        axios.post(konfigurasi.server + 'auth/register', { 
            username: this.state.username,
            password: this.state.password,
            nama: this.state.nama_lengkap,
            email: this.state.email,
            sekolah: this.state.sekolah,
            pendidikan: this.state.pendidikan
        }).then(res => {
            if(res.status == 200){
                this.login()
            }
        }).catch(err => {
            this.setState({ wrong: true })
        })
    }

    login(){
        axios.post(konfigurasi.server + "auth/login", { 
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            if(!res.data.error){
                AsyncStorage.setItem('token', res.headers.token)
                this.props.navigation.dispatch(
                    StackActions.replace('Home')
                )
            }else{
                this.setState({ wrong: true })
            }
        }).catch(err => {
            this.setState({ wrong: true })
        })
    }

    render(){
        return(

            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', backgroundColor: 'white', paddingBottom: 20 }}>
                <StatusBar hidden={true}/>
                <Modal isVisible={this.state.wrong}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'  }}>
                        <View style={{ padding: 15, backgroundColor: 'white', borderRadius: 10, alignItems: 'center'  }}>
                            <Text style={{ color: 'red', fontSize: 17, fontWeight: 'bold'  }}>Salah Password!</Text>
                            <Image source={require('../assets/illustrations/error.png')} style={{ width: 230, height: 180, marginTop: 10  }}/>
                            <Text style={{ marginTop: 10, textAlign: 'center', fontWeight: 'bold'  }}>Upps, sepertinya ada masalah pada server</Text>
                            <TouchableOpacity style={{ marginTop: 15, padding: 5, borderRadius: 10, backgroundColor: '#b8b8b8'  }} onPress={() => this.setState({ wrong: false  })}>
                                <Text>Coba Lagi ?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#6ECB63', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                    <View style={{ marginTop: 10 }}>
                        <Image source={require('../assets/illustrations/study.png')} style={{ width: 150, height: 120 }} />
                    </View>

                    <View style={{ marginRight: 25, marginTop: 25, flexDirection: 'column' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Experimental</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Tryout</Text>
                        <Text style={{ color: 'white' }}>Online Study</Text>
                        <Text style={{ color: 'white' }}>And Tryout Application</Text>
                    </View>
                </View>
                
                <View style={{ marginTop: 25, marginLeft: 10}}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Hai, Selamat Datang Kembali</Text>
                        <Text style={{ color: '#a1a1a1', marginTop: 5 }}>Silahkan Register di sini</Text>
                    </View>
                </View>

                <View style={{ alignItems: 'center', marginTop: 35, width: 300, marginLeft: 25, marginRight: 25 }}>
                    <FloatingLabelInput 
                        label={'Masukkan Username'}
                        value={this.state.username}
                        onChangeText={(val) => this.setState({ username: val  })}
                    />
                    <View style={{ padding: 5, marginTop: 5, marginBottom: 5  }}></View>
                    <FloatingLabelInput
                        label={'Masukkan Password'}
                        value={this.state.password}
                        isPassword
                        togglePassword={false}
                        customShowPasswordImage={<Icons name='eye-outline' size={20} color="black" />}
                        customShowPasswordImage={<Icons name='eye-off-outline' size={20} color="black" />}
                        onChangeText={(val) => this.setState({ password: val  })}
                    />
                    <View style={{ padding: 5, marginTop: 5, marginBottom: 5  }}></View>
                    <FloatingLabelInput 
                        label={'Nama Lengkap'}
                        value={this.state.nama_lengkap}
                        onChangeText={(val) => this.setState({ nama_lengkap: val  })}
                    />
                    <View style={{ padding: 5, marginTop: 5, marginBottom: 5  }}></View>
                    <FloatingLabelInput 
                        label={'Email Address'}
                        value={this.state.email}
                        onChangeText={(val) => this.setState({ email: val  })}
                    />
                    <View style={{ padding: 5, marginTop: 5, marginBottom: 5  }}></View>
                    <FloatingLabelInput 
                        label={'Asal Sekolah / Universitas'}
                        value={this.state.sekolah}
                        onChangeText={(val) => this.setState({ sekolah: val  })}
                    />

                    <Text style={{ marginTop: 15, fontSize: 17, fontWeight: 'bold', alignItems: 'flex-start' }}>Pendidikan</Text>

                    <Radio
                        radio_props={[
                            {
                                label: "SD",
                                value: "SD"
                            },
                            {
                                label: "SMP",
                                value: "SMP"
                            },
                            {
                                label: "SMA",
                                value: "SMA"
                            },
                            {
                                label: "KULIAH",
                                value: "KULIAH"
                            }
                        ]}
                        initial={0}
                        buttonColor={"#6ECB63"}
                        style={{ marginLeft: 15, marginTop: 15 }}
                        labelStyle={{ marginRight: 15 }}
                        formHorizontal={true}
                        onPress={(val) => this.setState({ pendidikan: val })}
                    />

                    <TouchableOpacity style={{ backgroundColor: '#6ECB63', padding: 5, borderRadius: 15, width: 200, alignItems: 'center', marginTop: 20 }} onPress={() => this.register()}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Daftar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
