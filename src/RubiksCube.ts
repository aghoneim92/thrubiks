import * as THREE from "three";

const geometry = new THREE.BoxGeometry(1, 1, 1);
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

enum Intro {
  FloatLeft,
  SpinRight,
  FloatRight
}

export default class RubiksCube {
  group = new THREE.Group();
  cubePositions = [];
  intro = Intro.FloatLeft;

  init(scene: THREE.Scene) {
    const { cubePositions, group } = this;

    group.rotation.x = 0.5;

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

    setTimeout(() => {
      this.intro = Intro.SpinRight;
    }, 3000);
  }

  animate() {
    const { intro, group, cubePositions } = this;

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
            this.intro = Intro.FloatRight;
          }
        });
        break;
      case Intro.FloatRight:
        group.rotation.y += 0.01;
        break;
    }
  }
}
