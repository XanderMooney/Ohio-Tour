import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer( { alpha: true });
renderer.setSize(window.innerWidth /4, window.innerHeight/4, false);
document.body.appendChild(renderer.domElement);
renderer.domElement.classList.add('canvas')

const modelLoader = new GLTFLoader();
modelLoader.load('models/japanese_bus_nagoya_city_bus_aichi/scene.gltf'), function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error("your model did an oopsie")
}