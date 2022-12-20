import { AuthScreen } from "_/view/screens"
import { renderWithProviders } from "../utils/renderWithProvider"

describe("Authentication", () => {
    it("should render de auth screen", () => {
        const { findByText } = renderWithProviders(<AuthScreen />)
        findByText("Bem Vindo ao FindDev!")
    })
})