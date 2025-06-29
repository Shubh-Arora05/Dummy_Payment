const express = require("express");
const jwt = require("jsonwebtoken");

const jwt_secret = "123";
const authorization = async (req, res, next) => {
  const authheader = await req.headers.authorization;

  if (!authheader || !authheader.startsWith("Bearer")) {
    return res.status(411).json({authheader});
  }

  const token = authheader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, jwt_secret);
  
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(402).json({});
  }
};

module.exports = authorization;
