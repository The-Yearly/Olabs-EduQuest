'use client'
import React, { useState } from "react";

const chemistryExperiments = [
  {
    title: "Acid-Base Reaction",
    aim: "To observe the reaction between an acid and a base.",
    apparatus: "Hydrochloric acid (HCl), Sodium hydroxide (NaOH), Indicator",
    procedure: "1. Add a few drops of indicator to NaOH solution.\n2. Slowly add HCl until the color changes.\n3. Record observations.",
    observation: "The solution changes color, indicating neutralization.",
    result: "Acid reacts with a base to form salt and water."
  },
  {
    title: "Electrolysis of Water",
    aim: "To demonstrate the decomposition of water by electrolysis.",
    apparatus: "Electrolyzer, Water, Sulfuric acid, Battery",
    procedure: "1. Fill the electrolyzer with water and add sulfuric acid.\n2. Connect the battery terminals to the electrodes.\n3. Observe gas formation at the electrodes.",
    observation: "Hydrogen collects at the cathode and oxygen at the anode.",
    result: "Water decomposes into hydrogen and oxygen gases."
  },
  {
    title: "Reaction of Metals with Acids",
    aim: "To observe the reaction of different metals with acids.",
    apparatus: "Dilute HCl, Zinc, Magnesium, Test tubes",
    procedure: "1. Add a metal sample to a test tube with HCl.\n2. Observe the reaction and gas evolution.\n3. Repeat with different metals.",
    observation: "Bubbles form due to hydrogen gas release.",
    result: "Reactive metals react with acids to release hydrogen gas."
  },
  {
    title: "Oxygen Preparation",
    aim: "To prepare oxygen gas in the laboratory.",
    apparatus: "Manganese dioxide, Hydrogen peroxide, Test tube",
    procedure: "1. Add hydrogen peroxide to a test tube with manganese dioxide.\n2. Collect the released gas in an inverted jar.\n3. Test with a glowing splint.",
    observation: "The splint reignites, indicating oxygen presence.",
    result: "Oxygen gas is produced from hydrogen peroxide."
  },
  {
    title: "pH Testing of Substances",
    aim: "To determine the pH of various substances.",
    apparatus: "pH paper, Lemon juice, Soap solution, Vinegar",
    procedure: "1. Dip pH paper into different solutions.\n2. Compare the color changes with the pH scale.\n3. Record observations.",
    observation: "Acids show red/yellow colors; bases show blue/green.",
    result: "pH paper helps determine acidity or alkalinity of substances."
  }
];

const Chemistry = () => {
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  const toggleExperiment = (index) => {
    setSelectedExperiment(selectedExperiment === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black-900 to-gray-900 text-black-400 p-10 pt-20">
      <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-white">
        Chemistry Experiments
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {chemistryExperiments.map((experiment, index) => (
          <div 
            key={index} 
            className="bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => toggleExperiment(index)}
          >
            <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-white">
              {experiment.title}
            </h2>
            {selectedExperiment === index && (
              <div className="mt-4 text-white">
                <p><strong className="text-violet-300">Aim:</strong> {experiment.aim}</p>
                <p><strong className="text-violet-300">Apparatus:</strong> {experiment.apparatus}</p>
                <p><strong className="text-violet-300">Procedure:</strong></p>
                <p className="whitespace-pre-line">{experiment.procedure}</p>
                <p><strong className="text-violet-300">Observation:</strong> {experiment.observation}</p>
                <p><strong className="text-violet-300">Result:</strong> {experiment.result}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chemistry;