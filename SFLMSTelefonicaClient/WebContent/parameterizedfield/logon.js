var appContext;

/********************************************************************
 * Initialize the application
 * In this case, it will check first of the application has already
 * registered with the SMP server. If not, it will register the app
 * then proceed to manage the logon process.
 ********************************************************************/
function doLogonInit(devapp) {

  //Init must be the first method called
  console.debug("Entering doLogonInit");
  
  //Is the host address populated?
  if (devapp.smpInfo.server.length < 1) {
    console.error("You must set the SMP server address before you can initialize the server connection");
    return;
  }  

 
   var context = {serverHost: devapp.smpInfo.server, serverPort: devapp.smpInfo.port};
   sap.Logon.init(onLogonInitSuccess, onLogonError, devapp.smpInfo.appID, context);
  
  console.debug("Leaving doLogonInit");
}

var onLogonInitSuccess = function(context) {
  console.debug("Entering LogonInitSuccess");
  //Make sure Logon returns a context 
  if (context) {
    //Store the context so that it is available for later use, if necessary
    appContext = context;   

    //Build the results message which will be written to the log and
    //displayed to the user
    var msg = "Server Returned: " + JSON.stringify(context);
    console.debug(msg);
	startApp(context);
  } else {
    //Something went seriously wrong here, context is not populated
    console.error("context null");
  }
  console.debug("Leaving LogonInitSuccess");
};

var onLogonError = function(errObj) {
  //Generic error function, used as a callback by several of the methods
  console.error("Entering logonError");
  //write the contents of the error object to the console.
  console.error(JSON.stringify(errObj));
  console.error("Leaving logonError");
};


/********************************************************************
 * Delete the application's registration information
 * Disconnects the app from the SMP server
 ********************************************************************/
function doDeleteRegistration() {
  console.debug("Entering doDeleteRegistration");
  if (appContext) {
    //Call logon's deleteRegistration method
    sap.Logon.core.deleteRegistration(onDeleteRegistrationSuccess, onLogonError);
  } else {
    //nothing to do here, move along...
    var msg = "The application is not initialized, cannot delete context";
    console.debug(msg);
  }
  console.debug("Leaving doDeleteRegistrationU");
}

function onDeleteRegistrationSuccess(res) {
  console.debug("Entering unregisterSuccess");
  navigator.app.exitApp();
  console.debug("Unregister result: " + JSON.stringify(res));
  //Set appContext to null so the app will know it's not registered
  appContext = null;
  //reset the app to its original packaged version
  //(remove all updates retrieved by the AppUpdate plugin)
  sap.AppUpdate.reset();
  console.debug("Leaving unregisterSuccess");
}

/********************************************************************
 * Lock the DataVault
 ********************************************************************/
function doLogonLock() {
  console.debug("Entering doLogonLock");
  //Everything here is managed by the Logon plugin, there's nothing for
  //the developer to do except to make the call to lock to
  //Lock the DataVault
  sap.Logon.lock(onLogonLockSuccess, onLogonError);
  console.debug("Leaving doLogonLock");
}

var onLogonLockSuccess = function() {
  console.debug("Entering logonLockSuccess");
  console.debug("Leaving logonLockSuccess");
};

/********************************************************************
 * Unlock the DataVault
 ********************************************************************/
function doLogonUnlock() {
  console.debug("Entering doLogonUnlock");
  //Everything here is managed by the Logon plugin, there's nothing for
  //the developer to do except to make the call to unlock.
  //we'll be using the same success callback as
  //with init as the signatures are the same and have the same functionality
  sap.Logon.unlock(onLogonInitSuccess, onLogonError);
  console.debug("Leaving doLogonUnlock");
}

/********************************************************************
 * Show the application's registration information
 ********************************************************************/
