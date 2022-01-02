'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE]remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /*[DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const linkHref = clickedElement.getAttribute('href');
  console.log('linkHref: ', linkHref);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const articleToDisplay = document.querySelector(linkHref);
  console.log('articleToDisplay: ', articleToDisplay);

  /* [DONE] add class 'active' to the correct article */
  articleToDisplay.classList.add('active')
  console.log(articleToDisplay, 'has now class active')
}


// GENERATING LIST OF ARTICLES


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  function clearList(){
    console.log(titleList);
  	titleList.innerHTML = '';
    console.log('clearing list');
  }
  clearList();

  let html = ''
  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* [DONE] find the title element and get the title */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* [DONE] insert link into html variable */
    html = html + linkHTML;
    console.log(html)
  }
  /* [DONE] insert html into titleList */
  titleList.innerHTML = html;

  // click listener
  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();
