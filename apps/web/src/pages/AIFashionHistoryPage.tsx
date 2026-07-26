import { useEffect, useState } from "react";
import api from "../lib/api";

interface FashionHistory {
  _id: string;
  imageUrl: string;
  clothingType: string;
  fabric: string;
  primaryColor: string;
  secondaryColor: string;
  pattern: string;
  style: string;
  season: string;
  occasion: string;
  confidence: number;
  createdAt: string;
}

export default function AIFashionHistoryPage() {
  const [history, setHistory] = useState<FashionHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const response = await api.get("/ai/history");
      setHistory(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-8">
        AI Fashion History
      </h1>

      {history.length === 0 ? (
        <div className="text-center text-gray-500">
          No analysis found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {history.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >

              <img
                src={`http://localhost:5000/${item.imageUrl}`}
                alt={item.clothingType}
                className="w-full h-60 object-cover"
              />

              <div className="p-5">

                <h2 className="text-xl font-bold">
                  {item.clothingType}
                </h2>

                <p>
                  <strong>Fabric:</strong> {item.fabric}
                </p>

                <p>
                  <strong>Color:</strong> {item.primaryColor}
                </p>

                <p>
                  <strong>Pattern:</strong> {item.pattern}
                </p>

                <p>
                  <strong>Occasion:</strong> {item.occasion}
                </p>

                <p>
                  <strong>Style:</strong> {item.style}
                </p>

                <p className="mt-2 text-purple-600 font-bold">
                  AI Confidence: {item.confidence}%
                </p>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}