const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()
const PORT = process.env.PORT || 8000

//other keywords can be: NFT, metaverse, Metaverse, NVIDIA
const keyword = 'a:contains("AI"), a:contains("ai"), a:contains("artificial intelligence")'



const newspapers = [
    {
        name: 'ainews',
        address: 'https://www.artificialintelligence-news.com/artificial-intelligence-news'
    },
    {
        name: 'extremetech',
        address: 'https://www.extremetech.com/tag/artificial-intelligence'
    },
    {
        name: 'mit',
        address: 'https://news.mit.edu/topic/artificial-intelligence2'
    },
    {
        name: 'sciencedaily',
        address: 'https://www.sciencedaily.com/news/computers_math/artificial_intelligence/'
    },
    {
        name: 'nvidia-blog',
        address: 'https://blogs.nvidia.com/'
    },
    {
        name: 'nvidia-research',
        address: 'https://www.nvidia.com/en-us/research/'
    },
    {
        name: 'tensorflow',
        address: 'https://blog.tensorflow.org/'
    },
    {
        name: 'deepmind',
        address: 'https://www.deepmind.com/blog'
    },
    {
        name: 'towardsai',
        address: 'https://pub.towardsai.net/'
    },
    {
        name: 'hackernews',
        address: 'https://news.ycombinator.com/news'
    },
    {
        name: 'arstechnica',
        address: 'https://arstechnica.com/science/'
    },
    {
        name: 'quantamagazine',
        address: 'https://www.quantamagazine.org/'
    }, 
    {
        name: 'nature',
        address: 'https://www.nature.com/'
    },
    {
        name: 'googleblog',
        address: 'https://ai.googleblog.com/'
    },
    {
        name: 'meta',
        address: 'https://about.fb.com/news/'
    },
]






const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)

        $(keyword, html).each(function() {
            const title = $(this).text()
            const url = $(this).attr('href')
            articles.push({source:newspaper.name, title:title, url})
        })        
    }).catch((err) => console.log(err))
})





app.get('/', (req, res) => {
    res.json('Welcome to my Trending News API')
})

app.get('/news', (req, res) => {
    res.json(articles)
})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))





// app.get('/news/:newspaperId', (req, res) => {
//     const newspaperId = req.params.newspaperId
//     const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address

//     axios.get(newspaperAddress)
//     .then(response => {
//         const html = response.data
//         const $ = cheerio.load(html)
//         const specificArticles = []

//         $('a:contains(keyword)', html).each(function() {
//             const title = $(this).text()
//             const url = $(this).attr('href')
//             specificArticles.push({title, url, source:newspaperId})
//         }) 
        
//         res.json(specificArticles)
//     }).catch(error => console.log(error))
// })









 