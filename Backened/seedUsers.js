require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // 🔒 Safety check
        if (process.env.NODE_ENV === "production") {
            console.log("❌ User seeding is disabled in production");
            process.exit(1);
        }

        // ---------------- ADMIN USER ----------------
        const adminEmail = "admin@trade.com";
        const adminExists = await User.findOne({ email: adminEmail });

        if (!adminExists) {
            await User.create({
                name: "Demo Admin",
                email: adminEmail,
                password: "password", // auto-hashed by pre-save hook
                role: "admin",
                isActive: true
            });
            console.log("✅ Admin user seeded");
        } else {
            console.log("ℹ️ Admin user already exists");
        }

        // ---------------- CLIENT USER ----------------
        const clientEmail = "client@trade.com";
        const clientExists = await User.findOne({ email: clientEmail });

        if (!clientExists) {
            await User.create({
                name: "Demo Client",
                email: clientEmail,
                password: "password", // auto-hashed
                role: "user",
                isActive: true
            });
            console.log("✅ Client user seeded");
        } else {
            console.log("ℹ️ Client user already exists");
        }

        console.log("🎉 User seeding completed successfully");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding users:", error.message);
        process.exit(1);
    }
};

seedUsers();
