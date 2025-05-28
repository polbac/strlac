import $ from 'jquery'
import {TRIFASICA_CODES} from "../data/trifasicaCodes"
export function trifasica() {
    $('#descargar').attr('disabled', 'disabled')

    $('#n1').on("keyup", () =>{
        $('#n2').focus();

        checkButton()
    })

    $('#n2').on('keyup', () => {
      $('#n3').focus()
      checkButton()
    })

    $('#n3').on('keyup', () => {
      $('#n4').focus()
      checkButton()
    })

    $('#n4').on('keyup', () => {
      $('#n5').focus()
      checkButton()
    })

    function checkButton(){
        const code = `${$('#n1').val()}${$('#n2').val()}${$('#n3').val()}${$('#n4').val()}`
        $('#error').hide()
        if(code.length === 4){
             $('#descargar').removeAttr('disabled')
        }else{
             $('#descargar').attr('disabled', 'disabled')
        }
    }

    $('#descargar').on("click", () =>{
        const code = `${$('#n1').val()}${$('#n2').val()}${$('#n3').val()}${$('#n4').val()}`
        let found = false
        Object.keys(TRIFASICA_CODES).forEach(key => {
            if (String(TRIFASICA_CODES[key]) === code) {
                found = true
            }
        })

        if(found){
            $('form').hide()
            $('#descargaBotones').show()
            let edicion = ""
            Object.keys(TRIFASICA_CODES).forEach((key) => {
              if (String(TRIFASICA_CODES[key]) === code) {
                edicion=key
              }
            })
            
            $('#edicion').html(edicion)
        } else {
            $('#error').show()
        }

        
        
    })
}
