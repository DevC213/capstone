const { $ } = require('@wdio/globals')
const Launch = require('./launch');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AppliancePage extends Launch {
    /**
     * define selectors using getter methods
     */
    #appliances = ["Kitchen Appliance Packages", "Refrigerators", "Ranges"
                        , "Dishwashers", "Microwaves","Over-the-Range Microwaves"
                        ,"Range Hoods", "Freezers", "Wall Ovens", "Cooktops"
                        ,"Beverage Coolers", "Mini Fridges", "Washer & Dryer Sets"
                        ,"Washers", "Dryers", "Stackable Washers & Dryers"
                        , "Floor Care & Vacuums", "Air Conditioners"]

    async #selector(appliance){
        let item = `//a[contains(text(), "${appliance}")]`
        return $(item)
    }
    async #pageTitle(item){
        let i = `//h1[contains(text(), "${item}")]`
        return $(i)
    }
    get #applianceRtn(){
        let item = `//div[contains(text(), "Appliances")]/ancestor::div[contains(@data-testid, "category")]`
        return $(item)
    }
    get #homeButton(){
        return $('[aria-label="The Home Depot Logo"]')
    }

    async testItems(){
        await this.#applianceRtn.click()
        for(let i of this.#appliances){
            let item = await this.#selector(i)
            await item.moveTo()
            let decoration = await item.getCSSProperty('text-decoration-line')
            await expect(decoration.value.includes('underline') === true)
            await item.click()
            item = await this.#pageTitle(i)
            await item.isExisting()
            await this.#homeButton.click()
            await this.#applianceRtn.click()
        }
    }
    open(){
        return super.open('https://www.homedepot.com/b/Appliances/N-5yc1vZbv1w');
    }
}

module.exports = new AppliancePage();
