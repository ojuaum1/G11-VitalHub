import React from 'react';

import { Input, InputContainer, InputText } from './style'

export default function InternalInput({ inputText = 'Input', inputTextFontSize = 16, placeholder = 'Default placeholder', numberOfLines = 1, value = '', handleChangeText = null }) {
    return (
        <InputContainer>
            <InputText fontSize={inputTextFontSize}>{ inputText }</InputText>
            <Input 
                multiline={true} 
                numberOfLines={numberOfLines} 
                placeholder={placeholder} 
                value={value}
                onChangeText={text => {
                    handleChangeText(text)
                }}
            />
        </InputContainer>
    )
}