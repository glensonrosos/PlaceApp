import React from 'react'
import { useState } from 'react'
import { StyleSheet,View,Image, Platform, PermissionsAndroid, Text } from 'react-native'
import Dbutton from './Dbutton'
import LiamImage from '../../assets/images/liam.jpg'
import {launchCamera,launchImageLibrary} from 'react-native-image-picker'
import { TextInput } from 'react-native-gesture-handler'

const PickImage = (props) =>{

    const [state,setState] = useState({
        pickedImage:{
            value: null,
        }
    })


    const pickImage = () =>{
       
        let options = {
            mediaType:'photo',
            maxWidth:500,
            maxHeight:500,
            quality:1,
        }
        launchImageLibrary(options,res=>{
            if(res.didCancel){
            }
            else if(res.errorCode){
                console.log(res.errorMessage)
            }else{
                setState(prevState =>{
                    return{
                        ...prevState,
                        pickedImage:{
                            value : {uri: res.uri}
                        }
                    }
                });
                props.onPickImage({uri : res.uri})
            }
        })
    }

    const takePhoto =  () =>{
       
        let options = {
            mediaType:'photo',
            maxWidth:500,
            maxHeight:500,
            quality:1,
        }

        launchCamera(options,res =>{
            if(res.didCancel){
            }
            else if(res.errorCode){
                alert(res.errorMessage)
            }else{
                setState(prevState =>{
                    return{
                        ...prevState,
                        pickedImage:{
                            value : {uri: res.uri}
                        }
                    }
                });
                props.onPickImage({uri : res.uri})
            }
        });
    }

   return(
    <View style={style.container}>
        <View>
            <View >
                <Image style={style.image} source={state.pickedImage.value} resizeMode='contain'/>
            </View>
        </View>
        <View>
            <Dbutton childrenText={{fontSize:14}} style={{marginHorizontal:5}} valid={true} onPress={takePhoto}>Take Photo</Dbutton>
            <Dbutton childrenText={{fontSize:14}} style={{marginHorizontal:5}} valid={true} onPress={pickImage}>Select Image</Dbutton>
        </View>
    </View>
   )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    image:{
        height:150,
        width:150,
        borderWidth:1,
    }
})

export default PickImage;