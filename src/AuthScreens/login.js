import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import {loginAccount} from '../Api/firebase/index';
import { updateuser } from '../Redux/actions/authAction'
import { connect } from 'react-redux'


class Login extends Component{
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }
    async nav(data){
            const user = await data
            try {
                await this.props.updateuser(user)
                await this.props.navigation.navigate('authVerify')
              } catch (error) {
                    console.log(error)
              }
            
    }
   async login(){
        const {email, password} = this.state
        try{
            const user = await loginAccount(email, password)
            await this.nav(user)
        } catch (e){
            Alert.alert(e.message)
        }
    }
    render() {
        const { email, password } = this.state
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.container}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 200, width: 200 }} source={require('../assets/Logo.png')} />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            style={{ width: '90%', height: 50, margin: 5, backgroundColor: 'white', borderBottomColor: 'grey', borderBottomWidth: 1 }}
                            placeholder="Enter Your Email"
                            onChangeText={email => this.setState({ email })}
                            value={email}
                        />
                        <TextInput
                            style={{ width: '90%', height: 50, margin: 5, backgroundColor: 'white' }}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={password => this.setState({ password })}
                            password={password}
                        />
                        <TouchableOpacity
                            style={{ backgroundColor: '#4BCC1E', width: '90%', borderRadius: 15, height: 50, justifyContent: 'center', alignItems: 'center', margin: 5 }}
                            disabled={false}
                            onPress={()=>{this.login()}}
                        >
                            <Text style={{color: 'white'}}>LOG IN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: '#4BCC1E', width: '90%', borderRadius: 15, height: 50, justifyContent: 'center', alignItems: 'center', margin: 5 }}
                            onPress={()=> this.props.navigation.navigate('signup') }
                        >
                            <Text style={{color: 'white'}}>CREATE NEW ACCOUNT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: '#0080FE', width: '90%', borderRadius: 15, height: 50, justifyContent: 'center', alignItems: 'center', margin: 5 }}
                        >
                            <Text style={{color: 'white'}}>LOG IN WITH FACEBOOK</Text>
                        </TouchableOpacity>
                        <Text style={{ margin: 20, fontSize: 16, fontWeight: 'bold' }}>FORGOT PASSWORD</Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.reducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateuser: (user) => dispatch(updateuser(user)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Login)