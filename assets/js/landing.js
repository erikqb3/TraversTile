import { helperFunctions } from "./helperFunctions.js";
import { specialFeatures } from "./specialFeatures.js";
import { reviewDB } from "../resources/reviewDB.js";

const pageStuff = {
  aboutSection: function(
    sectionHolder = helperFunctions.generateElement('section',"aboutSection", "lazyParent"),
    link = helperFunctions.generateElement('a',"","","","./pages/about.html"),
    figure = helperFunctions.generateElement('figure'),
    img = helperFunctions.generateElement('img',"","lazyLoad"),
    textHolder = helperFunctions.generateElement('div',""),
    h1 = helperFunctions.generateElement('h1',"","","About"),
    textSample = helperFunctions.generateElement('p',"","",reviewDB.extra.aboutContent.sample)
  ){

    img = helperFunctions.customSpecialElements(img,"assets/resources/imgs/landing/aboutLanding1.webp", "");

    sectionHolder = helperFunctions.nestChildren(sectionHolder, figure, img);
    sectionHolder.style.backgroundImage = "url('assets/resources/imgs/landing/aboutLanding2.webp')"
    link = helperFunctions.appendChildren(link, h1, textSample)
    sectionHolder = helperFunctions.nestChildren(sectionHolder, textHolder, link);
    return sectionHolder;
  },
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
    specialFeatures.lazyLoading();
    this.theEvents.heroBackgrounds();
    specialFeatures.carousel.functionality.setUp();
  },
  gallerySection: function(
    gallerySection = helperFunctions.generateElement('section',"gallerySection"),
    h1 = helperFunctions.generateElement('h1',"","","Gallery Samples"),
    sampleHolder = helperFunctions.generateElement('div',"sampleHolder"),
    list = [
      {
        "item":"Porcelain",
        "class":"Material",
        "imgPath": "assets/resources/imgs/landing/gallerySample1.webp"
      },
      {
        "item":"Stone",
        "class":"Material",
        "imgPath": "assets/resources/imgs/landing/gallerySample2.webp"
      },
      {
        "item":"Ceramic",
        "class":"Material",
        "imgPath": "assets/resources/imgs/landing/gallerySample3.webp"
      },
      {
        "item":"Kitchens",
        "class":"Service",
        "imgPath": "assets/resources/imgs/landing/gallerySample4.webp"
      },
      {
        "item":"Bathrooms",
        "class":"Service",
        "imgPath": "assets/resources/imgs/landing/gallerySample5.webp"
      }
    ],
    moreLink = helperFunctions.generateElement('a',"moreLink","","See More","./pages/gallery.html")
  ){
    list.forEach(element => {
      let option = helperFunctions.generateElement('article',"","lazyParent");
      let link = helperFunctions.generateElement('a',"","","",`./pages/gallery.html?option=${element.class}&type=${element.item}`);
      let figure = helperFunctions.generateElement('figure');
      let img = helperFunctions.generateElement('img',"","lazyLoad","",element.imgPath);
      let text = helperFunctions.generateElement('h2',"","",element.item);

      img = helperFunctions.customSpecialElements(img, element.imgPath, "");
      option.classList.add('galleryOption');

      option = helperFunctions.nestChildren(option, link, figure, img);
      option.classList.add(element.class);
      link.appendChild(text);
      sampleHolder.appendChild(option);
    });
    gallerySection = helperFunctions.appendChildren(gallerySection, h1, sampleHolder, moreLink);
    return gallerySection;
  },
  hero: function(
    hero_tag = helperFunctions.generateElement('section',"hero","landing"),
    figure_tag = helperFunctions.generateElement('figure'),
    img_tag = helperFunctions.generateElement('img',"","dyingImg","","assets/resources/imgs/landing/banner1.webp"),
    img_tag2 = helperFunctions.generateElement('img',"","","","assets/resources/imgs/landing/banner2.webp"),
    banner_tag = helperFunctions.generateElement('a', "banner","","Talk with an Expert Today! <br>208-749-6666","tel:208-749-6666"),
  ){
    figure_tag = helperFunctions.appendChildren(figure_tag, img_tag, img_tag2);
    hero_tag = helperFunctions.appendChildren(hero_tag, figure_tag, banner_tag)

    return hero_tag
  },
  main: function(
    main_tag = helperFunctions.generateElement('main'),
    hero_tag = this.hero(),
    gallery_tag = this.gallerySection(),
    aboutSection = this.aboutSection(),
    reviewSection = this.reviewSection()
    ){
      main_tag = helperFunctions.appendChildren(main_tag, hero_tag, gallery_tag, aboutSection, reviewSection);
    return main_tag;
  },
  reviewSection: function(
    sectionHolder = helperFunctions.generateElement('section',"reviewSection"),
    filter = helperFunctions.generateElement('div',"filter"),
    sampleArray = []
  ){
    console.log(reviewDB);
    for (let i = 0; i < 4; i++){
      sampleArray.push(reviewDB.array[i]);
    }
    let carousel_organism_variable = specialFeatures.carousel.carousel_organism(reviewDB.contentType, reviewDB.name, sampleArray);
    carousel_organism_variable.forEach(element => {
      filter.appendChild(element);
    });
    sectionHolder.appendChild(filter);
    return sectionHolder
  },
  theEvents: {
    heroBackgrounds: function(
      heroElement = document.getElementById('hero'),
      figureElement = heroElement.children[0],
      imgOptions = [
        "assets/resources/imgs/landing/banner1.webp",
        "assets/resources/imgs/landing/banner2.webp",
        "assets/resources/imgs/landing/banner3.webp",
        "assets/resources/imgs/landing/banner4.webp",
        "assets/resources/imgs/landing/banner5.webp"
      ],
      counter = 2,
    ){

      let fadingImg = setInterval(()=>{
        let dyingImg = figureElement.children[0];
        let substituteImg = figureElement.children[1];
        let newImg = helperFunctions.generateElement('img',"","","",`${imgOptions[counter]}`);

        counter++;

        if (counter == imgOptions.length){
          counter = 0;
        }
        dyingImg.remove();
        substituteImg.classList.add("dyingImg");
        figureElement.appendChild(newImg);
      },5000)   
    }
  }
}

pageStuff.constructHTML();