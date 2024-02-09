import { notification } from "antd";

const roundOff = 5;

const formatNumber = (number) => {
  //return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number);
};

const findInitLetters = (...value) => {
  let initLetters = "";
  value.map((val) => (initLetters += val.charAt(0).toUpperCase()));
  return initLetters;
};

const formatAddress = (values) => {
  // const values = getValues();
  // console.log(values.addresses);
  let v = "";

  values.addresses.map((e) => {
    if (e.shipping) {
      v = `${e.country},${e.addressee},${e.phone},\n${e.address1},\n${e.address2},\n${e.address3},\n${e.city},\n${e.state},\n${e.zip},\n
      `;
    }
  });

  return v;
};

class TanasUtils {
  /**
   * This method is use to find the Price of each size in a pack.
   *
   * @param {Number} min Minimum size in the pack
   * @param {*} max Maximum size in the pack.
   * @param {Number} basePrice Base Price
   * @param {Number} expense Expense
   * @param {Number} transportChargePer Transportation charge in number. eg. 8% is 8, 40% is 40
   * @param {Number} profitPer Profit Percentage in number. eg. 45% is 45, 75% is 75.
   * @param {Number} gst GST Percentage in number
   * @returns Object
   */
  calculatePrice(
    min,
    max,
    basePrice,
    expense,
    transportChargePer,
    profitPer,
    gst
  ) {
    let arrayOfSize = new Array();

    const priceFactor = this.findPriceFactor(basePrice);
    const result = this.findMedian(min, max);

    if (result.median) {
      for (var i = min; i <= max; i += 2) {
        let totalPrice =
          basePrice + ((i - result.median) * priceFactor) / 2 + expense;
        //console.log(i, (Math.ceil(totalPrice * (1 + transportChargePer / 100) * (1 + profitPer / 100) * (1 + gst / 100) / 5)) * 5)
        const eachSize = {
          size: i,
          price:
            Math.ceil(
              (totalPrice *
                (1 + transportChargePer / 100) *
                (1 + profitPer / 100) *
                (1 + gst / 100)) /
              roundOff
            ) * roundOff,
        };

        arrayOfSize.push(eachSize);
      }
      return arrayOfSize;
    } else {
      return "Something went wrong, please check the size you have provided!";
    }
  }

  /**
   * This method is use to find the median(the middle value) in a list ordered from smallest to largest.
   *
   * @param {Number} min - Minimun size in the pack.
   * @param {Number} max - Maximum size in the pack.
   * @returns Object
   */
  findMedian(min, max) {
    let sumOfSize = (min + max) / 2;
    return { median: sumOfSize };
  }

  isOddNumberOfSize(min, max) {
    let sumOfSize = (min + max) / 2;
    if (sumOfSize % 2 == 0) return { isOdd: true, median: sumOfSize };
    else return { isOdd: false, median: sumOfSize };
  }

  /**
   * This method is use to find the price factor
   * Rules
   * price: 1 - 25 return 1
   * price: 26 - 50 return 2
   * price: 51 - 75 return 3
   * ..
   * ..
   * price: 501 - 525 return 21
   * @param {Number} price - Base price of the product.
   * @returns Number
   */
  findPriceFactor(price) {
    let result = price / 25;
    return Math.ceil(result);
  }
}

const errorMessage = (err, dispatch) => {
  if (
    err.response?.data.message == "Logged out.please log in" ||
    err.response?.data.message ==
    "You are not logged in! Please log in to get access." ||
    err.response?.data.message ==
    "The user belonging to this token does no longer exist."
  ) {
    if (dispatch)
      dispatch({ type: "LOGOUT_USER" });

  } else {
    console.log(err);
    notification.error({
      message: err.response?.data.message,
      style: {
        color: "red",
      },
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  }
};

const checkBlank = (e, index, field, setValue) => {
  if (e.target.value == "") {
    setValue(`products.${index}.${field}`, 1.0);
  }
};

export {
  formatNumber,
  findInitLetters,
  formatAddress,
  TanasUtils,
  errorMessage,
  checkBlank,
};
