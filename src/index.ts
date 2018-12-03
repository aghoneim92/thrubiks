import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const group = new THREE.Group();

let cubePositions = [];

function setupCubes() {
  const materials = [
    // Right (red)
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    // Left (orange)
    new THREE.MeshBasicMaterial({ color: 0xffa500 }),
    // Up (white)
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    // Down (yellow)
    new THREE.MeshBasicMaterial({ color: 0xffff00 }),
    // Front (green)
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    // Back (blue)
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
  ];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        const cube = new THREE.Mesh(geometry, materials);
        const x = i - 1,
          y = j - 1,
          z = k - 1;
        cubePositions.push([x, y, z]);
        cube.position.x = x * 2;
        cube.position.y = y * 2;
        cube.position.z = z * 2;

        group.add(cube);
      }
    }
  }

  scene.add(group);
}

camera.position.z = 7;
group.rotation.x = 0.5;

enum Intro {
  FloatLeft,
  SpinRight,
  FloatRight
}

let intro = Intro.FloatLeft;

function animate() {
  requestAnimationFrame(animate);
  // group.rotation.x += 0.01;

  switch (intro) {
    case Intro.FloatLeft:
      group.rotation.y -= 0.01;
      break;
    case Intro.SpinRight:
      group.rotation.y += 0.05;
      group.children.forEach((child, index) => {
        child.position.x /= 1.01;
        child.position.y /= 1.01;
        child.position.z /= 1.01;

        if (
          child.position.x > 0 &&
          child.position.x - cubePositions[index][0] <= Number.EPSILON
        ) {
          intro = Intro.FloatRight;
        }
      });
      break;
    case Intro.FloatRight:
      group.rotation.y += 0.01;
      break;
  }

  renderer.render(scene, camera);
}
setupCubes();
animate();

setTimeout(() => {
  intro = Intro.SpinRight;
}, 3000);
