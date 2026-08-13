const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Agar server bisa membaca format JSON
app.use(express.json());
app.use(express.static(__dirname));

// Endpoint untuk menyimpan perubahan config.js dari Halaman Admin
app.post('/save-config', (req, res) => {
    const newConfigData = req.body;
    
    // Format ulang data JSON menjadi string file JavaScript (window.CONFIG = { ... })
    const fileContent = `window.CONFIG = ${JSON.stringify(newConfigData, null, 4)};`;

    // Timpa file config.js secara otomatis
    fs.writeFile(path.join(__dirname, 'config.js'), fileContent, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Gagal menyimpan config.js' });
        }
        res.json({ success: true, message: 'Config.js berhasil diperbarui secara otomatis!' });
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});