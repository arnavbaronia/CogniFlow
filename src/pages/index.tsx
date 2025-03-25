import React, { useState } from "react";
import axios from "axios";
import { Mermaid } from "@/components/mermaid";
import SelectTemplate from "@/components/select-template";
import { TemplateEnum } from "@/lib/prompt-by-template";
import Nav from "@/components/nav";

const Index = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    TemplateEnum.FLOWCHART
  );

  const name = input ? input.replace(/\s/g, "-").toLowerCase() : "";
  const [chart, setChart] = useState("");

  const handleFlow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input || loading) return;
    setLoading(true);

    try {
      const res = await axios.post("/api/ask", {
        input,
        selectedTemplate,
      });

      if (res.data.text) {
        setChart(res.data.text);
      } else {
        setError("Sorry! A small issue occurred.");
      }
    } catch (e) {
      console.log(e);
      setError("Sorry! A small issue occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end items-center flex-col h-screen w-screen bg-gray-900 text-gray-100">
      <Nav />

      <div className="flex-1 flex justify-center w-full mb-2">
        {loading ? (
          <div className="flex flex-col justify-center animate-pulse">
            <h1 className="text-7xl font-black text-blue-400">Loading...</h1>
          </div>
        ) : (
          <>
            {!!chart ? (
              <Mermaid chart={chart} name={name} />
            ) : (
              <div className="flex flex-col justify-center text-gray-100">
                <h1 className="text-7xl font-black text-blue-400">Generate</h1>
                <h3 className="text-8xl font-black text-teal-400">
                  Flowchart
                </h3>
                <h2 className="text-5xl font-black text-gray-400">with AI</h2>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex">
        <form onSubmit={handleFlow} className="form-control">
          <div className="input-group">
            <input
              className="input input-lg input-bordered w-96 bg-gray-800 text-gray-200 placeholder-gray-500 focus:border-blue-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="What the flowchart is about"
              autoFocus
            />
            <button
              type="submit"
              className={`btn btn-grad btn-lg ${
                loading ? "loading" : ""
              } hover:bg-gradient-to-r hover:from-blue-400 hover:to-teal-400`}
            >
              {error ? "Retry" : `Generate ${selectedTemplate}`}
            </button>
          </div>
          <SelectTemplate
            onChange={(e) => setSelectedTemplate(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Index;