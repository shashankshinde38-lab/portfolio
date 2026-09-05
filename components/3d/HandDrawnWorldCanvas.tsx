"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// ═════════════════════════════════════════════════════════════════════════════
// 1. STATION DEFINITIONS & CAMERA COORDINATES
// ═════════════════════════════════════════════════════════════════════════════

export type StationId =
  | "entrance"
  | "atrium"
  | "corridor"
  | "experience"
  | "automation"
  | "projects"
  | "skills"
  | "achievements"
  | "contact";

interface StationConfig {
  id: StationId;
  label: string;
  subLabel: string;
  icon: string;
  camPos: [number, number, number];
  camTarget: [number, number, number];
  doorKey?: string;
}

const STATIONS: Record<StationId, StationConfig> = {
  entrance: {
    id: "entrance",
    label: "Lab Façade",
    subLabel: "Exterior Entrance & Gate",
    icon: "🚪",
    camPos: [0, 2.2, 16],
    camTarget: [0, 2.0, 7.5],
  },
  atrium: {
    id: "atrium",
    label: "QA Testing Lab",
    subLabel: "Hero Atrium & Avatar",
    icon: "🧪",
    camPos: [0, 2.0, 4.5],
    camTarget: [0, 1.9, -2],
    doorKey: "entranceDoor",
  },
  corridor: {
    id: "corridor",
    label: "Testing Corridor",
    subLabel: "Central Hallway Hub",
    icon: "🏛️",
    camPos: [0, 2.0, -2],
    camTarget: [0, 2.0, -18],
  },
  experience: {
    id: "experience",
    label: "Experience Office",
    subLabel: "Profcyma Solutions · 9 Responsibilities",
    icon: "💼",
    camPos: [-9.5, 2.0, -5],
    camTarget: [-15, 2.0, -5],
    doorKey: "doorExperience",
  },
  automation: {
    id: "automation",
    label: "Automation Lab",
    subLabel: "Oscilloscope & Test Runner",
    icon: "⚙️",
    camPos: [9.5, 2.0, -5],
    camTarget: [15, 2.0, -5],
    doorKey: "doorAutomation",
  },
  projects: {
    id: "projects",
    label: "Blueprint Gallery",
    subLabel: "Balcony Terrace · 5 Production Cases",
    icon: "📋",
    camPos: [-10.5, 2.2, -10],
    camTarget: [-17, 2.2, -10],
    doorKey: "doorProjects",
  },
  skills: {
    id: "skills",
    label: "Skills Arsenal",
    subLabel: "Tool Pegboard & Tech Matrix",
    icon: "🛠️",
    camPos: [9.5, 2.0, -10],
    camTarget: [15, 2.0, -10],
    doorKey: "doorSkills",
  },
  achievements: {
    id: "achievements",
    label: "Release Gate",
    subLabel: "Certifications & Release Seal",
    icon: "🏆",
    camPos: [-9.5, 2.0, -15],
    camTarget: [-15, 2.0, -15],
    doorKey: "doorAchievements",
  },
  contact: {
    id: "contact",
    label: "Dispatch Office",
    subLabel: "Drafting Desk · Supabase & Mail",
    icon: "📬",
    camPos: [0, 2.0, -21],
    camTarget: [0, 1.8, -26],
    doorKey: "doorContact",
  },
};

// ═════════════════════════════════════════════════════════════════════════════
// 2. PROCEDURAL HAND-DRAWN TEXTURE GENERATORS (Pure 2D Canvas)
// ═════════════════════════════════════════════════════════════════════════════

function createPaperTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#FAF8F5";
  ctx.fillRect(0, 0, 512, 512);

  // Subtle organic paper fiber noise
  for (let i = 0; i < 7000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const alpha = Math.random() * 0.045;
    ctx.fillStyle = `rgba(30, 25, 20, ${alpha})`;
    ctx.fillRect(x, y, Math.random() * 2 + 1, Math.random() * 1.5 + 0.5);
  }

  // Faint pencil smudge rings
  for (let i = 0; i < 15; i++) {
    const cx = Math.random() * 512;
    const cy = Math.random() * 512;
    const r = Math.random() * 60 + 20;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, "rgba(40, 35, 30, 0.025)");
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function createPlankTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#F5F2EC";
  ctx.fillRect(0, 0, 1024, 1024);

  const numPlanks = 8;
  const plankWidth = 1024 / numPlanks;

  ctx.lineWidth = 3.5;
  ctx.strokeStyle = "#1A1A1A";

  for (let i = 0; i < numPlanks; i++) {
    const x = i * plankWidth;

    ctx.beginPath();
    ctx.moveTo(x, 0);
    for (let y = 0; y <= 1024; y += 64) {
      const wobble = (Math.sin(y * 0.05 + i * 2) + Math.cos(y * 0.03)) * 1.8;
      ctx.lineTo(x + wobble, y);
    }
    ctx.stroke();

    ctx.lineWidth = 1.2;
    ctx.strokeStyle = "rgba(26, 26, 26, 0.45)";
    for (let g = 0; g < 4; g++) {
      const gx = x + (g + 1) * (plankWidth / 5);
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      for (let y = 0; y <= 1024; y += 48) {
        const gwob = Math.sin(y * 0.04 + g) * 3 + (Math.random() - 0.5) * 1.5;
        ctx.lineTo(gx + gwob, y);
      }
      ctx.stroke();
    }

    if (i % 2 === 0) {
      const knotY = 200 + (i * 180) % 700;
      const knotX = x + plankWidth / 2;
      ctx.beginPath();
      ctx.ellipse(knotX, knotY, 14, 28, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(30, 30, 30, 0.2)";
      ctx.fill();
      ctx.strokeStyle = "#1A1A1A";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.fillStyle = "#1A1A1A";
    ctx.beginPath();
    ctx.arc(x + plankWidth / 2, 35, 4, 0, Math.PI * 2);
    ctx.arc(x + plankWidth / 2, 989, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

function createBrickTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#FAF8F5";
  ctx.fillRect(0, 0, 1024, 1024);

  const rowHeight = 64;
  const brickWidth = 140;

  ctx.strokeStyle = "#1E1E1E";
  ctx.lineWidth = 3;

  for (let y = 0; y < 1024; y += rowHeight) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 1024; x += 32) {
      const wob = Math.sin(x * 0.08 + y) * 1.5;
      ctx.lineTo(x, y + wob);
    }
    ctx.stroke();

    const isStaggered = (y / rowHeight) % 2 === 1;
    const xOffset = isStaggered ? brickWidth / 2 : 0;

    for (let x = xOffset; x < 1024 + brickWidth; x += brickWidth) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      for (let cy = y; cy <= y + rowHeight; cy += 16) {
        const vwob = Math.cos(cy * 0.1) * 1.2;
        ctx.lineTo(x + vwob, cy);
      }
      ctx.stroke();

      if (Math.random() > 0.45) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(30, 30, 30, 0.35)";
        for (let h = 10; h < brickWidth - 10; h += 18) {
          ctx.beginPath();
          ctx.moveTo(x - brickWidth + h, y + 8);
          ctx.lineTo(x - brickWidth + h + 16, y + rowHeight - 8);
          ctx.stroke();
        }
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#1E1E1E";
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

function createDoorTexture(
  title: string,
  stickers: { label: string; color: string; bg: string }[] = [],
  blueprintDoodles: boolean = false
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#F5EFE6";
  ctx.fillRect(0, 0, 512, 1024);

  ctx.lineWidth = 7;
  ctx.strokeStyle = "#181818";
  ctx.strokeRect(10, 10, 492, 1004);

  ctx.lineWidth = 4;
  ctx.strokeRect(36, 120, 440, 380);
  ctx.strokeRect(36, 540, 440, 430);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(30,30,30,0.4)";
  for (let x = 80; x < 450; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 125);
    ctx.lineTo(x, 495);
    ctx.moveTo(x, 545);
    ctx.lineTo(x, 965);
    ctx.stroke();
  }

  ctx.fillStyle = "#EDE4D3";
  ctx.fillRect(50, 30, 412, 70);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#181818";
  ctx.strokeRect(50, 30, 412, 70);

  ctx.fillStyle = "#181818";
  [65, 445].forEach((sx) => {
    [45, 85].forEach((sy) => {
      ctx.beginPath();
      ctx.arc(sx, sy, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  ctx.font = "bold 26px -apple-system, sans-serif";
  ctx.fillStyle = "#181818";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(title.toUpperCase(), 256, 65);

  ctx.lineWidth = 5;
  ctx.strokeStyle = "#181818";
  ctx.fillStyle = "#E5D9C4";
  ctx.beginPath();
  ctx.arc(430, 520, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(430, 520, 6, 0, Math.PI * 2);
  ctx.fillStyle = "#181818";
  ctx.fill();

  if (blueprintDoodles) {
    ctx.save();
    ctx.translate(256, 310);
    ctx.rotate(-0.04);
    ctx.fillStyle = "#E8EEF5";
    ctx.fillRect(-160, -140, 320, 280);
    ctx.strokeStyle = "#1E3A8A";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(-160, -140, 320, 280);

    ctx.strokeStyle = "rgba(59, 130, 246, 0.25)";
    ctx.lineWidth = 1;
    for (let gx = -140; gx < 150; gx += 25) {
      ctx.beginPath();
      ctx.moveTo(gx, -135);
      ctx.lineTo(gx, 135);
      ctx.stroke();
    }
    for (let gy = -120; gy < 130; gy += 25) {
      ctx.beginPath();
      ctx.moveTo(-155, gy);
      ctx.lineTo(155, gy);
      ctx.stroke();
    }

    ctx.strokeStyle = "#1D4ED8";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(-120, -100, 240, 200);
    ctx.strokeRect(-100, -80, 90, 70);
    ctx.strokeRect(10, -80, 110, 80);
    ctx.strokeRect(-100, 10, 110, 90);
    ctx.strokeRect(30, 20, 90, 80);

    const drawTape = (tx: number, ty: number, rot: number) => {
      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(rot);
      ctx.fillStyle = "rgba(59, 130, 246, 0.85)";
      ctx.fillRect(-26, -10, 52, 20);
      ctx.restore();
    };
    drawTape(-155, -135, -0.4);
    drawTape(155, -135, 0.35);
    drawTape(-155, 135, 0.3);
    drawTape(155, 135, -0.4);
    ctx.restore();
  }

  stickers.forEach((s, idx) => {
    const sx = 80 + (idx % 3) * 120;
    const sy = 600 + Math.floor(idx / 3) * 110;
    const rot = Math.sin(idx * 2) * 0.12;

    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(rot);
    ctx.fillStyle = s.bg;
    ctx.fillRect(-45, -30, 90, 60);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#181818";
    ctx.strokeRect(-45, -30, 90, 60);

    ctx.font = "bold 14px -apple-system, sans-serif";
    ctx.fillStyle = s.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(s.label, 0, 0);
    ctx.restore();
  });

  return new THREE.CanvasTexture(canvas);
}

function createHerringboneTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#FAF6EE";
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = "#2A2A2A";
  ctx.lineWidth = 2;

  const tileSize = 64;
  for (let y = 0; y < 512; y += tileSize) {
    for (let x = 0; x < 512; x += tileSize) {
      const isAlt = ((x + y) / tileSize) % 2 === 0;
      ctx.beginPath();
      if (isAlt) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + tileSize, y + tileSize);
      } else {
        ctx.moveTo(x + tileSize, y);
        ctx.lineTo(x, y + tileSize);
      }
      ctx.stroke();

      ctx.lineWidth = 0.8;
      ctx.strokeStyle = "rgba(40,40,40,0.3)";
      if (isAlt) {
        ctx.beginPath();
        ctx.moveTo(x, y + tileSize / 2);
        ctx.lineTo(x + tileSize / 2, y + tileSize);
        ctx.moveTo(x + tileSize / 2, y);
        ctx.lineTo(x + tileSize, y + tileSize / 2);
        ctx.stroke();
      }
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#2A2A2A";
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

function createSkylineTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, "#FBF9F5");
  grad.addColorStop(1, "#EDE7DD");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 2048, 512);

  ctx.strokeStyle = "rgba(40,40,40,0.5)";
  ctx.lineWidth = 2.5;
  const drawCloud = (cx: number, cy: number, scale: number) => {
    ctx.beginPath();
    ctx.arc(cx, cy, 25 * scale, Math.PI * 0.8, Math.PI * 1.8);
    ctx.arc(cx + 30 * scale, cy - 15 * scale, 32 * scale, Math.PI * 1.0, Math.PI * 2.0);
    ctx.arc(cx + 65 * scale, cy - 8 * scale, 28 * scale, Math.PI * 1.1, Math.PI * 2.2);
    ctx.arc(cx + 90 * scale, cy, 22 * scale, Math.PI * 1.2, Math.PI * 0.2);
    ctx.closePath();
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fill();
    ctx.stroke();
  };

  drawCloud(200, 100, 1.2);
  drawCloud(750, 80, 1.5);
  drawCloud(1350, 120, 1.0);
  drawCloud(1800, 90, 1.4);

  ctx.lineWidth = 3;
  ctx.strokeStyle = "#222222";
  ctx.fillStyle = "rgba(235, 228, 218, 0.85)";

  let x = 0;
  while (x < 2048) {
    const w = 40 + Math.random() * 80;
    const h = 120 + Math.random() * 220;
    const y = 512 - h;

    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.stroke();

    if (Math.random() > 0.6) {
      ctx.beginPath();
      ctx.moveTo(x + w / 2, y);
      ctx.lineTo(x + w / 2, y - 35);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + w / 2, y - 35, 3.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (Math.random() > 0.7) {
      const twX = x + w / 2;
      const twY = y - 25;
      ctx.fillRect(twX - 14, twY - 18, 28, 20);
      ctx.strokeRect(twX - 14, twY - 18, 28, 20);
      ctx.beginPath();
      ctx.moveTo(twX - 14, twY + 2);
      ctx.lineTo(twX - 10, y);
      ctx.moveTo(twX + 14, twY + 2);
      ctx.lineTo(twX + 10, y);
      ctx.stroke();
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(40,40,40,0.4)";
    for (let wy = y + 20; wy < 490; wy += 28) {
      for (let wx = x + 10; wx < x + w - 10; wx += 18) {
        ctx.strokeRect(wx, wy, 10, 14);
      }
    }
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#222222";

    x += w + Math.random() * 8;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function createBlueprintSheetTexture(
  code: string,
  title: string,
  metric: string,
  tag: string
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 680;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#FAF8F5";
  ctx.fillRect(0, 0, 512, 680);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#1A1A1A";
  ctx.strokeRect(10, 10, 492, 660);

  ctx.strokeStyle = "rgba(59, 130, 246, 0.18)";
  ctx.lineWidth = 1;
  for (let x = 20; x < 500; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 20);
    ctx.lineTo(x, 660);
    ctx.stroke();
  }
  for (let y = 20; y < 660; y += 20) {
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(492, y);
    ctx.stroke();
  }

  ctx.fillStyle = "#D7B588";
  ctx.fillRect(240, 2, 32, 40);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#1A1A1A";
  ctx.strokeRect(240, 2, 32, 40);
  ctx.fillStyle = "#8B5CF6";
  ctx.beginPath();
  ctx.arc(256, 22, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#1E293B";
  ctx.fillRect(30, 55, 120, 32);
  ctx.fillStyle = "#F8FAFC";
  ctx.font = "bold 16px monospace";
  ctx.fillText(code, 45, 77);

  ctx.fillStyle = "#2563EB";
  ctx.font = "bold 15px -apple-system, sans-serif";
  ctx.fillText(tag.toUpperCase(), 165, 77);

  ctx.fillStyle = "#0F172A";
  ctx.font = "bold 24px -apple-system, sans-serif";
  ctx.fillText(title, 30, 130);

  ctx.save();
  ctx.translate(390, 110);
  ctx.rotate(0.08);
  ctx.strokeStyle = "#DC2626";
  ctx.lineWidth = 3;
  ctx.strokeRect(-70, -22, 140, 44);
  ctx.fillStyle = "#DC2626";
  ctx.font = "bold 18px monospace";
  ctx.textAlign = "center";
  ctx.fillText(metric, 0, 7);
  ctx.restore();

  ctx.strokeStyle = "#1D4ED8";
  ctx.lineWidth = 2.5;
  ctx.strokeRect(40, 175, 432, 280);

  ctx.strokeRect(55, 195, 402, 45);
  ctx.strokeRect(55, 255, 120, 180);
  ctx.strokeRect(190, 255, 267, 180);

  ctx.beginPath();
  ctx.moveTo(175, 340);
  ctx.lineTo(190, 340);
  ctx.lineTo(183, 333);
  ctx.moveTo(190, 340);
  ctx.lineTo(183, 347);
  ctx.stroke();

  ctx.save();
  ctx.translate(256, 550);
  ctx.rotate(-0.06);
  ctx.strokeStyle = "#16A34A";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(0, 0, 65, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#16A34A";
  ctx.font = "bold 15px monospace";
  ctx.textAlign = "center";
  ctx.fillText("✓ QA TESTED", 0, -10);
  ctx.fillText("ZERO CRITICAL BUGS", 0, 15);
  ctx.restore();

  ctx.font = "italic 15px -apple-system, sans-serif";
  ctx.fillStyle = "#64748B";
  ctx.textAlign = "center";
  ctx.fillText("Click to inspect complete test execution matrix", 256, 640);

  return new THREE.CanvasTexture(canvas);
}

function createCatTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, 256, 256);
  ctx.strokeStyle = "#1A1A1A";
  ctx.lineWidth = 4;
  ctx.fillStyle = "#FFFFFF";

  ctx.beginPath();
  ctx.ellipse(128, 170, 50, 65, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(128, 90, 42, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(95, 70);
  ctx.lineTo(80, 25);
  ctx.lineTo(120, 55);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(161, 70);
  ctx.lineTo(176, 25);
  ctx.lineTo(136, 55);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#1A1A1A";
  ctx.beginPath();
  ctx.arc(112, 88, 5, 0, Math.PI * 2);
  ctx.arc(144, 88, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(128, 98);
  ctx.lineTo(124, 104);
  ctx.lineTo(132, 104);
  ctx.closePath();
  ctx.fill();

  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(95, 100);
  ctx.lineTo(55, 95);
  ctx.moveTo(95, 106);
  ctx.lineTo(55, 112);
  ctx.moveTo(161, 100);
  ctx.lineTo(201, 95);
  ctx.moveTo(161, 106);
  ctx.lineTo(201, 112);
  ctx.stroke();

  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(165, 195);
  ctx.bezierCurveTo(220, 190, 225, 130, 205, 115);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}

function createQAAvatarTexture(isWaving: boolean = false): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, 512, 768);

  ctx.strokeStyle = "#161616";
  ctx.lineWidth = 5;
  ctx.fillStyle = "#FFFFFF";

  ctx.beginPath();
  ctx.arc(256, 170, 75, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#161616";
  ctx.beginPath();
  ctx.arc(256, 155, 80, Math.PI * 1.1, Math.PI * 1.9);
  ctx.bezierCurveTo(345, 110, 310, 75, 256, 80);
  ctx.bezierCurveTo(200, 75, 165, 110, 172, 155);
  ctx.fill();

  ctx.lineWidth = 4;
  ctx.strokeStyle = "#161616";
  ctx.beginPath();
  ctx.arc(225, 170, 24, 0, Math.PI * 2);
  ctx.arc(287, 170, 24, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(249, 170);
  ctx.lineTo(263, 170);
  ctx.stroke();

  ctx.fillStyle = "#161616";
  ctx.beginPath();
  ctx.arc(225, 170, 6, 0, Math.PI * 2);
  ctx.arc(287, 170, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(256, 205, 18, 0, Math.PI);
  ctx.stroke();

  ctx.fillStyle = "#FAF8F5";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(200, 245);
  ctx.lineTo(312, 245);
  ctx.lineTo(340, 510);
  ctx.lineTo(172, 510);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(235, 245);
  ctx.lineTo(256, 280);
  ctx.lineTo(277, 245);
  ctx.stroke();
  ctx.fillStyle = "#2563EB";
  ctx.beginPath();
  ctx.moveTo(250, 280);
  ctx.lineTo(262, 280);
  ctx.lineTo(268, 380);
  ctx.lineTo(256, 395);
  ctx.lineTo(244, 380);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#E2E8F0";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(172, 510);
  ctx.lineTo(250, 510);
  ctx.lineTo(240, 720);
  ctx.lineTo(185, 720);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(262, 510);
  ctx.lineTo(340, 510);
  ctx.lineTo(327, 720);
  ctx.lineTo(272, 720);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#181818";
  ctx.beginPath();
  ctx.ellipse(205, 730, 28, 12, 0, 0, Math.PI * 2);
  ctx.ellipse(305, 730, 28, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 5;
  ctx.fillStyle = "#FAF8F5";
  ctx.beginPath();
  ctx.moveTo(195, 255);
  ctx.lineTo(130, 360);
  ctx.lineTo(170, 390);
  ctx.stroke();

  ctx.save();
  ctx.translate(145, 380);
  ctx.rotate(0.2);
  ctx.fillStyle = "#D4B996";
  ctx.fillRect(-35, -45, 70, 90);
  ctx.strokeRect(-35, -45, 70, 90);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(-28, -35, 56, 75);
  ctx.strokeStyle = "#181818";
  ctx.lineWidth = 1.5;
  for (let l = -25; l < 35; l += 14) {
    ctx.beginPath();
    ctx.moveTo(-20, l);
    ctx.lineTo(20, l);
    ctx.stroke();
  }
  ctx.restore();

  ctx.lineWidth = 5;
  if (isWaving) {
    ctx.beginPath();
    ctx.moveTo(315, 255);
    ctx.lineTo(390, 210);
    ctx.lineTo(415, 140);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(418, 130, 16, 0, Math.PI * 2);
    ctx.fillStyle = "#FAF8F5";
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(315, 255);
    ctx.lineTo(370, 360);
    ctx.lineTo(345, 430);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(345, 435, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  return new THREE.CanvasTexture(canvas);
}

// ═════════════════════════════════════════════════════════════════════════════
// 3. MAIN REACT COMPONENT
// ═════════════════════════════════════════════════════════════════════════════

interface HandDrawnWorldCanvasProps {
  onStationChange?: (station: StationId) => void;
  activeStationId?: StationId;
}

export default function HandDrawnWorldCanvas({
  onStationChange,
  activeStationId = "entrance",
}: HandDrawnWorldCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStation, setCurrentStation] = useState<StationId>(activeStationId);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameId = useRef<number>(0);

  const camPosTarget = useRef<THREE.Vector3>(new THREE.Vector3(...STATIONS.entrance.camPos));
  const camLookTarget = useRef<THREE.Vector3>(new THREE.Vector3(...STATIONS.entrance.camTarget));
  const camLookCurrent = useRef<THREE.Vector3>(new THREE.Vector3(...STATIONS.entrance.camTarget));

  const doorsRef = useRef<Record<string, { group: THREE.Group; isOpen: boolean }>>({});
  const interactiveMeshes = useRef<THREE.Mesh[]>([]);

  const avatarMeshRef = useRef<THREE.Mesh | null>(null);
  const catMeshRef = useRef<THREE.Mesh | null>(null);
  const lampGroupRef = useRef<THREE.Group | null>(null);
  const clotheslineGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#FAF8F5");
    scene.fog = new THREE.FogExp2("#FAF8F5", 0.022);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    cameraRef.current = camera;
    camera.position.set(...STATIONS.entrance.camPos);
    camera.lookAt(...STATIONS.entrance.camTarget);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight("#FFFFFF", 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight("#FFF8EE", 1.2);
    sunLight.position.set(10, 20, 15);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 60;
    sunLight.shadow.camera.left = -25;
    sunLight.shadow.camera.right = 25;
    sunLight.shadow.camera.top = 25;
    sunLight.shadow.camera.bottom = -25;
    scene.add(sunLight);

    const paperTex = createPaperTexture();
    const plankTex = createPlankTexture();
    const brickTex = createBrickTexture();
    const herringboneTex = createHerringboneTexture();
    const skylineTex = createSkylineTexture();

    const paperMaterial = new THREE.MeshLambertMaterial({ map: paperTex });
    const woodFloorMaterial = new THREE.MeshLambertMaterial({ map: plankTex });
    const brickMaterial = new THREE.MeshLambertMaterial({ map: brickTex });
    const herringboneMaterial = new THREE.MeshLambertMaterial({ map: herringboneTex });

    const outlineMaterial = new THREE.MeshBasicMaterial({
      color: "#181818",
      side: THREE.BackSide,
    });

    const createOutlinedBox = (
      w: number,
      h: number,
      d: number,
      mat: THREE.Material
    ): THREE.Group => {
      const group = new THREE.Group();
      const geom = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geom, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);

      const outlineGeom = new THREE.BoxGeometry(w + 0.05, h + 0.05, d + 0.05);
      const outlineMesh = new THREE.Mesh(outlineGeom, outlineMaterial);
      group.add(outlineMesh);
      return group;
    };

    // ── 3.1. EXTERIOR FAÇADE (Entrance) ──
    const exteriorGroup = new THREE.Group();
    scene.add(exteriorGroup);

    const pavementGeom = new THREE.PlaneGeometry(36, 16);
    const pavementMesh = new THREE.Mesh(pavementGeom, paperMaterial);
    pavementMesh.rotation.x = -Math.PI / 2;
    pavementMesh.position.set(0, 0, 15);
    pavementMesh.receiveShadow = true;
    exteriorGroup.add(pavementMesh);

    const brickWall = createOutlinedBox(36, 9, 0.4, brickMaterial);
    brickWall.position.set(0, 4.5, 8);
    exteriorGroup.add(brickWall);

    const treeGroup = new THREE.Group();
    treeGroup.position.set(-5.5, 0, 10.5);
    const trunkGeom = new THREE.CylinderGeometry(0.2, 0.28, 4, 8);
    const trunkMesh = new THREE.Mesh(trunkGeom, paperMaterial);
    trunkMesh.position.y = 2;
    treeGroup.add(trunkMesh);

    const foliageMat = new THREE.MeshLambertMaterial({ map: paperTex });
    [
      [0, 4.2, 0, 1.4],
      [-0.8, 3.8, 0.4, 1.1],
      [0.7, 4.4, -0.3, 1.2],
      [-0.4, 4.8, -0.2, 0.9],
    ].forEach(([tx, ty, tz, tr]) => {
      const foliageGeom = new THREE.SphereGeometry(tr, 8, 8);
      const foliageMesh = new THREE.Mesh(foliageGeom, foliageMat);
      foliageMesh.position.set(tx, ty, tz);
      treeGroup.add(foliageMesh);
    });

    const mouseCordGeom = new THREE.CylinderGeometry(0.015, 0.015, 1.8, 4);
    const mouseCordMesh = new THREE.Mesh(mouseCordGeom, outlineMaterial);
    mouseCordMesh.position.set(0.6, 2.8, 0.3);
    treeGroup.add(mouseCordMesh);

    const mouseBodyGeom = new THREE.BoxGeometry(0.3, 0.45, 0.18);
    const mouseBody = new THREE.Mesh(mouseBodyGeom, paperMaterial);
    mouseBody.position.set(0.6, 1.8, 0.3);
    treeGroup.add(mouseBody);
    exteriorGroup.add(treeGroup);

    const catTex = createCatTexture();
    const catMat = new THREE.MeshBasicMaterial({ map: catTex, transparent: true, side: THREE.DoubleSide });
    const catPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.4), catMat);
    catPlane.position.set(2.4, 0.7, 9.2);
    catMeshRef.current = catPlane;
    exteriorGroup.add(catPlane);

    const planter = createOutlinedBox(2.2, 0.6, 0.6, paperMaterial);
    planter.position.set(4.5, 0.3, 8.4);
    exteriorGroup.add(planter);

    const windowFrame = createOutlinedBox(2.2, 2.2, 0.1, paperMaterial);
    windowFrame.position.set(4.5, 2.8, 8.2);
    exteriorGroup.add(windowFrame);

    // Double Entrance Doors
    const entranceDoorGroup = new THREE.Group();
    entranceDoorGroup.position.set(0, 0, 8);

    const doorTexLeft = createDoorTexture("PORTFOLIO", [
      { label: "JS", color: "#181818", bg: "#FACC15" },
      { label: "Playwright", color: "#FFFFFF", bg: "#22C55E" },
      { label: "QA TEST", color: "#FFFFFF", bg: "#DC2626" },
    ]);
    const doorTexRight = createDoorTexture("QA LAB", [
      { label: "Selenium", color: "#FFFFFF", bg: "#2563EB" },
      { label: "JMeter", color: "#FFFFFF", bg: "#F97316" },
      { label: "Postman", color: "#FFFFFF", bg: "#FF6C37" },
    ]);

    const doorGeom = new THREE.BoxGeometry(1.4, 3.8, 0.12);
    const doorMatLeft = new THREE.MeshLambertMaterial({ map: doorTexLeft });
    const doorMatRight = new THREE.MeshLambertMaterial({ map: doorTexRight });

    const leftHinge = new THREE.Group();
    leftHinge.position.set(-1.4, 1.9, 0);
    const leftDoorMesh = new THREE.Mesh(doorGeom, doorMatLeft);
    leftDoorMesh.position.set(0.7, 0, 0);
    leftDoorMesh.castShadow = true;
    (leftDoorMesh as any).stationTarget = "atrium";
    interactiveMeshes.current.push(leftDoorMesh);
    leftHinge.add(leftDoorMesh);
    entranceDoorGroup.add(leftHinge);

    const rightHinge = new THREE.Group();
    rightHinge.position.set(1.4, 1.9, 0);
    const rightDoorMesh = new THREE.Mesh(doorGeom, doorMatRight);
    rightDoorMesh.position.set(-0.7, 0, 0);
    rightDoorMesh.castShadow = true;
    (rightDoorMesh as any).stationTarget = "atrium";
    interactiveMeshes.current.push(rightDoorMesh);
    rightHinge.add(rightDoorMesh);
    entranceDoorGroup.add(rightHinge);

    exteriorGroup.add(entranceDoorGroup);
    doorsRef.current["entranceDoor"] = { group: leftHinge, isOpen: false };

    // ── 3.2. ATRIUM & CENTRAL CORRIDOR ──
    const interiorGroup = new THREE.Group();
    scene.add(interiorGroup);

    const floorGeom = new THREE.PlaneGeometry(8, 34);
    const floorMesh = new THREE.Mesh(floorGeom, woodFloorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(0, 0.01, -8);
    floorMesh.receiveShadow = true;
    interiorGroup.add(floorMesh);

    const leftWall = createOutlinedBox(0.4, 6, 34, paperMaterial);
    leftWall.position.set(-4, 3, -8);
    interiorGroup.add(leftWall);

    const rightWall = createOutlinedBox(0.4, 6, 34, paperMaterial);
    rightWall.position.set(4, 3, -8);
    interiorGroup.add(rightWall);

    const ceilingGeom = new THREE.PlaneGeometry(8, 34);
    const ceilingMesh = new THREE.Mesh(ceilingGeom, paperMaterial);
    ceilingMesh.rotation.x = Math.PI / 2;
    ceilingMesh.position.set(0, 5.5, -8);
    interiorGroup.add(ceilingMesh);

    const lampGroup = new THREE.Group();
    lampGroup.position.set(0, 4.8, 1);
    const lampWire1 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.2, 4), outlineMaterial);
    lampWire1.position.set(-1.2, 0.6, 0);
    const lampWire2 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.2, 4), outlineMaterial);
    lampWire2.position.set(1.2, 0.6, 0);
    const lampBody = createOutlinedBox(3.0, 0.15, 0.8, paperMaterial);
    lampGroup.add(lampWire1, lampWire2, lampBody);
    lampGroupRef.current = lampGroup;
    interiorGroup.add(lampGroup);

    // QA Character Avatar (Shashank) in Atrium
    const avatarTex = createQAAvatarTexture(true);
    const avatarMat = new THREE.MeshBasicMaterial({ map: avatarTex, transparent: true, side: THREE.DoubleSide });
    const avatarMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 3.6), avatarMat);
    avatarMesh.position.set(0, 1.85, 0);
    avatarMeshRef.current = avatarMesh;
    (avatarMesh as any).stationTarget = "atrium";
    interactiveMeshes.current.push(avatarMesh);
    interiorGroup.add(avatarMesh);

    const whiteboard = createOutlinedBox(0.1, 2.5, 4.5, paperMaterial);
    whiteboard.position.set(-3.75, 2.6, 1.5);
    interiorGroup.add(whiteboard);

    // ── 3.3. RECESSED DOORS & STATION ROOMS ──
    const createHallwayDoor = (
      key: string,
      targetStation: StationId,
      title: string,
      xPos: number,
      zPos: number,
      wallSide: "left" | "right",
      blueprint: boolean = false
    ) => {
      const doorGroup = new THREE.Group();
      doorGroup.position.set(xPos, 0, zPos);

      const doorTex = createDoorTexture(
        title,
        [
          { label: "QA TESTED", color: "#FFFFFF", bg: "#16A34A" },
          { label: "VERIFIED", color: "#181818", bg: "#FEF08A" },
        ],
        blueprint
      );
      const dMat = new THREE.MeshLambertMaterial({ map: doorTex });
      const dGeom = new THREE.BoxGeometry(0.1, 3.5, 1.8);

      const hinge = new THREE.Group();
      hinge.position.set(0, 1.75, -0.9);
      const dMesh = new THREE.Mesh(dGeom, dMat);
      dMesh.position.set(0, 0, 0.9);
      dMesh.castShadow = true;
      (dMesh as any).stationTarget = targetStation;
      interactiveMeshes.current.push(dMesh);
      hinge.add(dMesh);

      doorGroup.add(hinge);
      interiorGroup.add(doorGroup);
      doorsRef.current[key] = { group: hinge, isOpen: false };
    };

    createHallwayDoor("doorExperience", "experience", "01. EXPERIENCE", -3.8, -5, "left");
    createHallwayDoor("doorAutomation", "automation", "02. AUTOMATION", 3.8, -5, "right");
    createHallwayDoor("doorProjects", "projects", "THE GALLERY", -3.8, -10, "left", true);
    createHallwayDoor("doorSkills", "skills", "04. ARSENAL", 3.8, -10, "right");
    createHallwayDoor("doorAchievements", "achievements", "05. RELEASE GATE", -3.8, -15, "left");

    // Contact Door at end of corridor (z = -19)
    const contactDoorGroup = new THREE.Group();
    contactDoorGroup.position.set(0, 0, -19);
    const contactDoorTex = createDoorTexture("DISPATCH & CONTACT", [
      { label: "GMAIL", color: "#FFFFFF", bg: "#EA4335" },
      { label: "SUPABASE", color: "#FFFFFF", bg: "#22C55E" },
      { label: "HIRE QA", color: "#FFFFFF", bg: "#2563EB" },
    ]);
    const contactDMat = new THREE.MeshLambertMaterial({ map: contactDoorTex });
    const contactHinge = new THREE.Group();
    contactHinge.position.set(-1.2, 1.8, 0);
    const contactDMesh = new THREE.Mesh(new THREE.BoxGeometry(2.4, 3.6, 0.1), contactDMat);
    contactDMesh.position.set(1.2, 0, 0);
    (contactDMesh as any).stationTarget = "contact";
    interactiveMeshes.current.push(contactDMesh);
    contactHinge.add(contactDMesh);
    contactDoorGroup.add(contactHinge);
    interiorGroup.add(contactDoorGroup);
    doorsRef.current["doorContact"] = { group: contactHinge, isOpen: false };

    // ── 3.4. BALCONY / PROJECT GALLERY TERRACE (Reference Video 05192.mp4) ──
    const balconyGroup = new THREE.Group();
    balconyGroup.position.set(-16, 0, -10);
    scene.add(balconyGroup);

    const balconyFloorGeom = new THREE.PlaneGeometry(16, 12);
    const balconyFloor = new THREE.Mesh(balconyFloorGeom, herringboneMaterial);
    balconyFloor.rotation.x = -Math.PI / 2;
    balconyFloor.position.set(0, 0.02, 0);
    balconyFloor.receiveShadow = true;
    balconyGroup.add(balconyFloor);

    const railingBack = createOutlinedBox(16, 1.2, 0.2, paperMaterial);
    railingBack.position.set(0, 0.6, -5.9);
    balconyGroup.add(railingBack);

    const railingLeft = createOutlinedBox(0.2, 1.2, 12, paperMaterial);
    railingLeft.position.set(-7.9, 0.6, 0);
    balconyGroup.add(railingLeft);

    const skylineMat = new THREE.MeshBasicMaterial({ map: skylineTex, side: THREE.DoubleSide });
    const skylineMesh = new THREE.Mesh(new THREE.PlaneGeometry(36, 10), skylineMat);
    skylineMesh.position.set(0, 4.5, -12);
    balconyGroup.add(skylineMesh);

    // Clothesline with 5 project blueprint sheets
    const clotheslineGroup = new THREE.Group();
    clotheslineGroup.position.set(0, 2.6, -2);
    clotheslineGroupRef.current = clotheslineGroup;

    const wireGeom = new THREE.CylinderGeometry(0.012, 0.012, 14, 4);
    const wireMesh = new THREE.Mesh(wireGeom, outlineMaterial);
    wireMesh.rotation.z = Math.PI / 2;
    clotheslineGroup.add(wireMesh);

    const projectCardsData = [
      { code: "TC-001", title: "DRIWE CAB APP", metric: "100k LOAD", tag: "Logistics" },
      { code: "TC-002", title: "GROSIDO GROCERY", metric: "~40% CUT", tag: "E-Commerce" },
      { code: "TC-003", title: "E-COMMERCE STORE", metric: "120+ E2E", tag: "Retail" },
      { code: "TC-004", title: "RIDE SHARING", metric: "22 APIs", tag: "Mobility" },
      { code: "TC-005", title: "URBAN BUILD", metric: "60+ BVA", tag: "Construction" },
    ];

    projectCardsData.forEach((p, idx) => {
      const sheetTex = createBlueprintSheetTexture(p.code, p.title, p.metric, p.tag);
      const sheetMat = new THREE.MeshLambertMaterial({ map: sheetTex, side: THREE.DoubleSide });
      const sheetMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.1), sheetMat);
      const posX = -5.0 + idx * 2.5;
      sheetMesh.position.set(posX, -0.9, 0);
      (sheetMesh as any).stationTarget = "projects";
      (sheetMesh as any).projectCode = p.code;
      interactiveMeshes.current.push(sheetMesh);
      clotheslineGroup.add(sheetMesh);
    });

    balconyGroup.add(clotheslineGroup);

    // ── 3.5. INTERIOR STATIONS (Workbench, Filing Cabinet, Drafting Desk) ──
    // Experience Office (x = -13, z = -5)
    const expOfficeGroup = new THREE.Group();
    expOfficeGroup.position.set(-13, 0, -5);
    const expFloor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), woodFloorMaterial);
    expFloor.rotation.x = -Math.PI / 2;
    expOfficeGroup.add(expFloor);

    const filingCabinet = createOutlinedBox(1.2, 2.8, 1.0, paperMaterial);
    filingCabinet.position.set(-2.5, 1.4, -2);
    expOfficeGroup.add(filingCabinet);

    const profcymaBoard = createOutlinedBox(0.1, 2.2, 3.8, paperMaterial);
    profcymaBoard.position.set(-3.8, 2.4, 0);
    expOfficeGroup.add(profcymaBoard);
    scene.add(expOfficeGroup);

    // Automation Lab (x = +13, z = -5)
    const autoLabGroup = new THREE.Group();
    autoLabGroup.position.set(13, 0, -5);
    const autoFloor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), woodFloorMaterial);
    autoFloor.rotation.x = -Math.PI / 2;
    autoLabGroup.add(autoFloor);

    const workbench = createOutlinedBox(4.2, 1.2, 1.6, paperMaterial);
    workbench.position.set(0, 0.6, -2.5);
    autoLabGroup.add(workbench);

    const oscilloscope = createOutlinedBox(1.4, 1.0, 0.9, paperMaterial);
    oscilloscope.position.set(-1.0, 1.7, -2.5);
    autoLabGroup.add(oscilloscope);

    const monitor = createOutlinedBox(1.6, 1.1, 0.2, paperMaterial);
    monitor.position.set(0.8, 1.75, -2.5);
    autoLabGroup.add(monitor);
    scene.add(autoLabGroup);

    // Contact Drafting Office (z = -25)
    const contactOfficeGroup = new THREE.Group();
    contactOfficeGroup.position.set(0, 0, -25);
    const contactFloor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), woodFloorMaterial);
    contactFloor.rotation.x = -Math.PI / 2;
    contactOfficeGroup.add(contactFloor);

    const draftingDesk = createOutlinedBox(4.5, 1.2, 2.2, paperMaterial);
    draftingDesk.position.set(0, 0.6, -2);
    contactOfficeGroup.add(draftingDesk);

    const mailbox = createOutlinedBox(0.8, 1.2, 0.6, paperMaterial);
    mailbox.position.set(-1.6, 1.8, -2);
    contactOfficeGroup.add(mailbox);

    const airplaneGeom = new THREE.ConeGeometry(0.18, 0.5, 3);
    const airplaneMat = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });
    const airplane = new THREE.Mesh(airplaneGeom, airplaneMat);
    airplane.position.set(0.6, 2.2, -1.2);
    airplane.rotation.x = Math.PI / 3;
    contactOfficeGroup.add(airplane);
    scene.add(contactOfficeGroup);

    // ── Pointer Raycasting ──
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes.current);
      if (intersects.length > 0) {
        const target = (intersects[0].object as any).stationTarget;
        setHoveredObject(target || "interactive");
        container.style.cursor = "pointer";
      } else {
        setHoveredObject(null);
        container.style.cursor = "default";
      }
    };

    const handlePointerClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes.current);
      if (intersects.length > 0) {
        const target = (intersects[0].object as any).stationTarget as StationId;
        if (target) {
          navigateToStation(target);
        }
      }
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("click", handlePointerClick);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.fov = w < 768 ? 62 : 48;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      camera.position.lerp(camPosTarget.current, 0.045);
      camLookCurrent.current.lerp(camLookTarget.current, 0.045);
      camera.lookAt(camLookCurrent.current);

      if (avatarMeshRef.current) {
        avatarMeshRef.current.position.y = 1.85 + Math.sin(time * 2.0) * 0.04;
      }

      if (catMeshRef.current) {
        catMeshRef.current.rotation.z = Math.sin(time * 3.5) * 0.03;
      }

      if (lampGroupRef.current) {
        lampGroupRef.current.rotation.z = Math.sin(time * 1.6) * 0.035;
      }

      if (clotheslineGroupRef.current) {
        clotheslineGroupRef.current.children.forEach((child, i) => {
          if (child instanceof THREE.Mesh && child !== clotheslineGroupRef.current?.children[0]) {
            child.rotation.x = Math.sin(time * 2.2 + i * 0.8) * 0.06;
          }
        });
      }

      Object.entries(doorsRef.current).forEach(([key, doorData]) => {
        const targetRot = doorData.isOpen ? -Math.PI / 1.9 : 0;
        doorData.group.rotation.y = THREE.MathUtils.lerp(doorData.group.rotation.y, targetRot, 0.06);
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("click", handlePointerClick);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const navigateToStation = (stationId: StationId) => {
    if (isTransitioning || stationId === currentStation) return;
    setIsTransitioning(true);
    setCurrentStation(stationId);
    if (onStationChange) onStationChange(stationId);

    const targetConfig = STATIONS[stationId];

    if (targetConfig.doorKey && doorsRef.current[targetConfig.doorKey]) {
      doorsRef.current[targetConfig.doorKey].isOpen = true;
    }

    if (stationId === "atrium" || stationId === "corridor") {
      if (doorsRef.current["entranceDoor"]) {
        doorsRef.current["entranceDoor"].isOpen = true;
      }
    }

    camPosTarget.current.set(...targetConfig.camPos);
    camLookTarget.current.set(...targetConfig.camTarget);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  useEffect(() => {
    if (activeStationId && activeStationId !== currentStation) {
      navigateToStation(activeStationId);
    }
  }, [activeStationId]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FAF8F5] select-none">
      <div ref={containerRef} className="w-full h-full" />

      {/* Top Header Navigation Bar */}
      <header className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-[#FAF8F5]/90 backdrop-blur-md px-4 py-2.5 rounded-xl border-2 border-[#181818] shadow-[3px_3px_0px_#181818] flex items-center gap-3">
          <div className="size-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm border-2 border-[#181818]">
            SS
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight text-[#181818]">
              Shashank Shinde
            </div>
            <div className="text-[11px] font-mono text-[#64748B] font-semibold">
              QA Engineering World · 3D Lab
            </div>
          </div>
        </div>

        {/* Current Location Badge */}
        <div className="pointer-events-auto bg-[#FAF8F5]/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#181818] shadow-[3px_3px_0px_#181818] flex items-center gap-2">
          <span className="text-base">{STATIONS[currentStation].icon}</span>
          <div>
            <div className="text-[10px] font-mono uppercase text-[#2563EB] font-bold">
              Current Location
            </div>
            <div className="text-xs font-bold text-[#181818]">
              {STATIONS[currentStation].label}
            </div>
          </div>
        </div>

        {/* Return / Step Back Button */}
        {currentStation !== "entrance" && (
          <button
            onClick={() => navigateToStation(currentStation === "atrium" ? "entrance" : "corridor")}
            className="pointer-events-auto px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F1ECE1] border-2 border-[#181818] text-[#181818] font-bold text-xs shadow-[3px_3px_0px_#181818] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
          >
            <span>←</span>
            <span>{currentStation === "atrium" ? "Exit to Façade" : "Back to Hallway"}</span>
          </button>
        )}
      </header>

      {/* Hover Tooltip */}
      {hoveredObject && !isTransitioning && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none z-30 bg-[#181818] text-[#FAF8F5] px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold shadow-lg animate-bounce">
          Click to inspect &rarr;
        </div>
      )}

      {/* Bottom Hand-Drawn Architectural Station Dock */}
      <nav className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 max-w-[95vw] overflow-x-auto p-2 bg-[#FAF8F5]/95 backdrop-blur-lg rounded-2xl border-2 border-[#181818] shadow-[4px_4px_0px_#181818] flex items-center gap-1.5 sm:gap-2">
        {(Object.keys(STATIONS) as StationId[]).map((id) => {
          const st = STATIONS[id];
          const isActive = currentStation === id;

          return (
            <button
              key={id}
              onClick={() => navigateToStation(id)}
              disabled={isTransitioning}
              className={`relative px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border-2 ${
                isActive
                  ? "bg-[#2563EB] text-white border-[#181818] shadow-[2px_2px_0px_#181818] scale-105"
                  : "bg-white text-[#181818] border-transparent hover:border-[#181818] hover:bg-[#F3EFE6]"
              } disabled:opacity-50`}
              title={st.subLabel}
            >
              <span>{st.icon}</span>
              <span className="hidden sm:inline font-sans">{st.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Watermark / Attribution */}
      <div className="absolute bottom-1 right-4 pointer-events-none z-20 text-[10px] font-mono text-[#64748B]">
        3D Hand-Drawn World · Three.js Engine
      </div>
    </div>
  );
}
