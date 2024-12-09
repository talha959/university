import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
} from "@react-pdf/renderer";
import Head from "../UserComp/Head";

import Footer from "../UserComp/Footer";

const LectureNotes = () => {
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState(""); // To handle the single-text output
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const apiKey = "AIzaSyCYXfbtXYeEi8GRYlwQjzC30jD-GXHtbq8"; // Replace with your actual API key
      const apiUrl =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=" +
        apiKey;

      const payload = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: ` 500 lines Generate lecture notes on: ${query}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192, // Adjust tokens based on your need
          responseMimeType: "text/plain",
        },
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Generated notes:", data?.candidates?.[0]?.content?.parts?.[0]?.text);
      const generatedText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated"; // Ensure safe access
      setNotes(generatedText);
    } catch (error) {
      console.error("Error fetching notes:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <><Head /><div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI Lecture Notes Generator</h1>
      <input
        type="text"
        placeholder="Enter course query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 text-lg w-72 mb-4 border border-gray-300 rounded" />
      <button
        onClick={fetchNotes}
        disabled={!query || loading}
        className={`p-2 text-lg rounded ${loading ? "bg-gray-400" : "bg-blue-500 text-white"} cursor-pointer`}
      >
        {loading ? "Loading..." : "Generate Notes"}
      </button>

      <div className="mt-4 w-full h-96">
        {notes ? (
          <PDFViewer className="w-full h-full">
            <Document>
              <Page size="A4" style={{ backgroundColor: "white", color: "black" }}>
                <View style={{ margin: 10, padding: 10 }}>
                  <Text>{notes}</Text>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        ) : (
          !loading && <p>No notes generated yet.</p>
        )}
      </div>
    </div><Footer /></>
  );
};

export default LectureNotes;
