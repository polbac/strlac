import * as THREE from 'three';
import{ ItemBase } from './item-base'

export const IMAGE_ITEM_TYPE = 'image'
const IMAGE_WIDTH = 10;
const IMAGE_HEIGHT = 10;

export class ImageItem extends ItemBase{
    constructor(data, rendered) {
        super()
        this.data = data; 
        this.rendered = rendered;       
    }

    build() {
        const image = `space/${this.data.src}`
        
        this.map = new THREE.TextureLoader().load(image);
        this.material = new THREE.SpriteMaterial( { map: this.map } );
        this.sprite = new THREE.Sprite( this.material );
        this.image = new Image()
        this.image.onload = () => {
            if (this.image.width > this.image.height) {
                this.sprite.scale.set(IMAGE_WIDTH, IMAGE_WIDTH * (this.image.height / this.image.width), 1);    
            } else {
                this.sprite.scale.set(IMAGE_HEIGHT * (this.image.width  / this.image.height), IMAGE_HEIGHT, 1);    
            }
        }
        this.image.src = image
        this.sprite._data = this.data
    }

    getItem() {
        return this.sprite
    }

    getItemDetectMouse() {
        return this.sprite
    }

    render() {

    }
}