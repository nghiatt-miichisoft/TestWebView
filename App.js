/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef} from 'react';
import type {Node} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableHighlightComponent,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {WebView} from 'react-native-webview';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isDesktopSite, setIsDesktopSite] = useState(false);
  const webViewRef = useRef();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  //const userAgent = 'Mozilla/5.0 (Linux; Android 10; SM-G960N Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/103.0.5060.129 Mobile Safari/537.36';
  const userAgent1 = isDesktopSite
    ? 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
    : 'Mozilla/5.0 (Linux; Android 10; SM-G960N Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/103.0.5060.129 Mobile Safari/537.36';

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'light-content'} />
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '100%',
          height: '100%',
        }}>
        <TouchableOpacity
          style={{height: 50, alignItems: 'center', backgroundColor: 'red'}}
          onPress={() => {
            setIsDesktopSite(!isDesktopSite);
            // setTimeout(() => {
            webViewRef.current.reload();
            // }, 100);
          }}>
          <Text>{isDesktopSite ? 'mobile' : 'desktop'}</Text>
        </TouchableOpacity>
        <WebView
          ref={webViewRef}
          userAgent={userAgent1}
          onShouldStartLoadWithRequest={event => {
            console.log(
              '===> TestWebview onShouldStartLoadWithRequest event = ',
              event,
            );
            return true;
          }}
          onNavigationStateChange={event => {
            console.log(
              '===> TestWebview onNavigationStateChange event = ',
              event,
            );
          }}
          source={{
            uri: 'https://kenh14.vn/',
            headers: {
              userAgent: userAgent1,
            },
          }}
          style={{flex: 1, width: '100%', height: '100%'}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
