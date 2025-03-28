const mainPage = require('../pageobjects/mainPage')

describe('Our brands', () => {
    it('Take you to correct page', async () => {
        await mainPage.open()
        await mainPage.ourBrands()
    })
})
