import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import {connect} from 'react-redux'

// components
import ListView from './component/Listview'
 
const FindPlace = (props) =>{
   
    return(
        <View style={style.container}>
            <FlatList
                style={{marginTop:5}}
                data={props.place}
                renderItem={({item})=>(
                    <ListView place={item} navigation={props.navigation}/>
                )}
                keyExtractor={item => item.place.id}
           />
        </View>
    )
}



const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFF',
    },
    listContainer:{
        flexDirection:'row',
        width:'100%',
        paddingVertical:10,
        backgroundColor:'#eee',
        marginVertical:5,
    },
    image:{
        width:40,
        height:40,
    }
})

const mapToProps = (state) =>{
    return {
        place : state.place.place
    }
}

export default connect(mapToProps,null)(FindPlace);