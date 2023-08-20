import { Base } from './base'
import releases from '../data/releases'
import $ from "jquery"
import { TweenMax } from 'gsap/gsap-core'
export class About extends Base{

    constructor(router) {

        super(
            router,
            'about',
            releases
        )
        
    }


    show() {
        
           let index = 0
           $(".people").each(function() {
            TweenMax.set(this,{y:100,opacity:0})
            
            TweenMax.to(this,1,{y:0,opacity:1}).delay(index*0.2)
            index++
           })
       
    }

    destroy() {
        
    }
}