"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ─── constants ──────────────────────────────────────────────────────────── */
const PARTICLE_COUNT = 1800;
const ACCENT_CYAN = new THREE.Color(0x00e5ff);
const ACCENT_VIOLET = new THREE.Color(0x7b61ff);
const BG_COLOR = new THREE.Color(0x05070f);

function getSceneLayout(width: number) {
  if (width < 768) {
    return { camZ: 6.4, scale: 1.42, groupX: 0, groupY: 0.2, fov: 58, particleSize: 0.055 };
  }
  if (width < 1024) {
    return { camZ: 5.5, scale: 1.58, groupX: 0.85, groupY: 0, fov: 57, particleSize: 0.062 };
  }
  return { camZ: 4.85, scale: 1.75, groupX: 1.35, groupY: -0.15, fov: 56, particleSize: 0.072 };
}

function applySceneLayout(
  width: number,
  camera: THREE.PerspectiveCamera,
  coreGroup: THREE.Group,
  particleMesh: THREE.Points,
  bigRingMesh: THREE.Mesh,
  particleMat: THREE.PointsMaterial,
) {
  const layout = getSceneLayout(width);
  camera.fov = layout.fov;
  camera.position.z = layout.camZ;
  camera.updateProjectionMatrix();
  coreGroup.scale.setScalar(layout.scale);
  coreGroup.position.set(layout.groupX, layout.groupY, 0);
  particleMesh.scale.setScalar(layout.scale * 1.12);
  bigRingMesh.scale.setScalar(layout.scale * 1.18);
  bigRingMesh.position.copy(coreGroup.position);
  particleMat.size = layout.particleSize;
  particleMat.needsUpdate = true;
  return layout;
}

/* ─── particle cloud geometry ─────────────────────────────────────────────── */
function makeParticles() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = 2.4 + Math.random() * 7.2;
    const theta = Math.acos(2 * Math.random() - 1);
    const phi = Math.random() * Math.PI * 2;
    positions[i * 3 + 0] = r * Math.sin(theta) * Math.cos(phi);
    positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
    positions[i * 3 + 2] = r * Math.cos(theta);

    const t = Math.random();
    const c = ACCENT_CYAN.clone().lerp(ACCENT_VIOLET, t);
    colors[i * 3 + 0] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geo;
}

/* ─── glowing round-dot texture ──────────────────────────────────────────── */
function makeCircleTexture(size = 64): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.7)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

/* ─── wireframe icosahedron helper ───────────────────────────────────────── */
function makeWireIco(radius: number, detail: number, color: THREE.Color, opacity: number) {
  const geo = new THREE.IcosahedronGeometry(radius, detail);
  const mat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });
  return new THREE.Mesh(geo, mat);
}

/* ─── glowing torus helper ───────────────────────────────────────────────── */
function makeTorus(
  r: number,
  tube: number,
  color: THREE.Color,
  opacity: number,
  rx: number,
  ry: number,
) {
  const geo = new THREE.TorusGeometry(r, tube, 6, 120);
  const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = rx;
  mesh.rotation.y = ry;
  return mesh;
}

