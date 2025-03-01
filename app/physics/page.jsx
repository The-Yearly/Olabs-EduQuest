'use client';
import React, { useState } from "react";

const physicsExperiments = [
  {
    title: "Ohm's Law Experiment",
    aim: "To verify Ohm’s Law by calculating resistance.",
    apparatus: "Battery, Resistor, Ammeter, Voltmeter, Wires",
    procedure: "1. Connect the circuit with the given components.\n2. Measure the voltage and current.\n3. Use V=IR to calculate resistance.",
    observation: "As voltage increases, current also increases proportionally.",
    result: "Ohm’s Law is verified."
  },
  {
    title: "Newton’s Second Law",
    aim: "To verify Newton’s Second Law using a pulley system.",
    apparatus: "Pulley, Weights, Timer",
    procedure: "1. Attach a weight to the pulley.\n2. Release it and measure time.\n3. Calculate acceleration using F=ma.",
    observation: "Acceleration is proportional to applied force.",
    result: "Newton’s Second Law is verified."
  },
  {
    title: "Reflection of Light",
    aim: "To study the laws of reflection.",
    apparatus: "Mirror, Light Source, Protractor",
    procedure: "1. Direct light onto a mirror.\n2. Measure incident and reflected angles.\n3. Compare values.",
    observation: "Incident angle equals reflected angle.",
    result: "Laws of reflection hold true."
  },
  {
    title: "Pendulum Motion",
    aim: "To study the motion of a simple pendulum.",
    apparatus: "String, Bob, Stopwatch",
    procedure: "1. Displace the pendulum.\n2. Measure time for 10 oscillations.\n3. Calculate time period.",
    observation: "Time period depends on length, not mass.",
    result: "Pendulum motion follows simple harmonic motion."
  },
  {
    title: "Archimedes' Principle",
    aim: "To verify Archimedes' Principle.",
    apparatus: "Beaker, Water, Spring Balance, Object",
    procedure: "1. Weigh object in air.\n2. Submerge in water and measure new weight.\n3. Compare with displaced water weight.",
    observation: "Buoyant force equals displaced water weight.",
    result: "Archimedes' Principle is verified."
  }
];

const Physics = () => {
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  const toggleExperiment = (index) => {
    setSelectedExperiment(selectedExperiment === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-cyan-400 p-10 pt-20">
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
        Physics Experiments
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {physicsExperiments.map((experiment, index) => (
          <div 
            key={index} 
            className="bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => toggleExperiment(index)}
          >
            <h2 className="text-2xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400">
              {experiment.title}
            </h2>
            {selectedExperiment === index && (
              <div className="mt-4 text-white">
                <p><strong className="text-cyan-300">Aim:</strong> {experiment.aim}</p>
                <p><strong className="text-cyan-300">Apparatus:</strong> {experiment.apparatus}</p>
                <p><strong className="text-cyan-300">Procedure:</strong> {experiment.procedure}</p>
                <p><strong className="text-cyan-300">Observation:</strong> {experiment.observation}</p>
                <p><strong className="text-cyan-300">Result:</strong> {experiment.result}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Physics;