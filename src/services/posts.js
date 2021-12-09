const API="https://jsonplaceholder.typicode.com/users";

export let user=1;
let allPosts=[];

export function getPost() {
    return allPosts;
}

function templatePost({title,body,user}){
    return `<div id="publication-container">
                <div class="publications">
                    <h1>${user.name}</h1>
                    <h2 class="items">${title}</h2>
                    <p>${body}</p>
                </div>
            </div>`;
    
}

export function convertToHtml(posts) {//convert new filtering data
    return posts.map(item=>(templatePost(item))).join("");
  }

export async function requestUser(){//reques to get one user 
   return fetch(`${API}/${user}`)
    .then((response)=>response.json())
    .then(async (users)=>{
           return await requestPost(users)
    })

    .catch(error=>{
        console.log("fallo la promesa: ",error);
    });
}

function requestPost(users){//reques to get posts for user
    
    return fetch(`https://jsonplaceholder.typicode.com/users/${users.id}/posts`)
            .then(response=>response.json())
            .then(posts=>{
            
                const joinUserWithPost = posts.map(post => ({...post, user: {...users}}) );//join post and user for each request
                allPosts = [...allPosts, ...joinUserWithPost];//save the publications and users to do the search
                
                return convertToHtml(joinUserWithPost);
            });
}