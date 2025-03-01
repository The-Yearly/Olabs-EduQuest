'use client'
import React, { useState } from "react";

const mathExperiments = [
  {
    title: "Pythagoras Theorem",
    aim: "To verify the Pythagoras theorem using a right-angled triangle.",
    apparatus: "Graph paper, Ruler, Pencil",
    procedure: "1. Draw a right-angled triangle on graph paper.\n2. Measure the lengths of all three sides.\n3. Verify if a² + b² = c².",
    observation: "The sum of the squares of the two shorter sides equals the square of the hypotenuse.",
    result: "Pythagoras theorem is verified."
  },
  {
    title: "Area of a Circle",
    aim: "To derive the formula for the area of a circle.",
    apparatus: "Paper, Compass, Ruler, Scissors",
    procedure: "1. Draw a circle and cut it into sectors.\n2. Rearrange the sectors into a near-rectangular shape.\n3. Observe that the height is the radius and the width is half the circumference.",
    observation: "The shape approaches a rectangle with height r and width πr.",
    result: "The formula A = πr² is derived."
  },
  {
    title: "Probability Experiment",
    aim: "To understand probability using coin tosses.",
    apparatus: "A fair coin",
    procedure: "1. Toss the coin 50 times.\n2. Record the number of heads and tails.\n3. Compare the experimental probability with the theoretical probability.",
    observation: "The proportion of heads and tails is close to 50%.",
    result: "Experimental probability approaches theoretical probability with more trials."
  },
  {
    title: "Surface Area of a Cylinder",
    aim: "To derive the formula for the surface area of a cylinder.",
    apparatus: "Chart paper, Scissors, Glue",
    procedure: "1. Cut out a rectangle and two circles.\n2. Wrap the rectangle around to form a cylinder.\n3. Observe how the areas sum up.",
    observation: "The total surface area is 2πr² + 2πrh.",
    result: "The formula SA = 2πr(r+h) is verified."
  },
  {
    title: "Fibonacci Sequence in Nature",
    aim: "To observe the Fibonacci sequence in real life.",
    apparatus: "Sunflower, Pineapple, Pine cone",
    procedure: "1. Observe the spirals in a sunflower head.\n2. Count the spirals in both directions.\n3. Verify the numbers belong to the Fibonacci sequence.",
    observation: "The spiral counts are Fibonacci numbers.",
    result: "Fibonacci sequence is found in natural patterns."
  }
];

const Mathematics = () => {
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  const toggleExperiment = (index) => {
    setSelectedExperiment(selectedExperiment === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black-900 to-black-900 text-black-400 p-10 pt-20">
      <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-300">
        Mathematics Experiments
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {mathExperiments.map((experiment, index) => (
          <div 
            key={index} 
            className="bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => toggleExperiment(index)}
          >
            <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-pink-300">
              {experiment.title}
            </h2>
            {selectedExperiment === index && (
              <div className="mt-4 text-white">
                <p><strong className="text-red-300">Aim:</strong> {experiment.aim}</p>
                <p><strong className="text-red-300">Apparatus:</strong> {experiment.apparatus}</p>
                <p><strong className="text-red-300">Procedure:</strong></p>
                <p className="whitespace-pre-line">{experiment.procedure}</p>
                <p><strong className="text-red-300">Observation:</strong> {experiment.observation}</p>
                <p><strong className="text-red-300">Result:</strong> {experiment.result}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Mathematics;