// 방명록 데이터를 저장할 배열
let guestbookItems = [];

// DOM 요소 선택 (제공해주신 HTML 태그 ID와 정확히 일치시킴)
const form = document.getElementById('guestbook-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const listElement = document.getElementById('list');
const emptyElement = document.getElementById('empty');
const countElement = document.getElementById('count');
const noticeElement = document.getElementById('notice');

// 폼 제출(글 추가) 이벤트 리스너
form.addEventListener('submit', function(event) {
    // 폼 기본 제출 동작(새로고침) 방지
    event.preventDefault();

    // 입력값 가져오기
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // 간단한 유효성 검사
    if (name === '' || message === '') {
        noticeElement.textContent = '이름과 메시지는 필수 입력 항목입니다.';
        noticeElement.style.color = 'red';
        return;
    }

    // 알림 메시지 초기화
    noticeElement.textContent = '';

    // 새로운 방명록 객체 생성 (고유 id 부여를 위해 timestamp 사용)
    const newItem = {
        id: Date.now(),
        name: name,
        email: email,
        message: message,
        date: new Date().toLocaleDateString()
    };

    // 배열에 데이터 추가 (Create / Push)
    guestbookItems.push(newItem);

    // 입력 폼 초기화
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';

    // 화면 갱신
    renderGuestbook();
});

// 글 삭제 함수 (Delete)
function deleteItem(id) {
    // 선택한 id가 아닌 항목만 남겨서 배열 갱신
    guestbookItems = guestbookItems.filter(item => item.id !== id);
    
    // 화면 갱신
    renderGuestbook();
}

// 화면 렌더링 함수
function renderGuestbook() {
    // 목록 초기화
    listElement.innerHTML = '';

    // 개수 표시 업데이트
    countElement.textContent = `${guestbookItems.length}개`;

    // 데이터가 없는 경우 "아직 남긴 글이 없습니다." 표시 제어
    if (guestbookItems.length === 0) {
        emptyElement.style.display = 'block';
        return;
    } else {
        emptyElement.style.display = 'none';
    }

    // 배열을 순회하며 HTML 요소 생성
    guestbookItems.forEach(item => {
        const li = document.createElement('li');
        
        li.innerHTML = `
            <strong>${escapeHtml(item.name)}</strong> 
            ${item.email ? `<span>(${escapeHtml(item.email)})</span>` : ''}
            <p>${escapeHtml(item.message)}</p>
            <small>${item.date}</small>
            <button type="button" class="delete-btn" onclick="deleteItem(${item.id})">삭제</button>
        `;
        
        listElement.appendChild(li);
    });
}

// XSS 보안을 위한 HTML 이스케이프 함수
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// 초기 실행
renderGuestbook();