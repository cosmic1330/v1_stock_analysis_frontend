import  * as THREE from 'three';
var Colors = {
    red:0xf25346,    
    white:0xd8d0d1,    
    brown:0x59332e,    
    pink:0xF5986E,    
    brownDark:0x23190f,    
    blue:0x68c3c0
 };
let AirPlane = function() {
	
	this.mesh = new THREE.Object3D();
	
	// Create the cabin
	var geomCockpit = new THREE.BoxGeometry(60,50,50);
    var matCockpit = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
    geomCockpit.verticesNeedUpdate = true;
	let cockpit = new THREE.Mesh(geomCockpit, matCockpit);
	cockpit.castShadow = true;
	cockpit.receiveShadow = true;
	this.mesh.add(cockpit);
	
	
	// Create the engine
	let geomEngine = new THREE.BoxGeometry(20,50,50);
	let matEngine = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
	let engine = new THREE.Mesh(geomEngine, matEngine);
	engine.position.x = 40;
	engine.castShadow = true;
	engine.receiveShadow = true;
	this.mesh.add(engine);
	
	// Create the tail
	let geomTailPlane = new THREE.BoxGeometry(15,20,5);
	let matTailPlane = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	let tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
	tailPlane.position.set(-35,25,0);
	tailPlane.castShadow = true;
	tailPlane.receiveShadow = true;
	this.mesh.add(tailPlane);
	
	// Create the wing
	let geomSideWing = new THREE.BoxGeometry(40,8,150);
	let matSideWing = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	let sideWing = new THREE.Mesh(geomSideWing, matSideWing);
	sideWing.castShadow = true;
	sideWing.receiveShadow = true;
	this.mesh.add(sideWing);
	
	// propeller
	let geomPropeller = new THREE.BoxGeometry(20,10,10);
	let matPropeller = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
	this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
	this.propeller.castShadow = true;
	this.propeller.receiveShadow = true;
	
	// blades
	let geomBlade = new THREE.BoxGeometry(1,100,20);
	let matBlade = new THREE.MeshPhongMaterial({color:Colors.brownDark, shading:THREE.FlatShading});
	
	let blade = new THREE.Mesh(geomBlade, matBlade);
	blade.position.set(8,0,0);
	blade.castShadow = true;
	blade.receiveShadow = true;
	this.propeller.add(blade);
	this.propeller.position.set(50,0,0);
	this.mesh.add(this.propeller);

	
};
export default AirPlane;
