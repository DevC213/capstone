const { $ } = require('@wdio/globals')
const Launch = require('./launch');


class microwavePage extends Launch {

    #microwaveBrandsKV = {
        "LG": false, "GE": false, "Whirlpool": false, "Samsung": false, "Frigidaire": false, "KitchenAid": false, "Sharp": false,
        "Vissani": false, "Cafe": false, "Panasonic": false, "Maytag": false, "Magic Chef": false, "ZLINE Kitchen and Bath": false,
        "Bosch": false, "Toshiba": false, "BLACK+DECKER": false, "Commercial CHEF": false, "Emerson": false, "Amana": false, "Nostalgia": false,
        "Galanz": false, "Hotpoint": false, "Cuisinart": false, "Farberware": false, "Thor Kitchen": false, "Forno": false, "Haier": false,
        "Danby": false, "Summit Appliance": false, "Zephyr": false, "Cosmo": false, "HADEN": false, "Midea": false, "Koolmore": false,
        "Avanti": false, "Chefman": false, "Unbranded": false, "Kucht": false, "Impecca": false, "West Bend": false, "Brama": false,
        "Costway": false, "Total Chef": false, "Premium LEVELLA": false, "Bevoi": false, "Equator": false, "Bunpeony": false,
        "GASLAND": false, "Cooler Depot": false, "Unique Appliances": false, "URBAN LIVING": false
    };
    #microwaveBrands = [
        "LG", "GE", "Whirlpool", "Samsung", "Frigidaire", "KitchenAid", "Sharp",
        "Vissani", "Cafe", "Panasonic", "Maytag", "Magic Chef", "ZLINE Kitchen and Bath",
        "Bosch", "Toshiba", "BLACK+DECKER", "Commercial CHEF", "Emerson", "Amana", "Nostalgia",
        "Galanz", "Hotpoint", "Cuisinart", "Farberware", "Thor Kitchen", "Forno", "Haier",
        "Danby", "Summit Appliance", "Zephyr", "Cosmo", "HADEN", "Midea", "Koolmore",
        "Chefman", "Avanti", "Unbranded","Impecca", "Kucht",  "West Bend", "Brama",
        "Costway", "Total Chef", "Premium LEVELLA", "Bevoi", "Equator", "Bunpeony",
        "GASLAND", "Cooler Depot", "Unique Appliances", "URBAN LIVING"
    ];

    //private methods
    get #brandDropDown(){
        return $('[aria-label="Brand"] > button')
    }
    get #close(){
        let selector = `//*[text()="Cancel"]`
        return $(selector)
    }
    get #apply(){
        let selector = `//div[contains(@data-testid, "Brand")]/following-sibling::div//button[contains(text(),"Apply")]`
        return $(selector)
    }
    async #getBrandSelector(item){
        let selector = `//button[@aria-label="${item}"]`
        return $(selector);
    }
    async #selector(brand){
        let item = `//p[contains(text(), "${brand}")]`
        return $(item)
    }
    async #selectRandomBrands(number){
        await this.#brandDropDown.click()
        for(let i = 0; i < number; i++){
            let value = Math.floor(Math.random()*this.#microwaveBrands.length);
            this.#microwaveBrandsKV[this.#microwaveBrands[value]] = true;
            let item = await this.#getBrandSelector(this.#microwaveBrands[value])
            await item.click();
        }
        await expect(this.#apply).toBeClickable()
    }
    async #selectAll(){
        await this.#brandDropDown.click()
        for(let i of this.#microwaveBrands) {
            let item = await this.#getBrandSelector(i);
            if (!await item.isExisting()) {
                continue
            }
            this.#microwaveBrandsKV[i] = true;
            await item.click();
        }
        await expect(this.#apply).toBeClickable()
        await this.#apply.click();
    }

    //public methods
    async getToMicrowaves(){
        let selector = `//div[contains(text(), "Appliances")]/ancestor::div[contains(@data-testid, "category")]`
        await $(selector).click()
        selector = `//a[contains(text(), "Microwaves")]`
        await $(selector).click()
    }
    async microRandomTest(){
        await this.#selectRandomBrands(3)
        for(let i of this.#microwaveBrands){

            if(this.#microwaveBrandsKV[i] === true){
                let selector = await this.#selector(i)
                if(!await selector.isExisting()){
                    continue
                }
                await expect(selector).toBeExisting()
            } else{
                let selector = await this.#selector(i)
                if(!await selector.isExisting()){
                    continue
                }
                await (!expect(selector).toBeExisting())
            }
        }

    }
    async microTestColors(){
        await this.#brandDropDown.click()
        for(let i of this.#microwaveBrands) {
            let item = await this.#getBrandSelector(i)
            if(!await item.isExisting()){
                continue
            }
            await item.moveTo()
            await expect((await item.getCSSProperty('outline-color')).value).toBe('rgba(249,99,2,1)')
            await item.click()
            await expect((await item.getCSSProperty('outline-color')).value).toBe('rgba(0,0,0,0)')
            await item.moveTo()
            await expect((await item.getCSSProperty('background-color')).value).toBe('rgba(243,243,243,1)')
            await browser.scroll(0, 50)
        }
        await this.#close.click()
    }
    async microTestAll(){
        await this.#selectAll()
        for(let i of this.#microwaveBrands){
            if(this.#microwaveBrandsKV[i] === true){
                let selector = await this.#selector(i)
                await expect(selector).toBeExisting()
            } else{
                let selector = await this.#selector(i)
                await (!expect(selector).toBeExisting())
            }
        }
    }
    async microNoItemsTest(){
        await this.#brandDropDown.click()
        let close = await this.#close
        await expect(!(this.#apply).toBeClickable())
        await close.click()
    }
    open() {
        return super.open('https://www.homedepot.com/b/Appliances-Microwaves/N-5yc1vZc3ok');
    }
}

module.exports = new microwavePage();