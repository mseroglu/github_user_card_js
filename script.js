const API_URL = "https://api.github.com/users/"

const form = document.getElementById("form")
const search = document.getElementById("search")
const main = document.getElementById("main")

const getUser = async (username) => {
   try {
      const { data } = await axios(API_URL + username)
      console.log(data)
      createCard(data)
      getRepos(username)      
   } catch (error) {
      console.log(error)
      main.innerHTML = createErrorCard(error)
   }
}

const getRepos = async (username) => {
   try {
      const repos = await axios(API_URL + username + '/repos')
      console.log(repos.data)
      repoToCard(repos?.data)
   } catch (error) {
      console.log(error)
      repoError(error)
      
   }
}

//getUser("mseroglu")

form.addEventListener("submit", (e) => {
   e.preventDefault()

   const user = search.value
   if (user) {
      getUser(user)
   }
})

const repoToCard = (repos) => {
   const reposWrapper = document.getElementById("repos")

   repos?.slice(repos.length-3).forEach(repo => {
      const repoLink = document.createElement("a")
      repoLink.href = repo.html_url
      repoLink.style.width = "80%"
      repoLink.innerHTML = `<i class="fa-brands fa-github"></i> ${repo.name}`
      repoLink.target = "_blank"
      reposWrapper.appendChild(repoLink)
   })
}

const repoError = (error) => {
   const reposWrapper = document.getElementById("repos")
   const p = document.createElement("p")
   p.style.color = ""
   p.innerHTML = `Üzgünüm repolara ulaşılamadı <br> ${error.message}`
   reposWrapper.appendChild(p)
}

const createCard = (user) => {
   const userName = user.name || user.login
   const userBio = user.bio || " "

   const cardHtml = (`
         <div class="card">
         <img class="user-image" src=${user.avatar_url} alt="image">
         <div class="user-info">
            <div class="name">
               ${userName}
            </div>
            <div class="username">
               @${user.login}
            </div>
         </div>
         <p>
         ${userBio}
         </p>
         <ul>
            <li><i class="fa-solid fa-user-group"></i> ${user.followers} <strong>followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li><i class="fa-solid fa-bookmark"></i> ${user.public_repos} <strong>Repository</strong> </li>
         </ul>
         <div class="repos" id="repos">
            
         </div>
      </div>
   `)
   main.innerHTML = cardHtml
  
}

const createErrorCard = (error) => {
   return (`
      <div class="card">
         <h3>Üzgünüm, <br>
         aradığın kullanıcı bulunamadı</h3>
         <p>${error.message}</p>
      </div>
      ` )
}