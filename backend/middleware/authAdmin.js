import jwt from 'jsonwebtoken';

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {

        const { atoken } = req.headers; // Use `headers` in lowercase
        if (!atoken) {
            return res.status(401).json({ success: false, message: "Not Authorized, login again" });
        }

        // Correct spelling of `verify`
        const token_decode = jwt.verify(atoken, process.env.JWT_SECREAT);

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: "Not Authorized, login again" });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export default authAdmin;
 