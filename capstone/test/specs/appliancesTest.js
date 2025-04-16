const appliances = require('../pageobjects/appliances')

describe('Appliances', () => {
    it('Take you to correct appliance page', async () => {
        await appliances.launchHomeDepot()
        await appliances.testItems()
    })
})