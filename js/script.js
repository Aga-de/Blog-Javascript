'use strict'

{   const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log(event);
    console.log('Link was clicked!');
    
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');

    for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute("href");
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
  
    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  }
  
  const links = document.querySelectorAll('.titles a');
  console.log(links);
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

const optArticleSelector = '.post',
optTitleSelector = '.post-title',
optTitleListSelector = '.titles',
optArticleTagsSelector = '.post-tags .list',
optArticleAuthorsSelector = '.post-author';

const generateTitleLinks = function(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector); 

    titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  /* find all the articles and save them to variable: articles */
  let html = '';

  for (let article of articles){
    /* get the article id */
    const articleId = article.getAttribute("id");

    /* find the title element  &  get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' +  articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();



const generateTags = function() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
    for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);

      /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log(tagHTML);
      
      /* add generated code to html variable */
      html = html + tagHTML;
      console.log(html);

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  /* END LOOP: for every article: */
    }
      
}

generateTags();


  const tagClickHandler = function (event){
  /* prevent default action for this event */
  event.preventDefault();
  console.log(event);

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  
  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeLinks);

  /* START LOOP: for each active tag link */
    for (let activeLink of activeLinks){

    /* remove class active */
    activeLink.classList.remove('active');

  /* END LOOP: for each active tag link */
    }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const foundTags = document.querySelectorAll('a[href="'+ href +'"]');

  /* START LOOP: for each found tag link */
    for (let foundTag of foundTags){

    /* add class active */
    foundTag.classList.add('active');

  /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

  }

const addClickListenersToTags = function(){
  /* find all links to tags */
  const linkTags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let linkTag of linkTags){
    /* add tagClickHandler as event listener for that link */
    linkTag.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags(); 


const generateAuthors = function() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
    for (let article of articles) {
      /*find authors wrapper*/
      const authorWrapper = article.querySelector(optArticleAuthorsSelector);
      console.log(authorWrapper);

      /*make html variable with empty string*/
      let html = '';

      /*get authors from data-author attribute*/
      const articleAuthor = article.getAttribute("data-author");
      console.log(articleAuthor);

      /*generate HTML of the link*/
      const authorHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';

      /*add genetared code to html variable*/
      html = html + authorHTML;
      console.log(html);     

      /* insert HTML of all the links into the tags wrapper */
      authorWrapper.innerHTML = html;

  /*END LOOP: for every article*/   
    }
  }

  generateAuthors();

  const authorClickHandler = function (event){
    /*prevent default action for this event*/
    event.preventDefault();

    const clickedElement = this;

    /*make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute("href");

    /*make a new constant "authorName" and extract author name from the "href" const */
    const authorName = href.replace('#author-', '');
    console.log(authorName);

    /*find all author links with class active*/
    const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');
    console.log(activeLinks);

      /*START LOOP: for each active author link*/
        for (let activeLink of activeLinks){

          /*remove class active*/
          activeLink.classList.remove('active');

      /*END LOOP: for each active tag link*/ 
        }

      /*find all author links with "href" attribute equal to the "href" const*/
      const foundAuthors = document.querySelectorAll('a[href="'+ href +'"]');
    
    /*START LOOP: for each found author link*/
        for (let foundAuthor of foundAuthors){

          /*add class active*/
          foundAuthor.classList.add('active');
        }
    
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + authorName + '"]');    
      
  }

  const addClickListenersToAuthors = function(){
    /* find all links to authors */
    const linkAuthors = document.querySelectorAll('a[href^="#author-"]');
    console.log(linkAuthors);
  
    /* START LOOP: for each link */
    for (let linkAuthor of linkAuthors){
      /* add authorClickHandler as event listener for that link */
      linkAuthor.addEventListener('click', authorClickHandler);
    }
    /* END LOOP: for each link */
  }

  addClickListenersToAuthors();

}