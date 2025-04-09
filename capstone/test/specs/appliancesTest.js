const appliances = require('../pageobjects/appliancePage')

describe('Appliances', () => {
    it('Take you to correct appliance page', async () => {
        await appliances.open()
        await appliances.testItems()
    })
})