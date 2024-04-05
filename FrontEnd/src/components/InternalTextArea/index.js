import React from 'react';

import { TextArea, TextAreaInput } from './style'
import { InputContainer, InputText } from '../InternalInput/style'

export default function InternalTextArea({ labelText = '', textArea = 'Não preenchido', widthPercentage, isEditing = false, handleChangeFn = null }) {
    return (
        <InputContainer widthPercentage={widthPercentage}>
            <InputText fontSize={16}>{ labelText }</InputText>
            {
                isEditing ? (
                    <TextAreaInput 
                        value={textArea.toString()}
                        onChangeText={handleChangeFn}
                    />
                ) : (
                    <TextArea>
                        { textArea }
                    </TextArea>
                )
            }
        </InputContainer>
    )
}