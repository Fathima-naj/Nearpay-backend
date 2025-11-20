import {  logoutUserService, userLoginServices, userResgisterServices } from "../service/userService.js";
import { generateAccessToken } from "../utilis/jwt.js";
import { loginValidation, registerValidation } from "../validation/userValidation.js";

export const registerUser = async (req, res) => {
  try {
    const data = req.body;
    const { error } = registerValidation.validate(data);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    await userResgisterServices(data);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = loginValidation.validate({ email, password });
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await userLoginServices(email, password);
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const accessToken = generateAccessToken(user);

   const isProduction = process.env.NODE_ENV === "production";

      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: isProduction,           
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });


    res.status(200).json({
      user: { id: user._id, email: user.email },
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    await logoutUserService?.();

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,       
      sameSite: "none",   
      path: "/",
    });


    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};
