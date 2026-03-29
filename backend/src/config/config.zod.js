const zod = require("zod");

const registerSchema = zod.object({
    username: zod.string()
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username cannot exceed 50 characters")
        .trim(),

    email: zod.string()
        .email("Invalid email format")
        .toLowerCase(),

    password: zod.string()
        .min(8, "Password must be at least 8 characters")
        .max(64, "Password cannot exceed 64 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
});

const loginSchema = zod.object({

    email: zod.string()
        .email("Invalid email format")
        .toLowerCase(),

    password: zod.string()
        .min(3, "Password must be at least 8 characters")
        .max(64, "Password cannot exceed 64 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
});

module.exports = {
    registerSchema,
    loginSchema
};