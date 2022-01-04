let userListPage = `<h5>List of MyCMS users</h5>
<ul class="list-group list-group-horizontal-lg">
  <li class="list-group-item">item.username</li>
</ul>`;

let page = document.querySelector("#page");

const UserListPage = () => {
  return (page.innerHTML = userListPage);
};

export default UserListPage;
