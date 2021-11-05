import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './components/Login'
import Home from './components/Home'
import Ulangan from './components/Ulangan'
import Ulangan_Selesai from './components/Ulangan_Selesai'
import Profile from './components/Profile'
import Register from './components/Register'
import Search from './components/Search'
import Banner from './components/Banner'
import Banner_Register from './components/Banner_Register'
import Overview_Pelajaran from './components/Overview_Pelajaran'
import Overview_Ulangan from './components/Overview_Ulangan'

// Admin Sections
import Admin from './components/admin/Home'

export default class App extends Component{
    constructor(props){
        super(props)

        this.state = {
            route: "Banner"
        }
    }
    
    componentDidMount(){
        AsyncStorage.getItem('token').then(token => {
            if(token){
                this.setState({ route: 'Home' })
            }
        })
    }

    render(){
        let Stack = createStackNavigator();
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName={this.state.route}>
                    <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
                    <Stack.Screen name='Banner' component={Banner} options={{ headerShown: false }} />
                    <Stack.Screen name='Banner_Register' component={Banner_Register} options={{ headerShown: false }} />
                    <Stack.Screen name='Profile' component={Profile} options={{ headerStyle: {
                        backgroundColor: '#6ECB63',
                        elevation: 0,
                    },
                        headerTintColor: 'white'
                    }} />
                    <Stack.Screen name='Overview_Pelajaran' component={Overview_Pelajaran} options={{ title: '', headerStyle: {
                        backgroundColor: '#6ECB63',
                        elevation: 0,
                    },
                        headerTintColor: 'white'
                    }} />
                    <Stack.Screen name='Overview_Ulangan' component={Overview_Ulangan} options={{ title: '', headerStyle: {
                        backgroundColor: '#6ECB63',
                        elevation: 0,
                    },
                        headerTintColor: 'white'
                    }} />
                    <Stack.Screen name='Ulangan_Selesai' component={Ulangan_Selesai} options={{ title: '', headerStyle: {
                        backgroundColor: '#6ECB63',
                        elevation: 0,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10
                    },
                        headerTintColor: 'white'
                    }} />
                    <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
                    <Stack.Screen name='Admin' component={Admin} options={{ headerShown: false }}/>
                    <Stack.Screen name='Search' component={Search} options={{ title: '', headerStyle: {
                        backgroundColor: '#6ECB63',
                        elevation: 0,
                    },
                        headerTintColor: 'white'
                    }}/>
                    <Stack.Screen name='Ulangan' component={Ulangan} options={{ headerShown: false }}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
