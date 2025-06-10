import * as userService from "../../services/user.service";
import { UserModel } from "../../models/user.model";
import { IUser } from "../../interfaces/user.interface";

// Mock del modelo
jest.mock("../../models/user.model.ts");

describe("user.service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    it("debería registrar un nuevo usuario correctamente", async () => {
      const newUser = {
        username: "testuser",
        email: "test@example.com",
        password: "123456",
      };
      const createdUser = { ...newUser, _id: "123", enable: true };

      (UserModel.create as jest.Mock).mockResolvedValue(createdUser);

      const result = await userService.registerUser(newUser);
      expect(UserModel.create).toHaveBeenCalledWith(newUser);
      expect(result).toEqual(createdUser);
    });
  });

  describe("loginUser", () => {
    const loginData = { username: "testuser", password: "123456" };

    it("debería loguear correctamente si la contraseña es válida y el usuario está habilitado", async () => {
      const mockUser = {
        _id: "123",
        username: "testuser",
        email: "test@example.com",
        enable: true,
        comparePassword: jest.fn().mockResolvedValue(true),
      } as unknown as IUser;

      (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.loginUser(loginData);

      expect(UserModel.findOne).toHaveBeenCalledWith({
        username: loginData.username,
      });
      expect(mockUser.comparePassword).toHaveBeenCalledWith(loginData.password);
      expect(result).toEqual(mockUser);
    });

    it("debería lanzar error si el usuario no existe", async () => {
      (UserModel.findOne as jest.Mock).mockResolvedValue(null);

      await expect(userService.loginUser(loginData)).rejects.toThrow(
        "Usuario o contraseña incorrecto."
      );
    });

    it("debería lanzar error si la contraseña no coincide", async () => {
      const mockUser = {
        comparePassword: jest.fn().mockResolvedValue(false),
      };

      (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

      await expect(userService.loginUser(loginData)).rejects.toThrow(
        "Usuario o contraseña incorrecto."
      );
    });

    it("debería lanzar error si el usuario está deshabilitado", async () => {
      const mockUser = {
        enable: false,
        comparePassword: jest.fn().mockResolvedValue(true),
      };

      (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

      await expect(userService.loginUser(loginData)).rejects.toThrow(
        "Usuario deshabilitado"
      );
    });
  });
});
