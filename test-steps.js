"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
//import { step, TestSettings, Until, By, Device } from '@flood/element'
const element_1 = require("@flood/element");
const assert = require("assert");
const globalBrowserID = `${element_1.ENV.FLOOD_GRID_NODE_SEQUENCE_ID}_${element_1.ENV.BROWSER_ID}`;
var permitID = "";
exports.settings = {
    loopCount: -1,
    description: 'Unique Test Data',
    chromeVersion: 'puppeteer',
    DOMSnapshotOnFailure: true,
    device: 'Chrome Desktop Large',
    userAgent: 'flood-chrome-test',
    screenshotOnFailure: true,
    disableCache: true,
    duration: -1,
    clearCache: true,
    clearCookies: true,
    ignoreHTTPSErrors: true,
    //responseTimeMeasurement:'network',
    responseTimeMeasurement: 'stepWithThinkTime',
    actionDelay: 1.5,
    stepDelay: 2.5,
    waitTimeout: 30 // maximum wait time
};
let today = new Date(+1).toISOString().slice(0, 10);
console.log(today);
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * Unite Performance Test - Permit to Work Module
 * @version 1.0
 */
exports.default = () => {
    element_1.TestData.fromCSV('users.csv')
        .filter((line, index, browserID) => line.id === globalBrowserID)
        .circular();
    // LOGIN
    element_1.step('01. Login ' + globalBrowserID, async (browser, data) => {
        let { username, password } = data;
        await browser.visit('https://unite-dsm-test-41.ibnx-hse.com');
        let buttonLocator = element_1.By.css('#loginButton');
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        await browser.type(element_1.By.css('#usernameInput'), `${data.username}`);
        await browser.type(element_1.By.css('#passwordInput'), `${data.password}`);
        const button = await browser.findElement(buttonLocator);
        assert.ok(await button.isDisplayed(), 'Button is visible');
        await button.click();
        //await browser.resizeTo("screen.1366", "screen.768")
        await browser.takeScreenshot();
    });
    // CREATE PERMIT
    element_1.step('02.a Select create new permit from top menu (Create)', async (browser) => {
        // Find and select "Create button in top menu"
        //	mx-navbar-item dropdown
        //	let buttonLocator = By.id('159b6aef-dbc3-5b23-a735-cf99f8341771-1')  //original script
        let buttonLocator = element_1.By.partialVisibleText("Create");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await buttonPress.focus();
        await buttonPress.click();
    });
    // CREATE PERMIT
    element_1.step('02.b Select create new permit from top menu (New permit)', async (browser) => {
        // Now find and select "New permit"
        let buttonLocator = element_1.By.partialVisibleText("New permit");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await buttonPress.focus();
        await buttonPress.click();
        await browser.takeScreenshot();
    });
    // PTW - GENERAL SECTION
    element_1.step('03.a PtW - Fill out General information page - WO#', async (browser) => {
        // Fill out general information page
        // Work order #
        //let elementTag = By.css(".mx-name-textBox4") //original script
        let elementTag = element_1.By.attr("", "data-mendix-id", "358_103_238");
        await browser.wait(element_1.Until.elementIsVisible(elementTag));
        let element = await browser.findElement(elementTag);
        await element.focus();
        await element.click();
        await browser.sendKeys("Perftest09", globalBrowserID, element_1.Key.TAB);
    });
    element_1.step('03.b PtW - Fill out General information page - Description', async (browser) => {
        // Description
        let elementTag = element_1.By.partialVisibleText("Description");
        await browser.wait(element_1.Until.elementIsVisible(elementTag));
        let element = await browser.findElement(elementTag);
        await element.focus();
        await element.click();
        await browser.sendKeys("Perftest09", element_1.Key.TAB);
    });
    element_1.step('03.c PtW - Fill out General information page - Tag', async (browser) => {
        // Tag
        let elementTag = element_1.By.css('#dijit_form_ComboBox_2');
        await browser.wait(element_1.Until.elementIsVisible(elementTag));
        let element = await browser.findElement(elementTag);
        await element.focus();
        await element.click();
        //await element.selectByValue('#dijit_form_ComboBox_2','281')
        //#dijit_form_ComboBox_2
        await browser.sendKeys('281', element_1.Key.ARROW_DOWN, element_1.Key.ARROW_DOWN, element_1.Key.ARROW_DOWN, element_1.Key.END, element_1.Key.END, element_1.Key.TAB);
        // go to Ex zone field
    });
    element_1.step('03.d PtW - Fill out General information page - Ex Zone', async (browser) => {
        // Ex zone
        // combobox 4 was best so far
        let elementTag = element_1.By.css('#dijit_form_ComboBox_4');
        //let elementTag = By.attr("input","placeholder","Please select an EX zone")
        //let elementTag = By.attr("div","data-mendix-id","310_103_125")
        await browser.wait(element_1.Until.elementIsVisible(elementTag));
        let element = await browser.findElement(elementTag);
        await element.focus();
        await element.click();
        await browser.sendKeys('Unzoned', element_1.Key.ARROW_DOWN, element_1.Key.ENTER);
        await browser.takeScreenshot();
    });
    element_1.step('03.e PtW - Fill out General information page - Date + #days', async (browser) => {
        // planned start date (2020-08-01 // nr of days = 1 // start time = select something // 8 hours per day)
        let elementTag = element_1.By.partialVisibleText("Planned start date");
        await browser.wait(element_1.Until.elementIsVisible(elementTag));
        let element = await browser.findElement(elementTag);
        await element.focus();
        await element.click();
        let today = new Date().toISOString().slice(0, 10);
        console.log(today);
        await browser.sendKeys(today, element_1.Key.END, element_1.Key.TAB);
        await browser.sendKeys("1", element_1.Key.TAB);
        // small delay to allow Mendix to retrieve the available time slots
    });
    element_1.step('03.f PtW - Fill out General information page - time', async (browser) => {
        //Starting time
        // Select time with keyboard:
        await browser.sendKeys(element_1.Key.ARROW_DOWN, element_1.Key.ARROW_DOWN, element_1.Key.ENTER, element_1.Key.TAB);
        //await browser.sendKeys(Key.ARROW_DOWN)
        //await browser.sendKeys(Key.ENTER)
        //await browser.sendKeys(Key.TAB)
    });
    element_1.step('03.g PtW - Fill out General information page - Executing party', async (browser) => {
        //Executing party (abc)
        let elementTag = element_1.By.id('dijit_form_ComboBox_0');
        await browser.wait(element_1.Until.elementIsVisible(elementTag));
        let element = await browser.findElement(elementTag);
        await element.focus();
        await element.click();
        //await element.selectByValue('#dijit_form_ComboBox_0','ChenWeiliang')
        await browser.sendKeys('ChenWeiliang', element_1.Key.ARROW_DOWN, element_1.Key.ARROW_DOWN, element_1.Key.ARROW_DOWN, element_1.Key.END, element_1.Key.END, element_1.Key.TAB);
        await browser.takeScreenshot();
        //await delay(2000);
    });
    element_1.step('03.h PtW - Fill out General information page - go to job spec', async (browser) => {
        //Go to Job specification screen
        let buttonLocator = element_1.By.css(".mx-name-actionButton5");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await browser.takeScreenshot();
        await buttonPress.focus();
        await buttonPress.click();
    });
    // PTW - JOB SPECIFICATION
    element_1.step('04.a PtW - Fill out Job specification page - Joinery work', async (browser) => {
        // Do something before delay
        //console.log('before delay')
        //await delay(1000);
        // Do something after
        //console.log('after delay')
        //await browser.wait(Until.elementIsVisible(By.visibleText('Joinery work')))
        // Joinery work
        let elementTag = element_1.By.partialVisibleText("Joinery work");
        await browser.wait(element_1.Until.elementIsVisible(elementTag));
        let element = await browser.findElement(elementTag);
        await element.focus();
        await element.click();
        // The following key sequence selects the radio button before the found text
        await browser.sendKeys(element_1.Key.SHIFT + element_1.Key.TAB, element_1.Key.TAB, element_1.Key.SPACE);
    });
    element_1.step('04.b PtW - Fill out Job specification page - Cleaning', async (browser) => {
        //Select Cleaning
        let elementTag = element_1.By.partialVisibleText("Cleaning");
        await browser.wait(element_1.Until.elementIsVisible(elementTag));
        let element = await browser.findElement(elementTag);
        await element.focus();
        await element.click();
        // The following key sequence selects the radio button before the found text
        await browser.sendKeys(element_1.Key.SHIFT + element_1.Key.TAB, element_1.Key.TAB, element_1.Key.SPACE);
    });
    element_1.step('04.c PtW - Fill out Job specification page - Painting', async (browser) => {
        // Painting
        let elementTag = element_1.By.partialVisibleText("Painting");
        await browser.wait(element_1.Until.elementIsVisible(elementTag));
        let element = await browser.findElement(elementTag);
        await element.focus();
        await element.click();
        // The following key sequence selects the radio button before the found text
        await browser.sendKeys(element_1.Key.SHIFT + element_1.Key.TAB, element_1.Key.TAB, element_1.Key.SPACE);
    });
    element_1.step('04.d PtW - Fill out Job specification page - Demolition', async (browser) => {
        //Select Demolition
        let elementTag = element_1.By.partialVisibleText("Demolition");
        await browser.wait(element_1.Until.elementIsVisible(elementTag));
        let element = await browser.findElement(elementTag);
        await element.focus();
        await element.click();
        // The following key sequence selects the radio button before the found text
        await browser.sendKeys(element_1.Key.SHIFT + element_1.Key.TAB, element_1.Key.TAB, element_1.Key.SPACE);
        //await browser.wait()
    });
    element_1.step('04.e PtW - Fill out Job specification page - Safety override', async (browser) => {
        //Select Work on mobile platfoms ("Hijsen")
        //let elementTag = By.partialVisibleText("Hijsen")
        //await browser.wait(Until.elementIsVisible(elementTag))
        //let element = await browser.findElement(elementTag)
        //await element.focus()
        //await element.click()
        // The following key sequence selects the radio button before the found text
        //await browser.sendKeys(Key.SHIFT + Key.TAB, Key.TAB, Key.SPACE)
        //await browser.takeScreenshot()
    });
    element_1.step('04.f PtW - Fill out Job specification page - go to hazards', async (browser) => {
        //Go to Hazards screen
        let buttonLocator = element_1.By.css(".mx-name-actionButton6");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await browser.takeScreenshot();
        await buttonPress.focus();
        await buttonPress.click();
    });
    // PTW - HAZARDS
    element_1.step('05.a PtW - Fill out Hazards page - HW: Verbranding', async (browser) => {
        //HW: Verbranding
        let elementTag = element_1.By.partialVisibleText("HW: Verbranding");
        await browser.wait(element_1.Until.elementIsVisible(elementTag));
        let element = await browser.findElement(elementTag);
        await element.focus();
        await element.click();
        // The following key sequence selects the radio button before the found text
        await browser.sendKeys(element_1.Key.SHIFT + element_1.Key.TAB, element_1.Key.TAB, element_1.Key.SPACE);
    });
    element_1.step('05.b PtW - Fill out Hazards page - BRT: Slechte ventilatie', async (browser) => {
        //Select BRT: Slechte ventilatie
        let elementTag = element_1.By.partialVisibleText("BRT: Slechte ventilatie");
        await browser.wait(element_1.Until.elementIsVisible(elementTag));
        let element = await browser.findElement(elementTag);
        await element.focus();
        await element.click();
        // The following key sequence selects the radio button before the found text
        await browser.sendKeys(element_1.Key.SHIFT + element_1.Key.TAB, element_1.Key.TAB, element_1.Key.SPACE);
    });
    element_1.step('05.c PtW - Fill out Hazards page - go to measures', async (browser) => {
        //Go to Measures screen
        let buttonLocator = element_1.By.attr("button", "data-mendix-id", "224_170");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await browser.takeScreenshot();
        await buttonPress.focus();
        await buttonPress.click();
    });
    // PTW - MEASURES
    element_1.step('06.a PtW - Fill out Measures page - Checklijst: Hottap', async (browser) => {
        //Select Checklijst: Hottap
        //let elementTag = By.partialVisibleText("Checklijst: Hottap")
        //await browser.wait(Until.elementIsVisible(elementTag))
        //let element = await browser.findElement(elementTag)
        //await element.focus()
        //await element.click()
        // The following key sequence selects the radio button before the found text
        //await browser.sendKeys(Key.SHIFT + Key.TAB, Key.TAB, Key.SPACE)
        //await browser.takeScreenshot
    });
    element_1.step('06.b PtW - Fill out Measures page - Checklijst: lassen in bedrijfz inst', async (browser) => {
        //Select Checklijst: lassen in bedrijfz inst
        //let elementTag = By.partialVisibleText("Checklijst: lassen in bedrijfz inst")
        //await browser.wait(Until.elementIsVisible(elementTag))
        //let element = await browser.findElement(elementTag)
        //await element.focus()
        //await element.click()
        // The following key sequence selects the radio button before the found text
        //await browser.sendKeys(Key.SHIFT + Key.TAB, Key.TAB, Key.SPACE)
        //await browser.takeScreenshot
    });
    // PTW - MEASURES
    element_1.step('06.c PtW - Submit permit', async (browser) => {
        //Go to Submit plan
        let buttonLocator = element_1.By.attr("button", "data-mendix-id", "230_12");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await browser.takeScreenshot();
        await buttonPress.focus();
        await buttonPress.click();
    });
    // PTW - Choose submit plan and POP-UP NEXT TASK
    element_1.step('07. PtW - Pop-up Next task: prepare safety measures - Close', async (browser) => {
        //Select Close
        await browser.wait(element_1.Until.elementIsVisible(element_1.By.visibleText('volgende taak')));
        let buttonLocator = element_1.By.attr("button", "data-mendix-id", "229_4");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await browser.takeScreenshot();
        await buttonPress.focus();
        await buttonPress.click();
    });
    element_1.step('08. PtW -  Next task: Submit Work Permit - submit', async (browser) => {
        //Select Close
        let buttonLocator = element_1.By.attr("button", "data-mendix-id", "239_14");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await browser.takeScreenshot();
        await buttonPress.focus();
        await buttonPress.click();
    });
    element_1.step('09. PtW - Pop-up Next task: Goedkeuren wvg plan: Operationeel Expert - Close', async (browser) => {
        //Select Close
        await browser.wait(element_1.Until.elementIsVisible(element_1.By.visibleText('volgende taak')));
        let buttonLocator = element_1.By.attr("button", "data-mendix-id", "229_4");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await browser.takeScreenshot();
        await buttonPress.focus();
        await buttonPress.click();
    });
    element_1.step('10. PtW -  Next task: Approve Work Permit - submit', async (browser) => {
        //Approve for Work Permit
        let buttonLocator = element_1.By.attr("button", "data-mendix-id", "222_14");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await browser.takeScreenshot();
        await buttonPress.focus();
        await buttonPress.click();
    });
    element_1.step('11. PtW - Pop-up Next task: Securing the workplace: Veiligstellen werkplek - Close', async (browser) => {
        //Securing the workplace
        await browser.wait(element_1.Until.elementIsVisible(element_1.By.visibleText('volgende taak')));
        let buttonLocator = element_1.By.attr("button", "data-mendix-id", "229_4");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await browser.takeScreenshot();
        await buttonPress.focus();
        await buttonPress.click();
    });
    element_1.step('12. PtW -  Next task: Securing the workplace - submit', async (browser) => {
        //Approve for Work Permit
        let buttonLocator = element_1.By.attr("button", "data-mendix-id", "226_14");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await browser.takeScreenshot();
        await buttonPress.focus();
        await buttonPress.click();
    });
    element_1.step('13. PtW - Pop-up Next task: Approve issue: Uitgifte goedkeuren - Close', async (browser) => {
        //Securing the workplace
        await browser.wait(element_1.Until.elementIsVisible(element_1.By.visibleText('volgende taak')));
        let buttonLocator = element_1.By.attr("button", "data-mendix-id", "229_4");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await browser.takeScreenshot();
        await buttonPress.focus();
        await buttonPress.click();
    });
    element_1.step('14. PtW -  Next task: Issue Agreement - submit', async (browser) => {
        //Approve for Work Permit
        let buttonLocator = element_1.By.attr("button", "data-mendix-id", "227_15");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await browser.takeScreenshot();
        await buttonPress.focus();
        await buttonPress.click();
    });
    element_1.step('14.a PtW - Pop-up The planned start date is changed to today. Are you sure?', async (browser) => {
        //Securing the workplace
        let buttonLocator = element_1.By.attr("button", "data-mendix-id", "241_4");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await browser.takeScreenshot();
        await buttonPress.focus();
        await buttonPress.click();
    });
    element_1.step('15.a PtW - Fill out Four Eye Principle', async (browser) => {
        // Four Eye Principle
        let elementTag = element_1.By.attr("textarea", "data-mendix-id", "232_6");
        await browser.wait(element_1.Until.elementIsVisible(elementTag));
        let element = await browser.findElement(elementTag);
        await element.focus();
        await element.click();
        await browser.sendKeys("Load_test_permit foy eye Principle");
        await browser.takeScreenshot();
    });
    element_1.step('15.b PtW - Pop-up Fill out Four Eye Principle -Continue', async (browser) => {
        // Four Eye Principle
        //await delay(2000);
        let buttonLocator = element_1.By.attr("button", "data-mendix-id", "232_5");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await browser.takeScreenshot();
        await buttonPress.focus();
        await buttonPress.click();
        //await delay(2000);
    });
    element_1.step('16. PtW - Pop-up Issue Work Permit -Continue', async (browser) => {
        //Issue Work Permit
        // Do something before delay
        console.log('before delay');
        //await browser.takeScreenshot();
        //await delay(2000);
        // Do something after
        console.log('after delay');
        let buttonLocator = element_1.By.attr("button", "data-mendix-id", "229_4");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await browser.takeScreenshot();
        await buttonPress.focus();
        await buttonPress.click();
        //await delay(2000);
    });
    element_1.step('17.a PtW - Fill out Measures page - LEL meting <0%', async (browser) => {
        //Select LEL meting <0%
        //await delay(2000);
        let elementTag = element_1.By.partialVisibleText("LEL meting");
        await browser.wait(element_1.Until.elementIsVisible(elementTag));
        let element = await browser.findElement(elementTag);
        await element.focus();
        await element.click();
        // The following key sequence selects the radio button before the found text
        await browser.sendKeys(element_1.Key.SHIFT + element_1.Key.TAB, element_1.Key.TAB, element_1.Key.SPACE);
        await browser.takeScreenshot();
        //await delay(2000);
    });
    element_1.step('17.b PtW -  Next task: To Spend- submit', async (browser) => {
        //To Spend
        //await delay(2000);
        let buttonLocator = element_1.By.attr("button", "data-mendix-id", "234_14");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await browser.takeScreenshot();
        await buttonPress.focus();
        await buttonPress.click();
    });
    element_1.step('17.c PtW - Permit Submitted - Test Load Cycle pass', async (browser) => {
        //await delay(1000);
        await browser.wait(element_1.Until.elementIsVisible(element_1.By.visibleText('Vergunningen')));
    });
    element_1.step('18.a. Filter permits - in Active state  ', async (browser) => {
        let buttonLocator = element_1.By.attr("button", "data-mendix-id", "215_75_92");
        await browser.wait(element_1.Until.elementIsVisible(buttonLocator));
        let buttonPress = await browser.findElement(buttonLocator);
        await browser.takeScreenshot();
        await buttonPress.focus();
        await buttonPress.click();
        // Select Work order #
        await browser.sendKeys(element_1.Key.TAB, element_1.Key.TAB, element_1.Key.TAB, element_1.Key.TAB, element_1.Key.TAB, element_1.Key.TAB, element_1.Key.TAB);
        await browser.sendKeys(globalBrowserID, element_1.Key.ENTER); // test-id + enter to search
        await browser.takeScreenshot();
    });
    // Select first permit (or any from this load test user)
    element_1.step('18.b. Select and open first permit', async (browser) => {
        //Select first Permit
        let elementTag = element_1.By.partialVisibleText("LOAD TEST USR " + globalBrowserID);
        await browser.wait(element_1.Until.elementIsVisible(elementTag));
        let element = await browser.findElement(elementTag);
        await element.focus();
        await element.click({ clickCount: 2 });
        //await browser.sendKeys(Key.ENTER)
        await browser.takeScreenshot();
    });
    element_1.step('18.c Print Permit PDF ', async (browser) => {
        //Select print PDF in black bottom bar
        let elementTag = element_1.By.partialVisibleText("PDF");
        await browser.wait(element_1.Until.elementIsVisible(elementTag));
        let element = await browser.findElement(elementTag);
        await element.click();
        await browser.takeScreenshot();
        console.log("Screenshot Taken");
    });
    element_1.step('19.E PtW - Permit PDF Generated - Test Load Cycle pass', async (browser) => {
        console.log("Final Step in the ZR Load");
        //console.log(globalBrowserID);
    });
};
