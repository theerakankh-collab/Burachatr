document.addEventListener('DOMContentLoaded', () => {
    const checkboxGrid = document.querySelector('.checkbox-grid');
    const selectedGrid = document.querySelector('.selected-grid');
    const selectAllBtn = document.getElementById('selectAll');
    const clearAllBtn = document.getElementById('clearAll');
    
    // ฟังก์ชันอัปเดตกริดส่วนล่างตามรายการที่เลือกด้านบน
    function updateGrid() {
        selectedGrid.innerHTML = '';
        const checkedBoxes = checkboxGrid.querySelectorAll('input[type="checkbox"]:checked');
        
        if (checkedBoxes.length === 0) {
            selectedGrid.innerHTML = '<p style="color: #718096; grid-column: 1/-1; text-align: center; padding: 30px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px;">ยังไม่มีการเลือกผังภารกิจ ดำเนินการติ๊กเลือกด้านบน</p>';
            return;
        }

        checkedBoxes.forEach(box => {
            const missionName = box.parentElement.textContent.trim();
            const card = document.createElement('div');
            card.className = 'grid-card';
            card.innerHTML = `
                <div class="card-content">
                    <h3>${missionName}</h3>
                    <span class="card-status">⏳ รอดำเนินการ</span>
                </div>
                <div class="card-actions">
                    <button class="btn-edit" onclick="editLayout('${missionName}')">✏️ แก้ไขผังข้อมูล</button>
                </div>
            `;
            selectedGrid.appendChild(card);
        });
    }

    // ดักจับเหตุการณ์การติ๊กเลือก Checkbox รายอัน
    checkboxGrid.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            updateGrid();
        }
    });

    // ปุ่มเลือกทั้งหมด
    selectAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        checkboxGrid.querySelectorAll('input[type="checkbox"]').forEach(box => box.checked = true);
        updateGrid();
    });

    // ปุ่มล้างทั้งหมด
    clearAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        checkboxGrid.querySelectorAll('input[type="checkbox"]').forEach(box => box.checked = false);
        updateGrid();
    });

    // เรียกทำงานครั้งแรกตอนโหลดหน้าเว็บ
    updateGrid();
});

// ฟังก์ชันเปิดแจ้งเตือนจำลองเมื่อกดปุ่มแก้ไข
function editLayout(name) {
    alert('กำลังเข้าสู่ระบบจัดตำแหน่ง/แก้ไขผังสำหรับภารกิจ: ' + name);
}

