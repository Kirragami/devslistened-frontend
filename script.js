document.addEventListener("DOMContentLoaded", () => {
    // Tab switching
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

    // Post details
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

    // Auth popup
    const authPopup = document.getElementById("auth-popup");
    const accountButton = document.getElementById("account");
    if (accountButton) {
        accountButton.addEventListener("click", () => {
            authPopup.style.display = "flex";
        });
    }

    // Close auth popup when clicking outside
    authPopup.addEventListener("click", (e) => {
        if (e.target === authPopup) {
            authPopup.style.display = "none";
        }
    });

    // Auth tab switching
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

    // Prevent form submission (for demo purposes)
    authForms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Login/Signup functionality would be implemented here.");
            authPopup.style.display = "none";
        });
    });
});

// Mock function to get post details
function getPostDetails(postId) {
    const posts = {
        1: {
            title: "Need help with Elden Ring boss",
            content: "I'm stuck on Margit, any tips? I've tried using spirit ashes and leveling up my weapon, but I still can't seem to beat him. Any specific strategies or builds that work well against this boss?",
            author: "EldenLord",
            comments: 15,
            commentList: [
                { author: "SoulsMaster", content: "Try using the Jellyfish spirit ash, it's surprisingly effective!" },
                { author: "TarnishedOne", content: "Level up your vigor and use a shield with 100% physical block." },
            ],
        },
        2: {
            title: "Minecraft: Check out my new build!",
            content: "Just finished this massive castle, what do you think? It took me over 100 hours to complete. I used a mix of stone bricks, deepslate, and prismarine for a unique color palette. The interior is fully furnished with functional rooms.",
            author: "BlockMaster",
            comments: 42,
            commentList: [
                { author: "RedstoneWizard", content: "Wow, the detail on those towers is incredible!" },
                { author: "DiamondMiner", content: "Love the use of prismarine, it adds a nice pop of color." },
            ],
        },
        3: {
            title: "Bug report: Texture glitch in No Man's Sky",
            content: "Anyone else experiencing this weird texture bug on the new planets? Whenever I land on a planet with the new biome, some of the textures start flickering and turning into a strange checkerboard pattern. It's making the game nearly unplayable for me.",
            author: "StarExplorer",
            comments: 7,
            commentList: [
                { author: "GalacticPioneer", content: "I've seen this too! It seems to happen more often on planets with extreme weather." },
                { author: "AtlasInterface", content: "Have you tried verifying your game files? That fixed a similar issue for me." },
            ],
        },
    };
    return posts[postId];
}