/* ─── component ──────────────────────────────────────────────────────────── */
export default function SplineHero() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(BG_COLOR, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    mount.appendChild(renderer.domElement);

    /* scene + camera */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.01, 100);
    camera.position.set(0, 0, 7);

    /* ambient light */
    scene.add(new THREE.AmbientLight(0xffffff, 0.1));
    const pLight = new THREE.PointLight(ACCENT_CYAN, 4.5, 18);
    pLight.position.set(2, 2, 3);
    scene.add(pLight);
    const pLight2 = new THREE.PointLight(ACCENT_VIOLET, 3.5, 18);
    pLight2.position.set(-2, -1.5, 2);
    scene.add(pLight2);

    /* core group */
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    /* innermost solid sphere with emissive material */
    const sphereGeo = new THREE.SphereGeometry(0.62, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x0a0e20,
      emissive: new THREE.Color(0x00e5ff),
      emissiveIntensity: 0.18,
      roughness: 0.35,
      metalness: 0.9,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    coreGroup.add(sphereMesh);

    /* layered wireframe icosahedra */
    const ico1 = makeWireIco(0.86, 1, ACCENT_CYAN, 0.16);
    const ico2 = makeWireIco(1.1, 2, ACCENT_VIOLET, 0.1);
    const ico3 = makeWireIco(1.36, 3, ACCENT_CYAN, 0.05);
    coreGroup.add(ico1, ico2, ico3);

    /* orbit rings */
    const ring1 = makeTorus(1.9, 0.0045, ACCENT_CYAN, 0.58, Math.PI / 2, 0);
    const ring2 = makeTorus(2.38, 0.004, ACCENT_VIOLET, 0.48, Math.PI / 2.6, Math.PI / 5);
    const ring3 = makeTorus(2.92, 0.0035, ACCENT_CYAN, 0.32, Math.PI / 1.6, Math.PI / 3);
    coreGroup.add(ring1, ring2, ring3);

    /* orbiting satellite dots */
    type Sat = { mesh: THREE.Mesh; speed: number; phase: number; tilt: number; dist: number };
    const sats: Sat[] = [];
    [0.0055, 0.0038, 0.0072, 0.0048, 0.0031, 0.0062].forEach((speed, i) => {
      const geo = new THREE.SphereGeometry(0.036 + i * 0.005, 10, 10);
      const isViolet = i % 2 === 1;
      const mat = new THREE.MeshStandardMaterial({
        color: isViolet ? ACCENT_VIOLET : ACCENT_CYAN,
        emissive: isViolet ? ACCENT_VIOLET : ACCENT_CYAN,
        emissiveIntensity: 1.2,
        roughness: 0.1,
        metalness: 0.8,
      });
      const mesh = new THREE.Mesh(geo, mat);
      coreGroup.add(mesh);
      sats.push({ mesh, speed, phase: i * 1.05, tilt: 0.3 + i * 0.22, dist: 1.88 + i * 0.22 });
    });

    /* network line lattice on icosahedron surface */
    const latticeGroup = new THREE.Group();
    coreGroup.add(latticeGroup);
    const latGeo = new THREE.IcosahedronGeometry(1.24, 2);
    const positions = latGeo.getAttribute("position");
    const vCount = positions.count;
    const lineMat = new THREE.LineBasicMaterial({ color: ACCENT_CYAN, transparent: true, opacity: 0.18 });
    for (let i = 0; i < vCount; i += 3) {
      const g = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(positions.getX(i), positions.getY(i), positions.getZ(i)),
        new THREE.Vector3(positions.getX(i + 1), positions.getY(i + 1), positions.getZ(i + 1)),
      ]);
      latticeGroup.add(new THREE.Line(g, lineMat));
    }

    /* particle cloud */
    const dotTexture = makeCircleTexture(64);
    const particleGeo = makeParticles();
    const particleMat = new THREE.PointsMaterial({
      size: 0.072,
      map: dotTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      sizeAttenuation: true,
      opacity: 0.7,
    });
    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);

    /* scene-level decorative ring (large, flat) */
    const bigRingGeo = new THREE.RingGeometry(4.2, 4.24, 200);
    const bigRingMat = new THREE.MeshBasicMaterial({ color: ACCENT_CYAN, transparent: true, opacity: 0.06, side: THREE.DoubleSide });
    const bigRingMesh = new THREE.Mesh(bigRingGeo, bigRingMat);
    bigRingMesh.rotation.x = Math.PI / 2.4;
    scene.add(bigRingMesh);

    let layout = applySceneLayout(mount.clientWidth, camera, coreGroup, particleMesh, bigRingMesh, particleMat);

    /* mouse tracking */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const camTarget = new THREE.Vector3();
    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);

    /* resize */
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      layout = applySceneLayout(mount.clientWidth, camera, coreGroup, particleMesh, bigRingMesh, particleMat);
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    /* animation */
    let t = 0;
    let rafId = 0;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (reducedMotion) { renderer.render(scene, camera); return; }

      t += 1;

      /* smooth mouse lag */
      mouse.x += (mouse.tx - mouse.x) * 0.055;
      mouse.y += (mouse.ty - mouse.y) * 0.055;

      /* camera parallax */
      camTarget.set(
        layout.groupX + mouse.x * 0.45,
        layout.groupY + mouse.y * 0.32,
        layout.camZ,
      );
      camera.position.lerp(camTarget, 0.04);
      camera.lookAt(coreGroup.position);

      /* core group slow auto-rotation */
      coreGroup.rotation.y += 0.0028;
      coreGroup.rotation.x += 0.0007;

      /* layered icosahedra counter-rotate for depth */
      ico1.rotation.x -= 0.004;
      ico1.rotation.y += 0.006;
      ico2.rotation.x += 0.003;
      ico2.rotation.z -= 0.005;
      ico3.rotation.y -= 0.002;
      ico3.rotation.z += 0.003;

      /* orbit rings */
      ring1.rotation.z += 0.0045;
      ring2.rotation.z -= 0.0032;
      ring3.rotation.z += 0.0018;

      /* satellites */
      sats.forEach((s) => {
        const angle = t * s.speed + s.phase;
        s.mesh.position.set(
          Math.cos(angle) * s.dist,
          Math.sin(angle * 1.3) * s.tilt,
          Math.sin(angle) * s.dist,
        );
      });

      /* pulsing emissive on core sphere */
      sphereMat.emissiveIntensity = 0.14 + Math.sin(t * 0.025) * 0.07;

      /* particle gentle drift */
      particleMesh.rotation.y += 0.00028;
      particleMesh.rotation.x += 0.00012;

      /* big ring slow rotation */
      bigRingMesh.rotation.z += 0.0008;

      /* point lights follow mouse subtly */
      pLight.position.x = 2 + mouse.x * 1.5;
      pLight.position.y = 2 + mouse.y * 1.2;
      pLight2.position.x = -2 + mouse.x * 1.0;
      pLight2.position.y = -1.5 + mouse.y * 0.8;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      dotTexture.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="hero-scene"
      aria-hidden
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}
    />
  );
}
