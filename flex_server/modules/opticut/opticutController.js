const catchAsync = require('../../utils/catchAsync');
const { exec } = require('child_process');


exports.opticut = catchAsync(async (req, res, next) => {
    // const { stockBars, requireBars } = req.body;

    const param1 = [2, 2, 8];
    const param2 = [2, 2];

    // Call Python script with arguments
    exec(`python ./py_scripts/opticut.py ${param1} ${param2}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error}`);
            return res.status(500).json({
                message: 'Error executing Python script:',
                error: error
            });

        }
        if (stderr) {
            console.error(`Python script returned an error: ${stderr}`);
            return res.status(500).json({
                message: 'Python script returned an error:',
                error: error
            });

        }

        // Capture the output of the Python script
        const optimizedData = stdout.trim();

        // Return the optimized data
        res.status(200).json({
            result: optimizedData
        });
    });

})

exports.optimize = catchAsync(async (req, res, next) => {
    const { stockBars, requireBars } = req.body;

    const param1 = stockBars;
    const param2 = requireBars;

    // Call Python script with arguments
    exec(`python ./py_scripts/opticut.py ${param1} ${param2}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error}`);
            res.status(500).send('Error optimizing data');
            return;
        }
        if (stderr) {
            console.error(`Python script returned an error: ${stderr}`);
            res.status(500).send('Error optimizing data');
            return;
        }

        // Capture the output of the Python script
        const optimizedData = stdout.trim();

        // Return the optimized data
        res.status(200).json({
            result: optimizedData
        });
    });

})