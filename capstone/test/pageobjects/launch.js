const { browser } = require('@wdio/globals')

module.exports = class Launch {
    launchHomeDepot () {
        return browser.url(`https://www.homedepot.com/`)
    }
}
