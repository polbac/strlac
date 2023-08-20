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
        
       
    }

    destroy() {
        $("body").removeClass("green")
    }
}