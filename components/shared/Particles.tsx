"use client";
import { useCallback, useEffect, useState } from "react";
import type { Container, Engine } from "@tsparticles/engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesContainer = () => {
  const [theme, setTheme] = useState("light");

  const particlesInit = useCallback(async (engine: Engine) => {
    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
    },
    []
  );

  useEffect(() => {
    setInterval(() => {
      const temp = window.localStorage.getItem("theme");
      setTheme(temp || "light");
    }, 100);
  }, []);

  return (
    <Particles
      className="w-full h-full absolute transform-z-0 z-0"
      id="tsparticles"
      init={particlesInit as any}
      loaded={particlesLoaded as any}
      options={{
        fullScreen: { enable: true },
        background: {
          color: {
            value: "",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 1,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: theme === "light" ? "rgb(0,0,0,0.1)" : "rgba(255, 255, 255, 0.1)",
          },
          links: {
            color: theme === "light" ? "rgb(0,0,0,0.5)" : "rgb(245, 211, 147, 0.1)",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 0.5,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1000,
              value_area: 1000,
            },
            value: 50,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        retina_detect: true,
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesContainer;
