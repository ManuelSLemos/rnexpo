import { View, Text } from 'react-native';
import React, { useRef, useState } from 'react';
import UnityView from '@azesmway/react-native-unity';
import { Button, TextInput } from 'react-native';

export default function Unity() {
  const unityRef = useRef<UnityView>(null);
  const [textFromUnity, setTextFromUnity] = useState('No text received');
  const [messageToUnity, setMessageToUnity] = useState('');
  const [buttonColor, setButtonColor] = useState('rgba(0, 0, 255, 1)');

  let unityData = {
    message: messageToUnity ?? 'Hell yeah',
    color: {'a': 1.0, 'b': 0.0, 'r': 0.0, 'g': 1.0}
};

// Function responsible to send data to the Unity side
const sendDataToUnity = () => {
    if (unityRef?.current) {
        // GameManager is the elemente that we created to integrate the scripts with the corresponding elements
        // GetData is the function that we implemented on DataFromReact script. We are targeting it here
        // The last argument is the data we want to send
        unityRef.current.postMessage('GameManager', 'GetDataFromReact', JSON.stringify(unityData));
    }
};

const convertColor = (colorObject) => {
    const r = Math.round(colorObject.r * 255);
    const g = Math.round(colorObject.g * 255);
    const b = Math.round(colorObject.b * 255);
    const a = Math.round(colorObject.a * 255);

    return `rgba(${r}, ${g}, ${b}, ${a})`;
};

// Function that converts data received from Unity
const receiveDataFromUnity = (result) => {
    const objectReceived = JSON.parse(result.nativeEvent.message);
    setTextFromUnity(objectReceived.message);
    setButtonColor(convertColor(objectReceived.color));
};

  return (
    <View style={{
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#fff'
    }}>
        <View style={{
            flex: 1,
            borderBottomWidth: 3,
            borderColor: 'black',
            backgroundColor: 'grey',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{fontSize: 25}}>{textFromUnity}</Text>
            <TextInput
                textAlign="center"
                style={{fontSize: 25}}
                placeholder="Write message here"
                value={messageToUnity}
                onChangeText={setMessageToUnity} />
            <Button
                color={buttonColor}
                title="Send Message to Unity"
                onPress={sendDataToUnity} />
        </View>
        <UnityView
            ref={unityRef}
            style={{ flex: 1 }}
            onUnityMessage={(result) => receiveDataFromUnity(result)}
        />
    </View>
  );
}
