// Birth Input Page JavaScript
// City coordinates mapping
const CITY_COORDS = {
    "北京市": { lng: 116.40, lat: 39.90 },
    "上海市": { lng: 121.47, lat: 31.23 },
    "广州市": { lng: 113.26, lat: 23.13 },
    "深圳市": { lng: 114.06, lat: 22.54 }
};

// Shichen mapping
const SHICHEN_MAP = {
    23: '子', 0: '子', 1: '丑', 2: '丑', 3: '寅', 4: '寅',
    5: '卯', 6: '卯', 7: '辰', 8: '辰', 9: '巳', 10: '巳',
    11: '午', 12: '午', 13: '未', 14: '未', 15: '申', 16: '申',
    17: '酉', 18: '酉', 19: '戌', 20: '戌', 21: '亥', 22: '亥'
};

// Handle tab switching (calendar mode)
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        if (this.disabled) return;

        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Auto-update true solar time display
const birthDateInput = document.getElementById('birthDate');
const birthTimeInput = document.getElementById('birthTime');
const birthPlaceInput = document.getElementById('birthPlace');
const trueSolarTimeCheckbox = document.getElementById('trueSolarTime');

async function updateTrueSolarTime() {
    const date = birthDateInput.value;
    const time = birthTimeInput.value;
    const place = birthPlaceInput.value;

    if (!date || !time) {
        document.getElementById('trueSolarTimeDisplay').textContent = '---';
        document.getElementById('coordinatesDisplay').textContent = '---';
        return;
    }

    // Get coordinates
    const coords = CITY_COORDS[place] || { lng: 116.40, lat: 39.90 }; // Default Beijing

    if (trueSolarTimeCheckbox.checked) {
        // Call backend API to calculate true solar time
        try {
            const res = await fetch(`${API_BASE}/api/calculate-true-solar-time`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    solar_date: date,
                    solar_time: time,
                    longitude: coords.lng,
                    latitude: coords.lat
                })
            });

            const data = await res.json();

            if (data.success) {
                document.getElementById('trueSolarTimeDisplay').textContent = data.true_solar_time;
                document.getElementById('coordinatesDisplay').textContent =
                    `北纬${coords.lat.toFixed(2)} 东经${coords.lng.toFixed(2)}`;
            }
        } catch (err) {
            console.error('计算真太阳时失败:', err);
            document.getElementById('trueSolarTimeDisplay').textContent = `${date} ${time}`;
            document.getElementById('coordinatesDisplay').textContent =
                `北纬${coords.lat.toFixed(2)} 东经${coords.lng.toFixed(2)}`;
        }
    } else {
        document.getElementById('trueSolarTimeDisplay').textContent = `${date} ${time}`;
        document.getElementById('coordinatesDisplay').textContent =
            `北纬${coords.lat.toFixed(2)} 东经${coords.lng.toFixed(2)}`;
    }
}

// Attach listeners
birthDateInput.addEventListener('change', updateTrueSolarTime);
birthTimeInput.addEventListener('change', updateTrueSolarTime);
birthPlaceInput.addEventListener('input', updateTrueSolarTime);
trueSolarTimeCheckbox.addEventListener('change', updateTrueSolarTime);

// Handle form submission
document.getElementById('birthForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = '计算中...';

    // Collect form data
    const formData = {
        name: document.getElementById('name').value || '灵友',
        gender: document.querySelector('input[name="gender"]:checked').value,
        solar_date: birthDateInput.value,
        solar_time: birthTimeInput.value,
        birth_place: birthPlaceInput.value || '北京市',
        daylight_saving: document.getElementById('daylightSaving').checked,
        true_solar_time_enabled: trueSolarTimeCheckbox.checked,
        early_late_zi: document.getElementById('earlyLateZi').checked
    };

    // Get coordinates
    const coords = CITY_COORDS[formData.birth_place] || { lng: 116.40, lat: 39.90 };
    formData.longitude = coords.lng;
    formData.latitude = coords.lat;

    try {
        // Save birth time to session and get redirect URL
        const res = await fetch(`${API_BASE}/api/save-birth-time`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.success) {
            // Redirect to samelife page
            window.location.href = API_BASE + data.redirect_url;
        } else {
            alert('保存失败: ' + data.message);
            submitBtn.disabled = false;
            submitBtn.textContent = '开始排盘';
        }
    } catch (err) {
        console.error('提交失败:', err);
        alert('提交失败，请重试');
        submitBtn.disabled = false;
        submitBtn.textContent = '开始排盘';
    }
});

// Set default date to today
const today = new Date().toISOString().split('T')[0];
birthDateInput.value = today;
birthTimeInput.value = '12:00';

// Trigger initial update
updateTrueSolarTime();
