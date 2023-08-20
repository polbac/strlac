import * as THREE from 'three';
import { arrayDivider } from '../utils/array'
import { SpaceGroup } from '../components/space/group'
import { UserControl, MOVE, MOUSE_MOVE, CLICK } from '../components/space/user-control'
import {TweenMax} from 'gsap'
import {Base} from './base'
import SpaceData from '../data/space'
import $ from "jquery"

export class Space  extends Base{

    constructor(router) {
        

        super(
            router,
            'space',
        )

        
    }

    show() {
        TweenMax.set(".item-0", {opacity:0})
        TweenMax.set(".landing", {display:"block"})
        

        $(".landing").on("click",() =>{
            TweenMax.to(".landing", 1,{opacity:0,onComplete:() => {
                TweenMax.set(".item-0", {opacity:1})
                TweenMax.set(".landing", {display:"none"})
                
                  window.page.startInteraction()
                
            }})
            
            
          })
          

        this.active = true
        this.currentOver = null
        this.userControl = new UserControl()
        const areas =  arrayDivider(SpaceData, 2)
        this.renderer = new THREE.WebGLRenderer();
        
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0x000000, 1);
        
        this.renderer.localClippingEnabled = true;
        
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
        this.scene = new THREE.Scene();
        
        this.light = new THREE.DirectionalLight( 0xffffff, 0.5 );
        this.light.position.z = 5
        
        this.light.castShadow = true
        this.scene.add(this.light) 
        

        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2();
        this.counter = 0

        /* this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
	    this.renderer.toneMappingExposure = 1; */
        
        const pmremGenerator = new THREE.PMREMGenerator( this.renderer );
		pmremGenerator.compileEquirectangularShader();

        this.renderer.setPixelRatio( window.devicePixelRatio );

        document.body.appendChild( this.renderer.domElement );
        

        this.groups = [
            new SpaceGroup(areas[0], this.scene, 0, this.renderer),
            new SpaceGroup(areas[1], this.scene, 1, this.renderer),
        ]
        
        this.groups[0].build()
        this.groups[1].build()
        this.animate.bind(this)()
        
       

        TweenMax.set(".canvas-video", { opacity: 0 })
        
        window.isInRandom = true
    }

    startInteraction(){
        global.eventEmitter.on(
            MOVE,
            this.move.bind(this)
        )

        global.eventEmitter.on(
            MOUSE_MOVE,
            this.mouseMove.bind(this)
        )

        global.eventEmitter.on(
            CLICK,
            this.click.bind(this)
        )
    }

    reRandom() {
        this.groups[0].reRandom()
        this.groups[1].reRandom()
    }

    move(coor) {
        this.coor = coor
    }

    mouseMove(coor) {
        this.mouse.x = ( coor.x / window.innerWidth ) * 2 - 1;
	    this.mouse.y = - ( coor.y / window.innerHeight ) * 2 + 1;
    }

    click() {
        if(this.currentOver && this.active) {
            const { type, slug } = this.currentOver.object._data
            this.router.navigate(`${type}/${slug}`)
        }
    }

    
    animate() {
        if (this.groups){
            this.groups.forEach(group => {
                if (this.coor) group.move(this.coor)
                group.render()
            })
        }
        
        this.camera.updateProjectionMatrix();
        this.idAnimationFrame = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);

        this.raycaster.setFromCamera(this.mouse, this.camera);

        if (this.groups) {
            const items = []
            this.groups.forEach(group => {
                group.items.forEach(item => {
                    items.push(item.getItemDetectMouse())
                })
                
            })

            const intersects = this.raycaster.intersectObjects(items);

            if (!!intersects.length && !window.showingLanding) {
                //document.querySelector('body').style.cursor = 'pointer'
                this.currentOver = intersects[0]
            } else {
                //document.querySelector('body').style.cursor = 'initial'
                this.currentOver = null
            }
        }

        
        
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }


}