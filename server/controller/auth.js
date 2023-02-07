const axios = require("axios");

class AuthController {
    static async getMeController(req, res) {
        try {
            const result = await axios.get("https://api.github.com/user", {
                headers: {
                    'Authorization': `token ${process.env.GITHUB_ACCESS_TOKEN}`
                }
            })
            .then(res => {
                return res.data
            });
            res.json(result)
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'Error occur'
            })
        }
    }
}

module.exports = AuthController;