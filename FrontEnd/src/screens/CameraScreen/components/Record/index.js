import React, { useRef, useState } from 'react';

import { CameraView } from 'expo-camera';
import { StyleSheet } from 'react-native';
import { CameraButton, CameraButtonsBar, LatestPhoto } from './style';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function RecordCamera({ setPhotoUri = null, openModalFn = null , gallery = null, latestPhoto = null}) {
    const [cameraType, setCameraType] = useState('back');
    const cameraRef = useRef(null)

    function flipCamera() {
        if (cameraType == Camera.Type.back) {
            setFlashOn(false);
            setCameraType(Camera.Type.front);
        }
        else
            setCameraType(Camera.Type.back);
    }

    async function capturePhoto() {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
            setPhotoUri(photo.uri);
            openModalFn(); 
        }
    }

    return (
        <CameraView
            facing={cameraType}
            style={styles.camera}
            ratio='16:9'
            ref={cameraRef}
        >
            <CameraButtonsBar>
                <CameraButton onPress={gallery}>
                    {
                        latestPhoto != null
                        ? (
                             <LatestPhoto
                                source={{uri : latestPhoto}}
                            />
                        )
                        : null
                       
                    }
                </CameraButton>
                <CameraButton onPress={capturePhoto}>
                    <FontAwesome name='camera' size={40} color='#fff' />
                </CameraButton>
                <CameraButton onPress={flipCamera}>
                    <MaterialCommunityIcons name="camera-flip" size={48} color="#fff" />
                </CameraButton>
            </CameraButtonsBar>
        </CameraView>
    )
}

const styles = StyleSheet.create({
    camera: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    }
});