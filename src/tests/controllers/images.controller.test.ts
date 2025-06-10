import { getImages } from "../../controllers/images.controller";
import * as imageService from "../../services/image.service";
import { Request, Response } from "express";
import { TypedRequestQuery } from "../../types/request.type";
import { CatImage } from "../../interfaces/images.interface";

jest.mock("../../services/image.service.ts");

describe("image.controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {
      query: {
        breed_id: "abys",
      },
    };
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));

    res = {
      status: statusMock,
      json: jsonMock,
    } as unknown as Response;

    jest.clearAllMocks();
  });

  it("debería retornar las imágenes por breed_id con formato estandarizado", async () => {
    const mockImages: CatImage[] = [
      {
        id: "img1",
        url: "https://example.com/img1.jpg",
        width: 100,
        height: 200,
      },
      {
        id: "img2",
        url: "https://example.com/img2.jpg",
        width: 100,
        height: 200,
      },
    ];

    (imageService.getImagesByBreedId as jest.Mock).mockResolvedValueOnce(
      mockImages
    );

    await getImages(
      req as TypedRequestQuery<{ breed_id: string }, {}>,
      res as Response
    );

    expect(imageService.getImagesByBreedId).toHaveBeenCalledWith("abys");
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      success: true,
      message: "Operación exitosa",
      data: mockImages,
    });
  });
});
