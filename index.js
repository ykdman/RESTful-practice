//Express 선언
const express = require('express');
const app = express();
// path 사용을 위한 import
const path = require('path');

//Port 할당
const port = 3000;

//Json 사용을 위한 미들웨어 사용
app.use(express.json())
app.use(express.urlencoded({extended : true}));

//ejs view engine 사용을 위한 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

//CRUD에 사용할 Object (-> json) 생성
const comments =[
    {
    username : 'Todd',
    comment : 'LOL ! ITs Funny !!!!'
    },
    {
        username : 'Jade',
        comment : 'Kunfu is good!'
    },
    {
        username : 'Joker',
        comment : 'I need Bat boy..'
    },
    {
        username : 'Kang',
        comment : 'Watch Ant man...'
    },
    {
        username : '박연진',
        comment : '문동은 왕따.'
    }
]


/*RESTful + CRUD (: Read)
    1.GET / comments - list all comments  */
/*/comments 라우팅 시, views\comments\index.ejs를 렌더링 한다. */
app.get('/comments', (req,res)=>{
    res.render('comments/index', { comments });
    // comment (object) 변수를 렌더링한 index.ejs에 전달한다.
    // index 라우트
})

/*RESTful + CRUD (: Create)
    2-1. GET / comments/new - Form to create new comment*/

// comments/new 라우팅 시, comments\new.ejs 파일을 렌더링 한다.
app.get('/comments/new', (req,res)=>{
    res.render('comments/new');
}) //comments 생성

// 2-2. POST / comments - Create a New comment on Server
app.post('/comments', (req, res)=>{
    const {username, comment} = req.body;
    comments.push({username, comment}); 
    //comments 변수에 분해/할당된 POST queryString 정보 추가
    res.render('comments/index', { comments });
}) // comment 생성 정보를 POST








// listen
app.listen(port, ()=>{
    console.log(`${port} being Attachd!`);
    //console.log(app);
})