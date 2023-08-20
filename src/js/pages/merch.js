import { Base } from './base'
import releases from '../data/releases'
import $ from "jquery"
import { TweenMax } from 'gsap/gsap-core'
export class Merch extends Base{

    constructor(router) {

        super(
            router,
            'merch',
            releases
        )
        
    }


    show() {
        $("body").addClass("white")
        let index = 0
        $(".product").each(function() {
         TweenMax.set(this,{y:100,opacity:0})
         
         TweenMax.to(this,1,{y:0,opacity:1}).delay(index*0.2)
         index++
        })
       
    }

    destroy() {
        $("body").removeClass("white")
    }
}