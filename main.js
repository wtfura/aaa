import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup ну кароче запуск сцены, камеры с их настройками и включением рендера я думю да

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// ПОНЧИК АХАХХАХА

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x38005E });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Освещение

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);
//звезды
function addStar() {
  //const geometry = new THREE.SphereGeometry(0.7, 24, 24);
  //const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const starTexure = new THREE.TextureLoader().load('moon.jpg');

  const star = new THREE.Mesh(new THREE.SphereGeometry(0.25, 24, 24),
  new THREE.MeshStandardMaterial({
     map: starTexure
    }));

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// // ЛУНА СВИБОРГ

// const moonTexture = new THREE.TextureLoader().load('moon.jpg');
// //const normalTexture = new THREE.TextureLoader().load('normal.jpg');

// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial({
//     map: moonTexture,
//     //normalMap: normalTexture,
//   })
// );

// задник\бэкграунд

const spaceTexture = new THREE.TextureLoader().load('space.png');
scene.background = spaceTexture;

// Куб с моим ебалом

const wtfuraTexture = new THREE.TextureLoader().load('wtfura.jpg');

const wtfura = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: wtfuraTexture }));

scene.add(wtfura);

// ЛУНА СВИБОРГ

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
//const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    //normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

wtfura.position.z = -5;
wtfura.position.x = 2;

// Scroll Animation Анимация скролинга

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  wtfura.rotation.y += 0.01;
  wtfura.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop 

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
