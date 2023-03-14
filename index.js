//Express 선언
const express = require('express');
const app = express();
// path 사용을 위한 import
const path = require('path');
//uuid
const {v4 : uuid} = require('uuid'); //uuid()사용

//method- overrid
const methodOverride = require('method-override');

//Port 할당
const port = 3000;

//Json 사용을 위한 미들웨어 사용
app.use(express.json())
app.use(express.urlencoded({extended : true}));

//ejs view engine 사용을 위한 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

//Method 사용을 위한 app.use
//html폼은 PATCH나 PUT 같은 메쏘드 사용이 불가능하므로, Express 미들웨어로 그 기능을 가능케 한다.
app.use(methodOverride('_method'));

//CRUD에 사용할 Object (-> json) 생성
let comments =[
    {
        id : uuid(),
        username : 'Todd',
        comment : 'LOL ! ITs Funny !!!!'
    },
    {
        id : uuid(),
        username : 'Jade',
        comment : 'Kunfu is good!'
    },
    {
        id : uuid(),
        username : 'Joker',
        comment : 'I need Bat boy..'
    },
    {   
        id : uuid(),
        username : 'Kang',
        comment : 'Watch Ant man...'
    },
    {
        id : uuid(),
        username : '박연진',
        comment : '문동은 왕따.'
    }
]


/*RESTful + CRUD (: Read)
    1.GET / comments - list all comments  */
/*/comments 라우팅 시, views\comments\index.ejs를 렌더링 한다. */
app.get('/comments', (req,res)=>{
    console.log("comments page")
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
    comments.push({username, comment, id : uuid()}); 
    //comments 변수에 분해/할당된 POST queryString 정보 추가
    //res.render('comments/index', { comments });
    res.redirect('/comments');
}) // comment 생성 정보를 POST


/*RESTful + CRUD (:Show)
    comments/:id 라우팅시, 해당하는 id값을 가진 렌더링 페이지 표시 */
app.get('/comments/:id',(req,res)=>{
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})

/*RESTful + CRUD (: Update) */
// 댓글 수정
//1.편집 폼 출력
app.get('/comments/:id/edit', (req,res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', {comment});
})

//2. 수정 된 댓글로 업데이트
app.patch('/comments/:id', (req,res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
    
})

//**RESTful + CRUD (: Delete) */
app.delete('/comments/:id',(req,res)=>{
    const {id} = req.params;
    comments = comments.filter(c=> c.id !== id);
    res.redirect('/comments');

})





// listen
app.listen(port, ()=>{
    console.log(`${port} being Attachd!`);
    //console.log(app);
})