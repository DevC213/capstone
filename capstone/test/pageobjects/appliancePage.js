const { $ } = require('@wdio/globals')
const Page = require('./launch');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AppliancePage extends Page {
    /**
     * define selectors using getter methods
     */

}

module.exports = new AppliancePage();
