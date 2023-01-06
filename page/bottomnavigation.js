import * as React from 'react';
import {Text, View, TouchableOpacity, Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {WebView} from 'react-native-webview';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DataSpbu from './dataspbu.json';
import {ScrollView} from 'react-native-gesture-handler';

function PointScreen() {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <WebView
        source={{
          uri: 'https://ramjirenanda26.github.io/map-content-pgbl/point.html',
        }}
      />
    </View>
  );
}

function LineScreen() {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <WebView
        source={{
          uri: 'https://arcg.is/1zvCrj',
        }}
      />
    </View>
  );
}

function SpbuParse() {
  return DataSpbu.map(item => (
    <TouchableOpacity
      onPress={() =>
        Linking.openURL(
          'google.navigation:q=' + item.latitude + ',' + item.longitude,
        )
      }>
      <View
        style={{
          backgroundColor: 'black',
          margin: 10,
          padding: 10,
        }}>
        <FontAwesome5 name={item.fontawesome5icon} size={40} />

        <Text>{item['Nama SPBU']}</Text>
        <Text>{item.SUMBER}</Text>
      </View>
    </TouchableOpacity>
  ));
}

function SpbuScreen() {
  return (
    <ScrollView>
      <View>
        <SpbuParse />
      </View>
    </ScrollView>
  );
}

function PolygonScreen() {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <WebView
        source={{
          uri: 'https://ramjirenanda26.github.io/map-content-pgbl/polygon.html',
        }}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            // FontAwesome5
            if (route.name === 'Sebaran SPBU') {
              iconName = focused ? 'map-marker-alt' : 'map-marker-alt';
            } else if (route.name === 'Form Kelayakan') {
              iconName = focused ? 'wpforms' : 'wpforms';
            } else if (route.name === 'Buffer Area SPBU') {
              iconName = focused ? 'draw-polygon' : 'draw-polygon';
            } else if (route.name === 'Data SPBU') {
              iconName = focused ? 'gas-pump' : 'gas-pump';
            }

            return (
              <FontAwesome5 name={iconName} size={size} color={color} solid />
            );
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Sebaran SPBU" component={PointScreen} />
        <Tab.Screen name="Buffer Area SPBU" component={PolygonScreen} />
        <Tab.Screen name="Form Kelayakan" component={LineScreen} />
        <Tab.Screen name="Data SPBU" component={SpbuScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
