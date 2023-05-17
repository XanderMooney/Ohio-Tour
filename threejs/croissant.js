import * as THREE from 'three'
import { Box3 } from 'three'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

let holder = document.getElementById('cardHolder').children[0].children[0]
const scene = new THREE.Scene()
const light = new THREE.AmbientLight(0xffffff)
scene.add(light);
const renderer = new THREE.WebGLRenderer({ alpha: true })
const camera = new THREE.PerspectiveCamera(100, holder.clientWidth * 1.2 / holder.clientHeight * 1.2, 0.1, 1000)
renderer.setSize(holder.clientWidth * 1.2, holder.clientHeight * 1.2, false)

renderer.domElement.classList.add('canvas')
renderer.domElement.style.position = 'absolute'
renderer.domElement.style.marginTop = 'calc(-50vh * 1.2)'
renderer.outputEncoding = THREE.sRGBEncoding
renderer.outputColorSpace = THREE.SRGBColorSpace


holder.appendChild(renderer.domElement)

const loader = new GLTFLoader()
loader.load("../models/croissant/scene.gltf", function(gltf) {
  const model = gltf.scene
  let vector;
  
  scene.add(model)
  
  model.rotation.set(0.8, 0, 0.2);
  
  const box3 = new Box3().setFromObject(gltf.scene)
  vector = new THREE.Vector3()
  box3.getCenter(vector)
  model.position.set(-vector.x + 350, -vector.y + 500, -vector.z - 700)

  animate()
}, undefined, function(error) {
  console.log(error)
});

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

addEventListener("resize", () => {
  camera.aspect = holder.clientWidth * 1.2 / holder.clientHeight * 1.2
  convertFov(100, holder.clientWidth * 1.2, holder.clientHeight * 1.2)
  camera.updateProjectionMatrix()
  renderer.setSize(holder.clientWidth * 1.2, holder.clientHeight * 1.2, false)
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