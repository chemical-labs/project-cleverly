import React, { Component } from 'react'
import { View, StatusBar, Image, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'

export default class Ulangan_Selesai extends Component{
    constructor(props){
        super(props)

        this.state = {
            nama: null,
            nilai: null
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(data => {

        })
    }

    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <StatusBar hidden={true} />

                <Text style={{ fontWeight: 'bold', fontSize: 19, marginTop: -5 }}>Hasil Tryout</Text>
                <View style={{ padding: 14, marginTop: 10, backgroundColor: 'white', elevation: 10, borderRadius: 10, width: 250, alignItems: 'center' }}>
                    <Image source={require('../assets/icons/students.png')} style={{ width: 70, height: 70, borderRadius: 100, borderWidth: 2, borderColor: 'black' }} />
                    <Text style={{ color: '#6ECB63', fontWeight: 'bold', fontSize: 17 }}>Username</Text>

                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Pelajaran : Matematika</Text>
                        <Text style={{ fontWeight: 'bold' }}>Perolehan Nilai : 15</Text>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={{ backgroundColor: 'orange', elevation: 5, padding: 5, borderRadius: 10, fontWeight: 'bold' }}>Keterangan</Text>
                    </View>
                    <Text style={{ marginTop: 5 }}>Disarankan Masuk ITB</Text>

                </View>
            </View>
        )
    }
}
