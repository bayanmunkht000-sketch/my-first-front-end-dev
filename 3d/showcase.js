const scene = new THREE.Scene();

scene.background = new THREE.Color(0x16213e);


const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.set(4, 3, 6);


const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

document.body.appendChild(
  renderer.domElement
);


const controls = new THREE.OrbitControls(
  camera,
  renderer.domElement
);

scene.add(
  new THREE.AmbientLight(0xffffff, 0.4)
);

const dirLight = new THREE.DirectionalLight(
  0xffffff,
  0.8
);

dirLight.position.set(3, 6, 4);

scene.add(dirLight);


const stage = new THREE.Mesh(
  new THREE.CylinderGeometry(2.2, 2.4, 0.3, 48),
  new THREE.MeshStandardMaterial({
    color: 0x37474f
  })
);

stage.position.y = -0.15;

scene.add(stage);

const items = new THREE.Group();

const geos = [
  new THREE.BoxGeometry(0.8, 0.8, 0.8),
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.TorusGeometry(0.4, 0.16, 16, 48)
];

const colors = [
  0x4fc3f7,
  0xffb74d,
  0xef5350
];

geos.forEach((geo, i) => {
  const angle =
    (i / geos.length) * Math.PI * 2;

  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({
      color: colors[i]
    })
  );

  mesh.position.set(
    Math.cos(angle) * 1.4,
    0.6,
    Math.sin(angle) * 1.4
  );

  items.add(mesh);
});

scene.add(items);


function animate() {
  requestAnimationFrame(animate);

  items.rotation.y += 0.005;

  controls.update();

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', function () {
  camera.aspect =
    window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );
});