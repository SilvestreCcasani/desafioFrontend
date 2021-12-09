import {requestUser, user, getPost, convertToHtml} from "./services/posts";



export class PublicationUser{

    container = '';
    isActiveFech=true;

    constructor(){
        this.init();
    }

    init(){
        this.selectors();
        this.fetchUser(); //init fetch
        this.intersectionObserver(); // init observer
        this.handleEvent();//init listener
    }

    selectors(){
        this.$container = document.getElementById("contenedor")
        this.$inputSearch = document.getElementById("input-search");
        this.$indicator = document.querySelector(".wrap-container .indicator");
    }
    
    intersectionObserver() {
        const observer = new IntersectionObserver((entradas) => {
          entradas.forEach(entrada=>{
            if (entrada.isIntersecting) {  
              user++;
              if(this.isActiveFech){//condicion to make the request when the search is made
                this.fetchUser();
              }   
            }
          })
        },{
          rootMargin: '0px 0px 0px 0px',
          threshold: 1.0
        });
    
        observer.observe(this.$indicator);//add observer
      }

    fetchUser() { //function for paint in the container html
      requestUser().then(html=>{
        this.container += html;//concatenate publication
        this.$container.innerHTML =this.container;
      });
    }
    
    filterPosts(search) { //function for filter publication 
      this.isActiveFech = search.length === 0;
      const filtersPost = getPost().filter(({title}) => title.includes(search))
      this.$container.innerHTML=convertToHtml(filtersPost);
    }
  
    handleEvent() { //funcion for capture input text
      this.$inputSearch.addEventListener('keyup',(e)=>{
        let search=e.path[0].value;
        this.filterPosts(search);
      });
    }
}
