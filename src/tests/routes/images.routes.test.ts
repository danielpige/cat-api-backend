// tests/routes/images.routes.test.ts
import request from "supertest";
import app from "../../app";
import * as ImagesController from "../../controllers/images.controller";
import jwt from "jsonwebtoken";

jest.mock("../../controllers/images.controller");

describe("images.routes - Autenticación y respuesta", () => {
  const base = "/api/images/imagesbybreedid";
  const validToken = jwt.sign(
    { userId: "testuser" },
    process.env.JWT_SECRET || "default_secret_key"
  );
  const invalidToken = "invalid.token.value";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería responder 401 si no está autenticado", async () => {
    const res = await request(app).get(base);
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: "Token requerido", success: false });
    expect(ImagesController.getImages).not.toHaveBeenCalled();
  });

  it("debería responder 401 si el token es inválido", async () => {
    const res = await request(app)
      .get(base)
      .set("Authorization", `Bearer ${invalidToken}`);
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: "Token inválido", success: false });
    expect(ImagesController.getImages).not.toHaveBeenCalled();
  });

  it("debería responder 200 si el token es válido", async () => {
    (ImagesController.getImages as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json({ images: ["img1.jpg", "img2.jpg"] });
    });

    const res = await request(app)
      .get(base)
      .set("Authorization", `Bearer ${validToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ images: ["img1.jpg", "img2.jpg"] });
    expect(ImagesController.getImages).toHaveBeenCalledTimes(1);
  });
});
