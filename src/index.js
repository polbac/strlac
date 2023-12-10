import 'babel-polyfill';
import Navigo from 'navigo';
import { Space } from './js/pages/space'
import { Releases } from './js/pages/releases'
import { About } from './js/pages/about'
import { Merch } from './js/pages/merch'
import { Contact } from './js/pages/contact'
import { Release } from './js/pages/release'

console.log("STRLAC WEBSITE :: loaded")

const EventEmitter = require('events')

global.eventEmitter = new EventEmitter()

window.page = null;

const router = new Navigo(null, false);

const gotoPage = (Section,r) => {
  if (window.page && window.page.destroy) {
    window.page.destroy()
  }

  window.page = new Section(router,r)
}



window.onload = () => {
  console.log("window.onload")
  router.on(`${PRE_PATH}releases`, function (r) {
    console.log("releases")
      gotoPage(Releases, r)
      window.currentPage = 'Releases'
    })
    router.on(`${PRE_PATH}about`, function (r) {
      console.log("about")
      gotoPage(About,r)
      window.currentPage = 'About'
    })
    router.on(`${PRE_PATH}merch`, function (r) {
      console.log("merch")
      gotoPage(Merch,r)
      window.currentPage = 'Merch'
    })
    router.on(`${PRE_PATH}contact`, function (r) {
      console.log("contact")
      gotoPage(Contact,r)
      window.currentPage = 'Contacto'
    })
    router.on(`${PRE_PATH}release/:slug`, function (r) {
      console.log("release/slug")
      gotoPage(Release,r)
      window.currentPage = 'Release'
    })

    router.on(`${PRE_PATH}`, function (r) {
      console.log("/")
      gotoPage(Space,r)
      window.currentPage = 'STRLAC'
    })
  
  router.on(function (r) {
    console.log("SPACE")
      gotoPage(Space,r)
      window.currentPage = 'STRLAC'
    })  
  
  router.resolve()
    

  
  
}


window.onresize = () => {
  if (window.page && window.page.resize) {
    window.page.resize()
  }
}

