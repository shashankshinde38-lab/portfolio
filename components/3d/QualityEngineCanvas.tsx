"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type ViewMode = "overview" | "desk" | "server" | "topdown";

interface Props {
  currentSection?: string;
  onViewChange?: (mode: ViewMode) => void;
}

export default function QualityEngineCanvas({ currentSection = "home" }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("overview");

  // Camera targets for choreography
  const cameraTargets = useRef({
    overview: { pos: new THREE.Vector3(14, 11, 16), look: new THREE.Vector3(0, 1.5, 0) },
    desk: { pos: new THREE.Vector3(3.5, 4.5, 7.5), look: new THREE.Vector3(0, 2.8, 0) },
    server: { pos: new THREE.Vector3(-8, 5, 8), look: new THREE.Vector3(-4.5, 3.5, -1) },
    topdown: { pos: new THREE.Vector3(0.1, 22, 2), look: new THREE.Vector3(0, 0, 0) },
  });

  // Switch view mode based on active section
  useEffect(() => {
    if (currentSection === "home") setViewMode("overview");
    else if (currentSection === "about" || currentSection === "simulator") setViewMode("desk");
    else if (currentSection === "experience") setViewMode("server");
    else if (currentSection === "cases" || currentSection === "skills") setViewMode("topdown");
  }, [currentSection]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070b14, 0.022);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    const initialCam = cameraTargets.current.overview;
    camera.position.copy(initialCam.pos);
    const currentLookAt = initialCam.look.clone();

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Group
    const labGroup = new THREE.Group();
    scene.add(labGroup);

    // ── LIGHTING ──
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.4);
    scene.add(ambientLight);

    const cyanSpot = new THREE.SpotLight(0x38bdf8, 5, 40, Math.PI / 4, 0.3);
    cyanSpot.position.set(-8, 16, 12);
    cyanSpot.castShadow = true;
    scene.add(cyanSpot);

    const greenSpot = new THREE.SpotLight(0x22c55e, 4, 40, Math.PI / 4, 0.4);
    greenSpot.position.set(10, 14, 10);
    scene.add(greenSpot);

    const deskPointLight = new THREE.PointLight(0x38bdf8, 2.5, 8);
    deskPointLight.position.set(0, 3.8, 0.8);
    scene.add(deskPointLight);

    // ── 1. CIRCULAR PLATFORM (Retrowave / Cyberpunk Lab Floor) ──
    const floorGeo = new THREE.CylinderGeometry(8.5, 9, 0.6, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0c1322,
      roughness: 0.6,
      metalness: 0.8,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.3;
    floor.receiveShadow = true;
    labGroup.add(floor);

    // Glowing Platform Edge Rings
    const ringGeo = new THREE.TorusGeometry(8.5, 0.08, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.02;
    labGroup.add(ring);

    const innerRingGeo = new THREE.TorusGeometry(6.2, 0.04, 16, 80);
    const innerRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.y = 0.02;
    labGroup.add(innerRing);

    // ── 2. THE QA WORKSTATION DESK ──
    const deskTopGeo = new THREE.BoxGeometry(6, 0.25, 2.8);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x162032,
      roughness: 0.4,
      metalness: 0.5,
    });
    const deskTop = new THREE.Mesh(deskTopGeo, deskMat);
    deskTop.position.set(0, 2.2, 0);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    labGroup.add(deskTop);

    // Desk Legs (Metallic Pillars)
    const legGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.2, 16);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.2 });
    const legPositions = [
      [-2.6, 1.1, -1.1],
      [2.6, 1.1, -1.1],
      [-2.6, 1.1, 1.1],
      [2.6, 1.1, 1.1],
    ];
    legPositions.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      labGroup.add(leg);
    });

    // ── 3. DUAL CURVED QA MONITORS ──
    // Center Primary Monitor (Playwright / Selenium Console)
    const screenFrameGeo = new THREE.BoxGeometry(2.8, 1.6, 0.1);
    const screenFrameMat = new THREE.MeshStandardMaterial({ color: 0x070b14, roughness: 0.8 });
    const centerScreen = new THREE.Mesh(screenFrameGeo, screenFrameMat);
    centerScreen.position.set(0, 3.4, -0.6);
    centerScreen.castShadow = true;
    labGroup.add(centerScreen);

    // Screen Display Panel (Glowing Green QA Canvas Texture)
    const displayGeo = new THREE.PlaneGeometry(2.65, 1.45);
    const displayMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const centerDisplay = new THREE.Mesh(displayGeo, displayMat);
    centerDisplay.position.set(0, 3.4, -0.54);
    labGroup.add(centerDisplay);

    // Left Secondary Monitor (API & Performance Metrics)
    const leftScreen = new THREE.Mesh(screenFrameGeo, screenFrameMat);
    leftScreen.position.set(-2.6, 3.4, -0.15);
    leftScreen.rotation.y = Math.PI / 6;
    labGroup.add(leftScreen);

    const leftDisplayMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const leftDisplay = new THREE.Mesh(displayGeo, leftDisplayMat);
    leftDisplay.position.set(-2.55, 3.4, -0.1);
    leftDisplay.rotation.y = Math.PI / 6;
    labGroup.add(leftDisplay);

    // Monitor Stands
    const standGeo = new THREE.CylinderGeometry(0.08, 0.15, 1, 16);
    const centerStand = new THREE.Mesh(standGeo, legMat);
    centerStand.position.set(0, 2.7, -0.6);
    labGroup.add(centerStand);

    const leftStand = new THREE.Mesh(standGeo, legMat);
    leftStand.position.set(-2.6, 2.7, -0.15);
    labGroup.add(leftStand);

    // ── 4. KEYBOARD & GAMING MOUSE & COFFEE MUG ──
    const kbGeo = new THREE.BoxGeometry(1.6, 0.06, 0.6);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });
    const keyboard = new THREE.Mesh(kbGeo, kbMat);
    keyboard.position.set(0, 2.36, 0.4);
    labGroup.add(keyboard);

    // Glowing RGB keyboard strip
    const kbGlowGeo = new THREE.BoxGeometry(1.62, 0.02, 0.62);
    const kbGlowMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.9 });
    const kbGlow = new THREE.Mesh(kbGlowGeo, kbGlowMat);
    kbGlow.position.set(0, 2.34, 0.4);
    labGroup.add(kbGlow);

    const mouseGeo = new THREE.BoxGeometry(0.2, 0.08, 0.3);
    const mouseMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8 });
    const mouse = new THREE.Mesh(mouseGeo, mouseMat);
    mouse.position.set(1.1, 2.36, 0.4);
    labGroup.add(mouse);

    // Coffee Mug (Essential QA fuel!)
    const mugGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.35, 16);
    const mugMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.position.set(-1.8, 2.45, 0.3);
    labGroup.add(mug);

    // ── 5. LOW-POLY QA CHARACTER AVATAR ──
    const characterGroup = new THREE.Group();
    characterGroup.position.set(0, 0, 1.8);
    labGroup.add(characterGroup);

    // Office Chair
    const seatGeo = new THREE.BoxGeometry(1.4, 0.2, 1.3);
    const chairMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
    const seat = new THREE.Mesh(seatGeo, chairMat);
    seat.position.set(0, 1.5, 0);
    characterGroup.add(seat);

    const backrestGeo = new THREE.BoxGeometry(1.3, 1.6, 0.18);
    const backrest = new THREE.Mesh(backrestGeo, chairMat);
    backrest.position.set(0, 2.3, 0.6);
    characterGroup.add(backrest);

    const chairPoleGeo = new THREE.CylinderGeometry(0.09, 0.09, 1.5, 16);
    const chairPole = new THREE.Mesh(chairPoleGeo, legMat);
    chairPole.position.set(0, 0.75, 0);
    characterGroup.add(chairPole);

    // Character Torso (Stylized Developer Hoodie)
    const torsoGeo = new THREE.BoxGeometry(1.1, 1.3, 0.7);
    const torsoMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.set(0, 2.25, -0.05);
    characterGroup.add(torso);

    // Character Head & Glasses
    const headGeo = new THREE.BoxGeometry(0.7, 0.75, 0.7);
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xdfa684, roughness: 0.7 });
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.set(0, 3.25, -0.05);
    characterGroup.add(head);

    // Hair
    const hairGeo = new THREE.BoxGeometry(0.75, 0.3, 0.75);
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1e1b18 });
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 3.65, -0.05);
    characterGroup.add(hair);

    // Neon Developer Glasses
    const glassesGeo = new THREE.BoxGeometry(0.65, 0.14, 0.1);
    const glassesMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const glasses = new THREE.Mesh(glassesGeo, glassesMat);
    glasses.position.set(0, 3.28, -0.42);
    characterGroup.add(glasses);

    // Arms extended toward keyboard
    const armGeo = new THREE.BoxGeometry(0.24, 0.24, 0.9);
    const leftArm = new THREE.Mesh(armGeo, torsoMat);
    leftArm.position.set(-0.45, 2.2, -0.6);
    leftArm.rotation.x = Math.PI / 12;
    characterGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, torsoMat);
    rightArm.position.set(0.45, 2.2, -0.6);
    rightArm.rotation.x = Math.PI / 12;
    characterGroup.add(rightArm);

    // ── 6. CI/CD BLADE SERVER RACK (Testing Pipeline Tower) ──
    const serverRackGroup = new THREE.Group();
    serverRackGroup.position.set(-5.5, 0, -1.5);
    labGroup.add(serverRackGroup);

    // Rack Frame
    const rackCabinetGeo = new THREE.BoxGeometry(2.2, 6.5, 2);
    const rackCabinetMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.8,
    });
    const rackCabinet = new THREE.Mesh(rackCabinetGeo, rackCabinetMat);
    rackCabinet.position.set(0, 3.25, 0);
    rackCabinet.castShadow = true;
    serverRackGroup.add(rackCabinet);

    // Server Trays with Flashing LED Lights
    const ledMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < 7; i++) {
      const trayGeo = new THREE.BoxGeometry(1.9, 0.6, 0.05);
      const trayMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
      const tray = new THREE.Mesh(trayGeo, trayMat);
      tray.position.set(0, 0.8 + i * 0.8, 1.02);
      serverRackGroup.add(tray);

      // Flashing LEDs
      for (let j = 0; j < 4; j++) {
        const ledGeo = new THREE.BoxGeometry(0.08, 0.08, 0.04);
        const ledMat = new THREE.MeshBasicMaterial({
          color: (i + j) % 2 === 0 ? 0x22c55e : 0x38bdf8,
        });
        const led = new THREE.Mesh(ledGeo, ledMat);
        led.position.set(-0.6 + j * 0.4, 0.8 + i * 0.8, 1.06);
        serverRackGroup.add(led);
        ledMeshes.push(led);
      }
    }

    // ── 7. VOLUMETRIC DATA PARTICLES (QA Network Beam) ──
    const particleCount = 400;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 22;
      pPositions[i * 3 + 1] = Math.random() * 14;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 22;

      const isGreen = Math.random() > 0.4;
      pColors[i * 3] = isGreen ? 0.13 : 0.22;
      pColors[i * 3 + 1] = isGreen ? 0.77 : 0.74;
      pColors[i * 3 + 2] = isGreen ? 0.37 : 0.97;
    }

    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(pGeo, pMat);
    scene.add(particleCloud);

    // ── 8. MOUSE PARALLAX & DAMPING ──
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 2.5;
      mouseY = y * 1.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // ── 9. ANIMATION LOOP WITH CAMERA CHOREOGRAPHY ──
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation toward active view mode target
      const target = cameraTargets.current[viewMode] || cameraTargets.current.overview;
      const desiredPos = target.pos.clone();
      const desiredLook = target.look.clone();

      if (!prefersReducedMotion) {
        // Add subtle mouse parallax offset
        desiredPos.x += mouseX;
        desiredPos.y += -mouseY;

        // Character typing animation
        rightArm.position.y = 2.2 + Math.sin(elapsed * 12) * 0.02;
        leftArm.position.y = 2.2 + Math.cos(elapsed * 10) * 0.02;
        head.position.y = 3.25 + Math.sin(elapsed * 2) * 0.015;

        // Monitor scanline pulsation
        centerDisplay.scale.y = 1 + Math.sin(elapsed * 4) * 0.02;

        // LED blinking
        ledMeshes.forEach((led, idx) => {
          led.visible = Math.sin(elapsed * 6 + idx) > -0.3;
        });

        // Floor ring rotation
        innerRing.rotation.z = elapsed * 0.1;

        // Particle subtle flow
        particleCloud.rotation.y = elapsed * 0.015;
      }

      // Smooth camera lerp
      camera.position.lerp(desiredPos, 0.05);
      currentLookAt.lerp(desiredLook, 0.05);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    // ── CLEANUP ──
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [viewMode]);

  return (
    <div className="relative w-full h-full min-h-[420px] sm:min-h-[500px] lg:min-h-[620px] flex items-center justify-center">
      <div
        ref={mountRef}
        className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
      />

      {/* ── Interactive View Switcher (Inspired by adeguzm.com view choreography) ── */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-1.5 glass-panel p-1.5 rounded-xl border border-white/10 text-xs font-mono">
        <span className="text-[10px] text-[#94A3B8] px-2 font-bold uppercase">
          3D Camera:
        </span>
        <button
          onClick={() => setViewMode("overview")}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            viewMode === "overview"
              ? "bg-[#22C55E] text-[#052E16] font-bold shadow-[0_0_12px_rgba(34,197,94,0.4)]"
              : "text-[#94A3B8] hover:text-[#F8FAFC]"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setViewMode("desk")}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            viewMode === "desk"
              ? "bg-[#38BDF8] text-[#070B14] font-bold shadow-[0_0_12px_rgba(56,189,248,0.4)]"
              : "text-[#94A3B8] hover:text-[#F8FAFC]"
          }`}
        >
          QA Desk
        </button>
        <button
          onClick={() => setViewMode("server")}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            viewMode === "server"
              ? "bg-[#22C55E] text-[#052E16] font-bold shadow-[0_0_12px_rgba(34,197,94,0.4)]"
              : "text-[#94A3B8] hover:text-[#F8FAFC]"
          }`}
        >
          Server Tower
        </button>
        <button
          onClick={() => setViewMode("topdown")}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            viewMode === "topdown"
              ? "bg-[#38BDF8] text-[#070B14] font-bold shadow-[0_0_12px_rgba(56,189,248,0.4)]"
              : "text-[#94A3B8] hover:text-[#F8FAFC]"
          }`}
        >
          Blueprint
        </button>
      </div>

      {/* ── Retrowave / Cyberpunk HUD Badges ── */}
      <div className="absolute bottom-4 left-4 z-20 glass-card px-3 py-1.5 rounded-lg text-xs font-mono border border-[#38BDF8]/30 flex items-center gap-2">
        <span className="size-2 rounded-full bg-[#22C55E] animate-ping" />
        <span className="text-[#38BDF8]">QA ENVIRONMENT: REALTIME 3D</span>
      </div>

      <div className="absolute bottom-4 right-4 z-20 glass-card px-3 py-1.5 rounded-lg text-xs font-mono border border-[#22C55E]/30 hidden sm:flex items-center gap-2">
        <span className="text-[#22C55E]">● SHASHANK SHINDE WORKSTATION</span>
      </div>
    </div>
  );
}
