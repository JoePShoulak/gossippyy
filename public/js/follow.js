const follow = async (event) => {
  event.preventDefault();
  console.log("Follow button clicked");
  try {
    const id = event.target.dataset.id;

    const response = await fetch(`/api/users/follow/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    location.reload();
  } catch (err) {
    console.log(err);
  }
};

document.getElementById("follow").addEventListener("click", follow);
