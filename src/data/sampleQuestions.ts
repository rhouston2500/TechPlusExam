import { Question } from '../types';

// STEP 4: Replace this array with your actual 833 questions
// Follow the format shown in the examples below
export const actualQuestions: Question[] = [
  // EXAMPLE 1: Multiple Choice Question
  {
    id: 1,
    text: "What is the primary purpose of a firewall in network security?",
    type: "multiple-choice",
    options: [
      "To encrypt data transmission",
      "To filter network traffic based on predetermined rules",
      "To provide user authentication",
      "To compress network data"
    ],
    correctAnswer: 1, // Index of correct answer (0-based)
    explanation: "A firewall's primary purpose is to filter network traffic based on predetermined security rules, acting as a barrier between trusted and untrusted networks."
  },

  // EXAMPLE 2: True/False Question
  {
    id: 2,
    text: "A VPN provides end-to-end encryption for all network communications.",
    type: "true-false",
    options: ["True", "False"],
    correctAnswer: 1, // 1 = False
    explanation: "False. While VPNs encrypt data between the client and VPN server, they don't provide true end-to-end encryption for all communications, as data is decrypted at the VPN server."
  },

  // EXAMPLE 3: Question with Image
  {
    id: 3,
    text: "Based on the network diagram shown, what type of topology is this?",
    type: "multiple-choice",
    options: ["Star", "Ring", "Bus", "Mesh"],
    correctAnswer: 0,
    explanation: "This is a star topology where all devices connect to a central hub or switch.",
    image: "https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg" // Replace with your image URL
  },

  // EXAMPLE 4: Simulation Question
  {
    id: 4,
    text: "Configure a basic firewall rule to block incoming traffic on port 80.",
    type: "simulation",
    correctAnswer: "Block incoming TCP port 80",
    explanation: "To block incoming HTTP traffic, you would create a firewall rule that denies incoming connections on TCP port 80. This prevents external web requests from reaching your server.",
    simulation: {
      type: "firewall-config",
      instructions: "Use the firewall interface to create a rule blocking port 80",
      assets: [
        "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg", // Replace with your simulation screenshots
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
      ]
    }
  },

  // EXAMPLE 5: Drag and Drop Question
  {
    id: 5,
    text: "Drag the correct cable type to match each network scenario.",
    type: "drag-drop",
    correctAnswer: "Ethernet cable for LAN, Fiber optic for long distance",
    explanation: "Ethernet cables are used for local area networks, while fiber optic cables are preferred for long-distance, high-speed connections.",
    image: "https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg" // Replace with your drag-drop interface image
  },

  // ADD YOUR REMAINING 828 QUESTIONS HERE FOLLOWING THE SAME FORMAT
  // Question 6, 7, 8, ... up to 833
  
  // TEMPLATE FOR ADDING MORE QUESTIONS:
  /*
  {
    id: 6,
    text: "Your question text here",
    type: "multiple-choice", // or "true-false", "simulation", "drag-drop"
    options: ["Option A", "Option B", "Option C", "Option D"], // Remove for simulation/drag-drop
    correctAnswer: 0, // Index of correct answer or descriptive text for simulations
    explanation: "Your explanation here",
    image: "https://your-image-url.com/image.jpg", // Optional
    simulation: { // Only for simulation questions
      type: "simulation-type",
      instructions: "Instructions for the simulation",
      assets: ["https://screenshot1.jpg", "https://screenshot2.jpg"]
    }
  },
  */
];

// This function is used by the app - don't modify this part
export const generateQuestions = (): Question[] => {
  return actualQuestions;
};

// Keep this for backward compatibility - don't modify
export const sampleQuestions: Question[] = actualQuestions.slice(0, 4);