import "_/config/firebaseConfig"

import { View } from "react-native"
import { Provider } from 'react-redux'
import { store } from "_/store"
import { Routes } from '_/view/navigation';
import { useCustomFonts } from "_/hooks/useCustomFont";


export default function App() {

  const [isLoaded] = useCustomFonts()

  if (!isLoaded) return <View />

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

