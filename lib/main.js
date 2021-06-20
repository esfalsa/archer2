"use strict";

$(document).ready(function () {
    // Mobile hamburger nav
    $(".navbar-burger").click(function () {
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

    // Mobile warning display
    var getDeviceType = function getDeviceType() {
        var ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return "tablet";
        }
        if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return "mobile";
        }
        return "desktop";
    };

    if (getDeviceType() !== "desktop") {
        $("#mobileWarning").toggleClass("is-hidden");
    };

    // LocalStorage implementation

    var storage;
    try {
        storage = localStorage.getItem("endorsed") || "";
    } catch (e) {
        storage = "";
    }
    // Clear data
    $("#clearLocalStorage").click(function () {
        try {
            localStorage.removeItem("endorsed");
        } catch (e) {
            console.log("localStorage not supported by browser");
        }
    });

    // API call

    function getEndorsementList(nation, interactive, localid) {
        $(".loader").toggleClass("is-hidden");
        $.ajax({
            type: 'GET',
            url: API_URL + nation,
            dataType: 'json',
            success: function success(data) {
                data.forEach(function (element) {
                    if (interactive) {
                        var endorseURL = "https://nationstates.net/cgi-bin/endorse.cgi?nation=" + element + "&localid=" + localid + "&action=endorse";
                        $("#endorsementField").append("<a class='button' href='" + endorseURL + "' target='_archer'>" + element + "</a>");
                    } else {
                        $("#endorsementField").append("<a class='button' href='https://nationstates.net/nation=" + element + "' target='_archer'>" + element + "</a>");
                    }
                });
                $(".loader").toggleClass("is-hidden");
                $("#endorsementField").toggleClass("is-hidden");
            },
            error: function error(data) {
                $(".loader").toggleClass("is-hidden");
                showErrorMessage(data.status + " " + data.responseJSON.error);
            }
        });
    };

    // Shared
    function showErrorMessage(message) {
        $("#errorMessage").text(message);
        $("#errorBox").toggleClass("is-hidden");
    }
    $("#endorsementField").on("click", "a.button", function () {
        var _this = this;

        storage += $(this).text() + '|';

        try {
            localStorage.setItem("endorsed", storage);
        } catch (e) {
            console.log("localStorage not supported by browser");
        }

        $(this).addClass("is-loading");
        setTimeout(function () {
            $(_this).remove();
        }, 1000);
    });

    // Interactive
    $('#interactiveConfirmButton').click(function () {
        $('#interactiveConfirmForm').toggleClass('is-hidden');
        $('#interactiveConfirmDesc').toggleClass('is-hidden');
        $("#interactiveNationInput").toggleClass("is-hidden");
        $('#stepOne').toggleClass('is-active');
        $('#stepTwo').toggleClass('is-active');
    });
    $("#interactiveNextButton").click(function () {
        $("#interactiveNationInput").toggleClass("is-hidden");
        $("#stepTwo").toggleClass("is-active");
        $("#stepThree").toggleClass("is-active");
        $("#interactiveLocalIDInput").toggleClass("is-hidden");
    });
    $("#interactiveGoButton").click(function () {
        var localid = $("#localID").val();
        var nation = $("#nationName").val();
        getEndorsementList(nation, true, localid);
        $("#interactiveLocalIDInput").toggleClass("is-hidden");
        $("#stepThree").toggleClass("is-active");
        $("#stepFour").toggleClass("is-active");
    });

    // Static
    $("#staticGoButton").click(function () {
        var nation = $("#nationName").val();
        getEndorsementList(nation);
        $("#staticNationInput").toggleClass("is-hidden");
        $("#stepOne").toggleClass("is-active");
        $("#stepTwo").toggleClass("is-active");
    });
});