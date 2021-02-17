import React,{useState} from 'react';
import { useWindowDimensions} from 'react-native';
import {NavigationContainer,useNavigation,DrawerActions} from '@react-navigation/native'
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createDrawerNavigator} from '@react-navigation/drawer'
//-- icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
//-- screen components
import FindPlaceScreen from './src/screens/FindPlace'
import PlaceDetailsScreen from './src/screens/PlaceDetails'
import SharePlaceScreen from './src/screens/SharePlace'
import Auth from './src/screens/Auth'
import { TouchableOpacity } from 'react-native-gesture-handler';


const FindPlace = () =>{
  const StackFindPlace = createStackNavigator()
  const windows = useWindowDimensions();
  let orientation = null

  windows.height > windows.width ? orientation = 'portrait' : orientation = 'landscape'
  return(
    <StackFindPlace.Navigator screenOptions={{
      headerTitleAlign:'center',
    }}>
      <StackFindPlace.Screen name='FindPlace' component={FindPlaceScreen} options={{
        headerLeft: (props)=>{
          const navigation = useNavigation()
          return(
           <TouchableOpacity onPress={()=> navigation.dispatch(DrawerActions.toggleDrawer())} style={{flex:1,justifyContent:'center',alignItems:'center',paddingHorizontal:5}}>
             <EvilIcons name='navicon' size={45} color={props.color}/>
           </TouchableOpacity>
          )
        },
        title:'ItemList',
      }}/>
      <StackFindPlace.Screen name='PlaceDetails' component={PlaceDetailsScreen} options={{
        headerRight:(props)=>{
          const navigation =useNavigation()
          return(
           <TouchableOpacity onPress={()=> navigation.dispatch(DrawerActions.toggleDrawer())} style={{flex:1,justifyContent:'center',alignItems:'center',paddingHorizontal:5}}>
             <EvilIcons name='navicon' size={45} color={props.color}/>
           </TouchableOpacity>
          )
        },
        title:'Item Details',
      }}
      />
    </StackFindPlace.Navigator>
  )
}

const SharePlace = () =>{
  const StackSharePlace = createStackNavigator()
  return(
    <StackSharePlace.Navigator screenOptions={{
      headerLeft: (props)=>{
        const navigation = useNavigation()
        return(
         <TouchableOpacity onPress={()=> navigation.dispatch(DrawerActions.toggleDrawer())} style={{flex:1,justifyContent:'center',alignItems:'center',paddingHorizontal:5}}>
           <EvilIcons name='navicon' size={45} color={props.color}/>
         </TouchableOpacity>
        )
      },
      headerTitleAlign:'center',
    }}>
      <StackSharePlace.Screen name='SharePlace' options={{title:'Add Item'}} component={SharePlaceScreen}/>
    </StackSharePlace.Navigator>
  )
}

const MainTab  = () =>{
  const Tab = createBottomTabNavigator();
 
  return(
    <Tab.Navigator tabBarOptions={{
      activeTintColor:'#59d4c2',
      activeBackgroundColor:'#3b3d3d',
      labelStyle:{
        fontSize:15,
        paddingVertical:1,
      },
      style:{
        height:70,
      },
    }} 
    initialRouteName='SharePlace'
    >
      <Tab.Screen name='FindPlace' component={FindPlace} options={{
        tabBarIcon : (props) => (
          <MaterialIcons name='playlist-add' color='#59d4c2' size={35} />
        ),
        tabBarLabel:'Items',
      }}/>
      <Tab.Screen name='SharePlace' component={SharePlace} options={{
        tabBarIcon : (props) => (
          <MaterialIcons name='library-add' color='#59d4c2' size={35} />
        ),
        tabBarLabel:'Add Item',
      }}
      />
    </Tab.Navigator>
  )
}

const MainDrawer = () =>{
  const Drawer = createDrawerNavigator()
  return(
    <Drawer.Navigator>
      <Drawer.Screen  name='Auth' component={Auth} options={{
        swipeEnabled:false,
      }}/>
      <Drawer.Screen name='FindPlace' component={MainTab}/>
      <Drawer.Screen name='SharePlace'component={SharePlace}/>
    </Drawer.Navigator>
  )
}

const AuthScreen = () => {
  const AuthStack = createStackNavigator()
  return(
    <AuthStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <AuthStack.Screen name='Auth' component={Auth}/>
    </AuthStack.Navigator>
  )
}


const App = () => {
  return (
    <NavigationContainer>
      <MainDrawer/>
    </NavigationContainer>
  )
}

export default App;
