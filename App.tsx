import { Provider } from 'react-redux'
import { store } from "_/store"
import { AuthScreen } from "_/view/screens"

export default function App() {
  return (
    <Provider store={store}>
      <AuthScreen />
    </Provider>
  );
}

