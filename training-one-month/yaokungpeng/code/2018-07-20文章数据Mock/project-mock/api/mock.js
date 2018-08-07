import Mock from 'mockjs'


Mock.mock('/api/pages',{
    'userid01|5-10':[{
        'avatar':'@image("100x100","@color()")',
        'title':'@ctitle()',
        'author':'@cname',
        'date':'@date(yyyy-MM-dd)',
        'content|5-10':'@cparagraph'
    }],
    'userid02|5-10':[{
        'avatar':'@dataImage("100x100")',
        'title':'@ctitle()',
        'author':'@cname',
        'date':'@date(yyyy-MM-dd)',
        'content':'@cparagraph'
    }]
})