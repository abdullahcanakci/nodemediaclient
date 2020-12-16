import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {NodeCameraView} from 'react-native-nodemediaclient';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const PushScreen = ({route}) => {
  const videoView = useRef(null);
  useEffect(() => {
    return () => {
      videoView.current.stop();
    };
  }, []);

  const [flashenable, setflashenable] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: '#333'}}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <NodeCameraView
        style={{flex: 1}}
        ref={videoView}
        outputUrl={route.params.pushserver + route.params.stream}
        camera={{cameraId: 1, cameraFrontMirror: true}}
        audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
        video={{
          preset: 1,
          bitrate: 500000,
          profile: 1,
          fps: 15,
          videoFrontMirror: false,
        }}
        smoothSkinLevel={3}
        autopreview={true}
        onStatus={(code, msg) => {
          console.log('onStatus=' + code + ' msg=' + msg);
        }}
      />
      <ActionButton
        buttonColor="#1abc9c"
        offsetY={32}
        offsetX={16}
        size={32}
        hideShadow={true}
        verticalOrientation="down">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Reverse Camera"
          onPress={() => {
            videoView.current.switchCamera();
            setflashenable(false);
          }}>
          <Icon
            name="ios-reverse-camera-outline"
            style={styles.actionButtonIcon}
          />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Switch Flashlight"
          onPress={() => {
            setflashenable(!flashenable);
            videoView.current.flashEnable(flashenable);
          }}>
          <Icon name="ios-bulb-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#e6ce28"
          title="Publish"
          onPress={() => {
            videoView.current.start();
          }}>
          <Icon
            name="ios-paper-plane-outline"
            style={styles.actionButtonIcon}
          />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#e74c3c"
          title="Close"
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Icon name="ios-power-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default PushScreen;
