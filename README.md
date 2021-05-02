# Cowin Notifier
Checks the COWIN portal every 5 minutes if a '18-44'(default) slot is available and sends a notification email if found.

## Steps
1. Add a new application password in Gmail<br>
App name : vaccinenotifier<br>
https://support.google.com/accounts/answer/185833?p=InvalidSecondFactor&visit_id=637554658548216477-2576856839&rd=1<br>
Ensure 2 factor authentication is enabled for the option

2. Clone the repository

3. Fill the .env file with your details

* EMAIL is your gmail address
* APP_PASSWORD is your password set for the application on Gmail
* MIN_AGE is either 18 or 45
* DISTRICT_ID is your District ID according to COWIN ( Eg. 312 for Bhopal ) - Enhancement required. At the moment, use /v2/admin/location/states AND /v2/admin/location/districts/{state_id} to find out.
* DATE (Optional) : Custom starting date for range day to day + 7 . Defaulted to today.

4. To start the app, run the following commands on terminal

```
 npm install 
 npm run start
```
5. To stop the app, run the following commands on terminal

```
 npm run stop
```


