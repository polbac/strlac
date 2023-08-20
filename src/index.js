import 'babel-polyfill';
import Navigo from 'navigo';

import $ from "jquery"
import { Space } from './js/pages/space'
import { Releases } from './js/pages/releases'
import { About } from './js/pages/about'
import { Merch } from './js/pages/merch'
import { Contact } from './js/pages/contact'
import { Release } from './js/pages/release'


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
  router.on('/releases', function (r) {
      gotoPage(Releases, r)
      window.currentPage = 'Releases'
    })
    router.on('/about', function (r) {
      gotoPage(About,r)
      window.currentPage = 'About'
    })
    router.on('/merch', function (r) {
      gotoPage(Merch,r)
      window.currentPage = 'Merch'
    })
    router.on('/contact', function (r) {
      gotoPage(Contact,r)
      window.currentPage = 'Contacto'
    })
    router.on('/release/:slug', function (r) {
      gotoPage(Release,r)
      window.currentPage = 'Release'
    })
  
  router.on(function (r) {
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

