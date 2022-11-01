const createPost = async (event, i) => {
  event.preventDefault();

  // const content = document.querySelector(".mytextarea").value;
  const content = tinymce.activeEditor
    .getContent()
    .split("<p>")[1]
    .split("</p>")[0];

  try {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });
    location.reload();
  } catch (err) {
    console.log(err);
  }
};

document.querySelector("#post-form").addEventListener("submit", createPost);
