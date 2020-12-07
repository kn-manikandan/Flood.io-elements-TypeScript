//import { step, TestSettings, Until, By, Device } from '@flood/element'
import { step, TestSettings, Until, By, Device, Browser, TestData, ENV, Key } from '@flood/element'
import * as assert from 'assert'

const globalBrowserID = `${ENV.FLOOD_GRID_NODE_SEQUENCE_ID}_${ENV.BROWSER_ID}`

var permitID = ""




export const settings: TestSettings = {
	loopCount: -1,
	description:'Unique Test Data',
	//chromeVersion:'puppeteer',
	DOMSnapshotOnFailure: true,
	device:'Chrome Desktop Large',
	userAgent:'flood-chrome-test',
	screenshotOnFailure: true,
	disableCache:true,
	duration: -1,
	clearCache: true,
	clearCookies: true,
	ignoreHTTPSErrors: true,
	//responseTimeMeasurement:'network',
	responseTimeMeasurement:'stepWithThinkTime',
	actionDelay: 1.5,
	stepDelay: 2.5,
	waitTimeout: 300 // maximum wait time
}


   function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

	

/**
 * Unite Performance Test - Search functionality
 * @version 1.0
 */
export default () => {
	
	interface UserData {
		id: string
		username: string
		password: string
	}

	TestData.fromCSV<UserData>('users.csv')
		.filter((line, index, browserID) => line.id === globalBrowserID)
		.circular()

	// LOGIN

	step('01. Login ' + globalBrowserID, async (browser: Browser, data: UserData) => {
		let { username, password } = data

		
		await browser.visit('https://ibnx-00-accep.ibnx-hse.com/')

		let buttonLocator = By.css('#loginButton')
		await browser.wait(Until.elementIsVisible(buttonLocator))

		await browser.type(By.css('#usernameInput'), `${data.username}`)
		await browser.type(By.css('#passwordInput'), `${data.password}`)

		const button = await browser.findElement(buttonLocator)
		assert.ok(await button.isDisplayed(), 'Button is visible')
		await button.click()
		//await browser.resizeTo("screen.1366", "screen.768")
		await browser.takeScreenshot();
		
	})

	
	// Personal Search

	step('02. Personal Search input value', async browser => {
		
		//let elementTag = By.css('mx-name-searchInput') //original script 
		let elementTag = By.id('#mxui_widget_TextInput_1') 
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		await browser.sendKeys("0", Key.ENTER)
		
	})

	step('03. Click the search button', async browser => {

		
		let buttonLocator = By.css(".mx-name-searchBTN") 
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)

		await browser.takeScreenshot();

		await buttonPress.focus()
		await buttonPress.click()
		await delay(65000);

		
		
	})

	step('04. Click the Advance Filter Type - Permit', async browser => {

		//await delay(65000);
		//let elementTag = By.css('.mx-name-searchInput') //original script 
		let elementTag = By.id('#mxui_widget_TextInput_1') 
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		await browser.sendKeys(Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.SPACE)
		//await element.click()
		await browser.takeScreenshot();
		await delay(65000);
		
		
	})


	step('05. Click the Advance Filter State - Permit Requested', async browser => {

		//await delay(65000);
		//let elementTag = By.css('.mx-name-searchInput') //original script 
		let elementTag = By.id('#mxui_widget_TextInput_1') 
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		await browser.sendKeys(Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.SPACE)
		//await element.click()
		await browser.takeScreenshot();
		await delay(65000);
		
	})

	step('06. Click the Advance Filter Reset Filters', async browser => {
		
		//await delay(65000);
		//let elementTag = By.css('.mx-name-searchInput') //original script 
		let elementTag = By.id('#mxui_widget_TextInput_1') 
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		await browser.sendKeys(Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.TAB, Key.SPACE)
		//await element.click()
		await browser.takeScreenshot();
		await delay(65000);

	})


	step('Search functionality Completed' + globalBrowserID, async browser => {
		
		//let elementTag = By.partialVisibleText("Advanced Search")
		//await browser.wait(Until.elementIsVisible(elementTag))
		//let element = await browser.findElement(elementTag)
		console.log("Completed"); 
		console.log("Completed",+ globalBrowserID);
			
	})

}