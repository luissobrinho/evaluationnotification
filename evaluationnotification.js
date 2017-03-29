/**
 * Created by Luis Eduardo Altino on 24/03/2017.
 * (ads.luis.sobrinho@gmail.com)
 * (luis.eduardo@ddsw.com.br)
 * Evaluation Notification
 * Version: 1.0
 * (c) Copyright.com.br
 */
var EvaluationNotification = function(){};
(function() {
   "use strict";
    var $win = window,
        $doc = document,
        $$doc = $($doc),
        $info = $win.console.info,
        $warn = $win.console.warn;

    EvaluationNotification.prototype.params = {
        title: 'Evaluate',
        text: 'Evaluate us and leave your comment as this is very valuable',
        type: 'star',
        times: 3,
        url: 'https://github.com/luissobrinho/Evaluation-Notification',
        bttnYesCallBack: false,
        bttnYesText: 'GIVE 5 STARS',
        bttnYesClass: '',
        bttnNoCallBack: false,
        bttnNoText: 'NOT NOW',
        bttnNoClass: '',
        bttnAfterCallBack: false,
        bttnAfterText: 'REMEMBER ME',
        bttnAfterClass: '',
        animation: {
            aIn: 'bounceInUp',
            aOut: 'bounceOutDown',
            delay: 1000
        }
    };

    EvaluationNotification.prototype.setParamsDefault = function() {
        EvaluationNotification.params = {
            title: 'Evaluate',
            text: 'Evaluate us and leave your comment as this is very valuable',
            type: 'star',
            times: 3,
            url: 'https://github.com/luissobrinho/Evaluation-Notification',
            bttnYesCallBack: false,
            bttnYesText: 'GIVE 5 STARS',
            bttnYesClass: '',
            bttnNoCallBack: false,
            bttnNoText: 'NOT NOW',
            bttnNoClass: '',
            bttnAfterCallBack: false,
            bttnAfterText: 'REMEMBER ME',
            bttnAfterClass: '',
            animation: {
                aIn: 'bounceInUp',
                aOut: 'bounceOutDown',
                delay: 1000
            }
        };
    };

    EvaluationNotification.prototype.setParams = function() {
        $.each(arguments[0], function(k,v) {
            EvaluationNotification.params[k] = v;
        });
    };

    EvaluationNotification.prototype.close = function() {
        $$doc.find('.evnt-section')
            .removeClass(EvaluationNotification.params.animation.aIn)
            .addClass(EvaluationNotification.params.animation.aOut)
            .delay(EvaluationNotification.params.animation.delay)
            .queue(function() {
               $(this).closest('.evnt-body').remove();
            });
    };

    EvaluationNotification.prototype.injectedHTML = function () {
        var injectedHTML =
            '<div class="evnt-body">' +
                '<div class="evnt-section animated '+EvaluationNotification.params.animation.aIn+'">' +
                    '<h1>'+EvaluationNotification.params.title+'</h1>';
        injectedHTML += (EvaluationNotification.params.type === 'star') ? '<div class="evnt-star">' +
        '<i class="zmdi zmdi-star-outline"></i>' +
        '<i class="zmdi zmdi-star-outline"></i>' +
        '<i class="zmdi zmdi-star-outline"></i>' +
        '<i class="zmdi zmdi-star-outline"></i>' +
        '<i class="zmdi zmdi-star-outline"></i>' +
        '</div>' : '';
        injectedHTML += '<p>'+EvaluationNotification.params.text+'</p>'+
                    '<div class="evnt-group-bttn">' +
                        '<button id="bttn-yes" class="bttn ' + EvaluationNotification.params.bttnYesClass + '">'+EvaluationNotification.params.bttnYesText+'</button>' +
                        '<button id="bttn-no" class="bttn ' + EvaluationNotification.params.bttnNoClass + '">'+EvaluationNotification.params.bttnNoText+'</button>' +
                        '<button id="bttn-after" class="bttn ' + EvaluationNotification.params.bttnAfterClass + '">'+EvaluationNotification.params.bttnAfterText+'</button>' +
                    '</div>' +
                '</div>' +
            ' </div>';
        $$doc.find('body').append(injectedHTML);
        setTimeout(function() {
            var x = $('.evnt-section').find(".evnt-star"),
                y = x.find(".zmdi-star-outline"),
                z = y.length,
                w = 0;
            y.each(function() {
                var z = $(this);
                setTimeout(function() {
                    z.addClass("animated swing zmdi-star").delay(1e3).queue(function() {
                        z.removeClass('zmdi-star-outline')
                    })
                }, w += 1000)
            });
        },100);
    };

    EvaluationNotification.prototype.open = function(param, callback) {
        if(!param) {
            $warn("Requires arguments");
            return false;
        }
        EvaluationNotification.setParams(param);
        EvaluationNotification.injectedHTML();
        if(callback ) {
            if (typeof(callback) === 'function') {
                callback();
                return this;
            } else {
                $warn("CallBack Open not function");
                return false;
            }
        }
    };

    EvaluationNotification.prototype.autoOpen = function(e,time) {
        setTimeout(function() {
            if(!localStorage.time && localStorage.time < e.params.times) {
                localStorage.time = 1;
            } else {
                if((e.params.times/localStorage.time) === 1) {
                    e.open({})
                } else {
                    localStorage.time++;
                }
            }
        },time)
    };

    EvaluationNotification.prototype.handleExternalURLs = function() {
        if('device' in window) {
            if (device.platform.toUpperCase() === 'ANDROID') {
                navigator.app.loadUrl(EvaluationNotification.params.url, {openExternal: true});
            }
            else if (device.platform.toUpperCase() === 'IOS') {
                window.open(EvaluationNotification.params.url, '_system');
            }
        } else {
                window.open(EvaluationNotification.params.url, '_blank');
            }
    };

    $$doc.on('click', '#bttn-yes', function() {
        localStorage.time = 4;
        if(EvaluationNotification.params.bttnYesCallBack) {
            if (typeof(EvaluationNotification.params.bttnYesCallBack) === 'function') {
                EvaluationNotification.params.bttnYesCallBack();
            } else {
                $warn("CallBack bttnYesCallBack not function");
            }
        }
        EvaluationNotification.handleExternalURLs();
        EvaluationNotification.setParamsDefault();
        EvaluationNotification.close();

    });
    $$doc.on('click', '#bttn-no', function() {
        localStorage.time = 4;
        if(EvaluationNotification.params.bttnNoCallBack) {
            if (typeof(EvaluationNotification.params.bttnNoCallBack) === 'function') {
                EvaluationNotification.params.bttnNoCallBack();
            } else {
                $warn("CallBack bttnNoCallBack not function");
            }
        }
        EvaluationNotification.setParamsDefault();
        EvaluationNotification.close();

    });
    $$doc.on('click', '#bttn-after', function() {
        localStorage.time = 1;
        if(EvaluationNotification.params.bttnAfterCallBack) {
            if (typeof(EvaluationNotification.params.bttnAfterCallBack) === 'function') {
                EvaluationNotification.params.bttnAfterCallBack();
            } else {
                $warn("CallBack bttnAfterCallBack not function");
            }
        }
        EvaluationNotification.setParamsDefault();
        EvaluationNotification.close();

    });

    $info('Evaluation Notification Initialized');
}());

window.EvaluationNotification = window.evnt = new EvaluationNotification();