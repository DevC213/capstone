const { $ } = require('@wdio/globals')
const Launch = require('./launch');

class HomeScreen extends Launch {

    #brands = ["The Company Store","Vissani",
        "Home Decorators Collection","Hampton Bay",
        "Husky","Lifeproof Flooring", "Lifeproof with Petproof Technology Carpet",
        "Glacier Bay", "Everbilt", "StyleWell","HDX", "Vigoro", "TrafficMaster",
        "Defiant", "Ecosmart", "Home Accents Holiday", "Commercial Electric", "Hubspace Smart Home"]
    #socialMediaPages = ["https://www.facebook.com/homedepot", "https://x.com/homedepot",
                                "https://www.pinterest.com/homedepot/","https://www.homedepot.com/c/alp/diy-projects-and-ideas/azzz-ap",
                                "https://www.youtube.com/user/homedepot", "https://www.homedepot.com/c/mobile-app"]

    async #ourBrandsItem(item){
        let selector = `[title = \"${item}\"]`
        return $(selector);
    }
    async #socialMediaItem(){
        let selector = await $('[class="sui-h-auto sui-pt-2 sui-flex sui-flex-row sui-justify-between"]')
        return await selector.$$('a');
    }
    get #homeButton(){
        return $('[class="sui-w-11 lg:sui-w-16"]')
    }
    async ourBrands(){
        for(const i of this.#brands){
            let item = await this.#ourBrandsItem(i)
            await item.click()
            let selector = `//h1[contains(text(), \"${i}\")]`
            await expect(await $(selector).isExisting())
            await this.#homeButton.click()
        }
    }
    async socialMedia(){
        let j = 0
        for(const i of await this.#socialMediaItem()) {
            await i.click()
            let windows = await browser.getWindowHandles()
            if (windows.length < 2) {
                await expect(await browser.getUrl() === this.#socialMediaPages[j])
                break
            }
            else
            {
                await browser.switchWindow(windows[1])
                await expect(await browser.getUrl() === this.#socialMediaPages[j])
                await browser.closeWindow()
                await browser.switchWindow(windows[0])
                j++;
            }
        }
    }
    launchHomeDepot() {
        return super.launchHomeDepot('https://www.homedepot.com/');
    }
    
}

module.exports = new HomeScreen();
