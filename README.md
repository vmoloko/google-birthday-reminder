## Hello, stranger
This is a script for [Google Apps Scripts](https://script.google.com/home) allowing you to send reminders to yourself
about upcoming birthdays of people from your contact list.

## How to use
1. You must have a Google account to use this script.
2. Paste your email into `MY_EMAIL` variable.
3. Create new project in [Google Apps Scripts](https://script.google.com/home).
4. Paste the script code into the code editor frame.
5. Test your script by pressing "Run" button. If some of your contacts have birthdays within two days, 
you should receive an email.
6. Go to "Triggers" menu, add a time trigger:
   1. `main` function
   2. `Time-driven` event source
   3. `Day timer` trigger
   4. some time of the day.

## Troubleshooting
If birthdays are missing in both Google Calendar UI and in logs of this script, the problem is probably in the data privacy.
To fix it:
* Open https://myaccount.google.com/data-and-privacy
* Find and open "Linked Google services"
* Check "Contacts" and save changes
