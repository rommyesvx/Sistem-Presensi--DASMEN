/**
 * assets/js/login.js
 * Handle komunikasi API khusus untuk Login & Logout
 */

const LoginAPI = {
    // PENTING: Pastikan IP ini SAMA PERSIS dengan yang ada di profil.js dan calendar.js
    // URL dari file profil.js Anda: http://10.30.13.24/api
    baseUrl: "http://10.30.13.24:8000/api",

    /**
     * Melakukan login user
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<Object>} Response dari server
     */
    login: async function(email, password) {
        console.log(`Mencoba login ke: ${this.baseUrl}/login.php`); // Debugging

        try {
            const response = await fetch(`${this.baseUrl}/login.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            // Jika server merespon tapi error (misal 404 atau 500)
            if (!response.ok) {
                console.error("Server Error:", response.status, response.statusText);
                throw new Error(`Server Error: ${response.status}`);
            }

            const result = await response.json();
            return result;

        } catch (error) {
            console.error("Login Fetch Error:", error);
            // Kembalikan objek error agar script.js bisa menampilkan pesan ke user
            return { 
                status: 'error', 
                message: 'Gagal menghubungi server. Pastikan Anda terhubung ke jaringan kantor/WiFi yang benar.' 
            };
        }
    },

    /**
     * Melakukan logout (Hapus token di server)
     * @param {string} token 
     */
    logout: async function(token) {
        if (!token) return;

        try {
            await fetch(`${this.baseUrl}/logout.php`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.warn("Logout server gagal (abaikan jika token expired).");
        }
    }
};

// Expose ke Global Window
window.LoginAPI = LoginAPI;