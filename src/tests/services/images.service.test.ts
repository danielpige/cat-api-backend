// tests/services/images.service.test.ts
import * as ImageService from "../../services/image.service";
import { CatImage } from "../../interfaces/images.interface";

describe("image.service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debería retornar una lista de imágenes por breed_id", async () => {
    const mockImages: CatImage[] = [
      {
        id: "img1",
        url: "https://example.com/img1.jpg",
        height: 150,
        width: 200,
      },
      {
        id: "img2",
        url: "https://example.com/img2.jpg",
        height: 150,
        width: 200,
      },
    ];

    const apiGetMock = jest
      .spyOn(ImageService.api, "get")
      .mockResolvedValue({ data: mockImages });

    const result = await ImageService.getImagesByBreedId("abys");

    expect(apiGetMock).toHaveBeenCalledWith("/images/search", {
      params: { breed_id: "abys", limit: 5 },
    });

    expect(result).toEqual(mockImages);
  });

  it("debería lanzar un error si axios falla", async () => {
    const apiGetMock = jest
      .spyOn(ImageService.api, "get")
      .mockRejectedValue(new Error("API error"));

    await expect(ImageService.getImagesByBreedId("abys")).rejects.toThrow(
      "API error"
    );
  });
});
