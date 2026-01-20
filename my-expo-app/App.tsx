import ChatScreen from 'components/ChatScreen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './global.css';

export default function App() {
  return (
    <SafeAreaProvider>
      <ChatScreen />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
