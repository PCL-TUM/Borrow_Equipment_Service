var Notification = require("../models/Notification");

exports.sendNoti = async () => {
  let dataReport = await getDataReport();
  let newReportList = [];
  if (dataReport != null) {
    for (let i = 0; i < dataReport.length; i++) {
      //วันที่ปัจจุบัน
      let dateNow = new Date();
      // let dateNow = await convertUTCDateToLocalDate(today);
      dateNow.setHours(dateNow.getHours() + 7);
      //วันที่ยืม
      // let checkDateBor = await convertUTCDateToLocalDate(
      //   dataReport[i]["borrow_date"]
      // );
      let checkDateBor = new Date(dataReport[i]["borrow_date"]);
      checkDateBor.setHours(checkDateBor.getHours() + 4);
      //ถ้าวันที่ยืม +4 ชั่วโมงเกินเวลาปัจจุบัน
      if (dateNow > checkDateBor) {
        //ข้อมูลแจ้งเตือน
        let dataNoti = await checkDataNoti(dataReport[i]["id"]);
        if (dataNoti.length < 1) {
          let statusInsert = await insertDataNoti(dataReport[i]["id"]);
          if (statusInsert != null) {
            newReportList.push(dataReport[i]);
          }
        } else {
          if (dataNoti[0]["read_noti"] == 0) {
            //เวลาส่งแจ้งเตือน
            // let dateSendNoti = await convertUTCDateToLocalDate(
            //   dataNoti[0]["update_at"]
            // );
            let dateSendNoti = new Date(dataNoti[0]["update_at"]);
            dateSendNoti.setHours(dateSendNoti.getHours() + 4);
            //ถ้าวันที่ส่งแจ้งเตือน +4 ชั่วโมงเกินเวลาปัจจุบัน
            if (dateNow > dateSendNoti) {
              let statusUpdate = await updateDateSendNoti(dataNoti[0]["id"]);
              if (statusUpdate != null) {
                newReportList.push(dataReport[i]);
              }
            }
          } else {
          }
        }
      }
    }
  }

  return new Promise((resolve, reject) => {
    try {
      resolve(newReportList);
    } catch (err) {
      resolve(null);
    }
  });
};

async function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  return newDate;
}

async function getDataReport() {
  return new Promise((resolve, reject) => {
    try {
      Notification.getDataReport((err, rows) => {
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

async function checkDataNoti(reportID) {
  return new Promise((resolve, reject) => {
    try {
      Notification.checkDataNoti(reportID, (err, rows) => {
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

async function insertDataNoti(reportID) {
  return new Promise((resolve, reject) => {
    try {
      Notification.insertDataNoti(reportID, (err, rows) => {
        if (err) {
          console.log(err);
          resolve(null);
        } else {
          resolve(true);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(null);
    }
  });
}

async function updateDateSendNoti(NotiID) {
  return new Promise((resolve, reject) => {
    try {
      Notification.updateDateSendNoti(NotiID, (err, rows) => {
        if (err) {
          console.log(err);
          resolve(null);
        } else {
          resolve(true);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(null);
    }
  });
}
