const microwaves = require('../pageobjects/microwavePage')

/**Following test Crashes Home Depot microwaves page*/
// describe('Our brands', () => {
//     it('All Items Selected Test', async () => {
//         await microwaves.open()
//         await microwaves.getToMicrowaves()
//         await microwaves.microTestAll()
//     })
// })

describe('Microwaves', () => {
    it('Hover over test', async () => {
        await microwaves.open()
        await microwaves.getToMicrowaves()
        await microwaves.microTestColors()
    })
})
describe('Microwaves', () => {
    it('No Items Selected Test', async () => {
        await microwaves.open()
        await microwaves.getToMicrowaves()
        await microwaves.microNoItemsTest()
    })
})
describe('Our brands', () => {
    it('Random Items Selected Test', async () => {
        await microwaves.open()
        await microwaves.getToMicrowaves()
        await microwaves.microRandomTest()
    })
})

