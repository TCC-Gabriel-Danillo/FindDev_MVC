import "_/config/firebaseConfig"

import { View } from "react-native"
import { Provider } from 'react-redux'
import { store, persistedStore } from "_/store"
import { Routes } from '_/view/navigation';
import { useCustomFonts } from "_/hooks/useCustomFont";
import { PersistGate } from 'redux-persist/integration/react'



export default function App() {

  const [isLoaded] = useCustomFonts()

  if (!isLoaded) return <View />

  return (
    <Provider store={store}>
      <PersistGate loading={<View />} persistor={persistedStore}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

