const { fireStoreDatabase } = require("../config/firebase")
const { addDoc, collection, getDocs, query, where, deleteDoc } = require("firebase/firestore")

const reactionRef = collection(fireStoreDatabase, "reaction");

class ReactionController {
    static async likeGithubUser(req, res) {
        try {
            const data = {
                userReact: req.body.userReact,
                userTarget: req.body.userTarget
            }
            const queries = query(reactionRef, [where('userReact', "==", data.userReact)], [where("userTarget", "==", data.userTarget)])
            const result = await getDocs(queries).then(res => res.docs.map(doc => doc.data()));
            let message = "";
            if (result.length > 0) {
                await deleteDoc(data)
                message = "unlike"
            } else {
                await addDoc(reactionRef, data);
                message = "like";
            }
            res.status(200).json({
                message
            });
        } catch (e) {
            console.log(e)
            res.status(400).json({
                message: 'Error occur'
            })
        }
    }
}

module.exports = ReactionController;