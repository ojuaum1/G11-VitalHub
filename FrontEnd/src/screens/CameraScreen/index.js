import React, { useEffect, useState } from 'react'
import { ScreenContainer } from './style'
import RecordCamera from './components/Record'
import PhotoModal from './components/PhotoModal';
import * as MediaLibrary from 'expo-media-library';

export default function CameraScreen({ navigation, route }) {
const [getMediaLibrary] = route.params
  const [modalActive, setModalActive] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);


  useEffect(() => {
    setPhotoUri(null)

  if(getMediaLibrary){
    GetLastPhoto();
  }
})

async function GetLastPhoto(){
  const assets = await MediaLibrary.getAssetsAsync({sortBy : [[MediaLibrary.SortBy.creationTime, false]],first : 1 })

  console.log(assets)
}


  return (
    <ScreenContainer>
        <RecordCamera 
          setPhotoUri={setPhotoUri}
          openModalFn={() => setModalActive(true)}
        />
        <PhotoModal 
          photoUri={photoUri}
          resetPhotoUriFn={() => setPhotoUri(null)}
          isVisible={modalActive}
          closeModalFn={() => setModalActive(false)}
          goScreenBackFn={() => navigation.navigate('patientViewMedicalRecord', { newPhotoUri: photoUri })}
        />
        
    </ScreenContainer>
  )
}