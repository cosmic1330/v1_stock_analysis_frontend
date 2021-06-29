<template>
<div>
    
    <div id="ThreeContainer">
        <p>Loading.<span>.</span></p>
    </div>
</div>
</template>

<style>
    @keyframes showTime {
        0% { opacity: 0;}
        100% { opacity: 1;}
    }
    #ThreeContainer>p{
        position: absolute;
        top:40%;
        left:50%;
        transform: translateX(-50%) translateY(-50%);
        z-index: 1;
        font-size: 40px;
    }
    #ThreeContainer>p>span{
        animation: showTime 1s infinite ;
    }
</style>

<script>
import  * as THREE from 'three';
import AirPlane from "./airplane.js";
export default {
    name: "Three",
    mounted() {
        this.init()
        this.animate()
    },
    components: {
    },
    data() {
        return {
            airplane:null,
            camera: null,
            scene: null,
            renderer: null,
            mesh: null
        }
    },
    methods: {
        init: function() {
            this.scene = new THREE.Scene()
            this.camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                1,
                1000
            )

            this.renderer = new THREE.WebGLRenderer()
            this.renderer.setSize(window.innerWidth-112, window.innerHeight-200)
            this.renderer.setClearColor('#fff', 1.0)
            this.renderer.shadowMap.enable = true
            document.getElementById('ThreeContainer').appendChild(this.renderer.domElement)

            this.createPlane()

            this.camera.position.set(0, 50, 150) 
        },
        createPlane: function() { 
            this.airplane = new AirPlane();
            this.airplane.mesh.scale.set(.25,.25,.25);
            this.airplane.mesh.position.y = 0;
            this.airplane.mesh.position.x = -50;
            this.scene.add(this.airplane.mesh);

            let hemisphereLight  = new THREE.HemisphereLight(0xffffff, 0x333333, 2.5);
            hemisphereLight .position.set(100, 0, -50); 
            this.scene.add( hemisphereLight );
        },
        animate: function() {
            requestAnimationFrame( this.animate );
            this.airplane.propeller.rotation.x += 0.3;
            this.airplane.mesh.position.x += 0.5;
            if(this.airplane.mesh.position.x>150){
                this.airplane.mesh.position.x = -150
            }
            this.renderer.render(this.scene, this.camera)
        }
    }
};
</script>
