const mainPage = require('../pageobjects/mainPage')

describe('Social Media', () => {
    it('Take you to correct social media site', async () => {
        await mainPage.open()
        await mainPage.socialMedia()
    })
})

