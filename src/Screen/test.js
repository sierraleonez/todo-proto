import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';

export default function test() {
  const animatedValue = useState(new Animated.ValueXY())[0];
  const panRes = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset({
          x: animatedValue.x._value,
          y: animatedValue.y._value,
        });
      },
      onPanResponderMove: Animated.event([
        null,
        {dx: animatedValue.x, dy: animatedValue.y},
      ]),
      onPanResponderRelease: () => {
        animatedValue.flattenOffset();
      },
    }),
  )[0];

  return (
    <View>
      <Animated.View style={animatedValue.getLayout()} {...panRes.panHandlers}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#000',
          }}
        />
      </Animated.View>
    </View>
  );
}
