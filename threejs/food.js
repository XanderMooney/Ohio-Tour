import * as THREE from 'three'
import { Box3 } from 'three'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const scene = new THREE.Scene()
const light = new THREE.AmbientLight(0xffffff)
scene.add(light);
const renderer = new THREE.WebGLRenderer({ alpha: true })
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000)
renderer.setSize(window.innerWidth, window.innerHeight, false)
renderer.domElement.classList.add('canvas')
renderer.outputEncoding = THREE.sRGBEncoding
renderer.outputColorSpace = THREE.SRGBColorSpace
document.body.appendChild(renderer.domElement)

const loader = new GLTFLoader()
loader.load("../models/hamburger/scene.gltf", function(gltf) {
  const model = gltf.scene
  let vector;
  
  scene.add(model)
  
  model.rotation.set(0.1, 2.4, 0.6);

  const box3 = new Box3().setFromObject(gltf.scene)
  vector = new THREE.Vector3()
  box3.getCenter(vector)
  model.position.set(-vector.x + 35, -vector.y + 90, -vector.z - 120)

  animate()
}, undefined, function(error) {
  console.log(error)
});
loader.load("../models/taco-from-poly-by-google/taco.gltf", function(gltf) {
  const model = gltf.scene
  let vector;
  
  model.rotation.set(0, -2.3, -0.3);

  scene.add(model)

  const box3 = new Box3().setFromObject(gltf.scene)
  vector = new THREE.Vector3()
  box3.getCenter(vector)
  model.position.set(-vector.x, -vector.y, -vector.z - 5)

  animate()
}, undefined, function(error) {
  console.log(error)
});

let radius = 8;
let time = 0;
let clock = new THREE.Clock()
function animate() {

//   time += clock.getDelta()

  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  convertFov(100, window.innerWidth, window.innerHeight)
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight, false)
})

// Thanks to Jack Kennedy for this lovely repsonsiveness
function convertFov(fov, vw, vh) {
  const DEVELOPER_SCREEN_ASPECT_RATIO_HEIGHT = 10;
  const DEVELOPER_SCREEN_ASPECT_RATIO_WIDTH = 16;
  
  return (
      (Math.atan(Math.tan((fov * Math.PI) / 360) / ((DEVELOPER_SCREEN_ASPECT_RATIO_HEIGHT / DEVELOPER_SCREEN_ASPECT_RATIO_WIDTH) * (vw / vh))) *
          360) /
      Math.PI
  );
}