const express = require("express");
const router = express.Router();
const Reverting = require("../models/Reverting");
const Utility = require("../controllers/Utility");

router.post("/UpdateData", async function (req, res, next) {
  let resCheckBor = await Utility.checkBorrowSame(req.body);
  if (resCheckBor[0]["id"] > 0) {
    let resReverting = await UpdateDataRevert(req.body);
    if (resReverting) {
      res.json({ status: "Succeed", data: "Reverting Pass" });
    } else {
      res.json({ status: "Failed", data: "Reverting Fail" });
    }
  } else {
    res.json({ status: "Failed", data: "Equip is not borrowed" });
  }
});

async function checkBorrowSame(data) {
  return new Promise((resolve, reject) => {
    try {
      Borrowing.checkBorrowSame(data, (err, rows) => {
        if (rows != null) {
          resolve(rows);
        } else {
          resolve(null);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(null);
    }
  });
}

async function UpdateDataRevert(data) {
  return new Promise((resolve, reject) => {
    try {
      Reverting.UpdateDataRevert(data, (err, rows) => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

module.exports = router;
