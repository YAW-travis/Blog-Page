document.addEventListener("DOMContentLoaded", () => {
    const blogContent = document.getElementById("blog-content");
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (!postId) {
        blogContent.innerHTML = "<p>Blog post not found.</p>";
        return;
    }

    Promise.all([
        fetch(`https://dummyjson.com/posts/${postId}`).then(response => response.json()),
        fetch(`https://dummyjson.com/products/${Math.floor(Math.random() * 100)}`).then(response => response.json()) // Random image
    ])
    .then(([post, product]) => {
        const imageUrl = product?.thumbnail || "https://via.placeholder.com/800x500?text=No+Image";

        blogContent.innerHTML = `
            <div class="blog-post">
                <img src="${imageUrl}" alt="Blog Image">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <a href="index.html">Back to Blogs</a>
            </div>
        `;
    })
    .catch(error => {
        blogContent.innerHTML = "<p>Blog post not found.</p>";
        console.error("Error fetching blog post:", error);
    });
});
