import { useState } from "react";
import { analyzeImage, FashionAnalysis } from "../services/ai.service";

export default function AIFashionPage() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FashionAnalysis | null>(null);

  async function handleAnalyze() {
    if (!image) return;

    try {
      setLoading(true);

      const data = await analyzeImage(image);

      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Analysis Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-10">
        AI Fashion Analyzer
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files)
            setImage(e.target.files[0]);
        }}
      />

      <button
        onClick={handleAnalyze}
        className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-xl"
      >
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>

      {result && (
        <div className="mt-10 grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-4">
              Analysis
            </h2>

            <p><b>Clothing:</b> {result.clothingType}</p>

            <p><b>Fabric:</b> {result.fabric}</p>

            <p><b>Primary Color:</b> {result.primaryColor}</p>

            <p><b>Secondary Color:</b> {result.secondaryColor}</p>

            <p><b>Pattern:</b> {result.pattern}</p>

            <p><b>Style:</b> {result.style}</p>

            <p><b>Season:</b> {result.season}</p>

            <p><b>Occasion:</b> {result.occasion}</p>

            <p><b>Confidence:</b> {result.confidence}%</p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-4">
              AI Suggestions
            </h2>

            <h3 className="font-bold">
              Matching Bottoms
            </h3>

            <ul className="list-disc pl-6">
              {result.matchingBottoms.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="font-bold mt-4">
              Footwear
            </h3>

            <ul className="list-disc pl-6">
              {result.matchingFootwear.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="font-bold mt-4">
              Accessories
            </h3>

            <ul className="list-disc pl-6">
              {result.matchingAccessories.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="font-bold mt-4">
              Fashion Tips
            </h3>

            <ul className="list-disc pl-6">
              {result.fashionTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>

          </div>

        </div>
      )}

    </div>
  );
}