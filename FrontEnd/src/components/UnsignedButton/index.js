import React, { useState } from 'react'
import { ButtonText, ButtonContainer, GoogleButtonContainer, GoogleButtonText, GoogleIcon } from './style'
import { ActivityIndicator } from 'react-native'
export default function UnsignedButton({ buttonText, isGoogleButton = false, handleClickFn = null, }) {
  const [isLoading, setisLoading] = useState(false);

  if (isGoogleButton) {
    return (
      <GoogleButtonContainer onPress={handleClickFn}>
        <GoogleIcon 
          source={require('../../assets/google-icon.png')}
        />
        <GoogleButtonText>
          { buttonText }
        </GoogleButtonText>
      </GoogleButtonContainer>
    )
  }

  return (
    <ButtonContainer disabled={isLoading} onPress={() => {
      if (isLoading)
        return;

      setisLoading(true);
      setTimeout(() => setisLoading(false), 4000);
      handleClickFn(setisLoading);
    }}>
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <ButtonText>{buttonText}</ButtonText>
          )}
    </ButtonContainer>
  )
}