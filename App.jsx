import React from 'react'
import Routes from './src/routes'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView, StatusBar } from 'react-native'
import { COLORS } from './src/app/hooks/colors'

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: COLORS.grey }} edges={['top']} />
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <Routes />
      <SafeAreaView style={{ backgroundColor: COLORS.white }} edges={['bottom']} />
    </GestureHandlerRootView>
  )
}

export default App