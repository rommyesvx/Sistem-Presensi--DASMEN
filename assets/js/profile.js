/**
 * assets/js/profil.js
 * Handle komunikasi API khusus untuk Profile User
 * MODE: STRICT API (Tanpa Dummy Data)
 */

const ProfileAPI = {
    // Pastikan port sama dengan file login.js (8000)
    baseUrl: "http://172.16.16.78:8080",

    /**
     * Mengambil data profil user terbaru dari server
     * @param {string} token - Token akses user (Bearer token)
     */
    getProfile: async function(token) {
        if (!token) return null;

        try {
            console.log(`[ProfileAPI] Fetching: ${this.baseUrl}/profile.php`);

            const response = await fetch(`${this.baseUrl}/profile.php`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Jika token expired atau server error, lempar error agar ditangkap catch
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const result = await response.json();
            
            // Debugging: Cek apa isi data sebenarnya dari server
            console.log("[ProfileAPI] Response:", result);

            // Sesuai dokumentasi index.html: { status: "success", data: { ... } }
            if (result.status === 'success' && result.data) {
                return result.data;
            } else {
                console.warn("[ProfileAPI] Format response tidak sesuai atau data kosong.");
                return null;
            }
        } catch (error) {
            console.error("[ProfileAPI] Gagal mengambil profil:", error);
            return null; // Kembalikan null agar UI tidak berubah (tetap menampilkan data login awal)
        }
    }
};

// Expose ke Global Window
window.ProfileAPI = ProfileAPI;