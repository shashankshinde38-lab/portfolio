"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function QualityEngineCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check motion preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse parallax
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ── 1. Central Quality Core (Torus & Wireframe Sphere) ──
    const torusGeometry = new THREE.TorusGeometry(4.5, 0.25, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    mainGroup.add(torus);

    const torus2Geometry = new THREE.TorusGeometry(3.2, 0.15, 16, 80);
    const torus2Material = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const torus2 = new THREE.Mesh(torus2Geometry, torus2Material);
    torus2.rotation.x = Math.PI / 3;
    mainGroup.add(torus2);

    const coreGeo = new THREE.IcosahedronGeometry(1.8, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // ── 2. Orbiting QA Testing Nodes ──
    interface OrbitNode {
      mesh: THREE.Mesh;
      radius: number;
      speed: number;
      angle: number;
      yOffset: number;
    }

    const orbitNodes: OrbitNode[] = [];
    const nodeConfigs = [
      { name: "Selenium", color: 0x22c55e, geo: new THREE.OctahedronGeometry(0.8, 0), r: 7.5, speed: 0.008, y: 1.2 },
      { name: "Playwright", color: 0x38bdf8, geo: new THREE.BoxGeometry(1.1, 1.1, 1.1), r: 8.8, speed: -0.006, y: -1.5 },
      { name: "JMeter", color: 0x22c55e, geo: new THREE.TetrahedronGeometry(0.9, 0), r: 6.8, speed: 0.01, y: 0.5 },
      { name: "Postman API", color: 0x38bdf8, geo: new THREE.IcosahedronGeometry(0.7, 0), r: 9.5, speed: -0.007, y: 2.0 },
    ];

    nodeConfigs.forEach((cfg, idx) => {
      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        wireframe: true,
        transparent: true,
        opacity: 0.75,
      });
      const mesh = new THREE.Mesh(cfg.geo, mat);
      mainGroup.add(mesh);
      orbitNodes.push({
        mesh,
        radius: cfg.r,
        speed: cfg.speed,
        angle: (idx * Math.PI) / 2,
        yOffset: cfg.y,
      });
    });

    // ── 3. Particle Field (800 Data Points) ──
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x38bdf8);
    const colorGreen = new THREE.Color(0x22c55e);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 36;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const chosenColor = Math.random() > 0.4 ? colorCyan : colorGreen;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // ── 4. Mouse Coordinates & Parallax ──
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // ── 5. Responsive Resize ──
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
    setIsLoaded(true);

    // ── 6. Animation Loop ──
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth mouse damping
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        mainGroup.rotation.y = mouseX + elapsedTime * 0.08;
        mainGroup.rotation.x = -mouseY + Math.sin(elapsedTime * 0.2) * 0.05;

        // Core rotations
        torus.rotation.z = elapsedTime * 0.15;
        torus.rotation.x = Math.PI / 2 + Math.sin(elapsedTime * 0.3) * 0.1;

        torus2.rotation.y = -elapsedTime * 0.2;
        torus2.rotation.z = Math.cos(elapsedTime * 0.25) * 0.15;

        coreMesh.rotation.y = elapsedTime * 0.3;
        coreMesh.rotation.x = elapsedTime * 0.2;

        // Orbiting nodes
        orbitNodes.forEach((node) => {
          node.angle += node.speed;
          node.mesh.position.x = Math.cos(node.angle) * node.radius;
          node.mesh.position.z = Math.sin(node.angle) * node.radius;
          node.mesh.position.y =
            node.yOffset + Math.sin(elapsedTime * 1.5 + node.angle) * 0.4;

          node.mesh.rotation.x += 0.015;
          node.mesh.rotation.y += 0.02;
        });

        // Particle subtle drift
        particles.rotation.y = -elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      torus2Geometry.dispose();
      torus2Material.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      orbitNodes.forEach((n) => {
        n.mesh.geometry.dispose();
        (n.mesh.material as THREE.Material).dispose();
      });
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] flex items-center justify-center">
      <div
        ref={mountRef}
        className="w-full h-full absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Futuristic Floating HUD Badges overlaying the 3D scene */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 glass-card px-3 py-1.5 rounded-lg text-xs font-mono border border-[#38BDF8]/30 flex items-center gap-2">
        <span className="size-2 rounded-full bg-[#22C55E] animate-ping" />
        <span className="text-[#38BDF8]">NODE: ONLINE</span>
        <span className="text-[#94A3B8]">| 60 FPS WEBGL</span>
      </div>

      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 glass-card px-3 py-1.5 rounded-lg text-xs font-mono border border-[#22C55E]/30 flex items-center gap-2">
        <span className="text-[#22C55E]">✓ QUALITY PIPELINE: ACTIVE</span>
      </div>
    </div>
  );
}
