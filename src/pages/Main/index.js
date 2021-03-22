import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler'

import Header from '~/components/Header'
import Tabs from '~/components/Tabs'
import Menu from '~/components/Menu'

import '~/config/ReactotronConfig';

import { 
  Container, Content, Card, CardHeader, CardContent, CardFooter, Title, Description, Annotation 
} from './styles';

export default function Main() {
  let offset = 0;
  const translateY = new Animated.Value(0);

  const AnimatedEvent = Animated.event(
    [
      { 
        nativeEvent:{
          translationY: translateY,
        }
      }
    ],
    { useNativeDriver: true },
  )

  function onHandlerStateChange(event){
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationY } = event.nativeEvent;
      
      offset += translationY;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setOffset(0);
        translateY.setValue(offset);
        offset = 0;
      }

      Animated.timing( translateY, {
        toValue: opened ? 380 : 0, 
        duration: 200, 
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }

  return (
    <Container>
      <Header />

      <Content>
        <Menu translateY={translateY}/>
        
        <PanGestureHandler
          onGestureEvent={AnimatedEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Card style={{ 
            transform:  [{
              translateY: translateY.interpolate({
                inputRange: [-350, 0, 380],
                outputRange: [-50, 0, 380],
                extrapolate: 'clamp'
              }),
            }],
          }}

          >
            <CardHeader>
              <Icon name="attach-money" size={28} color="#666"></Icon>
              <Icon name="visibility-off" size={28} color="#666"></Icon>
            </CardHeader>
            <CardContent>
              <Title>Saldo Disponível</Title>
              <Description>R$ 7.611,65</Description>
            </CardContent>
            <CardFooter>
              <Annotation>
                Transferencia de R$ 50,00 recebida de Fabio Silva hoje às 18:00h
              </Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>
      </Content>

      <Tabs translateY={translateY}/>
    </Container>
  );
}

