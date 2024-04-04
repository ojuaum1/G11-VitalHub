import React from 'react';

import { TextArea } from './style'
import { InputContainer, InputText } from '../InternalInput/style'

export default function InternalTextArea({ labelText = '', textArea = 'Não preenchido', widthPercentage }) {
    return (
        <InputContainer widthPercentage={widthPercentage}>
            <InputText fontSize={16}>{ labelText }</InputText>
            <TextArea>
                { textArea }
            </TextArea>
        </InputContainer>
    )
}