document.addEventListener("DOMContentLoaded", () => {
    const blogContainer = document.getElementById("blog-container");

    Promise.all([
        fetch("https://dummyjson.com/posts").then(response => response.json()),
        fetch("https://dummyjson.com/products").then(response => response.json()) // Fetch images
    ])
    .then(([postsData, productsData]) => {
        const posts = postsData.posts.slice(0, 100); // Limit to 10 posts
        const images = productsData.products.slice(0, 100); // Get 10 images

        posts.forEach((post, index) => {
            const imageUrl = images[index]?.thumbnail || "https://via.placeholder.com/600x300?text=No+Image";

            const blogElement = document.createElement("div");
            blogElement.classList.add("blog-post");
            blogElement.innerHTML = `
                <img src="${imageUrl}" alt="Blog Image">
                <h2>${post.title}</h2>
                <p>${post.body.substring(0, 900)}...</p>
                <a href="blog.html?id=${post.id}">Read More</a>
            `;
            blogContainer.appendChild(blogElement);
        });
    })
    .catch(error => console.error("Error fetching posts:", error));
});
