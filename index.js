const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Cấu hình Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware để xử lý form
app.use(bodyParser.urlencoded({ extended: true }));

// Giao diện nhập mã Pug
app.get('/', (req, res) => {
    const convertSecondsToDate = (seconds) => {
        const date = new Date(seconds * 1000);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    res.render('editor', { 
        html: '', 
        pugContent: '',
        website: {
            email_name: 'vy.pham@gleads.vn',
            domain: 'https://bbcincorp.sg',
            email_contact: 'service@bbcincorp.sg'
        },
        name: 'Phạm Quốc Vỹ',
        order_code: 'd7c081b2d295cf8de632208babb278ac',
        your_order: '123456',
        payment: {
            created: convertSecondsToDate(1736837248),
            amount: '1000',
        }
    });
});

// Xử lý render mã Pug
app.post('/render', (req, res) => {
    const pugContent = req.body.pugContent || '';
    try {
        const html = require('pug').render(pugContent);
        res.render('editor', { html, pugContent });
    } catch (error) {
        res.render('editor', { html: `Error: ${error.message}`, pugContent });
    }
});

// Khởi chạy server
app.listen(port, () => {
    console.log(`Pug Viewer runnint at: http://localhost:${port}`);
});
