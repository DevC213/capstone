const { expect } = require('@wdio/globals')
const mainPage = require('../pageobjects/mainPage')
const appliancePage = require('../pageobjects/appliancePage')
const microwavePage = require('../pageobjects/microwavePage')

describe('Social Media', () => {
    it('Take you to correct social media site', async () => {
        await mainPage.open()
        await mainPage.socialMedia()
    })
})

