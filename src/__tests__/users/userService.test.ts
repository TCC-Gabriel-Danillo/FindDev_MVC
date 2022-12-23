import { mapUserToFirebaseUser } from "_/helpers"
import { UserServiceImp } from "_/services/userService"
import { LatLng } from "_/types"
import { DatabaseRepositoryStub } from "../mocks/databaseRepositoryStub"
import { LocationAdapterStub } from "../mocks/locationAdapterStub"
import { firebaseUserMock, userMock } from "../mocks/userMocks"

describe("userService", () => {
    it("it should list users correclty", async () => {
        const userDatabaseRepository = new DatabaseRepositoryStub()
        jest.spyOn(userDatabaseRepository, 'getAll').mockReturnValueOnce(Promise.resolve([firebaseUserMock]))

        const locationAdapterStub = new LocationAdapterStub()

        const userService = new UserServiceImp(locationAdapterStub, userDatabaseRepository)

        const location: LatLng = {
            latitude: 0.0,
            longitude: 0.0
        }
        const distance = 0

        const users = await userService.listUsersByDistance(location, distance)

        expect(users).toEqual([userMock])
    })

    it("should return the correct user position", async () => {
        const userDatabaseRepository = new DatabaseRepositoryStub()
        const locationAdapterStub = new LocationAdapterStub()

        const getPositionSpy = jest.spyOn(locationAdapterStub, 'getCurrentPosition')
        const requestSpy = jest.spyOn(locationAdapterStub, 'requestPermission')

        const userService = new UserServiceImp(locationAdapterStub, userDatabaseRepository)

        const position = await userService.getUserPosition()
        expect(requestSpy).toHaveBeenCalled()
        expect(getPositionSpy).toBeCalled()
        expect(position).toStrictEqual({
            geohash: 'any_hash',
            location: {
                latitude: 0.0,
                longitude: 0.0
            }
        })

    })

    it("should throw an error if camere permission is denied", async () => {
        const userDatabaseRepository = new DatabaseRepositoryStub()
        const locationAdapterStub = new LocationAdapterStub()

        jest.spyOn(locationAdapterStub, 'requestPermission').mockReturnValueOnce(Promise.resolve(false))

        const userService = new UserServiceImp(locationAdapterStub, userDatabaseRepository)

        const promise = userService.getUserPosition()
        await expect(promise).rejects.toThrow()


    })

    it("shoud call create with the right parameters", async () => {
        const userDatabaseRepository = new DatabaseRepositoryStub()
        const locationAdapterStub = new LocationAdapterStub()

        const createSpy = jest.spyOn(userDatabaseRepository, 'createOrReplace')

        const userService = new UserServiceImp(locationAdapterStub, userDatabaseRepository)
        await userService.createUser(userMock)
        expect(createSpy).toHaveBeenCalledWith(mapUserToFirebaseUser(userMock), userMock.id)
    })

    it("shoud call update with the right parameters", async () => {
        const userDatabaseRepository = new DatabaseRepositoryStub()
        const locationAdapterStub = new LocationAdapterStub()

        const createSpy = jest.spyOn(userDatabaseRepository, 'update')

        const userService = new UserServiceImp(locationAdapterStub, userDatabaseRepository)
        await userService.updateUser(userMock)
        expect(createSpy).toHaveBeenCalledWith(mapUserToFirebaseUser(userMock), userMock.id)
    })
})