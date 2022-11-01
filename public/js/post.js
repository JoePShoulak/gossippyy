const createPost = async (event, i) => {
  event.preventDefault();

  const content = document.getElementById("post-content").value;

  console.log(content);

  try {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });
    // location.reload();
  } catch (err) {
    console.log(err);
  }
};

document.querySelector("#post-form").addEventListener("submit", createPost);
