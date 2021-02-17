import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import AndroidBackground from '../assets/images/androidimage.jpg'
// components
import DtextView from '../screens/component/DtextView'
import Dbutton from '../screens/component/Dbutton'
import { TouchableOpacity } from 'react-native-gesture-handler'
// validation
import LoginValidation from '../utility/LoginValidation'
//redux
import {connect} from 'react-redux'
import {tryAuth} from '../redux/config/actions'

const Auth = (props) =>{

    const [state,setState] = useState({
        switchScreen:{
            value : 'login'
        },
        enableButton:{
            value : false,
        },
        validation :{
            email:{
                value : '',
                isValid : false,
                touched : false,
                validRules :{
                    isEmail : false,
                }
            },
            password :{
                value : '',
                isValid : false,
                touched : false,
                validRules :{      
                    minLenght: 6,
                }
            },
            confirmPassword:{
                value: '',
                isValid : false,
                validRules:{
                    isSame : false,
                }
            }
        }
    })

    const onChangeTextHandler = (input,val) => {
        setState(prevState =>{
           if(input != 'confirmPassword'){
                let confirmPass = null
               if(input == 'password'){
                    let confirm = prevState.validation.confirmPassword.value
                    confirmPass = LoginValidation(prevState.validation.confirmPassword.validRules,confirm,val)
                }
            return{
                ...prevState,
                validation :{
                    ...prevState.validation,
                    confirmPassword : {
                        ...prevState.validation.confirmPassword,
                        isValid : confirmPass,
                    },
                    [input] :{
                        ...prevState.validation[input],
                        value: val,
                        touched : true,
                        isValid : LoginValidation(prevState.validation[input].validRules,val)
                    },
                }
            }
           } else {
            return{
                ...prevState,
                validation :{
                    ...prevState.validation,
                    confirmPassword:{
                        ...prevState.validation.confirmPassword,
                        value: val,
                        touched : true,
                        isValid : LoginValidation(prevState.validation.confirmPassword.validRules,val,prevState.validation.password.value),
                    },
                }
            }
           }
        })
    }

    const checkLoginHandler = ()=>{
        if(state.switchScreen.value == 'login')
        {
            state.validation.confirmPassword.isValid = true;
        }
        if( state.validation.email.isValid &&
            state.validation.password.isValid && 
            state.validation.confirmPassword.isValid){
                props.onTryAuth({
                    email : state.validation.email.value,
                    password : state.validation.password.value,
                    mode : state.switchScreen.value
                }) ? props.navigation.navigate('FindPlace') : alert('fail to procceed')
            }
    }

    return(
        <ImageBackground source={AndroidBackground} style={style.image} >
            <View style={style.container}>
                <View style={{paddingHorizontal:'10%',alignSelf:'flex-start'}}>
                    <TouchableOpacity onPress={()=> setState(prevState =>{
                        return {
                            ...prevState,
                            switchScreen:{
                                ...prevState.switchScreen,
                                value : prevState.switchScreen.value == 'login' ? 'signup' : 'login'
                            }
                        }
                    })}>
                        <Text style={{color:'blue',borderBottomWidth:1,borderColor:'blue'}}>Switch to {state.switchScreen.value == 'login' ?  `SignUp` : `Login`}</Text>
                    </TouchableOpacity> 
                </View>
                <View style={style.inputContainer}>
                    <DtextView placeholder='Email' 
                    value={state.validation.email.value} onChangeText={val=> onChangeTextHandler('email',val) }
                    valid={state.validation.email.isValid || !state.validation.email.touched}
                    keyboardType='email-address'
                    autoFocus={true}
                    keyboardAppearance='dark'
                    />

                    <DtextView placeholder='Password' secureTextEntry={true}
                    value={state.validation.password.value}
                    onChangeText={val => onChangeTextHandler('password',val)}
                    valid={state.validation.password.isValid || !state.validation.password.touched}
                    />

                    {state.switchScreen.value != 'login' ?
                     <DtextView placeholder='Confirm Password' secureTextEntry={true}
                     value={state.validation.confirmPassword.value}
                     onChangeText={val => onChangeTextHandler('confirmPassword',val)}
                     valid={state.validation.confirmPassword.isValid || !state.validation.confirmPassword.touched}
                     /> 
                     : null}

                    <Dbutton valid={state.switchScreen.value == 'login' ? state.validation.email.isValid && state.validation.password.isValid 
                    : state.validation.email.isValid && state.validation.password.isValid && state.validation.confirmPassword.isValid} 
                    onPress={checkLoginHandler}>{state.switchScreen.value != 'login' ? 'Sign-Up' : 'Login'}</Dbutton>
                </View>
            </View>
        </ImageBackground>
    )
};

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    image:{
        flex:1,
    },
    inputContainer:{
        width:'100%',
        paddingHorizontal:'10%'
    },
})

const mapToProps = state =>{
    return {
        onUserData : state.auth.auth,
    }
}

const dispatchToProps = dispatch =>{
    return{
        onTryAuth : (userData) => dispatch(tryAuth(userData))
    }
}

export default connect(mapToProps,dispatchToProps)(Auth);