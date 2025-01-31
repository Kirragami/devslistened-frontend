document.addEventListener("DOMContentLoaded", () => {
 
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");
            if (tab.dataset.tab === "devs") {
                document.getElementById("gamer-tags").style.display = "none";
            } else {
                document.getElementById("gamer-tags").style.display = "flex";
            }
        });
    });

   
    const posts = document.querySelectorAll(".post");
    const rightSidebar = document.querySelector(".right-sidebar");
    posts.forEach((post) => {
        post.addEventListener("click", () => {
            const postId = post.dataset.id;
            const postDetails = getPostDetails(postId);
            rightSidebar.innerHTML = `
                <h2>${postDetails.title}</h2>
                <p>${postDetails.content}</p>
                <div class="post-meta">
                    <span>Posted by: ${postDetails.author}</span>
                    <span>Comments: ${postDetails.comments}</span>
                </div>
                <div class="comments">
                    ${postDetails.commentList
                        .map(
                            (comment) => `
                            <div class="comment">
                                <p>${comment.content}</p>
                                <span>By: ${comment.author}</span>
                            </div>
                        `
                        )
                        .join("")}
                </div>
            `;
        });
    });


    const authPopup = document.getElementById("auth-popup");
    const loginButton = document.getElementById("loginButton");
    if (loginButton) {
        loginButton.addEventListener("click", () => {
            authPopup.style.display = "flex";
        });
    }


    authPopup.addEventListener("click", (e) => {
        if (e.target === authPopup) {
            authPopup.style.display = "none";
        }
    });

   
    const authTabs = authPopup.querySelectorAll(".tab");
    const authForms = authPopup.querySelectorAll("form");
    authTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            authTabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");
            authForms.forEach((form) => {
                form.style.display = form.id === `${tab.dataset.tab}-form` ? "flex" : "none";
            });
        });
    });

    
    authForms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Login/Signup functionality would be implemented here.");
            authPopup.style.display = "none";
        });
    });

    async function fetchCommunities() {
        try {
            const response = await fetch('http://localhost:3000/community');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            const container = document.getElementById('left-sidebar-community-container');
            
            if (!container) {
                console.error('Container element not found');
                return;
            }
            
            container.innerHTML = data.map(community => `
                <li>
                    <div class="left-sidebar-game-community">
                        <img src="${community.icon}">
                        <span>${community.name}</span>
                    </div>
                </li>
            `).join('');
        } catch (error) {
            console.error('Error fetching community data:', error);
        }
    }

    async function fetchPosts() {
        try {
            const response = await fetch('http://localhost:3000/post');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            const container = document.getElementById('posts-container');
            
            if (!container) {
                console.error('Container element not found');
                return;
            }
            
            container.innerHTML = data.map(post => `
                <div class="post" data-id="1" onclick='openPost(${post.id})'>
                    <div class="post-content-container">
                        <h3>${post.header}</h3>
                        <p>${post.content}</p>
                        <div class="media-container">
                            <img src="${post.media}">
                        </div>
                        <div class="post-meta">
                            <span>Posted by: EldenLord</span>
                            <span>Comments : ${post.comments.length}</span>
                        </div>
                    </div>
                </div>
            `).join('');

            
        } catch (error) {
            console.error('Error fetching community data:', error);
        }
    }

    fetchPosts();
    fetchCommunities();
});

async function openPost(postId) {
    const mainContentContainer = document.getElementById("main-content-container");

    try {
        const response = await fetch(`http://localhost:3000/post/${postId}`);
        if (!response.ok) throw new Error("Failed to fetch post");

        const post = await response.json();

        
        mainContentContainer.innerHTML = `
            <div class="post post-detail" data-id="${post.id}">
                <div onclick="goBack()" class="post-detail-content-container">
                    <a href="./index.html"><img id="back-button" src="./images/back-arrow.svg"></a>
                    <h3>${post.header}</h3>
                    <p>${post.content}</p>
                    <div class="media-container">
                        <img src="${post.media}" alt="Post Image">
                    </div>
                    <div class="post-meta">
                        <span>Posted by: EldenLord</span>
                        <span>Comments: ${post.comments.length}</span>
                    </div>
                    <div class="comment-bar">
                        <input type="text" id="new-comment" placeholder="Add a comment...">
                    </div>
                    <div id="comment-container"></div>
                </div>
            </div>
        `;

   
        const commentContainer = document.getElementById("comment-container");

        const userIds = [...new Set(post.comments.map(comment => comment.postedBy))];

 
        const userResponses = await Promise.all(
            userIds.map(id => fetch(`http://localhost:3000/user/${id}`).then(res => res.json()))
        );

        const userMap = Object.fromEntries(userResponses.map(user => [user.id, user.username]));

        commentContainer.innerHTML = post.comments.map(comment => 
            `<div class="comment-content">
                <h3>${userMap[comment.postedBy]}</h3>
                <p>${comment.content}</p>
            </div>`
        ).join('');

    } catch (error) {
        console.error("Error loading post:", error);
        mainContentContainer.innerHTML = "<p>Failed to load post.</p>";
    }
}


