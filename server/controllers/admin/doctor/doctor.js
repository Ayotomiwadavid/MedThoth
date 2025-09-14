const DoctorApproval = require('../../../models/admin/DoctorApproval');
const Doctor = require('../../../models/Doctor');
const User = require('../../../models/User');

const createDoctorApprovalRequest = async (req, res) => {
    const details = req.body
    try {
        const existingDoctor = await Doctor.findById(details.doctorId);
        if(existingDoctor){
            res.status(400).json("Approval request has been made or doctor already exist")
        }
        const newApproval = new DoctorApproval(details);
        await newApproval.save();
        res.status(200).json("Approval Request Placed");
    } catch (error) {
        res.status(500).json({"Msg": "An error occured", "Err": error});
    }
};

const editApprovalRequest = async (req, res) => {
    const update = req.body;
    const requestId = req.params.id;
    try {
        const approvalRequest = DoctorApproval.findByIdAndUpdate(requestId, update, {new: true});
        if (!approvalRequest) {
            res.status(404).json('Approval Request not recognised');
        }
        res.status(200).json('Request editted successfully');
    } catch (error) {
        res.status(500).json('Something went wrong');
    }
}

const approveDoctorApprovalRequest = async (req, res) => {
    const {update, user} = req.body
    const requestId = req.params.id;
    const approveData = {status: "active" };
    try {
        const approvalRequest = DoctorApproval.findByIdAndUpdate(requestId, update, {new: true});
        if(!approvalRequest){
            res.status(404).json("Approval Request not recognised");
        }
        const requestOwner = User.findByIdAndUpdate(user.id, approveData, {new: true});
        if (!requestOwner) {
            res.status(404).json("No doctor found for this request");
        }
    
        res.status(200).json("Request Approved!");
    } catch (error) {
        res.status(500).json("An error occured!");
    }
};

const declineDoctorApprovalRequest = async (req, res) => {
    const {update, user} = req.body
    const requestId = req.params.id;
    const approveData = {status: "suspended" };
    try {
        const approvalRequest = DoctorApproval.findByIdAndUpdate(requestId, update, {new: true});
        if(!approvalRequest){
            res.status(404).json("Approval Request not recognised");
        }
        const requestOwner = User.findByIdAndUpdate(user.id, approveData, {new: true});
        if (!requestOwner) {
            res.status(404).json("No doctor found for this request");
        }
    
        res.status(200).json("Request Declined!");
    } catch (error) {
        res.status(500).json("An error Declined!");
    }
}

module.exports = {
    createDoctorApprovalRequest,
    editApprovalRequest,
    approveDoctorApprovalRequest,
    declineDoctorApprovalRequest
};