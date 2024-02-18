"use strict";

// IIFE - Immediate invoked functional expression
(function (){

    function CheckLogin(){
        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-in-alt"></i> Logout</a>`)
        }
        $("#logout").on("click", function (){
          sessionStorage.clear();
          location.href = "index.html";
        });
    }

    function LoadHeader(html_data){

        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
        CheckLogin();
    }


    function AjaxRequest(method, url, callback){

        let xhr = new XMLHttpRequest();

        //Step 2: Opens a connection to the server
        xhr.open(method, url);

        xhr.addEventListener("readystatechange", ()=> {

            if(xhr.readyState === 4 && xhr.status === 200){

            if(typeof callback == "function") {
                callback(xhr.responseText);
            }else{
                    console.error("Error.  Callback not a function")
            }
            }

        });


        //Step 3: Send the Request
        xhr.send();

    }

    /**
     * This function validates input for contact and edit page
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */

    function contactFormValidation() {
        let isValid = true;
        // Clear previous messages
        $("#messageArea").removeClass("alert alert-danger").text("").hide();

        // Validate fullName
        let fullNameValid = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/.test($("#fullName").val());
        if (!fullNameValid) {
            $("#messageArea").addClass("alert alert-danger").text("Please enter a valid First and Last name!").show();
            isValid = false;
        }

        // Validate contactNumber
        let contactNumberValid = /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/.test($("#contactNumber").val());
        if (!contactNumberValid && isValid) { // Only update if no previous error
            $("#messageArea").addClass("alert alert-danger").text("Please enter a valid Contact number!").show();
            isValid = false;
        }

        // Validate emailAddress
        let emailAddressValid = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/.test($("#emailAddress").val());
        if (!emailAddressValid && isValid) { // Only update if no previous error
            $("#messageArea").addClass("alert alert-danger").text("Please enter a valid Email address!").show();
            isValid = false;
        }

        return isValid;
    }



    function ValidateField(input_field_id, regular_expression, error_message){
        let messageArea = $("#messageArea").hide();

        $(input_field_id).on("blur", function () {
            let input_value = $(this).val();
            if(!regular_expression.test(input_value)){
                // fail validation
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }else{
                //pass validation
                messageArea.removeClass("class").hide();
            }
        });
    }

    function AddContact(fullName, contactNumber, emailAddress){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()){
            let key = contact.fullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }

    function displayhomepage(){
        console.log("called displayhomepage");

        $("#AboutUsBtn").on("click", () =>{
            location.href = "about.html";
        });

        $("min").append(`<p id ="MainParagraph" 
                                class="mt-3"> This is my first paragraph</p>`);

        $("body").append(`<article class="container">
                       <p id="ArticleParagraph" class="mt-3"> This is my article paragraph</p></article>`)

       let DocumentBody = document.body;

       let Article = document.createElement("article");
       let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3>"> This is my article paragraph</p>`;
       Article.setAttribute("class", "container");
       Article.innerHTML = ArticleParagraph;

       DocumentBody.appendChild(Article);
    }

    function displayproducts(){
        console.log("called displayproducts");
    }

    function displayaboutus(){
        console.log("called displayaboutus");
    }

    function DisplayLoginPage() {
        console.log("Called DisplayLogin()...");
        let messageArea=$("#messageArea");
        $("#loginButton").on("click", function (){

           let success = false;
           let newUser = new core.User();
           $.get( "./Data/users.json", function (data){
               for(const user of data.users){

                   console.log(user);
                   if(username.value === user.Username && password.value === user.Password){
                       newUser.fromJSON(user);
                       success=true;
                       break;
                   }
               }
            if(success){
                sessionStorage.setItem("user", newUser.serialize());
                messageArea.removeAttr("class").hide();
                location.href="contactlist.html";
            }
            else    {
                $("#username").trigger("focus").trigger("select");
                messageArea
                    .addClass("alert alert-danger").text("Error: Invalid Credentials")
                    .show();
            }
           });
        });
        $("#cancelButton").on("click", function (){
            document.forms[0].reset();
            location.href="index.html";
        })
    }


    function DisplayRegisterPage() {
        console.log("Called DisplayRegister()...");
    }

    function displaycontactus() {
        console.log("called displaycontactus");

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent the default form submission behavior

            // First, perform form validation
            if (!contactFormValidation()) {
                console.log("Form validation failed.");
                return;
            } else {
                console.log("Form validation passed.");

                if(contactFormValidation()) {

                    let fullName = document.getElementById("fullName").value;
                    let contactNumber = document.getElementById("contactNumber").value;
                    let emailAddress = document.getElementById("emailAddress").value;

                    AddContact(fullName,contactNumber,emailAddress);
                    console.log("Contact added:",fullName,contactNumber,emailAddress);
                    location.href = "contactlist.html";
                }
                else {
                    console.log("Checkbox is not checked. Contact not added.");
                }
            }
        });
    }


    function displayourservice(){
        console.log("called displayourservice");
    }

    function contactlistpage(){
        console.log("called displaycontactlistpage");

       if(localStorage.length > 0) {
           let contactList = document.getElementById("contactlist");
           let data = "";

           let index = 1;
           let keys = Object.keys(localStorage);

           for(const key of keys) {
               let contact = new core.Contact();
               let contactData = localStorage.getItem(key);
               contact.deserialize(contactData);
               data += `<tr><th scope="row" class="text-center">${index}</th>
                        <td>${contact.fullName}</td>
                        <td>${contact.contactNumber}</td>
                        <td>${contact.emailAddress}</td>
                        <td><button value="${key}" class="btn btn-primary btn-sm edit">
                            <i class="fas fa-edit fa-sm"> Edit</i>
                            </button>
                        </td>
                        <td><button value="${key}" class="btn btn-danger btn-sm delete">
                            <i class="fas fa-edit fa-sm"> Delete</i>
                            </button>
                        
                        </td>
                        </tr>`;
               index++;

           }
           contactList.innerHTML = data;
       }

    $("#addButton").on("click", () => {
            location.href = "edit.html#add";

        });

       $("button.edit").on("click", function () {
           location.href = "edit.html#" + $(this).val();
       })

        $("button.delete").on("click", function (){

            if(confirm("Confirm contact Delete?")){
                localStorage.removeItem($(this).val());
            }
            location.href = "contactlist.html";
        });
    }

    function DisplayEditPage(){
        console.log("Called DisplayEditPage()...");

        let page = location.hash.substring(1);
        switch (page) {
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fa fa-plus fa-sm"> Add`);

                $("#editButton").on("click", (event) => {
                    event.preventDefault();

                    // Only perform form validation when the edit button is clicked
                    if (!contactFormValidation()) {
                        console.log("Form validation failed.");
                        return; // Do not proceed if validation fails
                    }

                    var fullName = $("#fullName").val();
                    var contactNumber = $("#contactNumber").val()
                    var emailAddress = $("#emailAddress").val()

                    AddContact(fullName, contactNumber, emailAddress);
                    location.href = "contactlist.html";
                });
                break;
            default:
                //edit page

                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));

                $("#fullName").val(contact.fullName)
                $("#contactNumber").val(contact.contactNumber)
                $("#emailAddress").val(contact.emailAddress)

                $("#editButton").on("click", (event) => {

                    //prevent form submission
                    event.preventDefault();
                    if (!contactFormValidation()) {
                        console.log("Form validation failed.");
                        return;
                    }

                    contact.fullName = $("#fullName").val();
                    contact.contactNumber = $("#contactNumber").val()
                    contact.emailAddress = $("#emailAddress").val()


                    localStorage.setItem(page, contact.serialize());
                    location.href = "contactlist.html";

                });

                $("#cancelButton").on("click", () => {
                    location.href = "contactlist.html";
                });
                break;
        }




    }



    function Start(){
        console.log("App Started...");

        AjaxRequest("GET", "header.html", LoadHeader);

        switch(document.title){
            case "Home":
                displayhomepage();
                break;
            case "Products":
                displayproducts();
                break;
            case "About Us":
                displayaboutus();
                break;
            case "Contact":
                displaycontactus();
                break;
            case "Our Service":
                displayourservice();
                break;
            case "Contact List":
                contactlistpage();
                break;
            case "Edit Contact":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;


        }
    }

    window.addEventListener("load", Start);


})()