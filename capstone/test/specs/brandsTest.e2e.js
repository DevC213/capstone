const { expect } = require('@wdio/globals')
const mainPage = require('../pageobjects/mainPage')
const appliancePage = require('../pageobjects/appliancePage')
const microwavePage = require('../pageobjects/microwavePage')

describe('Our brands', () => {
    it('Take you to correct page', async () => {
        await mainPage.open()
        await mainPage.ourBrands()
    })
})
