import * as THREE from 'three';
/* import {FirstPersonControls} from 'three-addons' */

import {TweenMax} from 'gsap'
import {Base} from './base'

import $ from "jquery"




export class Space  extends Base{

    constructor(router) {
        

        super(
            router,
            'space',
        )

        
    }

    show() {

        $("body").addClass("home-color")
        const markText = $("#mark").text()

        $("#mark").html(markText.split("").map(t => `<span>${t}</span>`))

        $("#mark span").each(function(index){
            TweenMax.set(this,{opacity:0})
         
         TweenMax.to(this,1,{opacity:1}).delay(index*0.1)
        })

        this.active = true
       

        TweenMax.set(".canvas-video", { opacity: 0 })
        
        window.isInRandom = true
        
        const worldWidth = 128, worldDepth = 128;
        
        
        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 20000 );
        this.camera.position.y = 200;

				this.clock = new THREE.Clock();

				this.scene = new THREE.Scene();
				this.scene.background = new THREE.Color( 0x000000 );
				this.scene.fog = new THREE.FogExp2( 0x000000, 0.0007 );

				this.geometry = new THREE.PlaneGeometry( 20000, 20000, worldWidth - 1, worldDepth - 1 );
				this.geometry.rotateX( - Math.PI / 2 );

				const position = this.geometry.attributes.position;
				position.usage = THREE.DynamicDrawUsage;

				for ( let i = 0; i < position.count; i ++ ) {

					const y = 35 * Math.sin( i / 2 );
					position.setY( i, y );

				}

				const texture = new THREE.TextureLoader().load( 'water.jpeg' );
				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
				texture.repeat.set( 5, 5 );
				texture.colorSpace = THREE.SRGBColorSpace;

				this.material = new THREE.MeshBasicMaterial( { color: 0xff8f00, map: texture } );

				this.mesh = new THREE.Mesh( this.geometry, this.material );
				this.scene.add( this.mesh );

				this.renderer = new THREE.WebGLRenderer( { antialias: true } );
				this.renderer.setPixelRatio( window.devicePixelRatio );
				this.renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( this.renderer.domElement );

				/* this.controls = new FirstPersonControls( this.camera, this.renderer.domElement );

				this.controls.movementSpeed = 500;
				this.controls.lookSpeed = 0.1; */

				

				//

                this.animate()

				
    }

    
   

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );

       // this.controls.handleResize();
    }

     animate() {

        requestAnimationFrame( this.animate.bind(this) );

        this.render();
        

    }

    render() {

        const delta = this.clock.getDelta();
        const time = this.clock.getElapsedTime() * 10;

        const position = this.geometry.attributes.position;

        for ( let i = 0; i < position.count; i ++ ) {

            const y = 35 * Math.sin( i / 5 + ( time + i ) / 7 );
            position.setY( i, y );

        }

        position.needsUpdate = true;

        
        this.renderer.render( this.scene, this.camera );

    }

    destroy() {
        $("body").removeClass("home-color")
    }



}