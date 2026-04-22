require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
    {
        name: "Industrial Stainless Steel Sheets",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400",
        category: "Metals",
        specs: {
            material: "304 / 316 / 430 Stainless Steel",
            thickness: "0.3mm - 12.0mm",
            size: "1219mm x 2438mm / Custom",
            finish: "2B, BA, No.4, HL, 8K"
        },
        btob: {
            moq: "5 Metric Tons",
            packaging: "Standard Export Wooden Crates",
            standards: "ASTM A240, EN 10088-2, ISO 9001",
            incoterms: "FOB, CIF, CFR, DDP",
            payment: "30% T/T Advance, 70% L/C or T/T before shipment"
        },
        price: 2500
    },
    {
        name: "High-Density Polyethylene (HDPE) Resin",
        image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=400",
        category: "Chemicals",
        specs: {
            grade: "Film / Injection / Blow Molding",
            density: "0.941 - 0.965 g/cm³",
            meltFlow: "0.1 - 20 g/10 min",
            color: "Natural / White / Custom"
        },
        btob: {
            moq: "25 Metric Tons (1 Container)",
            packaging: "25kg PP Bags / Jumbo Bags",
            standards: "FDA Compliant, ISO 14001",
            incoterms: "FOB, CIF, CFR",
            payment: "100% L/C at sight or 30/70 T/T"
        },
        price: 1200
    },
    {
        name: "5-Axis CNC Milling Machine",
        image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=400",
        category: "Machinery",
        specs: {
            workTable: "650mm x 500mm",
            spindleSpeed: "12,000 - 18,000 RPM",
            accuracy: "±0.005mm",
            control: "Fanuc / Siemens / Heidenhain"
        },
        btob: {
            moq: "1 Unit",
            packaging: "Specialized Industrial Packing",
            standards: "CE, ISO 12100",
            incoterms: "FOB, CIF, CFR, DDP",
            payment: "30% Deposit, 70% Inspection & Acceptance"
        },
        price: 85000
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // 🔒 Safety check
        if (process.env.NODE_ENV === "production") {
            console.log("❌ Seeding is disabled in production");
            process.exit(1);
        }

        await Product.deleteMany();
        await Product.insertMany(products);

        console.log("✅ Products seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding products:", error.message);
        process.exit(1);
    }
};

seedProducts();
