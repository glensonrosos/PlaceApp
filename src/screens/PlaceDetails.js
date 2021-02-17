import React from 'react'
import {View,Text, Image, StyleSheet, Platform} from 'react-native'
import {useRoute} from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons'
import MapView,{Marker} from 'react-native-maps'
// redux
import {deletePlace} from '../redux/config/actions/'
import {connect} from 'react-redux'

const PlaceDetails = (props) => {

    const placeData = props.route.params.place;

    const deletePlaceData = () =>{
        const id = placeData.place.id;
        props.onDeletePlace(id)
        props.navigation.pop()
    }

    return(
        <View style={style.container}>
            <View style={[{
                flexDirection:'row',
                width:'100%',
                paddingHorizontal:20,
                marginVertical:5,
                }]}>
                <Text style={[style.text,{flexWrap: 'wrap'}]}>PlaceName : </Text>
                <Text style={[style.text,{borderBottomWidth:1,
                flexWrap: 'wrap',borderBottomColor:'#2d3330',flex:1,width:'100%'}]}>{placeData.place.name}</Text>
            </View>
            <Image source={placeData.pickImage.value} resizeMode='contain' style={[style.image,{overflow:'hidden'}]}/>
            
            <MapView style={style.map} initialRegion={placeData.pickLocation.value}>
                <Marker coordinate={placeData.pickLocation.value}/>
            </MapView>
            {/* <View style={style.map}>

            </View> */}
            <TouchableOpacity style={style.button} onPress={deletePlaceData}>
                <Icon name='trash-outline' size={Platform.OS === 'android' ? 30 : 40} color='#FFF'/>
                <Text style={{color:'#FFF',marginLeft:10,fontSize:20}}>Delete Me</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFF',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    map:{
        width:'90%',
        height:200,
        backgroundColor:'blue'
    },
    image:{
        height:200,
        width:'100%',
        marginVertical:5,
    },
    text:{
        fontSize:20,
        color:'#515c5a',
        fontWeight:'100'
    },
    button:{
        flexDirection:'row',
        paddingVertical:8,
        backgroundColor:'#db3555',
        paddingHorizontal:30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
        marginVertical:15,
    }
});

const mapDispatchToProps = dispatch =>{
    return{
        onDeletePlace : (id) => dispatch(deletePlace(id))
    }
}

export default connect(null,mapDispatchToProps)(PlaceDetails);