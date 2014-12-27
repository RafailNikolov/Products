'use strict';

(function() {
    $(function () {
        registerEventHandler();
        showLoginRegisterView();
    });


    //----------------------BUTTON FUNCTIONALITY------------------


            function registerEventHandler() {
            $("#btnHomeView").click(showLoginRegisterView);
            $("#btnRegisterView").click(showRegisterView);
            $("#btnLoginView").click(showLoginView);
            $("#btnRegisterLogin").click(showLoginView);
            $("#btnLoginRegister").click(showRegisterView);
            $("#btnWelcomeLogin").click(showLoginView);
            $("#register-button").click(registerClicked);
            $("#login-button").click(loginClicked);
            $("#btnHomeHomeView").click(showHomeView);
            $("#btnAddProduct").click(showAddProductView);
            $("#add-product-button").click(addProduct);
            $("#btnCancel").click(showHomeView);
            $("#btnLogout").click(logoutClicked);
            $("#btnProducts").click(showProductView);


    }


// --------------------------VIEWS-------------------------------------------


    function showLoginRegisterView() {
        $("#homeMenu").hide();
        $("#loginRegisterMenu").show();
        $("#loginUser").hide();
        $("#registerUser").hide();
        $("#welcomeUser").hide();
        $("#addProduct").hide();
        $("#deleteProduct").hide();
        $("#editProduct").hide();
        $("#productList").hide();
        $("#welcomeGuest").show();
    }

    function showRegisterView() {
        $("#loginUser").hide();
        $("#registerUser").show();
        $("#welcomeUser").hide();
        $("#addProduct").hide();
        $("#deleteProduct").hide();
        $("#editProduct").hide();
        $("#productList").hide();
        $("#welcomeGuest").hide();
    }

    function showLoginView() {
        $("#loginUser").show();
        $("#registerUser").hide();
        $("#welcomeUser").hide();
        $("#addProduct").hide();
        $("#deleteProduct").hide();
        $("#editProduct").hide();
        $("#productList").hide();
        $("#welcomeGuest").hide();
    }

    function showHomeView() {
        var currentUser = userSession.getCurrentUser();
        $("#currentUserName").text(currentUser.username + "!");
        $("#homeMenu").show();
        $("#loginRegisterMenu").hide();
        $("#loginUser").hide();
        $("#registerUser").hide();
        $("#welcomeUser").show();
        $("#addProduct").hide();
        $("#deleteProduct").hide();
        $("#editProduct").hide();
        $("#productList").hide();
        $("#welcomeGuest").hide();

    }

    function showProductView(){
        var currentUser = userSession.getCurrentUser();
        if(currentUser) {
            $("#homeMenu").show();
            $("#loginRegisterMenu").hide();
            $("#loginUser").hide();
            $("#registerUser").hide();
            $("#welcomeUser").hide();
            $("#addProduct").hide();
            $("#deleteProduct").hide();
            $("#editProduct").hide();
            $("#productList").show();
            $("#welcomeGuest").hide();
            var sessionToken = currentUser.sessionToken;
            ajaxRequester.getProducts(sessionToken, loadProductsSuccess, loadProductsError);
        }
        else{
            showLoginRegisterView();
        }
    }

    function showAddProductView() {
        $("#homeMenu").show();
        $("#loginRegisterMenu").hide();
        $("#loginUser").hide();
        $("#registerUser").hide();
        $("#welcomeUser").hide();
        $("#addProduct").show();
        $("#deleteProduct").hide();
        $("#editProduct").hide();
        $("#productList").hide();
        $("#welcomeGuest").hide()

    }




    //------------------------REGISTER--------------




    function registerClicked() {
        var username = $("#username").val();
        var firstPassword = $("#password").val();
        var confirmPassword = $("#confirm-password").val();
        var password;
        if (firstPassword == confirmPassword) {
            var password = firstPassword;
        }
        else{
            showErrorMsg("Password does not match.");
        }
        ajaxRequester.register(username, password,
            function (data) {
                data.username = username;
                authSuccess(data);
            },
            registerError);

    }


    function registerError(){
        showErrorMsg("Register failed.");
    }




    //----------------------LOGIN-------------------




    function loginClicked(){
        var username = $("#loginUsername").val();
        var password = $("#loginPassword").val();
        ajaxRequester.login(username, password, authSuccess, loginError);
    }

    function loginError(){
        showErrorMsg("Login failed.");
    }





   // ---------------------LOGOUT--------------------





    function logoutClicked(){
        userSession.logout();
        showLoginRegisterView();
    }





    //---------------PRODUCTS-----------




    function loadProductsSuccess(){

    }

    function loadProductsError(){
        showErrorMsg("Load Products failed.");
    }




    //---------------------ADD PRODUCT-------------------





    function addProduct(){
        var name = $('#name').val();
        var category = $('#addCategory').val();
        var price = $('#addPrice').val();
        if(! isNaN(price)){
        var currentUser = userSession.getCurrentUser();
        ajaxRequester.addProduct(name, category, price, currentUser.objectId,
        addProductSuccess, addProductError);
        }
        else {
            addProductError();
        }
    }

    function addProductSuccess(){
        showInfoMsg("Product created.");
        showHomeView();
    }

    function addProductError(){
        showErrorMsg("Product not created.");
    }



    //-------------------AUTHENTICATION------------------






    function authSuccess(data){
        showInfoMsg("SUCCESS.");
        userSession.login(data);
        showHomeView();
    }





    //------------------------MSG---------------------





    function showInfoMsg(msg){
        noty({
            text: msg,
            type: 'info',
            layout: 'topCenter',
            timeout: 5000
        });
    }

    function showErrorMsg(msg){
        noty({
            text: msg,
            type: 'error',
            layout: 'topCenter',
            timeout: 5000
        });
    }
})();