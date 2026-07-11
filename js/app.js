// ข้อมูลรายชื่อนายทหารและผู้เข้าร่วมพิธี จำลองตามลำดับอาวุโสเพื่อใช้งานจริง
let membersData = [
    { rankName: "พล.ท. พรเทพ ยังรักษา", seniority: 1, seat: "1", status: "มาเข้าร่วม" },
    { rankName: "พล.ต. สิริชัย สบายจิต", seniority: 2, seat: "2", status: "มาเข้าร่วม" },
    { rankName: "พล.ต. ทรงวิทย์ วงศ์พระถาง", seniority: 3, seat: "3", status: "มาเข้าร่วม" },
    { rankName: "นาย อำนาจ เจริญศรี", seniority: 4, seat: "4", status: "มาเข้าร่วม" },
    { rankName: "พล.ตรี นราวุฒิ ทองม่วง", seniority: 6, seat: "5", status: "มาเข้าร่วม" },
    { rankName: "พ.อ. กฤษณะ นันทะวิชัย", seniority: 7, seat: "6", status: "มาเข้าร่วม" },
    { rankName: "พ.อ. ปองภพ วิสุทธิธรรม", seniority: 8, seat: "7", status: "มาเข้าร่วม" },
    { rankName: "พล.ต. บงกช ศรีสังข์", seniority: 9, seat: "8", status: "มาเข้าร่วม" },
    { rankName: "พ.อ. ไตรศักดิ์ ทุมเพชร", seniority: 71, seat: "9", status: "มาเข้าร่วม" }
];

let currentEditingMission = "";

document.addEventListener('DOMContentLoaded', () => {
    const checkboxGrid = document.querySelector('.checkbox-grid');
    const selectedGrid = document.getElementById('selectedGrid');
    
    // ฟังก์ชันวาดรายการผังที่ถูกเลือก (ตารางกริดส่วนล่าง)
    function refreshMissionGrid() {
        selectedGrid.innerHTML = '';
        const checkedBoxes = checkboxGrid.querySelectorAll('input[type="checkbox"]:checked');
        
        if (checkedBoxes.length === 0) {
            selectedGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #718096; padding: 20px;">ยังไม่มีผังภารกิจที่ถูกเลือก</p>';
            return;
        }

        checkedBoxes.forEach(box => {
            const missionName = box.parentElement.textContent.trim();
            const card = document.createElement('div');
            card.className = 'grid-card';
            card.innerHTML = `
                <div>
                    <h3>${missionName}</h3>
                    <span class="card-status">🟢 รอดำเนินการ</span>
                </div>
                <div class="card-actions">
                    <button class="btn btn-word" style="padding: 4px 10px;" onclick="openSeatEditor('${missionName}')">✏️ แก้ไขผังที่นั่ง</button>
                </div>
            `;
            selectedGrid.appendChild(card);
        });
    }

    // เมื่อเปลี่ยนการติ๊กเลือกให้เปลี่ยนกริดทันที
    checkboxGrid.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') refreshMissionGrid();
    });

    // ปุ่มเลือกทั้งหมด / ล้าง
    document.getElementById('selectAll').addEventListener('click', (e) => {
        e.preventDefault();
        checkboxGrid.querySelectorAll('input[type="checkbox"]').forEach(b => b.checked = true);
        refreshMissionGrid();
    });
    document.getElementById('clearAll').addEventListener('click', (e) => {
        e.preventDefault();
        checkboxGrid.querySelectorAll('input[type="checkbox"]').forEach(b => b.checked = false);
        refreshMissionGrid();
    });

    // เรียกครั้งแรก
    refreshMissionGrid();
    renderMemberTable();
});

// เปิดหน้าต่างจัดที่นั่งเก้าอี้
function openSeatEditor(missionName) {
    currentEditingMission = missionName;
    document.getElementById('currentEditingTitle').textContent = `🛠️ กำลังตั้งค่าและจัดเก้าอี้ผัง: ${missionName}`;
    document.getElementById('seatManager').style.display = 'block';
    generateSeatGrid();
    document.getElementById('seatManager').scrollIntoView({ behavior: 'smooth' });
}

function closeEditor() {
    document.getElementById('seatManager').style.display = 'none';
}

// เรนเดอร์แผนผังเก้าอี้แบบ Grid Graphic ตามภาพที่ 2 และ 5
function generateSeatGrid() {
    const rows = parseInt(document.getElementById('inputRows').value) || 4;
    const cols = parseInt(document.getElementById('inputCols').value) || 9;
    const visualGrid = document.getElementById('visualSeatGrid');
    
    visualGrid.innerHTML = '';
    visualGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    let seatIndex = 1;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const seatUnit = document.createElement('div');
            seatUnit.className = 'seat-unit';
            
            // ค้นหาว่าเก้าอี้ลำดับนี้มีใครนั่งอยู่ตามลำดับอาวุโสไหม
            const matchedUser = membersData.find(m => parseInt(m.seat) === seatIndex);
            
            // ไอคอนเก้าอี้สีแดงหรูหราตามโปรเจกต์เดิม
            const chairImg = `<img src="https://cdn-icons-png.flaticon.com/512/9100/9100958.png" alt="chair">`;

            seatUnit.innerHTML = `
                <div class="seat-label">ที่นั่ง ${seatIndex}</div>
                ${chairImg}
                <div class="seat-name">${matchedUser ? matchedUser.rankName : 'ว่าง'}</div>
                <div class="seat-pos">${r},${c}</div>
            `;
            
            visualGrid.appendChild(seatUnit);
            seatIndex++;
        }
    }
}

// เรนเดอร์ตารางสรุปรายชื่อข้าราชการด้านล่างตามภาพที่ 3 และ 4
function renderMemberTable() {
    const tbody = document.getElementById('memberTableBody');
    tbody.innerHTML = '';

    membersData.forEach((member, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><b>${i + 1}</b></td>
            <td>${member.rankName}</td>
            <td>${member.seniority}</td>
            <td style="color:#2b6cb0; font-weight:bold;">แถวหน้า ที่นั่ง ${member.seat}</td>
            <td><span style="color:green;">✔️ ${member.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}
