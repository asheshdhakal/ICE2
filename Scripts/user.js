"use strict";

(function (core) {

class User {
    constructor(displayName = "", emailAddress = "", username = "",password = ""){
        this._displayName = displayName;
        this._emailAddress = emailAddress;
        this._username = username;
        this._password = password;
    }
    get displayName() {
        return this._displayName;
    }

    set displayName(value) {
        this._displayName = value;
    }

    get emailAddress() {
        return this._emailAddress;
    }

    set emailAddress(value) {
        this._emailAddress = value;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }
    get password() {
        return this._password;
    }





    toString(){

        return `DisplayName: ${this._displayName}\n
                  EmailAddress: ${this._emailAddress}\n
                  Username: ${this.username}\n`;

    }

    /**
     * Serialize for writing to localStorage
     * @returns {null/string}
     */

    serialize(){

        if(this._fullName !== "" && this._contactNumber !== "" && this._emailAddress !== ""){

            return `${this.fullName}, ${this.contactNumber}, ${this.emailAddress}`;
        }
        console.error("One or more properties of the contact are empty or invalid");
        return null;
    }

    /**
     * Deserializer is used to read data from local storage.
     * @param data
     */
    deserialize(data){
        //"Bruce Wayne, 555-5555, bruce@batman.ca"
        let propertyArray = data.split(",");
        this._displayName = propertyArray[0];
        this._emailAddress = propertyArray[1];
        this._username = propertyArray[2];
    }

fromJSON(data)
{
this._displayName = data.DisplayName;
this._emailAddress = data.EmailAddress;
this._username = data.Username;
this._password = data.Password
}
toJSON(){
return {
DisplayName : this._displayName,
            EmailAddress : this._emailAddress,
            Username: this._username,
            Password: this._password
            }
}
}
core.User = User;
})(core || (core = {}) );