import React, { Component } from 'react'
import { View, Text, TextInput, Image, AsyncStorage, TouchableOpacity, StatusBar } from 'react-native'
import Icons from 'react-native-vector-icons/Ionicons'
import { StackActions } from '@react-navigation/native'

export default class Banner extends Component{

    componentDidMount(){
        AsyncStorage.getItem('token').then(data => {
            if(data){
                this.props.navigation.dispatch(
                    StackActions.replace('Home')
                )
            }
        })
    }

    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                <StatusBar hidden={true}/>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#6ECB63', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                    <View style={{ marginTop: 10 }}>
                        <Image source={require('../assets/illustrations/study.png')} style={{ width: 150, height: 120 }} />
                    </View>

                    <View style={{ marginRight: 25, marginTop: 25, flexDirection: 'column' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Experimental</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Tryout</Text>
                        <Text style={{ color: 'white' }}>Online Study</Text>
                        <Text style={{ color: 'white' }}>And Tryout Platform</Text>
                    </View>
                </View>
                
                <View style={{ marginTop: 25, marginLeft: 10}}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Hai, Selamat Datang Kembali</Text>
                        <Text style={{ color: '#a1a1a1', marginTop: 5 }}>Silahkan Login dengan akunmu yang sudah terdaftar</Text>
                    </View>
                </View>

                <View style={{ alignItems: 'center', marginTop: 25 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#a6e69e', padding: 10, borderRadius: 15, alignItems: 'center', paddingLeft: 25, paddingRight: 27 }}>
                        <Image source={require('../assets/sso/google.png')} style={{ width: 20, height: 20 }} />
                        <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 15, color: '#a1a1a1', alignItems: 'center' }}>Login Dengan Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#a6e69e', padding: 10, borderRadius: 15, alignItems: 'center', paddingLeft: 17, paddingRight: 17, marginTop: 20 }}>
                        <Image source={require('../assets/sso/facebook.png')} style={{ width: 20, height: 20 }} />
                        <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 15, color: '#a1a1a1', alignItems: 'center' }}>Login Dengan Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#a6e69e', padding: 10, borderRadius: 15, alignItems: 'center', paddingLeft: 25, paddingRight: 27, marginTop: 20 }}>
                        <Image source={require('../assets/sso/twitter.png')} style={{ width: 20, height: 20 }} />
                        <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 15, color: '#a1a1a1', alignItems: 'center' }}>Login Dengan Twitter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#a6e69e', padding: 10, borderRadius: 15, alignItems: 'center', paddingLeft: 58, paddingRight: 58, marginTop: 20 }} onPress={() => this.props.navigation.navigate('Login')}>
                        <Icons name="logo-react" size={20} />
                        <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 15, color: '#a1a1a1', alignItems: 'center' }}>Login Tryout</Text>
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 130 }}>
                        <Text style={{ color: '#a1a1a1' }}>Belum Punya Akun ? Silahkan Daftar Di</Text>
                        <TouchableOpacity style={{ alignItems: 'center', marginLeft: 5 }} onPress={() => this.props.navigation.navigate('Banner_Register')}>
                            <Text style={{ color: '#6ECB63' }}>Sini</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
