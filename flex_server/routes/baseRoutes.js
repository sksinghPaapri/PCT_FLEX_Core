const express = require("express");

// All routes
const permissionRoutes = require("../modules/permission/permissionRoutes");
const roleRoutes = require("../modules/role/roleRoutes");
const jobPositionRoutes = require("../modules/jobPosition/jobPositionRoutes");
const locationRoutes = require("../modules/location/locationRoutes");
const departmentRoutes = require("../modules/department/departmentRoutes");
const appCenterRoutes = require("../modules/appCenter/appCenterRoutes");
const employeeRoutes = require("../modules/employee/employeeRoutes");
const customListRoutes = require("../modules/customList/customListRoutes");

const appNavigationLinkRoutes = require("../modules/appNavigationLink/appNavigationLinkRoutes");
const appNavigationCategoryRoutes = require("../modules/appNavigationCategory/appNavigationCategoryRoutes");
const appNavigationCenterRoutes = require("../modules/appNavigationCenter/appNavigationCenterRoutes");
const customDocumentTypeRoutes = require("../modules/customDocumentType/customDocumentTypeRoutes");

const connectionRoutes = require("../modules/connection/connectionRoutes");
const netsuiteCRUDRoutes = require("../modules/netsuite/routes/netsuiteCRUDRoutes");
// const opticutRoutes = require('../modules/opticut/opticutRoutes');

// Routers
const router = express.Router();

router.use("/permission", permissionRoutes);
router.use("/role", roleRoutes);
router.use("/jobPosition", jobPositionRoutes);
router.use("/location", locationRoutes);
router.use("/department", departmentRoutes);

router.use("/appCenter", appCenterRoutes);
router.use("/employee", employeeRoutes);
router.use("/customList", customListRoutes);

router.use("/appNavigationLink", appNavigationLinkRoutes);
router.use("/appNavigationCategory", appNavigationCategoryRoutes);
router.use("/appNavigationCenter", appNavigationCenterRoutes);

router.use("/customDocumentType", customDocumentTypeRoutes);
router.use("/connection", connectionRoutes);
router.use("/netsuite", netsuiteCRUDRoutes);
// router.use('/optimize', opticutRoutes)

module.exports = router;
