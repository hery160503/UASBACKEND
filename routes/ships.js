const express = require('express');
const router = express.Router();
const Ship = require('../model/ships');

// Get all ships
router.get('/', async (req, res) => {
  try {
    const ships = await Ship.find({});
    res.json(ships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a ship
router.post('/', async (req, res) => {
  const ship = new Ship({
    namakapal: req.body.namakapal,
    jeniskapal: req.body.jeniskapal,
    tahunpembuatan: req.body.tahunpembuatan
  });
  try {
    const newShip = await ship.save();
    res.status(201).json(newShip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific ship
router.get('/:id', getShip, (req, res) => {
  res.json(res.ship);
});

// Update a ship
router.patch('/:id', getShip, async (req, res) => {
  if (req.body.namakapal != null) {
    res.ship.namakapal = req.body.namakapal;
  }
  if (req.body.jeniskapal != null) {
    res.ship.jeniskapal = req.body.jeniskapal;
  }
  if (req.body.tahunpembuatan != null) {
    res.ship.tahunpembuatan = req.body.tahunpembuatan;
  }
  try {
    const updatedShip = await res.ship.save();
    res.json(updatedShip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a ship
router.delete('/:id', getShip, async (req, res) => {
  try {
    await Ship.deleteOne({ _id: res.ship._id }); // Use the model's deleteOne method
    res.json({ message: 'Deleted Ship' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getShip(req, res, next) {
  let ship;
  try {
    ship = await Ship.findById(req.params.id);
    if (ship == null) {
      return res.status(404).json({ message: 'Cannot find ship' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.ship = ship;
  next();
}

module.exports = router;
