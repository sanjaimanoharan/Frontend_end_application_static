// Get a reference to the container element where the 3D model will be displayed
const modelContainer = document.getElementById('model-container');

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
modelContainer.appendChild(renderer.domElement);

// Request access to the camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        // Camera access granted, continue loading the 3D model
        const videoElement = document.createElement('video');
        videoElement.srcObject = stream;
        videoElement.play();

        // Add the video element to the scene as a texture
        const videoTexture = new THREE.VideoTexture(videoElement);
        const material = new THREE.MeshBasicMaterial({ map: videoTexture });
        const geometry = new THREE.PlaneGeometry(16, 9);
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // Load the GLTF model using GLTFLoader
        const loader = new THREE.GLTFLoader();
        loader.load(
            'COLLEGE_PROJECT/Temple/Temple Asset Pack.glb', // Replace 'path/to/your/model.glb' with the actual path to your GLTF model file
            function (gltf) {
                scene.add(gltf.scene);
            },
            undefined,
            function (error) {
                console.error('Error loading GLTF model:', error);
            }
        );

        // Set up animation loop
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();

        // Function to toggle 3D mode (you can customize this as needed)
        function toggle3DMode() {
            // Your code to toggle 3D mode goes here
            console.log('Toggling 3D Mode');
        }
    })
    .catch(function (error) {
        // Camera access denied or not available
        console.error('Error accessing camera:', error);
    });

// Get references to the links in the navbar
const homeLink = document.getElementById('home-link');
const arviewLink = document.getElementById('arview-link');

// Get the current page URL
const currentPage = window.location.href;

// Check if the current page matches each link's href attribute and add the active-link class accordingly
if (currentPage.includes('index.html')) {
    homeLink.classList.add('active-link');
} else if (currentPage.includes('arview.html')) {
    arviewLink.classList.add('active-link');
}

// Update the links' click event handlers to remove active-link class from other links
homeLink.addEventListener('click', function() {
    homeLink.classList.add('active-link');
    arviewLink.classList.remove('active-link');
});

arviewLink.addEventListener('click', function() {
    homeLink.classList.remove('active-link');
    arviewLink.classList.add('active-link');
});
