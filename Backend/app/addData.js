const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Destination = require('./models/destination.model'); // Make sure the path to your model is correct

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const destinations = [
    {
        name: "London",
        description: "The capital city of the United Kingdom.",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/London_Montage_L.jpg",
        region: "Europe",
        activities: [
            { name: "London Eye", cost: 30 },
            { name: "British Museum", cost: 20 }
        ],
        averageCost: 25
    },
    {
        name: "Istanbul",
        description: "A major city in Turkey.",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Istanbul_collage.jpg",
        region: "Europe",
        activities: [
            { name: "Hagia Sophia", cost: 15 },
            { name: "Basilica Cistern", cost: 10 }
        ],
        averageCost: 12.5
    },
    {
        name: "Paris",
        description: "The capital city of France.",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Paris_Night.jpg",
        region: "Europe",
        activities: [
            { name: "Eiffel Tower", cost: 25 },
            { name: "Louvre Museum", cost: 15 }
        ],
        averageCost: 20
    }
];

const addDataToDB = async () => {
    try {
        await Destination.insertMany(destinations);
        console.log('Data added successfully!');
    } catch (error) {
        console.error('Error adding data:', error);
    } finally {
        mongoose.connection.close();
    }
};

addDataToDB();
