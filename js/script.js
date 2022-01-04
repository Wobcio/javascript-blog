'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  //  console.log('Link was clicked!');

  /* [DONE]remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /*[DONE] add class 'active' to the clicked link */
  //console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const linkHref = clickedElement.getAttribute('href');
  //console.log('linkHref: ', linkHref);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const articleToDisplay = document.querySelector(linkHref);
  //console.log('articleToDisplay: ', articleToDisplay);

  /* [DONE] add class 'active' to the correct article */
  articleToDisplay.classList.add('active');
  //console.log(articleToDisplay, 'has now class active');
}


// GENERATING LIST OF ARTICLES


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  function clearList(){
    //console.log(titleList);
    titleList.innerHTML = '';
    //console.log('clearing list');
  }
  clearList();

  let html = '';
  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    //console.log(articleId);

    /* [DONE] find the title element and get the title */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log(articleTitle);

    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);

    /* [DONE] insert link into html variable */
    html = html + linkHTML;
    //console.log(html);
  }
  /* [DONE] insert html into titleList */
  titleList.innerHTML = html;

  // click listener
  const links = document.querySelectorAll('.titles a');
  //console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

// GENERATING TAGS

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log(articles)

  /* START LOOP: for every article: */
  for(let article of articles){
    //console.log(article)

    /* find tags wrapper */
    const articleTagsWrapper = article.querySelector(optArticleTagsSelector);
    //console.log(articleTagsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log(tagsString);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      //console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      //console.log(html);

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    articleTagsWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //  console.log(clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  //  console.log(tag);

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  //  console.log(activeTagLinks);

  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks){

    /* remove class active */
    activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const sameTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  //  console.log(sameTagLinks);
  /* START LOOP: for each found tag link */
  for (let sameTagLink of sameTagLinks){
    /* add class active */
    sameTagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

// [DONE] click listener
function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  //  console.log(tagLinks);

  /* START LOOP: for each link */
  for (let link of tagLinks){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();


// GENERATE POST AUTHORS

function generateAuthors(){
  // find all articles
  const articles = document.querySelectorAll(optArticleSelector);
  //  console.log(articles);

  // start loop for every article
  for (let article of articles){
    const author = article.getAttribute('data-author');
    //  console.log(author);

    const articleAuthorWrapper = article.querySelector(optArticleAuthorSelector);
    //  console.log(articleAuthorWrapper);

    articleAuthorWrapper.innerHTML = 'by <a href="#author-' + author +'">' + author + '</a>';
  }
}

generateAuthors();


function authorClickHandler(){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors(){
  const authors = document.querySelectorAll('a[href^="#author-"]');
  //console.log(authors);

  for (let author of authors){
    author.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
