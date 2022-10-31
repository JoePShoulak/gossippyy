// const commentBtn = document.querySelector(".commentBtn");
// var x = document.createElement("INPUT");
// x.setAttribute("type", "text");
// x.className = "commentField";

console.log("this script is running");

let commentButtons = document.querySelectorAll(".btn-comment");
console.log(commentButtons);

let state = 0;

const createComment = async (event, i) => {
  console.log(i);

  event.preventDefault();
  console.log("correctBTN");

  state++;

  if (state === 1) {
    //DOM comment section
    const cardBody = document.getElementById(`commentArea-${i}`);
    var x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.className = "commentField";
    cardBody.append(x);
  } else if (state === 2) {
    //Post APIs the comment to DB

    const content = document.querySelector(".commentField").value;
    console.log(content);
    let post_id = event.target.dataset.postid;
    console.log(post_id);

    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({ content, post_id }),
        headers: { "Content-Type": "application/json" },
      });
      state = 0;
      location.reload();
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("already pressed");
  }
};

for (let i = 0; i < commentButtons.length; i++) {
  // commentButtons[i].addEventListener("click", createComment);

  commentButtons[i].addEventListener("click", (event) => {
    createComment(event, i);
  });
}
