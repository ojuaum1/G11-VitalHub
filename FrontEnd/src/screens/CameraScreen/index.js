import React, { useEffect, useState } from 'react'
import { ScreenContainer } from './style'
import RecordCamera from './components/Record'
import PhotoModal from './components/PhotoModal';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker  from 'expo-image-picker';

export default function CameraScreen({ navigation, route }) {
  const { getMediaLibrary = false, isProfile = true } = route.params
  const [modalActive, setModalActive] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const [latestPhoto, setLatestPhoto] = useState(null)

  useEffect(() => {
    if(getMediaLibrary){
      GetLastPhoto();
    }
  }, [])

  
  async function SelectImageGallery(){
    const result =  await ImagePicker.launchImageLibraryAsync({
      mediaTypes : ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });
    
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);

      setModalActive(true);
    }
  }


  async function GetLastPhoto(){
    const { assets } = await MediaLibrary.getAssetsAsync({sortBy : [[MediaLibrary.SortBy.creationTime, false]],first : 1 })

    
    if(assets.length > 0) {
      setLatestPhoto(assets[0].uri);
    }
  }

  return (
    <ScreenContainer>
        <RecordCamera 
          setPhotoUri={setPhotoUri}
          openModalFn={() => setModalActive(true)}
          gallery={SelectImageGallery}
          latestPhoto={latestPhoto}
        />

        <PhotoModal 
          photoUri={photoUri}
          resetPhotoUriFn={() => setPhotoUri(null)}
          isVisible={modalActive}
          closeModalFn={() => setModalActive(false)}
          goScreenBackFn={() => isProfile 
            ? navigation.navigate('Main', { newPhotoUri: photoUri, screen : "PatientProfile" })
            : navigation.navigate('patientViewMedicalRecord', { newPhotoUri: photoUri })}
        />
        
    </ScreenContainer>
  )
}