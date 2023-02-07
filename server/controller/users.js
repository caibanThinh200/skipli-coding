const axios = require("axios");
const { query, where, getDocs, collection } = require("firebase/firestore");
const _ = require("lodash");
const { fireStoreDatabase } = require("../config/firebase");

class UserController {
    static async searchGithubUsers(req, res) {
        try {
            const startIndex =
                ((req.query?.page || 1) - 1) *
                (req.query?.per_page || 10);
            const endIndex =
                (req.query?.page || 1) * (req.query?.per_page || 10)
            const fetchUrl = req.query?.q ? 'https://api.github.com/search/users' : 'https://api.github.com/users';
            const getAllUser = await await axios.get('https://api.github.com/users', {
                headers: {
                    'Authorization': `token ${process.env.GITHUB_ACCESS_TOKEN}`
                }
            }).then(res => res.data);

            const result = await axios.get(fetchUrl, {
                params: _.omit(req.query, ["page", "per_page"]),
                headers: {
                    'Authorization': `token ${process.env.GITHUB_ACCESS_TOKEN}`
                }
            }).then(async res => {
                const customResult = (req.query.q ? res.data.items : res.data).map(async user => {
                    const reactionRef = collection(fireStoreDatabase, "reaction");
                    const reactionQuery = query(reactionRef, where("userTarget", "==", user.id))
                    const listReact = await getDocs(reactionQuery);
                    return {
                        ...user,
                        reacts: listReact.docs.map(doc => doc.data())
                    }
                })

                return await Promise.all(customResult)
            })
            res.json({
                message: 'SUCCESS',
                result: result.slice(startIndex, endIndex),
                totalPage: getAllUser?.length / req.query?.per_page
            })
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'Error occur'
            })
        }
    }

    static async findGithubUserProfile(req, res) {
        try {
            const { id } = req.params;
            const result = await axios.get(`https://api.github.com/users/${id}`).then(res => res.data);
            res.json(result)
        } catch (e) {
            console.log(e)
            res.status(400).json({
                message: 'Error occur'
            })
        }
    }
}

module.exports = UserController;