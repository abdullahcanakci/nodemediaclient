import React, {useRef, useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import {NodePlayerView} from 'react-native-nodemediaclient';
import ActionButton from 'react-native-action-button';

const PlayScreen = ({route, navigation}) => {
  const vp = useRef(null);

  useEffect(() => {
    return () => {
      vp.current.stop();
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <NodePlayerView
        style={{flex: 1, backgroundColor: '#333'}}
        ref={vp}
        inputUrl={route.params.playserver + route.params.stream}
        scaleMode={'ScaleAspectFill'}
        bufferTime={300}
        maxBufferTime={1000}
        autoplay={true}
        onStatus={(code, msg) => {
          console.log('onStatus=' + code + ' msg=' + msg);
        }}
      />

      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        // position='left'
        offsetY={32}
        offsetX={16}
        size={32}
        hideShadow={true}
        buttonText="x"
        verticalOrientation="down"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default PlayScreen;
