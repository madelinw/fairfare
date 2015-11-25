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
    self.el.percentage = 0.77;

    self.el.billAmtEl = $("#bill-amount");
    self.el.income1El = $("#income1");
    self.el.income2El = $("#income2");
    self.el.pay1El = $(".person1");
    self.el.pay2El = $(".person2");
  },

  init: function() {
    var self = this;
    _ = self.el;
    h = self.helpers;

    self.events();
  },

  events: function() {
    var self = this;
    $(document).ready(function() {
      self.setEl();
    });

    $("#bill-amount, #income1, #income2").on("change", function() {
      _.amount = _.billAmtEl.val() * 1;
      _.inc1 = _.income1El.val() * 1;
      _.inc2 = _.income2El.val() * 1;

      h.splitBill();

      _.pay1El.html(_.pay1.toFixed(2));
      _.pay2El.html(_.pay2.toFixed(2));

      console.log("percentage: " + _.percentage)
    });
  },

  helpers: {
    splitBill: function() {
      var max = Math.max(_.inc1, _.inc2);
      var min = Math.min(_.inc1, _.inc2);
      _.percentage = (_.inc1 != 0 && _.inc2 != 0) ? (min / (_.inc1 + _.inc2)) : 0.77;

      if (_.amount != 0) {
        if (_.inc2 < _.inc1) {
          _.pay1 = _.amount * _.percentage;
          _.pay2 = _.amount - _.pay1;
        } else {
          _.pay2 = _.amount * _.percentage;
          _.pay1 = _.amount - _.pay2;
        }
      }
    }
  }
}


$(document).ready(function() {
  SplitFair.init();
});