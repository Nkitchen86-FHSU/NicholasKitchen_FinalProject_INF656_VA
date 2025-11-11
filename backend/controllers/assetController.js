import Asset from "../models/Asset.js";

// GET all assets
export const getAssets = async (req, res) => {
    try{
        const assets = await Asset.find();
        res.json(assets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST an asset
export const createAsset = async (req, res) => {
    try{
        const asset = new Asset(req.body);
        await asset.save();
        res.status(201).json(asset);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT an asset
export const updateAsset = async (req, res) => {
    try{
        const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(asset);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE an asset
export const deleteAsset = async (req, res) => {
    try{
        await Asset.findByIdAndDelete(req.params.id);
        res.json({ message: "Asset deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};