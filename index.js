/*
 * Copyright (c) 2015 Madelin Woods. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

var _,
h,
SplitFair = {
  el: {},

  setEl: function() {
    var self = this;
    self.el.amount = 0;
    self.el.inc1 = 0;
    self.el.inc2 = 0;
    self.el.pay1 = 0;
    self.el.pay2 = 0;

    self.el.billAmtEl = $("#bill-amount");
    self.el.income1El = $("#income1");
    self.el.income2El = $("#income2");
    self.el.pay1El = $(".person1 span");
    self.el.pay2El = $(".person2 span");
    self.el.pay1Venmo = $(".person1 .venmo");
    self.el.pay2Venmo = $(".person2 .venmo");
  },

  init: function() {
    var self = this;
    _ = self.el;
    h = self.helpers;

    self.events();
    console.log("Made with love by Madelin Woods // www.madelinwoods.com");
  },

  events: function() {
    var self = this;
    $(document).ready(function() {
      self.setEl();
      h.initCurrency();

      if (location.hash.length > 0 && location.hash != "#,,") {
        _.billAmtEl.autoNumeric('set', location.hash.toString().split(",")[0].substr(1));
        _.income1El.autoNumeric('set', location.hash.toString().split(",")[1]);
        _.income2El.autoNumeric('set', location.hash.toString().split(",")[2]);

        h.setup();
      } else if (localStorage.income1 != "0" && localStorage.income1 != "" && localStorage.income2 != "0" && localStorage.income2 != "") {
        _.income1El.autoNumeric('set', localStorage.income1);
        _.income2El.autoNumeric('set', localStorage.income2);
      }
    });

    $("#bill-amount, #income1, #income2").on("propertychange change click keyup input paste", function() {
      h.setup();
    });

    $(".about-link").click(function(e) {
      e.preventDefault();
      $(".about-modal").toggleClass("show");
    })
  },

  helpers: {
    initCurrency: function() {
      _.billAmtEl.autoNumeric('init', {aSign: '$'});
      _.income1El.autoNumeric('init', {aSign: '$'});
      _.income2El.autoNumeric('init', {aSign: '$'});
    },
    setup: function() {
      h.initCurrency();

      _.amount = _.billAmtEl.autoNumeric('get').length > 0 ? _.billAmtEl.autoNumeric('get') * 1 : 0;
      _.inc1 = _.income1El.autoNumeric('get').length > 0 ? _.income1El.autoNumeric('get') * 1 : 0;
      _.inc2 = _.income2El.autoNumeric('get').length > 0 ? _.income2El.autoNumeric('get') * 1 : 0;

      h.splitBill();
      h.updateURL();

      _.pay1El.html(_.pay1.toFixed(2));
      _.pay2El.html(_.pay2.toFixed(2));

      _.pay1Venmo.attr("href", "https://venmo.com/?txn=pay&amount=" + _.pay1.toFixed(2) + "&note=💸%20Split%20fairly%20with%20%40fairfa_re&audience=public");
      _.pay2Venmo.attr("href", "https://venmo.com/?txn=pay&amount=" + _.pay2.toFixed(2) + "&note=💸%20Split%20fairly%20with%20%40fairfa_re&audience=public");

      localStorage.setItem('income1', _.inc1);
      localStorage.setItem('income2', _.inc2);
    },

    splitBill: function() {
      if (_.inc1 != 0 && _.inc2 != 0) {
        _.pay1 = (_.inc1 / (_.inc1 + _.inc2)) * _.amount;
        _.pay2 = (_.inc2 / (_.inc1 + _.inc2)) * _.amount;
      } else {
        if (_.inc1 > _.inc2) {
          _.pay1 = .77 * _.amount;
          _.pay2 = _.amount - _.pay1;
        } else {
          _.pay2 = .77 * _.amount;
          _.pay1 = _.amount - _.pay2;
        }
      }
    },

    updateURL: function() {
      if ([_.amount,_.inc1,_.inc2].join() != ",,") {
        location.hash = [_.amount,_.inc1,_.inc2].join();
      }
    }
  }
}


$(document).ready(function() {
  SplitFair.init();
});