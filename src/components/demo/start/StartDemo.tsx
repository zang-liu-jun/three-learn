import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function StartDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    console.log(canvasRef);
    
    const canvas = canvasRef.current;
    if (!canvas) {
        console.error('useAllowSeatViewer: no canvas element');
        return;
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    animate();

  }, []);
  return (
    <div style={{ width: "100vw", height: "100vh"}}>
      <canvas style={{ width: "100%", height: "100%" }} ref={canvasRef} />
    </div>
  );
}
