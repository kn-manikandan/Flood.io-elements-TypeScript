//import { step, TestSettings, Until, By, Device } from '@flood/element'
import { step, TestSettings, Until, By, Device, Browser, TestData, ENV, Key } from '@flood/element'
import * as assert from 'assert'

const globalBrowserID = `${ENV.FLOOD_GRID_NODE_SEQUENCE_ID}_${ENV.BROWSER_ID}`




var permitID = ""


export const settings: TestSettings = {
	loopCount: -1,
	description:'Unique Test Data',
	chromeVersion:'puppeteer',
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
	actionDelay: 2.5,
	stepDelay: 5.0,
	waitTimeout: 90 // maximum wait time

}


    function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
	

/**
 * Unite Performance Test - Permit to Work Module
 * @version 1.1 
 * Author: Manikandan
 * Company: IB&X HSE
 * Comments: Removed all the Object ID and updated with CSS
 */
export default () => {
	
	interface UserData {
		id: string
		username: string
		password: string
		won: string
		tag: string
		zone: string
		planneddate: string
		executingparty: string
		jd1: string
		jd2: string
		jd3: string
		jd4: string


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
		await browser.takeScreenshot()
		
	})

	// CREATE 
	step('02.a Select create new permit from top menu (Create )', async browser => {
		
		// Find and select "Create button in top menu"
		let elementTag = By.css('#mxui_widget_Navbar_0 > ul > li:nth-child(2) > a')
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		await browser.takeScreenshot()
		
	})

	// ClICK NEW PERMIT
	step('02.b Select create new permit from top menu Click New Permit)', async browser => {
		await delay(800);
		let elementTag = By.css('#mxui_widget_Navbar_0 > ul > li.mx-navbar-item.dropdown.open > ul > li > a')
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		await browser.takeScreenshot()
		
	})

	// PTW - GENERAL SECTION

	step('03.a PtW - Fill out General information page - WO#', async(browser: Browser, data: UserData)  => {
		// Fill out general information page
		let { won } = data
		
		//let elementTag = By.css('#mxui_widget_TextInput_8_input') //script with css
		
		let elementTag = By.partialVisibleText(`${data.won}`)
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		await browser.sendKeys("Perftest", globalBrowserID)
		await browser.takeScreenshot()
		
	})


	step('03.b PtW - Fill out General information page - Description', async browser => {

		// Description
		//let elementTag = By.partialVisibleText("Description")
		let elementTag = By.css(".form-control.mx-textarea-input.mx-textarea-input-noresize") 
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		await browser.sendKeys("Perftest01",)
		await browser.takeScreenshot()
	
	})


	step('03.c PtW - Fill out General information page - Tag', async (browser: Browser, data: UserData) => {
		// Tag
		let { tag } = data
		let elementTag = By.css('#dijit_form_ComboBox_2')
		//let elementTag = By.css(".dijitReset.dijitInputInner")
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		await delay(2000);
		// below we need to mentioned the TAG name
		await browser.sendKeys(`${data.tag}`, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.END, Key.END, Key.TAB)
		// go to Ex zone field 30-100-0110-E11050 Heat exchanger
		await browser.takeScreenshot()
	})

	step('03.d PtW - Fill out General information page - Ex Zone', async (browser: Browser, data: UserData) => {
		// Ex zone
		let { zone } = data
		let elementTag = By.css('#dijit_form_ComboBox_4')
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		await delay(2000);
		//await browser.sendKeys("Unzoned", Key.ARROW_RIGHT, Key.TAB)
		await browser.sendKeys(`${data.zone}`, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.END, Key.END, Key.TAB)
		await browser.takeScreenshot()
		
	})
	
	step('03.e PtW - Fill out General information page - Date + #days', async (browser: Browser, data: UserData) =>{
			// planned start date (2020-08-01 // nr of days = 1 // start time = select something // 8 hours per day)
			//let elementTag = By.partialVisibleText("Planned start date")
			let { planneddate } = data
			
			let elementTag = By.css('#mxui_widget_DateInput_0_input')
			await browser.wait(Until.elementIsVisible(elementTag))
			let element = await browser.findElement(elementTag)
			await element.focus()
			await element.click()
			await delay(1000);
			await browser.sendKeys(`${data.planneddate}`, Key.END, Key.TAB)
			await browser.sendKeys("1", Key.TAB)
			await browser.takeScreenshot()
			
	})
	
	step('03.f PtW - Fill out General information page - time', async browser =>{
			//Starting time

			let elementTag = By.css('#dijit_form_ComboBox_3')
			await browser.wait(Until.elementIsVisible(elementTag))
			let element = await browser.findElement(elementTag)
			await element.focus()
			await element.click()
			// Select time with keyboard: small delay to allow Mendix to retrieve the available time slots
			await delay(1000);
			await browser.sendKeys(Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ENTER, Key.END)
			//await browser.sendKeys(Key.ARROW_DOWN)
			//await browser.sendKeys(Key.ENTER)
			//await browser.sendKeys(Key.TAB)
			//await delay(1000);
			await browser.takeScreenshot()
	})
	
	step('03.g PtW - Fill out General information page - Executing party', async (browser: Browser, data: UserData) => {

		//Executing party (abc)
		let { executingparty } = data
		let elementTag = By.css('#dijit_form_ComboBox_0') 
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		await delay(1000);
		//await element.selectByValue('#dijit_form_ComboBox_0','ChenWeiliang')
		await browser.sendKeys(`${data.executingparty}`, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.END, Key.END, Key.TAB)
		await browser.takeScreenshot()
		//await delay(2000);
				
	})

	step('03.h PtW - Fill out General information page - go to job spec', async browser => {

		
		await browser.press(Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN)
		await delay(1000);
		//Go to Job specification screen
		let buttonLocator = By.css(".mx-name-actionButton5")
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)

		await buttonPress.focus()
		await buttonPress.click()
		await delay(500);
		await browser.takeScreenshot()
	
	})

	// PTW - JOB SPECIFICATION

	step('04.a PtW - Fill out Job specification page - Work at height', async (browser: Browser, data: UserData) => {
		let { jd1 } = data
		
		// Do something before delay
		//console.log('before delay')
		await delay(1000);
		// Do something after
		//console.log('after delay')
				
		let elementTag = By.partialVisibleText(`${data.jd1}`) 
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		// The following key sequence selects the radio button before the found text
		await browser.sendKeys(Key.SHIFT + Key.TAB, Key.TAB, Key.SPACE)
		
		await browser.takeScreenshot()
		await delay(3000);
		
	})
	

		step('04.b PtW - Fill out Job specification page - Work on mobile platform', async (browser: Browser, data: UserData) => {
		let { jd2 } = data
		// Work on mobile platform
		await delay(1000);
		let elementTag = By.partialVisibleText(`${data.jd2}`)
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		// The following key sequence selects the radio button before the found text
		await browser.sendKeys(Key.SHIFT + Key.TAB, Key.TAB, Key.SPACE)
		await browser.takeScreenshot()
	})

 		step('04.c PtW - Fill out Job specification page - Painting', async (browser: Browser, data: UserData) => {
		let { jd3 } = data

		//Select Painting
		let elementTag = By.partialVisibleText(`${data.jd3}`)
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		// The following key sequence selects the radio button before the found text
		await browser.sendKeys(Key.SHIFT + Key.TAB, Key.TAB, Key.SPACE)
		await browser.takeScreenshot()

	})


		step('04.d PtW - Fill out Job specification page - Insulating', async (browser: Browser, data: UserData) => {
		let { jd4 } = data
		//Select Insulating
		let elementTag = By.partialVisibleText(`${data.jd4}`)
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		// The following key sequence selects the radio button before the found text
		await browser.sendKeys(Key.SHIFT + Key.TAB, Key.TAB, Key.SPACE)
               //await browser.wait()
	       await browser.takeScreenshot()

	})


	step('04.e PtW - Fill out Job specification page - go to hazards', async browser => {

		//Go to Hazards screen
		await browser.press(Key.PAGE_DOWN, Key.PAGE_DOWN, Key.PAGE_DOWN, Key.PAGE_DOWN, Key.PAGE_DOWN)
		await browser.takeScreenshot();
		let buttonLocator = By.css(".mx-name-actionButton6")
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)
		//await browser.press(Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOW, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN)
		await browser.takeScreenshot()

		await buttonPress.focus()
		await buttonPress.click()
		await browser.takeScreenshot()
		await delay(1000); //given wait time to load hazzard page 1 sec


	})

	// PTW - HAZARDS

	step('05.a PtW - Fill out Hazards page - Scroll Down', async browser => {
		
		
		await browser.press(Key.PAGE_DOWN, Key.PAGE_DOWN, Key.PAGE_DOWN, Key.PAGE_DOWN, Key.PAGE_DOWN)
		await browser.takeScreenshot()
		//await delay(2000);
	
	})
	step('05.b PtW - Fill out Hazards page - Traffic', async (browser: Browser, data: UserData) => {

		let { hazard1 } = data
		//Traffic in close proximity
		let elementTag = By.partialVisibleText(`${data.hazard1}`)
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		// The following key sequence selects the radio button before the found text
		await browser.sendKeys(Key.SHIFT + Key.TAB, Key.TAB, Key.SPACE)
		await delay(1000); //given wait time to load object
		await browser.takeScreenshot()
	})

	step('05.c PtW - Fill out Hazards page - Falling objects', async (browser: Browser, data: UserData) => {
		
		let { hazard2 } = data
		//WAH: Falling objects
		//await browser.press(Key.PAGE_DOWN, Key.PAGE_DOWN)
		let elementTag = By.partialVisibleText(`${data.hazard1}`)
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		
		
		// The following key sequence selects the radio button before the found text
		//await browser.sendKeys(Key.SHIFT + Key.TAB, Key.TAB, Key.SPACE)
		await browser.takeScreenshot()

	})


	step('05.d PtW - Fill out Hazards page - go to measures', async browser => {

		//Go to Measures screen
		await browser.press(Key.PAGE_DOWN,Key.PAGE_DOWN,Key.PAGE_DOWN,Key.PAGE_DOWN,Key.PAGE_DOWN,Key.PAGE_DOWN,Key.PAGE_DOWN,Key.PAGE_DOWN,Key.PAGE_DOWN)
		await browser.takeScreenshot();

		//mx-name-actionButton6
		let buttonLocator = By.css(".mx-name-actionButton6") 
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)

		await buttonPress.focus()
		await buttonPress.click()
		await browser.takeScreenshot()
		await delay(1000)

	})

	// PTW - MEASURES
	


	step('06. PtW - Submit permit', async browser => {

		//Go to Submit plan
		let buttonLocator = By.css(".mx-name-actionButton2") 
		//let buttonLocator = By.attr("button", "data-mendix-id", "357_12")
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)
		await buttonPress.focus()
		await buttonPress.click()
		await delay(500);
		await browser.takeScreenshot()

	})

	step('07. PtW - Pop-up Next task: prepare safety measures - Continue', async browser => {

		//Select Continue
		//let buttonLocator = By.partialVisibleText("Continue task")
		let buttonLocator = By.css(".btn.mx-button.mx-name-actionButton2.btn-right.btn-primary")
		//let buttonLocator = By.attr("button", "data-mendix-id", "356_4")
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)
		await buttonPress.focus()
		await buttonPress.click()
		await delay(1000);
		await browser.takeScreenshot()
		
	})



	step('07.a PtW - Fill out Product as Acid', async browser => {

		await browser.press(Key.PAGE_DOWN, Key.PAGE_DOWN, Key.PAGE_DOWN, Key.PAGE_DOWN, Key.PAGE_DOWN)
		await browser.takeScreenshot();
		await browser.press(Key.PAGE_DOWN, Key.PAGE_DOWN, Key.PAGE_DOWN, Key.PAGE_DOWN, Key.PAGE_DOWN)
		await browser.takeScreenshot();

		//Go to Job specification screen
		let buttonLocator = By.css(".mx-referencesetselector-input-wrapper")
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)

		await buttonPress.focus()
		await buttonPress.click()
		await browser.takeScreenshot()
			
	})

	step('07.b PtW - Pop-up Select the Product', async browser => {

		//Select Continue
		let elementTag = By.partialVisibleText("Acid")
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		await browser.takeScreenshot()

		let buttonLocator = By.css(".mx-name-selectButton1") 
		//let buttonLocator = By.attr("button", "data-mendix-id", "76_1")
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)

		await browser.takeScreenshot()

		await buttonPress.focus()
		await buttonPress.click()
		
		await browser.takeScreenshot();


	})



	step('08. PtW -  Next task: Submit Work Permit - submit', async browser => {

		//
		
		let buttonLocator = By.css('.mx-name-actionButton5') 
		//let buttonLocator = By.attr("button", "data-mendix-id", "367_15")
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)

		await browser.takeScreenshot()

		await buttonPress.focus()
		await buttonPress.click()
		await delay(2000);
		
	})

	step('08.a PtW - Pop-up Next task: Approve request: Operational Expert - Continue', async browser => {

		//Select Continue
		let buttonLocator = By.css(".btn.mx-button.mx-name-actionButton2.btn-right.btn-primary")
		//let buttonLocator = By.css("#mxui_widget_Wrapper_534")
		//let buttonLocator = By.css("div[class='btn mx-button mx-name-actionButton2 btn-right btn-primary']")
		//let buttonLocator = By.css(".mx-name-actionButton2") 
		//let buttonLocator = By.attr("button", "data-mendix-id", "ec356_4")
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)
		await browser.takeScreenshot()

		await buttonPress.focus()
		await buttonPress.click()
		//await delay(2800);
		
	})

	

	step('08.b PtW -  Next task: Approve Permit - submit', async browser => {

		let buttonLocator = By.css(".btn.mx-button.mx-name-actionButton3.btn-success") 
		//let buttonLocator = By.attr("button", "data-mendix-id", "347_15")
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)

		await browser.takeScreenshot()

		await buttonPress.focus()
		await buttonPress.click()
		await delay(2000);
		
	})


	step('09.a PtW - Pop-up Next task: SafeGuard Work place ', async browser => {

		//Select Close
		let buttonLocator = By.css(".btn.mx-button.mx-name-actionButton2.btn-right.btn-primary")
		//let buttonLocator = By.attr("button", "data-mendix-id", "356_4")
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)

		await browser.takeScreenshot()

		await buttonPress.focus()
		await buttonPress.click()
		await delay(2000);
		
		
	})




	step('10.  PtW -  Next task: Securing the workplace - submit', async browser => {

		//Approve for Work Permit
		
		let buttonLocator = By.css(".btn.mx-button.mx-name-actionButton5.btn-success") 
		//let buttonLocator = By.attr("button", "data-mendix-id", "353_15")
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)

		await browser.takeScreenshot()
		await buttonPress.focus()
		await buttonPress.click()
		await delay(2000);
		
		
	})

	step('11. PtW - Pop-up Next task: Approve handout - open task', async browser => {

		//Securing the workplace
		await browser.takeScreenshot()
		let buttonLocator = By.css(".btn.mx-button.mx-name-actionButton2.btn-right.btn-primary")
		//let buttonLocator = By.attr("button", "data-mendix-id", "356_4")
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)

		await browser.takeScreenshot()

		await buttonPress.focus()
		await buttonPress.click()
		await delay(2000);
		
		
	})

	step('12. PtW -  Next task: Approve Handout - submit', async browser => {

		//Approve for Work Permit
		
		let buttonLocator = By.css(".btn.mx-button.mx-name-actionButton6.btn-success") 
		//let buttonLocator = By.attr("button", "data-mendix-id", "354_16")
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)

		await browser.takeScreenshot()

		await buttonPress.focus()
		await buttonPress.click()
		await delay(2000);
		
		
	})


	step('13. PtW - Fill out Four Eye Principle', async browser => {

		// Four Eye Principle
		let elementTag = By.css(".form-control.mx-textarea-input.mx-textarea.mx-textarea-input-noresize")
		//let elementTag = By.attr("textarea", "data-mendix-id", "360_6")
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		await browser.sendKeys("Load_test_permit four eye Principle")
		await browser.takeScreenshot()
		await delay(2000);

	})

	step('14.a PtW - Pop-up Fill out Four Eye Principle -Continue', async browser => {

		// Four Eye Principle
				
		let buttonLocator = By.css(".btn.mx-button.mx-name-actionButton1.btn-right.btn-success")
		//let buttonLocator = By.attr("button", "data-mendix-id", "360_5")
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)

		await browser.takeScreenshot()

		await buttonPress.focus()
		await buttonPress.click()
		//await delay(2000);
			
	})

	step('14.b PtW - Pop-up Handout permit - Continue', async browser => {

		//Securing the workplace
		let buttonLocator = By.css(".btn.mx-button.mx-name-actionButton2.btn-right.btn-primary")
		//let buttonLocator = By.attr("button", "data-mendix-id", "356_4")
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)

		await browser.takeScreenshot()

		await buttonPress.focus()
		await buttonPress.click()
		await delay(2000);
		
		
	})

	step('15.a PtW - Fill out Holder name and No. of Persons', async browser => {

		await browser.press(Key.PAGE_DOWN, Key.PAGE_DOWN, Key.PAGE_DOWN, Key.PAGE_DOWN, Key.PAGE_DOWN, Key.PAGE_DOWN)
		await browser.takeScreenshot()
		// Four Eye Principle
		
		//let elementTag = By.css("div.form-control.mx-textarea-input.mx-textarea.mx-textarea-input-noresize")
		let elementTag = By.partialVisibleText("Holder")
		
		//let elementTag = By.css(".mx-textarea-input")
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		await browser.takeScreenshot()
		await browser.sendKeys('Tester', Key.TAB)
		await browser.takeScreenshot()
		await browser.sendKeys('2')
		await browser.takeScreenshot()

	})

	step('15.b PtW - Selecting last minute measure- Ladder inspected and suitable ', async browser => {

		await browser.press(Key.PAGE_DOWN, Key.PAGE_DOWN, Key.PAGE_DOWN)
		await browser.takeScreenshot()
		let elementTag = By.partialVisibleText("Ladder inspected and suitable")
		await browser.wait(Until.elementIsVisible(elementTag))
		let element = await browser.findElement(elementTag)
		await element.focus()
		await element.click()
		await delay(1000);
		// The following key sequence selects the radio button before the found text
		await browser.sendKeys(Key.SHIFT + Key.TAB, Key.TAB, Key.SPACE)
		await browser.takeScreenshot()

	})

	

	step('16. PtW - Handout -Issue Work Permit', async browser => {

		//Issue Work Permit
		// Do something before delay
		//console.log('before delay')
		//await browser.takeScreenshot();
		//await delay(2000);
		// Do something after
		//console.log('after delay')
		
		let buttonLocator = By.css(".btn.mx-button.mx-name-actionButton6.btn-success")
		//let buttonLocator = By.attr("button", "data-mendix-id", "362_15")
		await browser.wait(Until.elementIsVisible(buttonLocator))
		let buttonPress = await browser.findElement(buttonLocator)

		await browser.takeScreenshot()

		await buttonPress.focus()
		await buttonPress.click()
		await delay(2000);

	})



	step('17. PtW - Permit Submitted - Test Load Cycle pass', async browser => {
		
		await delay(1000);
		//await browser.wait(Until.elementIsVisible(By.visibleText('Vergunningen')))
		
	})


}