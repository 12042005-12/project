import { useState } from "react";
import api from "../lib/api";

export default function VirtualTryOnPage() {
  const [person, setPerson] =
    useState<File | null>(null);

  const [cloth, setCloth] =
    useState<File | null>(null);

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function generate() {
    if (!person || !cloth) return;

    const form = new FormData();

    form.append("person", person);
    form.append("cloth", cloth);

    setLoading(true);

    try {

      const response =
        await api.post(
          "/tryon",
          form,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      setResult(response.data.image);

    } catch (err) {

      console.error(err);

    }

    setLoading(false);
  }

  return (
    <div className="max-w-6xl mx-auto p-10">

      <h1 className="text-5xl font-bold mb-10">
        AI Virtual Try-On
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setPerson(
              e.target.files?.[0] || null
            )
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setCloth(
              e.target.files?.[0] || null
            )
          }
        />

      </div>

      <button
        onClick={generate}
        className="bg-purple-600 text-white px-8 py-3 rounded-xl mt-8"
      >
        {loading
          ? "Generating..."
          : "Generate Try-On"}
      </button>

      {result && (
        <img
          src={result}
          alt="Virtual Try-On"
          className="mt-10 rounded-xl shadow-lg"
        />
      )}

    </div>
  );
}