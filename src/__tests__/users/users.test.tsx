import { TEST_ID } from "_/constants"
import { setupStore } from "_/store"
import { MapScreen } from "_/view/screens"
import { AuthServiceStub } from "../mocks/authServiceStub"
import { UserServiceStub } from "../mocks/userServiceStub"
import { renderWithProviders } from "../utils/renderWithProvider"
import * as AlertErrorHelper from "_/helpers/alertHelper"
import * as Linking from 'expo-linking';
import { act } from "react-test-renderer"
import { fireEvent } from "@testing-library/react-native"
import * as authActions from "_/actions/authActions"


describe("[MapScreen] Users", () => {
    it("Should render the map", async () => {
        const { findByTestId } = renderWithProviders(<MapScreen />)
        await findByTestId(TEST_ID.MAP)
    })
    it("should render a list of users on the map", async () => {
        const { findAllByTestId } = renderWithProviders(<MapScreen />)
        const markers = await findAllByTestId(TEST_ID.MAP_MARKER)
        expect(markers.length).toBeTruthy()
    })

    it("should call list users from service", async () => {
        const authService = new AuthServiceStub()
        const userService = new UserServiceStub()

        const listUsersSpy = jest.spyOn(userService, "listUsersByDistance");

        renderWithProviders(<MapScreen />, {
            store: setupStore({ authService, userService }),
        })
        expect(listUsersSpy).toHaveBeenCalled()
    })

    it("it should go open url account", async () => {
        jest.spyOn(Linking, 'openURL');

        const { findAllByTestId } = renderWithProviders(<MapScreen />)

        const markers = await findAllByTestId(TEST_ID.MAP_MARKER)

        expect(markers.length).toBeTruthy()

        await act(async () => {
            fireEvent.press(markers[0]);
        });

        const callouts = await findAllByTestId(TEST_ID.MAP_CALLOUT);

        await act(async () => {
            fireEvent.press(callouts[0]);
        });

        expect(Linking.openURL).toHaveBeenCalled()

    })


    it("should alert if list users returns an error", async () => {
        const authService = new AuthServiceStub()
        const userService = new UserServiceStub()

        jest.spyOn(userService, "listUsersByDistance").mockImplementationOnce(() => { throw new Error() });

        renderWithProviders(<MapScreen />, {
            store: setupStore({ authService, userService }),
        })

        expect(AlertErrorHelper.alertError).toHaveBeenCalled()

    })

    it("should call logout", async () => {
        jest.spyOn(authActions, 'logoutAction');
        const { findByTestId } = renderWithProviders(<MapScreen />)

        const logoutButton = await findByTestId(TEST_ID.LOGOUT_BUTTON)

        await act(async () => {
            fireEvent.press(logoutButton);
        });

        expect(authActions.logoutAction).toHaveBeenCalled()

    })
})