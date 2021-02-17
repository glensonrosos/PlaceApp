import React,{useState} from 'react'
import { StyleSheet,View,Text,useWindowDimensions, PermissionsAndroid } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
//import map
import MapView,{Marker} from 'react-native-maps'
//import component
import Dbutton from './Dbutton'

const PickLocation = (props) =>{

    const [state, setState] = useState({
        location:{
            latitude: 10.292678212372952,
            longitude: 123.97288623068799,
            latitudeDelta: 0.002426,
            longitudeDelta: useWindowDimensions().height / useWindowDimensions().width *  0.002426,
        }
    })

    const locateme =  () =>{
        Geolocation.getCurrentPosition( position => {

            setState(prevState =>{
                return{
                    ...prevState,
                    location:{
                        ...prevState.location,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                }
            });
            
            map.animateToRegion({
                latitudeDelta: state.location.latitudeDelta,
                longitudeDelta: state.location.longitudeDelta,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
           
            props.onPickLocation({
                latitudeDelta: state.location.latitudeDelta,
                longitudeDelta: state.location.longitudeDelta,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        })
    }

    const onChangePosition = (event) =>{
        const newCoordinate = event.nativeEvent.coordinate;

        setState(prevState => {
            return{
                ...prevState,
                location:{
                    ...prevState.location,
                    latitude : newCoordinate.latitude,
                    longitude : newCoordinate.longitude,
                }
            }
        });

        map.animateToRegion({
            latitudeDelta: state.location.latitudeDelta,
            longitudeDelta: state.location.longitudeDelta,
            latitude: newCoordinate.latitude,
            longitude: newCoordinate.longitude
        })

         props.onPickLocation({
            latitudeDelta: state.location.latitudeDelta,
            longitudeDelta: state.location.longitudeDelta,
            latitude: newCoordinate.latitude,
            longitude: newCoordinate.longitude
        })
        
    }

    return(
        <View style={style.container}>
            <MapView style={style.map} initialRegion={state.location} onPress={e => onChangePosition(e)} 
                ref={ref=> map = ref}>
                <Marker coordinate={state.location} title='Where me'/>
            </MapView>
            <Dbutton childrenText={{fontSize:14,paddingHorizontal:10}} valid={true} style={{marginHorizontal:0,marginTop:10}} onPress={locateme}>Locate me</Dbutton>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    map :{
        width:'100%',
        height:200,
    }
})

export default PickLocation;