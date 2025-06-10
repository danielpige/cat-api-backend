import { register, login } from "../../controllers/users.controller";
import * as userService from "../../services/user.service";
import { generateToken } from "../../utils/jwt";
import { Request, Response } from "express";

jest.mock("../../services/user.service");
jest.mock("../../utils/jwt");

describe("user.controller", () => {
  let mockResponse: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock })) as any;

    mockResponse = {
      json: jsonMock,
      status: statusMock,
    } as Partial<Response>;
  });

  describe("register", () => {
    it("Debería retornar usuario y token con formato estandarizado", async () => {
      const mockUser = {
        _id: "1",
        username: "testuser",
        email: "test@example.com",
        enable: true,
        fullname: "Test User",
      };

      const mockToken = "mockToken";
      (userService.registerUser as jest.Mock).mockResolvedValue(mockUser);
      (generateToken as jest.Mock).mockReturnValue(mockToken);

      const req = {
        body: {
          email: "test@example.com",
          username: "testuser",
          password: "123456",
        },
      } as Request;

      await register(req as any, mockResponse as Response);

      expect(userService.registerUser).toHaveBeenCalledWith(req.body);
      expect(generateToken).toHaveBeenCalledWith({
        id: "1",
        email: "test@example.com",
        name: "Test User",
      });
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: "Operación exitosa",
        data: {
          token: mockToken,
          user: {
            id: "1",
            username: "testuser",
            email: "test@example.com",
            enable: true,
            fullname: "Test User",
          },
        },
      });
    });

    it("Debería manejar error en registro con formato estandarizado", async () => {
      (userService.registerUser as jest.Mock).mockRejectedValue(
        new Error("Registration failed")
      );
      const req = { body: {} } as Request;

      await register(req as any, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: "Registration failed",
      });
    });
  });

  describe("login", () => {
    it("Debería autenticar al usuario y devolver user y token con formato estandarizado", async () => {
      const mockUser = {
        _id: "1",
        username: "testuser",
        email: "test@example.com",
        enable: true,
        fullname: "Test User",
      };

      const mockToken = "mockToken";
      (userService.loginUser as jest.Mock).mockResolvedValue(mockUser);
      (generateToken as jest.Mock).mockReturnValue(mockToken);

      const req = {
        body: { email: "test@example.com", password: "123456" },
      } as Request;

      await login(req as any, mockResponse as Response);

      expect(userService.loginUser).toHaveBeenCalledWith(req.body);
      expect(generateToken).toHaveBeenCalledWith({
        id: "1",
        email: "test@example.com",
        name: "Test User",
      });
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: "Operación exitosa",
        data: {
          token: mockToken,
          user: {
            id: "1",
            username: "testuser",
            email: "test@example.com",
            enable: true,
            fullname: "Test User",
          },
        },
      });
    });

    it("Debería manejar error al tratar de iniciar sesión con formato estandarizado", async () => {
      (userService.loginUser as jest.Mock).mockRejectedValue(
        new Error("Login failed")
      );
      const req = { body: {} } as Request;

      await login(req as any, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(403);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: "Login failed",
      });
    });
  });
});
