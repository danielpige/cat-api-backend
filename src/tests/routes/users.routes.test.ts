// tests/routes/users.routes.test.ts
import request from "supertest";
import app from "../../app";
import * as UsersController from "../../controllers/users.controller";

jest.mock("../../controllers/users.controller");

describe("users.routes - Registro y Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/users/register", () => {
    it("debería responder 201 si el registro es exitoso", async () => {
      (UsersController.register as jest.Mock).mockImplementation((req, res) => {
        res.status(201).json({ message: "Usuario registrado correctamente" });
      });

      const res = await request(app)
        .post("/api/users/register")
        .send({ username: "nuevo", password: "123456" });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({ message: "Usuario registrado correctamente" });
      expect(UsersController.register).toHaveBeenCalledTimes(1);
    });

    it("debería responder 400 si faltan datos o el usuario ya existe", async () => {
      (UsersController.register as jest.Mock).mockImplementation((req, res) => {
        res.status(400).json({ message: "Registro inválido", success: false });
      });

      const res = await request(app)
        .post("/api/users/register")
        .send({ username: "" }); // Faltan datos

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        message: "Registro inválido",
        success: false,
      });
      expect(UsersController.register).toHaveBeenCalledTimes(1);
    });
  });

  describe("POST /api/users/login", () => {
    it("debería responder 200 con token si las credenciales son válidas", async () => {
      (UsersController.login as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json({ token: "fake.jwt.token" });
      });

      const res = await request(app)
        .post("/api/users/login")
        .send({ username: "user", password: "123456" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ token: "fake.jwt.token" });
      expect(UsersController.login).toHaveBeenCalledTimes(1);
    });

    it("debería responder 401 si las credenciales son incorrectas", async () => {
      (UsersController.login as jest.Mock).mockImplementation((req, res) => {
        res
          .status(401)
          .json({ message: "Credenciales inválidas", success: false });
      });

      const res = await request(app)
        .post("/api/users/login")
        .send({ username: "user", password: "wrongpassword" });

      expect(res.status).toBe(401);
      expect(res.body).toEqual({
        message: "Credenciales inválidas",
        success: false,
      });
      expect(UsersController.login).toHaveBeenCalledTimes(1);
    });
  });
});
