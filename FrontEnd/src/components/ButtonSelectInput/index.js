import { View, Text } from 'react-native'
import React from 'react'
import { Button, ButtonText, ButtonsWrapper } from './style'
import InputLabel from '../InputLabel/style'

export default function ButtonSelectInput({ selectedButtonId, handleChangeSelectedFn = null }) {
  return (
    <View>
        <InputLabel>Qual o nível da consulta</InputLabel>
        <ButtonsWrapper>
            <ButtonSelect 
                active={selectedButtonId == 1}
                buttonText='Rotina'
                buttonId={1}
                priorityId='4CB57AFB-120C-4ACC-9C9E-1EE1DE9283FE'
                handleClickFn={handleChangeSelectedFn}
            />
            <ButtonSelect 
                active={selectedButtonId == 2}
                buttonText='Exame'
                buttonId={2}
                priorityId='E2E3BDBB-5518-4E8F-96B4-26EB57F66350'
                handleClickFn={handleChangeSelectedFn}
            />
            <ButtonSelect 
                active={selectedButtonId == 3}
                buttonText='Urgência'
                buttonId={3}
                priorityId='42072A4C-2B1C-4FD7-9BE9-1AEECAE4FF2F'
                handleClickFn={handleChangeSelectedFn}
            />
        </ButtonsWrapper>
    </View>
  )
}

function ButtonSelect({ buttonText = '', buttonId, handleClickFn = null, active = false, priorityId }) {
    return (
        <Button active={active} onPress={() => handleClickFn(buttonId, priorityId)}>
            <ButtonText active={active}>{ buttonText }</ButtonText>
        </Button>
    );
}