/*
 * Konami.js
 *
 * Copyright 2014, Connor Atherton - http://connoratherton.com/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * Github:  http://github.com/ConnorAtherton/Konami.js/
 */
(function(window, document) {
  'use strict';

  /**
  *
  **/
  var sequence = '';

  /**
  *
  **/
  var konamiSequence = '38384040373937396665';

  /**
  *
  **/
  var addEvent = function(element, event, callback) {
    if (element.addEventListener) {
      return element.addEventListener(event, callback, false);
    } else {
      return element.attachEvent('on' + event, callback);
    }
  }

  /**
  *
  **/
  var Konami = this.Konami || function(callback) {

    /**
    *
    **/
    var checkForKonami = function(event) {
      sequence += event.keyCode;

      if(sequence.length > konamiSequence.length) {
          sequence = sequence.substring(sequence.length - konamiSequence.length);
      }

      if(sequence === konamiSequence) {
        callback.call(window);
      }

      console.log(event, sequence, konamiSequence);
    },
    /**
    *
    **/
    init = function(callback) {
      addEvent(document, 'keydown', checkForKonami);
    };

    init(callback);
  }

  /**
  * Exports and modularity
  **/
  // commonjs
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Konami;
  }
  // browser
  if (this.navigator) {
    this.Konami = Konami;
  }
  // amd definition
  if (typeof define === "function" && define.amd) {
    define('Konami', [], function () {
      return Konami;
    });
  }

}).call(this, window, document, undefined)
