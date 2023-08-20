import { Base } from './base'
import releases from '../data/releases'
import $ from "jquery"
import { TweenMax } from 'gsap/gsap-core'
export class Release extends Base{

    constructor(router,m) {
        const [,r] = m.url.split("/")
        
        const release = releases.find(release => release.slug === r)
        super(
            router,
            'release',
            release
        )
        
    }


    show() {
        TweenMax.from('#release',0.5,{y:10,opacity:0})

       
    }

    destroy() {
        
    }
}