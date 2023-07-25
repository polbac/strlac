import 'babel-polyfill';
import Navigo from 'navigo';

import $ from "jquery"
import { Space } from './js/pages/space'
import { Releases } from './js/pages/releases'


const EventEmitter = require('events')

global.eventEmitter = new EventEmitter()

window.page = null;

const router = new Navigo(null, false);

const gotoPage = Section => {
  if (window.page) {
    window.page.destroy()
  }

  window.page = new Section(router)
}



window.onload = () => {
  router.on('/releases', function () {
      gotoPage(Releases)
      window.currentPage = 'Releases'
    })
  
  router.on(function () {
      gotoPage(Random)
      window.currentPage = 'Space'
    })  
  
  router.resolve()
    

  
  
}

window.onresize = () => {
  if (window.page.resize) {
    window.page.resize()
  }
}

$(".landing").on("click",() =>{
  $(".landing").remove()
  window.page.startInteraction()
})

