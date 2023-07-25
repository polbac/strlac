import $ from 'jquery'


export class Base {
    constructor(router, pageSlug, type) {
        this.type = type
        this.pageSlug = pageSlug
        
        $("#preloader").show()
        this.router = router
        require(`../styles/${pageSlug}.css`);
        const template = require(`../templates/${pageSlug}.hbs`);
        
        

        document.querySelector("#root").style.display = "block"

        $('#section').html(template())

        this.bindLinks()

        $("#preloader").hide()

        if (this.show) this.show()

        window.scrollTo(0, 0)
        
        
    }

    bindLinks() {
        $('#section a').not("[target]").on('click', (event) => {
            event.preventDefault()
            this.router.navigate($(event.target).attr("href"), true)
            return false
        })
    }


    reRender() {
        const template = require(`../templates/${this.pageSlug}.hbs`);
        const extracts = ExtractsManager.getExtracts()

        $('#section').html(template({ extracts }))
    }
    

}