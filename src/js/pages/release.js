import { Base } from './base'
import releases from '../data/releases'
import { trifasica } from './trifasica'
import $ from "jquery"
import { TweenMax } from 'gsap/gsap-core'
export class Release extends Base{

    constructor(router,m) {
        const [,r] = m.url.split("/")
        
        const release = releases.find(release => release.slug === r)
        if (release.naranja){
            $('.logo-naranja').addClass('show')
            $('.logo-blanco').addClass('hide')
        } 

        if(r==="trifasica"){
            super(router, 'trifasica', release);
            trifasica()
        }else{
            super(router, 'release', release)
        }
        
        
    }


    show() {
        $(".zoom-gallery").click(()=>{
            $(".zoom-gallery").css({display:"none"})
        })
        TweenMax.from('#release',0.5,{y:10,opacity:0})
        
        $(".release-gallery img").click(function(){
         const source = $(this).attr("src");
         $(".zoom-gallery img").attr("src",source);
         $(".zoom-gallery").css({display:"flex"})

        })
        
       
    }

    destroy() {
        
        $('.logo-naranja').addClass("hide")
        $('.logo-blanco').addClass('show')
    }
}