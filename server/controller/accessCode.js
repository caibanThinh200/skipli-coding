const { fireStoreDatabase } = require("../config/firebase")
const { addDoc, collection, getDocs, query, where } = require("firebase/firestore")
const randomString = require("randomstring");
const client = require("../config/twilio");

const accessCodeDocRef = collection(fireStoreDatabase, "phoneAccessCode")

class AccessCodeController {
    static async createAccessCode(req, res) {
        try {
            const data = {
                accessCode: randomString.generate(6),
                phoneNumber: req.body?.phoneNumber
            }
            const result = await addDoc(accessCodeDocRef, data)
            client.messages.create({
                body: `This is your access code ${data?.accessCode}`,
                from: process.env.TWILIO_TRIAL_NUMBER,
                to: data.phoneNumber
            })
                .then((message) => {
                    console.log(message.sid)
                    res.json({
                        message: 'SUCCESS',
                        result: result?.id,
                        accessCode: data?.accessCode
                    })
                });

        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'Error occur'
            })
        }
    }

    static async validateAccessCode(req, res) {
        try {
            const data = {
                accessCode: req.body?.accessCode,
                phoneNumber: req.body?.phoneNumber
            }
            const queryParams = query(accessCodeDocRef, [where("phoneNumber", "==", data.phoneNumber), where("accessCode", "==", data.accessCode)])
            const currentPhoneNumber = await getDocs(queryParams);
            if(!currentPhoneNumber.empty) {
                res.json({
                    message: 'SUCCESS',
                })
            } else {
                res.json({
                    message: 'Invalid code'
                })
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'Error occur'
            })
        }
    }
}

module.exports = AccessCodeController;