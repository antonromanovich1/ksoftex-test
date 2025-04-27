Features:
1. app mocks real authentication process relying on Ionic storage. It has no validation checks for email or password and it's strongly recommended not to use real personal data.
2. It has 2 flows - sign-up for new users and sign-in for known users. It also does simply checks for existing user and shown basic error messages imitating possible API responces;
3. Some sort of active session is implemented with 4 hours as time-to-live for "token" to avoid constant sign-ins. Logout button clears "session".
4. Main page is a simple currency converter. Additional features are possibility to swap "from" and "to" currencies and transaction history which is kept in Ionic storage.
5. Currencies list request is being cached in storage to save free requests amount.

to start:
- clone repo's main branch;
- run npm i;
- ionic serve (CLI should be installed);

Requirenments: 

Setup Angular project last version. Add git to the project and use it often, commits are important. Implement next functionality:
Create a simple layout that needs to contain a name and logo.
Apps need to have an authentication system in app. Users should be able to register and login with username and password. (In angular use NGXS or NGRX for saving data, if you decide to use Ionic, use Ionic Storage).
Create a currency converter page. After successfully login, users need to be redirected to this page. On this page you need to have input for amount an button to trigger action. For converting use this API https://app.freecurrencyapi.com/dashboard . Result of converting should be saved in the list.
All navigation need to be done in ionic.
To create a currency page implement some popular HTML/CSS framework like Bootstrap, Bulma, Material.
Page need to be responsive and to look nice on mobile device also.
