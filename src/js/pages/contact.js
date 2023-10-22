import { Base } from './base'

import $ from "jquery"
import { TweenMax } from 'gsap/gsap-core'
export class Contact extends Base{

    constructor(router) {

        super(
            router,
            'contact'
        )
        
    }


    show() {
        $("body").addClass("green")
        $(".col").each(function(index) {
            TweenMax.set(this,{y:100,opacity:0})
            
            TweenMax.to(this,1,{y:0,opacity:1}).delay(index*0.2)
            index++
           })
       
    }

    destroy() {
        $("body").removeClass("green")
    }
}