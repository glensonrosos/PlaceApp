import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

const Dbutton = props =>{
    return(
        <TouchableOpacity {...props} style={[style.button,props.style,props.valid ? null : style.invalid ]} onPress={props.onPress}>
            <Text style={[style.text,props.childrenText]}>{props.children}</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    button:{
        marginHorizontal:'20%',
        paddingVertical:15,
        borderColor:'#fff',
        borderWidth:1,
        backgroundColor:'#5ea9ad',
        borderRadius:10,
    },
    text:{
        textAlign:'center',
        fontSize:20,
        letterSpacing:5,
        color:'#fff'
    },
    invalid:{
        opacity: 0.8,
        backgroundColor:'#ccc'
    }
})

export default Dbutton
