Unite Permit to Work Performance script for Flood.io
====================================================

We can run the performance script without any pre-setup required in both Test and Internal Acceptance systems: ibnx-00-accep & ibnx-00-test.

1. URL needs to be change for appropriate Test system:https://ibnx-00-test.ibnx-hse.com/ for Internal Acceptance system: https://ibnx-00-accep.ibnx-hse.com/

2. Planned start date should be changed in the script steps - "03.e PtW - Fill out General information page - Date + #days"

X-----------------X---------------X


To Run the performance script for other systems using flood.io, Please setup the System under test (SUT) as below:

1. Permit configuration should be same as "Rotterdam" plant configuration. Export the permit configuration and import in the System under test which you want to perform performance testing.
2. Plant language should have only one English Language.
3. Setup the Four Eye configuration only for "PtW_Requester" and "PtW_Issuer" - meaning Four Eye should pop-up only in "Approve handout" state.
4. Create users as much you want, with all the PTW Roles in the System under test (SUT) and update the users.csv file with username and password.


X-----------------X---------------X

How to run the script in Flood.io cloud
=======================================

1. Login to Flooed.io
2. Click on Streams >> Create Stream
3. Enter the Test name
4. Script Upload the script only the below files
	1. test-steps.ts
	2. tsconfig.json
	3. package.json
	4. users.csv

5. Click Configure Launch
6. Select Infrastructure Type as Demand
7. Select Regions to run Example EU-Central(franckfurt)
8. Users per region- Enter How many Concurrent users needs to be run
9. Duration Default keep 15 minutes
10. Click Launch Test

X-----------------X---------------X