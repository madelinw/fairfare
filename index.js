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
    self.el.pay1El = $(".person1 span");
    self.el.pay2El = $(".person2 span");
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

    $("#bill-amount, #income1, #income2").on("propertychange change click keyup input paste", function() {
      _.amount = _.billAmtEl.val() * 1;
      _.inc1 = _.income1El.val() * 1;
      _.inc2 = _.income2El.val() * 1;

      h.splitBill();

      _.pay1El.html(_.pay1.toFixed(2));
      _.pay2El.html(_.pay2.toFixed(2));
    });
  },

  helpers: {
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
    }
  }
}


$(document).ready(function() {
  SplitFair.init();
});