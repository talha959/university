import React, { useState } from "react";
import {
    Document,
    Page,
    Text,
    StyleSheet,
    View,
    PDFViewer,
  } from "@react-pdf/renderer";
const LectureNotes = () => {
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState(""); // To handle the single-text output
  const [loading, setLoading] = useState(false);


  const styles = StyleSheet.create({
    page: {
      backgroundColor: "white",
      color: "black",
    },
    section: {
      margin: 10,
      padding: 10,
    },
    viewer: {
      width: window.innerWidth * 2, //the pdf viewer will take up all of the width and height
      height: window.innerHeight * 2,
    },
  });

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
    <div >
      <h1>Generate Lecture Notes</h1>
      <input
        type="text"
        placeholder="Enter course query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "300px",
          marginBottom: "10px",
        }}
      />
      <button
        onClick={fetchNotes}
        disabled={!query || loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {loading ? "Loading..." : "Generate Notes"}
      </button>

      <div style={{ marginTop: "20px" }} className=" w-96  h-96" >
        {notes ? (
          <PDFViewer  >
            <Document>
              <Page size="A4" style={styles.page} >
                <View style={styles.section} >
                  <Text>{notes}</Text>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        ) : (
          !loading && <p>No notes generated yet.</p>
        )}
      </div>
    </div>
  );
};

export default LectureNotes;
