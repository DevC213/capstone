const mainPage = require('../pageobjects/homeScreen')

describe('Social Media', () => {
    it('Take you to correct social media site', async () => {
        await mainPage.launchHomeDepot()
        await mainPage.socialMedia()
    })
})

