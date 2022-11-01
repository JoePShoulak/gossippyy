const follow = async (event) => {
  console.log("follow button clicked");
  event.preventDefault();

  try {
    const id = event.target.dataset.id;

    console.log(id);

    await fetch(`/api/users/follow/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    location.reload();
  } catch (err) {
    console.log(err);
  }
};

document.getElementById("follow").addEventListener("click", follow);
