import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const DtextView = props =>{
    return(
        <TextInput  {...props} style={[style.container,props.style,props.valid ? null : style.invalid]}  />
    )
}

const style= StyleSheet.create({
    container:{
        width:'100%',
        borderWidth:0.5,
        borderColor:'#000',
        backgroundColor:'rgba(255,255,255,0.9)',
        marginVertical:10,
        fontWeight:'100',
        fontSize:24,
        borderRadius:15,
        letterSpacing:2,
    },
    invalid :{
        borderColor:'red',
        borderWidth:3,
        backgroundColor:'#edabab',
    }
})

export default DtextView