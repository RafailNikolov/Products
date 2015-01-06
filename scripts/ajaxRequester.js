'use strict';
var ajaxRequester = (function($) {
    var baseUrl = "https://api.parse.com/1/";

    var headers =
    {
        "X-Parse-Application-Id": "JzitCccQ6ancPDbbW1KIvdf0rYwgzfsU3PK1B0Fx",
        "X-Parse-REST-API-Key": "KMMVYbd5QfPVdQKjyOzJzj9w02BfsxdSBVIe6OID"
    };

    var login = function(username, password, success, error){
        jQuery.ajax({
            method: "GET",
            headers: headers,
            url: baseUrl + "login",
            data: {username: username, password: password},
            success: success,
            error: error
        });
    }

    function register(username, password, success, error){
        jQuery.ajax({
            method: "POST",
            headers: headers,
            url: baseUrl + "users",
            data: JSON.stringify({username: username, password: password}),
            success: success,
            error: error
        });
    }

    function getHeadersWithSessionToken(sessionToken){
        var headersWithToken = JSON.parse(JSON.stringify(headers));
        headersWithToken['X-Parse-Session-Token'] = sessionToken;
        return headersWithToken;
    }

    function getProduct(sessionToken, success, error){
        var headersWithToken = getHeadersWithSessionToken(sessionToken);
        jQuery.ajax({
            method: "GET",
            headers: headersWithToken,
            url: baseUrl + "classes/Product",
            success: success,
            error: error
        });
    }

    function addProduct(name, category, price, userId, success, error){
        var product = {name: name, category: category, price:price, ACL : {}};
        product.ACL[userId] = {"write" : true, "read" : true};
        jQuery.ajax({
            method: "POST",
            headers: headers,
            url: baseUrl + "classes/Product",
            data: JSON.stringify(product),
            success: success,
            error: error
        });
    }


    return {
        login: login,
        register: register,
        addProduct: addProduct,
        getProduct: getProduct
    };
}(jQuery));

