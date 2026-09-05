import React, { useEffect, useRef } from 'react';  
import * as THREE from 'three';  
  
const ParticleEffect = () => {  
  const containerRef = useRef(null);  
  const particles = useRef([]);  
  
  useEffect(() => {  
    const container = containerRef.current;  
    if (!container) return;  
  
    const scene = new THREE.Scene();  
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });  
    renderer.setSize(window.innerWidth, window.innerHeight);  
    container.appendChild(renderer.domElement);  
  
    // Create particles  
    const geometry = new THREE.BufferGeometry();  
    const vertices = [];  
  
    for (let i = 0; i < 5000; i++) {  
      vertices.push(  
        (Math.random() - 0.5) * 20,  
        (Math.random() - 0.5) * 20,  
        (Math.random() - 0.5) * 20  
      );  
    }  
  
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));  
  
    const material = new THREE.PointsMaterial({  
      color: 0xa855f7,  
      size: 0.02,  
      transparent: true,  
      opacity: 0.6  
    });  
  
    const points = new THREE.Points(geometry, material);  
    scene.add(points);  
  
    camera.position.z = 5;  
  
    const animate = () => {  
      requestAnimationFrame(animate);  
      points.rotation.x += 0.001;  
      points.rotation.y += 0.002;  
      renderer.render(scene, camera);  
    };  
  
    animate();  
  
    const handleResize = () => {  
      camera.aspect = window.innerWidth / window.innerHeight;  
      camera.updateProjectionMatrix();  
      renderer.setSize(window.innerWidth, window.innerHeight);  
    };  
  
    window.addEventListener('resize', handleResize);  
  
    return () => {  
      window.removeEventListener('resize', handleResize);  
      container.removeChild(renderer.domElement);  
    };  
  }, []);  
  
  return <div ref={containerRef} className="particle-container" />;  
};  
  
export default ParticleEffect;  
