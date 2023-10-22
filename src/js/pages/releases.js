import { Base } from './base'
import releases from '../data/releases'
import $ from "jquery"
import { TweenMax } from 'gsap/gsap-core'
export class Releases extends Base{

    constructor(router) {

        super(
            router,
            'releases',
            releases
        )
        
    }


    show() {
       
       let index = 0
       $(".r").each(function() {
        TweenMax.set(this,{y:1000})
        
        TweenMax.to(this,{y:0},{speed:1,opacity:1}).delay(index*0.1)
        index++
       })

    }

    destroy() {
        
    }
}