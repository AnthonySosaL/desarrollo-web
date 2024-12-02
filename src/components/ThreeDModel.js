import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDModel = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const container = document.getElementById('threeDCanvas');
    container.appendChild(renderer.domElement);

    // Fondo con viñeta negra alrededor
    const vignetteTexture = new THREE.CanvasTexture(createVignetteCanvas());
    scene.background = vignetteTexture;

    // Suelo para recibir sombras
    const floorGeometry = new THREE.CircleGeometry(50, 64);
    const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.4 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.30;
    floor.receiveShadow = true;
    scene.add(floor);

    // Luz ambiental más intensa
    const ambientLight = new THREE.AmbientLight(0xfff2e6, 20);
    scene.add(ambientLight);

    // Luz direccional más fuerte
    const directionalLight = new THREE.DirectionalLight(0xffe6b3, 20);
    directionalLight.position.set(-10, 15, 10); // Ajusta 'x', 'y', y 'z' según el nuevo ángulo deseado

    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -15;
    directionalLight.shadow.camera.right = 15;
    directionalLight.shadow.camera.top = 15;
    directionalLight.shadow.camera.bottom = -15;
    scene.add(directionalLight);



    // Cargar modelo GLB
    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/prueba.glb',
      (gltf) => {
        const model = gltf.scene;

        model.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            if (node.material) {
              node.material.metalness = 0.9;
              node.material.roughness = -1;
            }
          }
        });

        model.position.set(0, -1.4, 0);
        model.scale.set(1.08, 1.08, 1.08);
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo:', error);
      }
    );

    // Configurar cámara
    camera.position.set(8, 5, 9);
    camera.lookAt(0, 0, 0);

    // Configurar OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 4;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const createVignetteCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(256, 256, 150, 256, 256, 350);
    gradient.addColorStop(0, '#ff9900');
    gradient.addColorStop(1, '#cc3300');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;
  };

  return (
<div
  id="threeDCanvas"
  style={{
    width: '100%',
    height: 'calc(100vh - 160px)', // Dynamically adjust height
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    margin: '0 auto', // Center horizontally if needed
  }}
/>
  );
  
};

export default ThreeDModel;
