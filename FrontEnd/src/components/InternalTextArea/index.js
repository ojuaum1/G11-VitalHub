import React from 'react';

import { TextArea, TextAreaInput } from './style'
import { InputContainer, InputText } from '../InternalInput/style'

export default function InternalTextArea({ labelText = '', textArea = '', widthPercentage, isEditing = false, handleChangeFn = null, keyboardType, maskedProps = {}}) {
    return (
        <InputContainer widthPercentage={widthPercentage}>
            <InputText fontSize={16}>{ labelText }</InputText>
            {
                isEditing ? (
                    <TextAreaInput 
                        value={textArea.toString()}
                        onChangeText={handleChangeFn}
                        keyboardType={keyboardType}
                        placeholder={textArea === '' ? 'Preencher...' : ''}
                        { ...maskedProps }
                    />
                ) : (
                    <TextArea>
                        { maskedProps.value || textArea || 'Não preenchido ainda...' }
                    </TextArea>
                )
            }
        </InputContainer>
    )
}