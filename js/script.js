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
optArticleAuthorsSelector = '.post-author',
optTagsListSelector = '.tags.list',
optCloudClassCount = 5,
optCloudClassPrefix = 'tag-size-',
optAuthorsListSelector = '.authors';

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

const calculateTagsParams = function(tags) {

  const params = {
    max: 0,
    min: 999999,
  }

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    else if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
    console.log(tag + 'is used' + tags[tag] + 'times'); 
  }

  return params;
};

const calculateTagClass = function (count, params) {
  
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor ((percentage * optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}




const generateTags = function() {

  /*[NEW] create a new variable allTags with an empty array*/
  let allTags = {};

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
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log(linkHTML);
      
      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);

      /*[NEW] check if this link is NOT already in allTags*/
      if(!allTags[tag]) {
        /*[NEW] add tag to allTags object*/
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }

  /*[NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /*[NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  let allTagsHTML ='';

  /*[NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /*[NEW] generate code of a link and add it to allTagsHTML*/
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';

    allTagsHTML += tagLinkHTML;
    
    console.log(tag);
  }
  /* [NEW] END LOOP: for each tag in allTags: */
  
  /* [NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  
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
  /* [NEW] create an object allAuthors */
  let allAuthors = {};

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
      const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';

      /*add genetared code to html variable*/
      html = html + linkHTML;
      console.log(html);     

      /*[NEW] check if this link is NOT already in allAuthors*/
      if (!allAuthors[articleAuthor]) {
        /*[NEW] add author to allAuthors object */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      /* insert HTML of all the links into the tags wrapper */
      authorWrapper.innerHTML = html;

  /*END LOOP: for every article*/   
    }

  /*[NEW] find list of authors in right column */
  const authorsList = document.querySelector(optAuthorsListSelector);
  
  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each author in allAuthors: */
  for (let articleAuthor in allAuthors) {
    /*[NEW] generate code of a link and add it to allAuthorsHTML */
    allAuthorsHTML += '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '(' + allAuthors[articleAuthor] + ')</a></li>';
  }
  /* [NEW] END LOOP: for each author in allAuthors: */

  /*[NEW] add HTML from allAuthorsHTML to authorsList */
  authorsList.innerHTML = allAuthorsHTML;


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