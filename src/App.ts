import * as THREE from "three";

import RubiksCube from "./RubiksCube";

export default class App {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  rubiks = new RubiksCube();

  init() {
    const { renderer, camera, rubiks, scene } = this;

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 7;

    rubiks.init(scene);
  }

  animate() {
    const { rubiks, renderer, scene, camera } = this;

    requestAnimationFrame(this.animate.bind(this));

    rubiks.animate();

    renderer.render(scene, camera);
  }
}
