var mongoose = require('mongoose');

const cinemaSchema = mongoose.Schema({
    name: { type: String, required: false },
    location: { type: String, required: false  },
    capacity: { type: Number, required: false  },
    openingHours: { type: String, required: false  },
    amenities: { type: [String], default: [] }, // Lista de comodidades
    contactNumber: { type: String, required: false  },
    isOpen: { type: Boolean, default: false  },  // Estado del cine (abierto o cerrado)
});

module.exports = mongoose.model('Cinema', cinemaSchema);