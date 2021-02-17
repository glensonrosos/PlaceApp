import React from 'react'
import {View,Image,Text, StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Listview = (props) =>
{   
    const placeData = props.place;
    return(
        <TouchableOpacity style={style.listContainer} 
            onPress={()=> props.navigation.navigate('PlaceDetails',{place:placeData,})}>
            <Image source={placeData.pickImage.value} resizeMode='contain' style={style.image}/>
            <Text style={style.text}>{placeData.place.name}</Text>
            <Text>{JSON.stringify(props.places,null,2)}</Text>
        </TouchableOpacity>
    )
}

const style= StyleSheet.create({
    listContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        width:'100%',
        paddingVertical:10,
        backgroundColor:'#defff7',
        marginTop:5,
    },
    image:{
        width:40,
        height:40,
        marginHorizontal:10,
    },
    text:{
        fontSize:24,
        fontWeight:'100',
        color: '#47494a',
    }
})

export default Listview