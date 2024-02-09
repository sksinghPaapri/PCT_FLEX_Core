const fs = require("fs");
const os = require("os");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Get the host name
const hostname = os.hostname();
console.log(hostname);

switch (hostname) {
  case "LAPTOP-CGMRD4JG":
    dotenv.config({ path: "../dev.env" });
    break;
  case "PAAPRIFLEX":
    dotenv.config({ path: "../prod.env" });

  default:
    dotenv.config({ path: "../dev.env" });
}

mongoose
  .connect("mongodb://localhost:27017/flex2024_1_1002", {})
  .then(async (con) => {
    console.log("DB Connection Successfull!");

    const Permission = require("../modules/permission/permissionModel");
    const permissionJSON = JSON.parse(
      fs.readFileSync(`${__dirname}/permissions.json`, "utf-8")
    );
    await Permission.create(permissionJSON);
    console.log("\x1b[36m", "Permission is added successfully!", "\x1b[0m");

    const Role = require("../modules/role/roleModel");
    const roleJSON = JSON.parse(
      fs.readFileSync(`${__dirname}/roles.json`, "utf-8")
    );
    await Role.create(roleJSON);
    console.log("\x1b[36m", "Role is added successfully!", "\x1b[0m");

    const AppCenter = require("../modules/appCenter/appCenterModel");
    const AppCenterJSON = JSON.parse(
      fs.readFileSync(`${__dirname}/appcenters.json`, "utf-8")
    );
    await AppCenter.create(AppCenterJSON);
    console.log("\x1b[36m", "App is added successfully!", "\x1b[0m");

    const Employee = require("../modules/employee/employeeModel");
    const employeeJSON = JSON.parse(
      fs.readFileSync(`${__dirname}/employee.json`, "utf-8")
    );
    await Employee.create(employeeJSON);
    console.log(
      "\x1b[36m",
      "Default Employee is added successfully!",
      "\x1b[0m"
    );

    console.log(
      "\x1b[36m",
      "Email: rnawaz@paapri.com   Password: Paapri@April2022",
      "\x1b[0m"
    );
    /*
         const AccountType = require('../models/accountTypeModel');
         const accountTypesJSON = JSON.parse(fs.readFileSync(`${__dirname}/accounttypes.json`, 'utf-8'));
         await AccountType.create(accountTypesJSON)
         console.log('\x1b[36m', 'Account Type is added successfully!', '\x1b[0m');
    
         const Account = require('../models/accountModel');
         const accountJSON = JSON.parse(fs.readFileSync(`${__dirname}/accounts.json`, 'utf-8'));
         await Account.create(accountJSON)
         console.log('\x1b[36m', 'Account is added successfully!', '\x1b[0m');
    
         const UOM = require('../models/unitsModel');
         const UOMJSON = JSON.parse(fs.readFileSync(`${__dirname}/uoms.json`, 'utf-8'));
         await UOM.create(UOMJSON)
         console.log('\x1b[36m', 'Units of Measue is added successfully!', '\x1b[0m');
     */
    // const AppCenter = require('../models/appCenterModel');
    // const AppCenterJSON = JSON.parse(fs.readFileSync(`${__dirname}/data/appcenters.json`, 'utf-8'));
    // await AppCenter.create(AppCenterJSON)
    // console.log('\x1b[36m', 'App is added successfully!', '\x1b[0m');
    /*
        const Customer = require('../models/customerModel');
        const customerJSON = JSON.parse(fs.readFileSync(`${__dirname}/data/customers.json`, 'utf-8'));
        await Customer.create(customerJSON)
        console.log('\x1b[36m', 'Customers is added successfully!', '\x1b[0m');
   
        const Vendor = require('../models/vendorModel');
        const vendorJSON = JSON.parse(fs.readFileSync(`${__dirname}/data/vendors.json`, 'utf-8'));
        await Vendor.create(vendorJSON)
        console.log('\x1b[36m', 'Vendors is added successfully!', '\x1b[0m');
   
        const Product = require('../models/customerModel');
        const productJSON = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'));
        await Product.create(productJSON)
        console.log('\x1b[36m', 'Product is added successfully!', '\x1b[0m');
   
    */
  });

// READ JSON FILE
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    // await Tour.create(tours);
    // await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    //const permissionDoc = await Permission.find();

    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  // process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    // await Tour.deleteMany();
    // await User.deleteMany();
    // await Review.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  //process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
