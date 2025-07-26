"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      className="absolute inset-0"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        particles: {
          number: {
            value: 50,
            density: { enable: true, area: 800 },
          },
          color: {
            value: ["#3b82f6", "#6366f1", "#9333ea"],
          },
          shape: { type: "circle" },
          opacity: {
            value: 0.5,
            random: { enable: true, minimumValue: 0.3 },
          },
          size: {
            value: { min: 1.4, max: 3}, //dots 
          },
          move: {
            enable: true,
            speed: 0.7,
            direction: "none",
            outModes: { default: "out" },
          },
          links: {
            enable: true,
            distance: 130,
            color: "#3b82f6",
            opacity: 0.3,
            width: 2,  //line width 
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: {
            repulse: { distance: 80, duration: 0.4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
