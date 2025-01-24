var mongoose = require('mongoose');

const cinemaSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true  },
    capacity: { type: Number, required: true },
    openingHours: { type: String, required: true  },
    amenities: { type: [String], default: [] }, // Lista de comodidades
    contactNumber: { type: String, required: true  },
    isOpen: { type: Boolean, default: true  },  // Estado del cine (abierto o cerrado)
});

module.exports = mongoose.model('Cinema', cinemaSchema);