function doLogonShowRegistrationData() {
  console.debug("Entering doLogonShowRegistrationData");
  //Everything here is managed by the Logon plugin, there's nothing for
  //the developer to do except to make a call to showRegistratioData
  sap.Logon.showRegistrationData(onShowRegistrationSuccess, onShowRegistrationError);
  console.debug("Leaving doLogonShowRegistrationData");
}

function onShowRegistrationSuccess() {
  console.debug("Entering showRegistrationSuccess");
  //Nothing to see here, move along...
  console.debug("Leaving showRegistrationSuccess");
}

function onShowRegistrationError(errObj) {
  console.debug("Entering showRegistrationError");
  console.error(JSON.stringify(errObj));
  console.debug("Leaving showRegistrationError");
}

/********************************************************************
 * Update the DataVault password for the user
 ********************************************************************/
function doLogonChangePassword() {
  console.debug("Entering doLogonChangePassword");
  //Everything here is managed by the Logon plugin, there's nothing for
  //the developer to do except to make the call to changePassword
  sap.Logon.changePassword(onPasswordSuccess, onPasswordError);
  console.debug("Leaving doLogonChangePassword");
}

/********************************************************************
 * Change the DataVaule passcode
 ********************************************************************/
function doLogonManagePasscode() {
  console.debug("Entering doLogonManagePassword");
  //Everything here is managed by the Logon plugin, there's nothing for
  //the developer to do except to make the call to managePasscode
  sap.Logon.managePasscode(onPasswordSuccess, onPasswordError);
  console.debug("Leaving doLogonManagePassword");
}

function onPasswordSuccess() {
  console.debug("Entering passwordSuccess");
  //Nothing to see here, move along...
  console.debug("Leaving passwordSuccess");
}

function onPasswordError(errObj) {
  console.error("Entering passwordError");
  console.error("Password/passcode error");
  console.error(JSON.stringify(errObj));
  console.error("Leaving passwordError");
}

/********************************************************************
 * Read/Write values from the DataVault
 ********************************************************************/
function doLogonSetDataVaultValue(theKey, theValue) {
  console.debug("Entering doLogonSetDataVaultValue");
  
  //Make sure we have both a key and a value before continuing
  //No sense writing a blank value to the DataVault
  if (theKey !== "" && theValue !== "") {
    console.debug("Writing values to the DataVault");
    //Write the values to the DataVault
    sap.Logon.set(onDataVaultSetSuccess, onDataVaultSetError, theKey, theValue);
  } else {
    //One of the input values is blank, so we can't continue
    console.error("Key and/or value missing.");
  }
  console.debug("Leaving doLogonSetDataVaultValue");
}

function onDataVaultSetSuccess() {
  console.debug("Entering dataVaultSetSuccess");
  //Clear out the input fields
  //Cordova alerts are asynchronous, so this code will likely clear the input
  //fields before the alert dialog displays
  console.debug("Leaving dataVaultSetSuccess");
}

function onDataVaultSetError(errObj) {
  console.error("Entering dataVaultSetError");
  console.error("Error writing to the DataVault");
  console.error("Leaving dataVaultSetError");
}

function doLogonGetDataVaultValue(theKey) {
  console.debug("Entering doLogonGetDataVaultValue");
  //Make sure we have a key before continuing
  if (theKey !== "") {
    console.debug("Reading value for " + theKey + " from the DataVault");
    //Read the value from the DataVault
    sap.Logon.get(onDataVaultGetSuccess, onDataVaultGetError, theKey);
  } else {
    //One of the input values is blank, so we can't continue
    console.error("Value for key missing.");
  }
  console.debug("Leaving doLogonGetDataVaultValue");
}

function onDataVaultGetSuccess(value) {
  console.debug("Entering dataVaultGetSuccess");
  console.debug("Received: " + JSON.stringify(value));
  console.debug("Leaving dataVaultGetSuccess");
}

function onDataVaultGetError(errObj) {
  console.error("Entering dataVaultGetError");
  console.error(JSON.stringify(errObj));
  console.error("Leaving dataVaultGetError");
}

