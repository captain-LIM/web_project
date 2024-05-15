const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let inventory = {
    notebook: 5,
    umbrella: 10,
    tabletpc: 5,
    charger: 10,
    pen: 10
};

let users = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true
}));

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

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/project.html');
});

app.post('/login', (req, res) => {
    const { id, password } = req.body;
    console.log('Received login request for ID:', id, 'and password:', password);
    const user = users.find(user => user.id === id && user.password === password);
    console.log('Found user:', user);
    if (user) {
        req.session.loggedIn = true;
        req.session.user = user.name;
        req.session.rentedItems = getRentedItems(id);
        res.json({ success: true, name: user.name, rentedItems: req.session.rentedItems });
    } else {
        res.json({ success: false });
    }
});

app.get('/user', (req, res) => {
    if (req.session.loggedIn) {
        res.json({ user: req.session.user });
    } else {
        res.json({ user: null });
    }
});

app.get('/membership', (req, res) => {
    res.sendFile(__dirname + '/public/membership.html');
});

app.post('/register', (req, res) => {
    const { name, id, password, passwordCheck } = req.body;
    if (password !== passwordCheck) {
        return res.send('Passwords do not match');
    }
    users.push({ name, id, password });
    res.send('<script>alert("회원가입이 완료되었습니다."); window.location.href = "/";</script>');
});

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
