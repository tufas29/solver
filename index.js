const axios = require("axios");

const solvehCaptcha = require("./solver.js");

const url =
  "https://www.yad2.co.il/my-alerts/realestate/66e34186bb50e18879901b70?utm_source=myAlertsRealestate&utm_medium=email&utm_campaign=myAlertsFeed";

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36",
};

const solve = async () => {
  try {
    const response = await axios.get(url, { headers });
    const validateURL = response.request.res.responseUrl;
    if (validateURL.includes("validate")) {
      const token = await solvehCaptcha(validateURL);
      const formData = new FormData();
      formData.append("h-captcha-response", token);
      formData.append(
        "cfi",
        "V015186870c621UTGzpTW741121372ICmlEUmO3c4343317277178426953458680f06"
      ); // אני לא יודע מה צריך להזין במקום המחרוזת הארוכה. לקחתי את זה מהאתר והדבקתי אבל אני מבין שזה ערך שמשתנה.
      const secondRequest = await axios.post(validateURL, formData, {
        headers,
      });
      console.log(secondRequest.data);
    }
  } catch (error) {
    console.error(error);
  }
};

solve();
