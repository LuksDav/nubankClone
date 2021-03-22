import React from 'react';

import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Code, Nav, NavItem, NavText, SignOutButton, SignOutButtonText} from './styles'

export default function Menu({ translateY }){
    return (
        <Container style={{
            opacity: translateY.interpolate({
                inputRange: [0, 250],
                outputRange: [0, 1]
            })
        }}>
            <Code>
                <QRCode 
                    value="https://github.com/LuksDav"
                    size={80}
                    backgroundColor="#FFF"
                    color="#8A05BE"
                />
            </Code>

            <Nav>
                <NavItem>
                    <Icon name="help-outline" size={20} color="#FFF"/>
                    <NavText>Me ajuda</NavText>
                </NavItem>
                <NavItem>
                    <Icon name="person-outline" size={20} color="#FFF"/>
                    <NavText>Perfil</NavText>
                </NavItem>
                <NavItem>
                    <Icon name="credit-card" size={20} color="#FFF"/>
                    <NavText>Configurar Cartão</NavText>
                </NavItem>
                <NavItem>
                    <Icon name="smartphone" size={20} color="#FFF"/>
                    <NavText>Configurações do App</NavText>
                </NavItem>
            </Nav>

            <SignOutButton Onclick={() => {}}>
                <SignOutButtonText>Sair do App</SignOutButtonText>
            </SignOutButton>
        </Container>
    );
}