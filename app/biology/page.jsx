'use client'
import React, { useState } from "react";

const biologyExperiments = [
  {
    title: "Photosynthesis",
    aim: "To demonstrate that light is necessary for photosynthesis.",
    apparatus: "Potted plant, Black paper, Iodine solution",
    procedure: "1. Cover a leaf with black paper.\n2. Place the plant in sunlight for a few hours.\n3. Remove the leaf and test with iodine.",
    observation: "The uncovered part turns blue-black, indicating starch formation.",
    result: "Light is necessary for photosynthesis."
  },
  {
    title: "Osmosis in Potato Strips",
    aim: "To observe osmosis using potato strips.",
    apparatus: "Potato, Salt solution, Water, Beakers",
    procedure: "1. Cut two potato strips.\n2. Place one in water and one in salt solution.\n3. Observe changes in firmness.",
    observation: "The strip in water remains firm; the one in salt solution shrinks.",
    result: "Osmosis occurs due to the movement of water."
  },
  {
    title: "Respiration in Germinating Seeds",
    aim: "To show that germinating seeds release carbon dioxide.",
    apparatus: "Germinating seeds, Limewater, Test tube",
    procedure: "1. Place germinating seeds in a test tube.\n2. Add limewater and seal the tube.\n3. Observe changes in limewater.",
    observation: "Limewater turns milky, indicating CO2 release.",
    result: "Respiration produces carbon dioxide."
  },
  {
    title: "Transpiration in Plants",
    aim: "To observe water loss in plants through transpiration.",
    apparatus: "Potted plant, Polythene bag, String",
    procedure: "1. Cover a leafy branch with a polythene bag.\n2. Tie it and leave it for a few hours.\n3. Observe water droplets inside the bag.",
    observation: "Water droplets are seen inside the bag.",
    result: "Plants lose water through transpiration."
  },
  {
    title: "Blood Typing Test",
    aim: "To determine blood groups using antigen-antibody reactions.",
    apparatus: "Blood sample, Anti-A, Anti-B, and Anti-D sera, Glass slide",
    procedure: "1. Place a drop of blood on a glass slide.\n2. Add Anti-A, Anti-B, and Anti-D sera.\n3. Observe agglutination reactions.",
    observation: "Agglutination indicates blood group type.",
    result: "Blood groups are identified using antigen reactions."
  }
];

const Biology = () => {
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  const toggleExperiment = (index) => {
    setSelectedExperiment(selectedExperiment === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-green-400 p-10 pt-20">
      <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-white">
        Biology Experiments
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {biologyExperiments.map((experiment, index) => (
          <div 
            key={index} 
            className="bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => toggleExperiment(index)}
          >
            <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-white">
              {experiment.title}
            </h2>
            {selectedExperiment === index && (
              <div className="mt-4 text-white">
                <p><strong className="text-green-300">Aim:</strong> {experiment.aim}</p>
                <p><strong className="text-green-300">Apparatus:</strong> {experiment.apparatus}</p>
                <p><strong className="text-green-300">Procedure:</strong></p>
                <p className="whitespace-pre-line">{experiment.procedure}</p>
                <p><strong className="text-green-300">Observation:</strong> {experiment.observation}</p>
                <p><strong className="text-green-300">Result:</strong> {experiment.result}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Biology;
