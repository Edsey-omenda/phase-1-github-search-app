document.addEventListener("DOMContentLoaded", () => {
    displayInput()
  });
  
  let username;
  function displayInput(){
    document.getElementById("github-form").addEventListener("submit", (e) => {
        e.preventDefault()
       let  username = document.getElementById("search").value
  
        searchUser(username)
    });
  }
  
  
  function searchUser(username){
    fetch(`https://api.github.com/users/${username}`)
        .then(resp => resp.json())
        .then(json => displayInfomation(json))
  }
  
  function displayInfomation(json){
    let div = document.getElementById("user-list")
  
    let h = document.createElement("h")
    h.textContent = `${json.login}`
  
    const image = document.createElement("image")
    image.setAttribute("src", `${json.avatar_url}`)
  
    let task = document.createElement("A");
    task.setAttribute("target", "_blank")
    task.setAttribute("href", `https://github.com/${json.login}`)
    task.innerText = image
  
    let p = document.createElement("p")
    p.textContent = "Click the Repository button to access the Repositories."
  
    let p_2 = document.createElement("p")
    p_2.textContent = `https://api.github.com/users/${username}/repos`
  
    const btn = document.createElement("button")
    btn.setAttribute("id", `${json.login}`)
    btn.textContent = "Repository"
  
    btn.addEventListener("click", () => {
      fetch(`https://api.github.com/users/${json.login}/repos`)
        .then(resp => resp.json())
        .then(json => findMyRepo(json))
  })
  
  let plate = document.createElement("div");
  plate.append(h);
  plate.append(image);
  plate.append(p);
  plate.append(p_2);
  plate.append(btn);
  div.appendChild(plate);
  }
  
  
  function findMyRepo(json){
    const div_2 = document.getElementById("repos-list")
    repoLinks = []
    for (const info of json) {
      const p = document.createElement("p")
      p.textContent = (info.name)
      div_2.append(p)
    }
  }