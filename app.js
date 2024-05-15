const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// 임시 인벤토리 데이터
let inventory = {
    notebook: 5,
    umbrella: 10,
    tabletpc: 5,
    charger: 10,
    pen: 10
};

// 임시 사용자 데이터
let users = [];

// 정적 파일과 body-parser 미들웨어 등록
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 세션 미들웨어 설정
app.use(session({
    secret: 'your secret key', // 세션 암호화에 사용할 키
    resave: false,
    saveUninitialized: true
}));

// 유저가 대여한 아이템 반환 함수
function getRentedItems(userId) {
    const rentedItems = [
        { userId: 1234, items: ['notebook', 'umbrella'] },
        { userId: 5678, items: ['tabletpc', 'charger', 'pen'] }
    ];

    const userRentals = rentedItems.find(item => item.userId == userId);
    if (userRentals) {
        return userRentals.items.join(', ');
    } else {
        return ''; 
    }
}

// 루트 페이지 라우팅
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/project.html');
});

// 로그인 요청 처리
app.post('/login', (req, res) => {
    const { id, password } = req.body;
    console.log('Received login request for ID:', id, 'and password:', password);
    const user = users.find(user => user.id === id && user.password === password);
    console.log('Found user:', user);
    if (user) {
        // 세션에 로그인 상태와 사용자 정보 저장
        req.session.loggedIn = true;
        req.session.user = user.name;
        req.session.rentedItems = getRentedItems(id);
        res.json({ success: true, name: user.name, rentedItems: req.session.rentedItems });
    } else {
        res.json({ success: false });
    }
});

// 사용자 정보 요청 처리
app.get('/user', (req, res) => {
    if (req.session.loggedIn) {
        res.json({ user: req.session.user });
    } else {
        res.json({ user: null });
    }
});

// 멤버십 페이지 라우팅
app.get('/membership', (req, res) => {
    res.sendFile(__dirname + '/public/membership.html');
});

// 회원가입 요청 처리
app.post('/register', (req, res) => {
    const { name, id, password, passwordCheck } = req.body;
    if (password !== passwordCheck) {
        return res.send('Passwords do not match');
    }
    // 사용자 정보 저장
    users.push({ name, id, password });
    res.send('<script>alert("회원가입이 완료되었습니다."); window.location.href = "/";</script>');
});

// 대여 요청 처리
app.post('/rent', (req, res) => {
    if (req.session.loggedIn) {
        const item = req.body.item;
        if (inventory[item] > 0) {
            inventory[item]--;
            res.json({ success: true, count: inventory[item] });
        } else {
            res.json({ success: false });
        }
    } else {
        res.json({ success: false });
    }
});

// 로그아웃 요청 처리
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.sendStatus(200);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
