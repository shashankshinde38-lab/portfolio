"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SectionId =
  | "home"
  | "about"
  | "experience"
  | "cases"
  | "simulator"
  | "skills"
  | "certs"
  | "contact";

const CAMERAS: Record<SectionId, { pos: THREE.Vector3; look: THREE.Vector3 }> = {
  home: { pos: new THREE.Vector3(26, 16, 30), look: new THREE.Vector3(0, 3.2, 0) },
  about: { pos: new THREE.Vector3(8, 5.2, 16), look: new THREE.Vector3(0, 3.4, 1) },
  experience: { pos: new THREE.Vector3(-18, 9, 6), look: new THREE.Vector3(-6, 5, -2) },
  cases: { pos: new THREE.Vector3(-16, 6, -16), look: new THREE.Vector3(-2, 2.5, -8) },
  simulator: { pos: new THREE.Vector3(10, 7, -22), look: new THREE.Vector3(0, 1.2, -8) },
  skills: { pos: new THREE.Vector3(20, 8, -4), look: new THREE.Vector3(6, 4, 0) },
  certs: { pos: new THREE.Vector3(2, 14, 12), look: new THREE.Vector3(0, 7, 0) },
  contact: { pos: new THREE.Vector3(0, 18, 24), look: new THREE.Vector3(0, 8, -2) },
};

function seeded(n: number) {
  const x = Math.sin(n * 999.12) * 43758.5453;
  return x - Math.floor(x);
}

function makeWindowTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 512;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0b1220";
  ctx.fillRect(0, 0, 256, 512);
  for (let y = 8; y < 500; y += 18) {
    for (let x = 8; x < 248; x += 14) {
      const lit = Math.random() > 0.38;
      if (!lit) {
        ctx.fillStyle = "#121a2c";
        ctx.fillRect(x, y, 8, 12);
        continue;
      }
      const warm = Math.random() > 0.55;
      ctx.fillStyle = warm ? "#f5d58a" : "#7dd3fc";
      ctx.globalAlpha = 0.45 + Math.random() * 0.55;
      ctx.fillRect(x, y, 8, 12);
      ctx.globalAlpha = 1;
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function makeNeonSign(text: string, color: string) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, 1024, 256);
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 28;
  ctx.font = "bold 92px Outfit, Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 512, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeHoloPanel(lines: string[]) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 320;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "rgba(8, 18, 32, 0.72)";
  ctx.fillRect(0, 0, 512, 320);
  ctx.strokeStyle = "rgba(56, 189, 248, 0.7)";
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, 496, 304);
  ctx.fillStyle = "#7dd3fc";
  ctx.font = "28px ui-monospace, monospace";
  lines.forEach((line, i) => ctx.fillText(line, 28, 58 + i * 44));
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeGroundTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#070b14";
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 512; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(40, 40);
  return tex;
}

function addLamp(parent: THREE.Group, x: number, z: number, disposables: THREE.Object3D[]) {
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.08, 4.2, 8),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.4 })
  );
  pole.position.set(x, 2.1, z);
  pole.castShadow = false;
  parent.add(pole);
  disposables.push(pole);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0xffe7b0 })
  );
  head.position.set(x, 4.25, z);
  parent.add(head);
  disposables.push(head);

  const light = new THREE.PointLight(0xffe7b0, 3.2, 14, 1.8);
  light.position.set(x, 4.2, z);
  parent.add(light);
}

