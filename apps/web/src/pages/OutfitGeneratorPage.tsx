import { useState } from "react";
import api from "../lib/api";

interface Outfit {
  title: string;
  occasion: string;
  description: string;
  top: string;
  bottom: string;
  footwear: string;
  accessories: string[];
  colors: string[];
  styleScore: number;
  tips: string;
}

export default function OutfitGeneratorPage() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [outfits, setOutfits] = useState<Outfit[]>([]);

  const generateOutfits = async () => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);

      const response = await api.post(
        "/outfits/generate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setOutfits(response.data.data.outfits || []);
    } catch (error) {
      console.error(error);
      alert("Failed to generate outfits.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-8">
          AI Outfit Generator
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8">

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
            className="mb-6"
          />

          <button
            onClick={generateOutfits}
            disabled={loading}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg"
          >
            {loading ? "Generating..." : "Generate AI Outfits"}
          </button>

        </div>

        {outfits.length > 0 && (

          <div className="grid md:grid-cols-3 gap-8 mt-10">

            {outfits.map((outfit, index) => (

              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6"
              >

                <h2 className="text-2xl font-bold">
                  {outfit.title}
                </h2>

                <p className="text-purple-600">
                  {outfit.occasion}
                </p>

                <hr className="my-4" />

                <p>
                  <strong>Top:</strong> {outfit.top}
                </p>

                <p>
                  <strong>Bottom:</strong> {outfit.bottom}
                </p>

                <p>
                  <strong>Footwear:</strong> {outfit.footwear}
                </p>

                <p className="mt-2">
                  <strong>Accessories</strong>
                </p>

                <ul className="list-disc ml-5">
                  {outfit.accessories.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>

                <p className="mt-4">
                  <strong>Colors</strong>
                </p>

                <div className="flex gap-2 flex-wrap mt-2">
                  {outfit.colors.map((c) => (
                    <span
                      key={c}
                      className="bg-gray-200 px-3 py-1 rounded-full"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <p className="mt-4">
                  <strong>Style Score:</strong>{" "}
                  {outfit.styleScore}/100
                </p>

                <p className="mt-4 text-gray-600">
                  {outfit.tips}
                </p>

                <button
                  className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg"
                >
                  Save Outfit
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}