const userController = require('../controllers/userController')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

jest.mock('../models/userModel')
jest.mock('bcrypt')
jest.mock('jsonwebtoken')

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}

beforeEach(() => {
    jest.clearAllMocks();
})


describe('register', () => {
    test('Success - should create a new user and return 201', async () => {
        const req = {
            body: { name: 'Haseeb', email: 'haseeb@test.com', password: '1234567890' }
        }

        const res = mockRes();

        userModel.findOne.mockResolvedValue(null);

        bcrypt.hash.mockResolvedValue('hashed_Password_123');

        userModel.create.mockResolvedValue({
            _id: 'user_id_123',
            name: 'Haseeb',
            email: 'haseeb@test.com'
        })

        await userController.register(req, res)

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'User created successfully '
            })
        )
    })

    test('Failure - should return 400 if user already registered with Google.', async () => {
        const req = {
            body: {
                name: 'Haseeb',
                email: 'haseeb@test.com',
                password: '1234567890'
            }
        }

        const res = mockRes();

        userModel.findOne.mockResolvedValue({
            email: 'haseeb@test.com',
            provider: 'google'
        })

        await userController.register(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'Email already registered with Google. Please login with Google.'
            })
        )
    })
})