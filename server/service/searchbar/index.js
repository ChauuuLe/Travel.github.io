const trips = {};

document.getElementById('createTripGroupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const groupName = document.getElementById('newTripGroupName').value.trim();
    if (groupName && !trips[groupName]) {
        trips[groupName] = [];
    }
    document.getElementById('newTripGroupName').value = '';
});

document.getElementById('addFriendToGroupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const groupName = document.getElementById('tripGroupNameForFriend').value.trim();
    const friendName = document.getElementById('friendName').value.trim();
    if (groupName && trips[groupName]) {
        trips[groupName].push(friendName);
        if (document.getElementById('viewTripGroup').value.trim() === groupName) {
            viewFriends();
        }
    }
    document.getElementById('tripGroupNameForFriend').value = '';
    document.getElementById('friendName').value = '';
});

function viewFriends() {
    const groupName = document.getElementById('viewTripGroup').value.trim();
    const list = document.getElementById('friendsList');
    list.innerHTML = '';
    if (trips[groupName]) {
        trips[groupName].forEach(friend => {
            let listItem = document.createElement('li');
            listItem.textContent = friend;
            list.appendChild(listItem);
        });
    }
}
