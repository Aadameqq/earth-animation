const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.0001,
  10000
);
camera.position.set(0, 0, 50);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const onResize = () => {
  const { innerWidth, innerHeight } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};

const createLight = (i) => new THREE.PointLight(0xffffff, i);

const earthGeo = new THREE.SphereGeometry(5, 32, 32);

const earthMat = new THREE.MeshPhongMaterial({ color: 0x3495eb, shininess: 0 });

const earth = new THREE.Mesh(earthGeo, earthMat);

const light1 = createLight(3.8);
const light2 = createLight(0.1);

light1.position.set(60, 20, 60);
light2.position.set(-30, 0, 20);

const center = new THREE.Object3D();
center.add(light1, light2);

scene.add(earth);
earth.add(center);

const moonGeo = new THREE.SphereGeometry(1, 32, 32);

const moonMat = new THREE.MeshPhongMaterial({ color: 0xbababa, shininess: 0 });

const moon = new THREE.Mesh(moonGeo, moonMat);
const moonCenter = new THREE.Object3D();
moonCenter.add(moon);

moon.position.set(10, 0, 0);

earth.add(moonCenter);

let lastX = 0;
let lastY = 0;
let i = 0;

const getPosition = (event) => {
  if (event.x != lastX) {
    earth.rotation.y += event.movementX / 200;
  }
  if (event.y != lastY) {
    earth.rotation.x += event.movementY / 200;
  }
  lastX = event.x;
  lastY = event.y;
  renderer.render(scene, camera);
};

const update = () => {
  moonCenter.rotation.y -= 0.03;
  earth.rotation.y += 0.01;
  center.rotation.y += 0.003;
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};
update();

document.addEventListener("mousemove", getPosition);
window.addEventListener("resize", onResize);
