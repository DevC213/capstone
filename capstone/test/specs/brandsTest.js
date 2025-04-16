const mainPage = require('../pageobjects/homeScreen')

describe('Our brands', () => {
    it('Take you to correct brand page', async () => {
        await mainPage.launchHomeDepot()
        await mainPage.ourBrands()
    })
})
