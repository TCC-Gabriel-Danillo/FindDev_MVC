import { fireEvent } from "@testing-library/react-native"
import { act } from 'react-test-renderer';
import { TEST_ID } from "_/constants"
import { setupStore } from "_/store"
import { AuthScreen } from "_/view/screens"
import { AuthServiceStub } from "../mocks/authServiceStub"
import { UserServiceStub } from "../mocks/userServiceStub"
import { renderWithProviders } from "../utils/renderWithProvider"
import * as AlertErrorHelper from "_/helpers/alertHelper"

describe("[AuthScreen] Authentication", () => {
    it("should call the authenticate method on button press", async () => {
        const authService = new AuthServiceStub()
        const userService = new UserServiceStub()

        const { findByTestId } = renderWithProviders(<AuthScreen />, {
            store: setupStore({ authService, userService }),
        })

        const authSpy = jest.spyOn(authService, 'authenticateGithub');
        const getPositionSty = jest.spyOn(userService, 'getUserPosition');
        const createUserSpy = jest.spyOn(userService, 'createUser');

        const button = await findByTestId(TEST_ID.LOGIN_BUTTON)

        await act(async () => {
            fireEvent.press(button);
        });


        expect(authSpy).toHaveBeenCalled()
        expect(getPositionSty).toHaveBeenCalled()
        expect(createUserSpy).toHaveBeenCalled()
    })

    it("should not create the user if authentcation fails", async () => {
        const authService = new AuthServiceStub()
        const userService = new UserServiceStub()

        jest.spyOn(authService, 'authenticateGithub').mockImplementationOnce(() => Promise.resolve(undefined));

        const { findByTestId } = renderWithProviders(<AuthScreen />, {
            store: setupStore({ authService, userService }),
        })
        const button = await findByTestId(TEST_ID.LOGIN_BUTTON)


        await act(async () => {
            fireEvent.press(button);
        });

        expect(AlertErrorHelper.alertError).toHaveBeenCalled()

    })
})