const sendSuccessResponse = (result, res) => {
    // res.status(200).json({ success: true, ...data });
    let sendData = { "status": "success", "status_code": result.status_code || 200, message: result.message || 'SUCCESS!', data: result.data || {}, totalcount: result.count || 0 };
    // sendData = { ...sendData, ...other };
    return res.status(result.status_code || 200).send(sendData);
};

const sendErrorResponse = (error, res) => {
    // res.status(400).json({ success: false, ...error });
    return res.status(error.status_code || 200).send({ "status": "failure", "status_code": error.status_code || 200, message: error.message, error_description: error.error_description || '', data: error.data || {} });
};

module.exports = {
    sendSuccessResponse,
    sendErrorResponse,
};
  