export default function NightCityWorld({ activeSection }: { activeSection: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(activeSection);
  sectionRef.current = activeSection;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x071018, 0.018);

    const camera = new THREE.PerspectiveCamera(
      48,
      mount.clientWidth / mount.clientHeight,
      0.1,
      220
    );
    camera.position.copy(CAMERAS.home.pos);

    const hemi = new THREE.HemisphereLight(0x4c7cff, 0x0b1220, 0.55);
    scene.add(hemi);
    const moon = new THREE.DirectionalLight(0xb9d4ff, 0.85);
    moon.position.set(-30, 40, 20);
    scene.add(moon);
    scene.add(new THREE.AmbientLight(0x102033, 0.35));

    const root = new THREE.Group();
    scene.add(root);
    const disposables: THREE.Object3D[] = [];

    const groundTex = makeGroundTexture();
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(180, 180),
      new THREE.MeshStandardMaterial({
        map: groundTex,
        color: 0x0b1220,
        roughness: 0.92,
        metalness: 0.08,
      })
    );
    ground.rotation.x = -Math.PI / 2;
    root.add(ground);

    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.55,
      metalness: 0.2,
    });
    const roadH = new THREE.Mesh(new THREE.BoxGeometry(90, 0.08, 6.4), roadMat);
    roadH.position.y = 0.04;
    root.add(roadH);
    const roadV = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.08, 90), roadMat);
    roadV.position.y = 0.04;
    root.add(roadV);

    const dashGeo = new THREE.BoxGeometry(1.4, 0.04, 0.12);
    const dashMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    for (let i = -40; i <= 40; i += 4) {
      const d1 = new THREE.Mesh(dashGeo, dashMat);
      d1.position.set(i, 0.1, 0);
      root.add(d1);
      const d2 = new THREE.Mesh(dashGeo, dashMat);
      d2.rotation.y = Math.PI / 2;
      d2.position.set(0, 0.1, i);
      root.add(d2);
    }

    const windowTex = makeWindowTexture();
    const buildingGeo = new THREE.BoxGeometry(1, 1, 1);
    buildingGeo.translate(0, 0.5, 0);
    const buildingMat = new THREE.MeshStandardMaterial({
      map: windowTex,
      color: 0x9fb4d9,
      roughness: 0.35,
      metalness: 0.45,
      emissive: 0x112033,
      emissiveIntensity: 0.35,
    });

    const buildingMesh = new THREE.InstancedMesh(buildingGeo, buildingMat, 72);
    const dummy = new THREE.Object3D();
    let built = 0;
    for (let i = 0; i < 120 && built < 72; i++) {
      const a = seeded(i + 2);
      const b = seeded(i + 9);
      const x = (a - 0.5) * 70;
      const z = (b - 0.5) * 70;
      if (Math.abs(x) < 8 && Math.abs(z) < 8) continue;
      if (Math.abs(x) < 4 || Math.abs(z) < 4) continue;
      const w = 2.2 + seeded(i + 21) * 3.4;
      const d = 2.2 + seeded(i + 33) * 3.2;
      const h = 4 + seeded(i + 44) * 18;
      dummy.position.set(x, 0, z);
      dummy.scale.set(w, h, d);
      dummy.updateMatrix();
      buildingMesh.setMatrixAt(built, dummy.matrix);
      built += 1;
    }
    buildingMesh.count = built;
    root.add(buildingMesh);

    const lab = new THREE.Group();
    const glass = new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 8.4, 7.2),
      new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        roughness: 0.18,
        metalness: 0.35,
        transparent: true,
        opacity: 0.72,
        emissive: 0x083344,
        emissiveIntensity: 0.55,
      })
    );
    glass.position.y = 4.3;
    lab.add(glass);
    const core = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 7.6, 2.2),
      new THREE.MeshStandardMaterial({
        color: 0x22c55e,
        emissive: 0x16a34a,
        emissiveIntensity: 1.4,
        roughness: 0.3,
      })
    );
    core.position.y = 4.1;
    lab.add(core);
    const roof = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 3.2, 10),
      new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.8, roughness: 0.2 })
    );
    roof.position.y = 10.2;
    lab.add(roof);
    const beacon = new THREE.PointLight(0x22c55e, 8, 28, 1.6);
    beacon.position.y = 11.4;
    lab.add(beacon);
    root.add(lab);

    const signMat = new THREE.MeshBasicMaterial({
      map: makeNeonSign("QA DISTRICT", "#38bdf8"),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(10, 2.4), signMat);
    sign.position.set(0, 10.6, 3.7);
    root.add(sign);

    const nameSign = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 2.6),
      new THREE.MeshBasicMaterial({
        map: makeNeonSign("SHASHANK SHINDE", "#22c55e"),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    nameSign.position.set(0, 7.8, 3.72);
    root.add(nameSign);

    const holo = new THREE.Mesh(
      new THREE.PlaneGeometry(5.2, 3.2),
      new THREE.MeshBasicMaterial({
        map: makeHoloPanel(["LIVE TEST CITY", "100k virtual users", "240+ defects caught", "Supabase dispatch ON"]),
        transparent: true,
        opacity: 0.92,
      })
    );
    holo.position.set(6.8, 4.4, 5.2);
    holo.rotation.y = -0.45;
    root.add(holo);

    for (let i = -36; i <= 36; i += 12) {
      if (Math.abs(i) < 8) continue;
      addLamp(root, i, 3.8, disposables);
      addLamp(root, i, -3.8, disposables);
      addLamp(root, 3.8, i, disposables);
      addLamp(root, -3.8, i, disposables);
    }

    const treeGeo = new THREE.ConeGeometry(0.7, 2.1, 7);
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x14532d, roughness: 0.8 });
    const trunkGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.7, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3f2d1c });
    for (let i = 0; i < 28; i++) {
      const t = seeded(i + 70);
      const u = seeded(i + 90);
      const x = (t - 0.5) * 54;
      const z = (u - 0.5) * 54;
      if (Math.abs(x) < 6 || Math.abs(z) < 6) continue;
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(x, 0.35, z);
      const crown = new THREE.Mesh(treeGeo, treeMat);
      crown.position.set(x, 1.7, z);
      root.add(trunk, crown);
    }

    type Car = { mesh: THREE.Group; speed: number; offset: number; axis: "x" | "z" };
    const cars: Car[] = [];
    const carColors = [0x38bdf8, 0x22c55e, 0xf59e0b, 0xf43f5e, 0xa78bfa];
    for (let i = 0; i < 14; i++) {
      const g = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(1.3, 0.32, 0.62),
        new THREE.MeshStandardMaterial({
          color: carColors[i % carColors.length],
          metalness: 0.7,
          roughness: 0.25,
          emissive: carColors[i % carColors.length],
          emissiveIntensity: 0.25,
        })
      );
      body.position.y = 0.28;
      const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.26, 0.52),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.4 })
      );
      cabin.position.set(-0.08, 0.5, 0);
      g.add(body, cabin);
      root.add(g);
      cars.push({
        mesh: g,
        speed: 0.22 + seeded(i) * 0.35,
        offset: seeded(i + 3) * Math.PI * 2,
        axis: i % 2 === 0 ? "x" : "z",
      });
    }

    const track = new THREE.Mesh(
      new THREE.RingGeometry(7.5, 10.8, 64),
      new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5, metalness: 0.25 })
    );
    track.rotation.x = -Math.PI / 2;
    track.position.set(0, 0.06, -8);
    root.add(track);

    const racers: { mesh: THREE.Group; t: number; speed: number }[] = [];
    for (let i = 0; i < 10; i++) {
      const g = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.22, 0.42),
        new THREE.MeshStandardMaterial({
          color: i % 2 ? 0x22c55e : 0x38bdf8,
          emissive: i % 2 ? 0x166534 : 0x0369a1,
          emissiveIntensity: 0.8,
        })
      );
      g.add(body);
      root.add(g);
      racers.push({ mesh: g, t: (i / 10) * Math.PI * 2, speed: 0.6 + i * 0.05 });
    }

    const starGeo = new THREE.BufferGeometry();
    const starCount = 900;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (seeded(i) - 0.5) * 180;
      starPos[i * 3 + 1] = 20 + seeded(i + 4) * 50;
      starPos[i * 3 + 2] = (seeded(i + 8) - 0.5) * 180;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0xbae6fd, size: 0.12, transparent: true, opacity: 0.85 })
    );
    scene.add(stars);

    const rainGeo = new THREE.BufferGeometry();
    const rainCount = 1400;
    const rainPos = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      rainPos[i * 3] = (Math.random() - 0.5) * 80;
      rainPos[i * 3 + 1] = Math.random() * 28;
      rainPos[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    rainGeo.setAttribute("position", new THREE.BufferAttribute(rainPos, 3));
    const rain = new THREE.Points(
      rainGeo,
      new THREE.PointsMaterial({
        color: 0x93c5fd,
        size: 0.045,
        transparent: true,
        opacity: 0.35,
      })
    );
    scene.add(rain);

    const drones: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const d = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.28),
        new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x0ea5e9,
          emissiveIntensity: 1.6,
        })
      );
      root.add(d);
      drones.push(d);
    }

    const pointer = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);

    const camPos = camera.position.clone();
    const camLook = CAMERAS.home.look.clone();
    const lookTarget = camLook.clone();

    let raf = 0;
    const t0 = performance.now();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = (performance.now() - t0) / 1000;
      const key = (sectionRef.current in CAMERAS ? sectionRef.current : "home") as SectionId;
      const dest = CAMERAS[key];
      camPos.lerp(dest.pos, 0.035);
      camLook.lerp(dest.look, 0.04);
      camera.position.copy(camPos);
      camera.position.x += pointer.x * 1.4;
      camera.position.y += pointer.y * 0.7;
      lookTarget.copy(camLook);
      camera.lookAt(lookTarget);

      lab.rotation.y = Math.sin(t * 0.15) * 0.04;
      beacon.intensity = 6.5 + Math.sin(t * 3.2) * 2.2;
      holo.position.y = 4.4 + Math.sin(t * 1.4) * 0.18;
      signMat.opacity = 0.75 + Math.sin(t * 2) * 0.2;

      cars.forEach((car, i) => {
        const a = t * car.speed + car.offset;
        if (car.axis === "x") {
          car.mesh.position.set(Math.sin(a) * 28, 0.2, (i % 2 === 0 ? 1.6 : -1.6));
          car.mesh.rotation.y = Math.cos(a) > 0 ? 0 : Math.PI;
        } else {
          car.mesh.position.set(i % 2 === 0 ? 1.6 : -1.6, 0.2, Math.sin(a) * 28);
          car.mesh.rotation.y = Math.cos(a) > 0 ? Math.PI / 2 : -Math.PI / 2;
        }
      });

      racers.forEach((r) => {
        r.t += 0.012 * r.speed;
        const radius = 9.15;
        r.mesh.position.set(Math.cos(r.t) * radius, 0.28, -8 + Math.sin(r.t) * radius);
        r.mesh.rotation.y = -r.t + Math.PI / 2;
      });

      drones.forEach((d, i) => {
        const a = t * 0.35 + i;
        d.position.set(Math.cos(a) * (10 + i), 6 + Math.sin(t + i) * 1.4, Math.sin(a * 0.8) * (10 + i * 0.4));
        d.rotation.y += 0.02;
      });

      const rp = rain.geometry.attributes.position;
      for (let i = 0; i < rainCount; i++) {
        const y = rp.getY(i) - 0.38;
        rp.setY(i, y < 0 ? 26 : y);
      }
      rp.needsUpdate = true;

      stars.rotation.y += 0.00025;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      renderer.dispose();
      groundTex.dispose();
      windowTex.dispose();
      buildingGeo.dispose();
      buildingMat.dispose();
      starGeo.dispose();
      rainGeo.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
      void disposables;
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0 city-canvas"
      aria-hidden="true"
    />
  );
}
