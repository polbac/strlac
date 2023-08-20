import $ from 'jquery'


export class Base {
    constructor(router, pageSlug, data={}) {
        this.pageSlug = pageSlug
        
        $("#preloader").show()
        this.router = router

        const template = require(`../../templates/${pageSlug}.hbs`);

        
        

        document.querySelector("#root").style.display = "block"

        $('#section').html(template({data}))

        this.bindLinks()

        $("#preloader").hide()

        if (this.show) this.show()

        window.scrollTo(0, 0)
        
        
    }

    bindLinks() {
        $('#section a').not("[target]").on('click', (event) => {
            event.preventDefault()
            this.router.navigate($(event.currentTarget).attr("href"), true)
            return false
        })
    }


    reRender() {
       
    }
    

}