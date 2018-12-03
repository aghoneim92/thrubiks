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
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  light = new THREE.AmbientLight(0xffffff);
  pointLight = new THREE.PointLight(0xffffff, 1, 100);

  init() {
    const { renderer, camera, rubiks, scene } = this;

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 7;

    window.addEventListener("mousemove", this.onMouseMove.bind(this), false);
    window.addEventListener("mousedown", this.onMouseDown.bind(this), false);
    window.addEventListener("mouseup", this.onMouseUp.bind(this), false);

    this.pointLight.position.set(-10, -10, -10);

    scene.add(this.light);
    scene.add(this.pointLight);

    rubiks.init(scene);
  }

  onMouseMove(event: MouseEvent) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  isMouseDown = false;

  onMouseDown() {
    this.isMouseDown = true;
  }
  onMouseUp() {
    this.isMouseDown = false;
  }

  animate() {
    const { rubiks, renderer, scene, camera } = this;

    requestAnimationFrame(this.animate.bind(this));

    rubiks.animate();

    this.raycaster.setFromCamera(this.mouse, camera);

    const intersects = this.raycaster.intersectObjects(rubiks.group.children);

    if (this.isMouseDown) {
      intersects.forEach(({ object: { position: { x, y, z } } }) => {
        this.pointLight.position.set(x, y, z);
      });
    }

    renderer.render(scene, camera);
  }
}
