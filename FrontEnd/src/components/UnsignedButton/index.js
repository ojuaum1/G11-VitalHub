import React, { useState } from 'react'
import { ButtonText, ButtonContainer, GoogleButtonContainer, GoogleButtonText, GoogleIcon } from './style'
import { ActivityIndicator } from 'react-native'
export default function UnsignedButton({ buttonText, isGoogleButton = false, handleClickFn = null, }) {
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
 const [isLoading, setisLoading] = useState(false);
  return (
    <ButtonContainer disabled={isLoading} onPress={() => {
      if (isLoading)
        return;

      setisLoading(true);
      handleClickFn();
 
    }}>
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <ButtonText>{buttonText}</ButtonText>
          )}
    </ButtonContainer>
  )
}