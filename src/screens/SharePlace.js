import React,{useState} from 'react'
import {View,StyleSheet,Text,ScrollView, Share} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import {addPlace} from '../../src/redux/config/actions/'
import PickLocation from './component/PickLocation'
import PickImage from './component/PickImage'
import Dbutton from './component/Dbutton'

const SharePlace = (props) =>{

    const [state,setState] = useState({
        controls:{
            place:{
                name:null,
                id: null
            },
            pickLocation:{
                value: null,
                valid:false
            },
            pickImage:{
                value:null,
                valid:false
            }
        }
    })

    const onPickLocationHandler = position =>{
        setState(prevState=>{
            return{
                ...prevState,
                controls:{
                    ...prevState.controls,
                    pickLocation:{
                        ...prevState.controls.pickLocation,
                        valid:true,
                        value: position
                    }
                }
            }
        })
    }
    const onPickImageHandler = photoData =>{
        setState(prevState=>{
            return{
                ...prevState,
                controls:{
                    ...prevState.controls,
                    pickImage:{
                        ...prevState.controls.pickImage,
                        valid:true,
                        value: photoData
                    }
                }
            }
        })
    }

    const submitDataHandler = () => {
        props.onAddPlace(state.controls)
    }


    return(
        <View style={style.container}>
           <View style={style.textContainer}>
               <TextInput style={style.textInput} placeholder='Place Name' 
                value={state.controls.place.name} onChangeText={text => setState(prevState=> {
                    return{
                        ...prevState,
                        controls:{
                            ...prevState.controls,
                            place:{
                                id: null,
                                name: text
                            }
                        }
                    }
                })}/>
           </View>
           <ScrollView style={style.inputContainer}>
                <PickImage onPickImage={onPickImageHandler}/>
                <PickLocation onPickLocation={onPickLocationHandler}/>
           </ScrollView>
           <View style={style.buttonContainer}>
                <View>
                    <Dbutton onPress={state.controls.pickLocation.valid && state.controls.pickImage.valid ? submitDataHandler : ()=> alert('select image and location')} 
                    valid={state.controls.pickLocation.valid && state.controls.pickImage.valid}>
                        Add Item
                    </Dbutton>
                </View>
           </View>
           
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        backgroundColor:'#FFF',
    },
    inputContainer:{
        flex:5,
        paddingVertical:10,
    },
    textContainer:{
        paddingVertical:0,
        width:'100%',
        paddingHorizontal:80,
        marginTop:5,
    },
    textInput:{
        borderBottomWidth:2,
        borderColor:'#060d0c',
        fontWeight:'200',
        fontSize:20,
    },
    button:{
        backgroundColor:'#59d4c2',
        width:'100%',
        paddingVertical:10,
        paddingHorizontal:60,
        borderRadius:12,
        borderWidth:3,
        borderColor:'#eee',
    },
    buttonContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        marginVertical:10,
    },

})



const mapDispatchToProps = dispatch =>{
    return{
        onAddPlace : (placeData) => dispatch(addPlace(placeData))
    }
}

export default connect(null,mapDispatchToProps)(SharePlace);