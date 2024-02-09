const nsrestlet = require('nsrestlet');
const Connection = require('../../connection/connectionModel');
const catchAsync = require("../../../utils/catchAsync");


exports.upsertOne = async (data) => {
    try {
        const accountSettings = await Connection.findOne({ isActive: true }).select('accountId tokenKey tokenSecret consumerKey consumerSecret')

        const urlSettings = {
            script: "customscript_pctflex_rl_crud_api",
            deployment: "customdeploy_pctflex_rl_crud_api"
        }

        const customRecordConnection = nsrestlet.createLink(accountSettings, urlSettings)
        const response = await customRecordConnection.post(data)
        return response;

    } catch (error) {
        throw error;
    }
}