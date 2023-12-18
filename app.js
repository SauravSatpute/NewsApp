const api_key = "d795fc6af1344f4f884c08845b6c9984";
// https://newsapi.org/v2/everything?q=tesla&from=2023-11-18&sortBy=publishedAt&apiKey=d795fc6af1344f4f884c08845b6c9984

const url = "https://newsapi.org/v2/everything?q=";

const reload = () =>{
    window.location.reload();
}

const filledDataInCard = (cardClone, article) => {
    const newsImg = cardClone.querySelector("#news-img")
    const newsTitle = cardClone.querySelector("#news-title")
    const newsSource = cardClone.querySelector("#news-source")
    const newsDesc = cardClone.querySelector("#news-desc")
    // console.log(cardClone)

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.newsDesc;
    newsDesc.innerHTML = article.description;


    const date = new Date(article.publishedAt).toLocaleString("en-US",
    {timeZone:"Asia/Jakarta"});

    newsSource.innerHTML = `${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url,"_blank");
    })
};


const bindData = (articles) => {
    const cardsContainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = ''
    articles.forEach(article => {
       // console.log(article)
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        console.log(article)
        filledDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

const fetchNews = async (query) => {
    const res = await fetch(`${url}${query}&apiKey=${api_key}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);
}

window.addEventListener('load', ()=> {
    fetchNews("India");
})

let curSelectedNav = null;
const onNavItemClick = (id) => {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-btn");
const searchText = document.getElementById("news-input");

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null
})