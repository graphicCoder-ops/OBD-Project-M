import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Button, Text, View, ViewStyle, TextStyle, Dimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from './Screens/Dashboard';
import LoginScreen from './Screens/Login';
import RegisterScreen from './Screens/Register';

import Geolocation from '@react-native-community/geolocation';
import { BleError, BleManager, Characteristic, Device } from 'react-native-ble-plx';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Buffer } from 'buffer';
import { NavigationContainer } from '@react-navigation/native';

interface Styles {
  heading: TextStyle;
  element: ViewStyle;
}

interface Position {
  latitude: number;
  longitude: number;
}

interface DevicesInfo{
  id: String;
  name: String;
}
const manager = new BleManager();

const Stack = createNativeStackNavigator();

export default function App() {
  const [BatteryLevel,setBatteryLevel]=useState(69);
  
  const [speed, setSpeed] = useState<number>(0);
  const [position, setPosition] = useState<Position>({ latitude: 32, longitude: 45 });

  const [devices, setDevices] = useState<DevicesInfo[]>([]);
  

  // runs start of app
  useEffect(()=>{
    initialFetch();

    // BLE Service initiate

    // const subscription = manager.onStateChange((state) => {
    //   if (state === 'PoweredOn') {
    //     scanAndConnect();
    //     subscription.remove();
    //   }else{
    //     console.log("not working!")
    //   }
    // }, true);
    // return () => manager.destroy();
  },[]);

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error: BleError | null, device: Device | null) => {
      if (error) {
        console.log(error);
        return;
      }

      if (device && device.name === 'Battery Level Indicator') {
        console.log('Connecting to device', device.name);
        manager.stopDeviceScan();

        device.connect()
          .then((device) => {
            return device.discoverAllServicesAndCharacteristics();
          })
          .then((device) => {
            return device.services();
          })
          .then((services) => {
            console.log("Characteristics");
            console.log(services);
            // Access the specific service you're interested in
    const targetService = services.find(s => s.uuid === "0000180f-0000-1000-8000-00805f9b34fb");
    if (!targetService) {
      console.log('Target service not found');
      return;
    }
    return targetService.characteristics();
          })
          .then((characteristics) => {
            console.log('Characteristics in the target service:', characteristics);
            const characteristic = characteristics.find(c => c.uuid === '00002a19-0000-1000-8000-00805f9b34fb');
            console.log('Found Characteristics:',characteristic);
            if (characteristic) {
              console.log("Found Characteristics");
              return characteristic.monitor((error, characteristic) => {
                if (error) {
                  console.error(error);
                  return;
                }
                if (characteristic && characteristic.value) {
                  const value = Buffer.from(characteristic.value, 'base64').readUInt8(0);
                  console.log('The value is ' + value);
                  setBatteryLevel(value);
                }
              });
            }
          })
          .catch((error: any) => {
            console.log(error);
          });
      }
    });
  };

  const initialFetch = ()=>{
    Geolocation.getCurrentPosition((info)=> {
      setPosition({latitude:info.coords.latitude,longitude:info.coords.longitude});
    });
  };
  const increment = (): void => {
    setSpeed(speed + 2);
  };

  return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
      </NavigationContainer>
    
  );
}

const styles = StyleSheet.create<Styles>({
  heading: {
    fontSize: 30,
    padding: 10,
    paddingLeft: 2,
  },
  element: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: 'black',
    borderStyle: 'solid',
    borderBottomWidth: 2,
  }
});


