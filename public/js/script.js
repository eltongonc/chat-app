(function () {
    var socket = io(),
        container = document.querySelector('#messages'),
        chatInput = document.querySelector('#chat-input'),
        form = document.querySelector('form.write'),
        username = document.querySelector('form.username'),
        timeTracker = new Date();

    /********************
    ***** User functions
    *********************/
    username.addEventListener('submit', function(e){
        e.preventDefault();
        var input = username.children[0];
        if (input !== '') {
            socket.emit('new user', input.value, function(value){
                if (value) {
                    // hide the input if a username is available
                    username.classList.add('hidden');
                    chatInput.disabled = false;
                    container.innerHTML += generateTime(timeTracker);
                }
            });
        }
        return false;
    });

    socket.on('get users', updateUser);
    function updateUser(user, userList, message){
        var date = new Date(),
            peopleContainer = document.querySelector('ul.people');

        peopleContainer.innerHTML = '';
        // New user
        container.innerHTML += newUser(user,message);
        // All users
        userList.forEach(function(person){
            peopleContainer.innerHTML +=
            `<li class='person' id='${person.id}'>
                <img src='http://s13.postimg.org/ih41k9tqr/img1.jpg' alt=' />
                <span class='name'>${person.name}</span>
                <span class='time'>${date.getHours()+':'+date.getMinutes()}</span>
            </li>`;
        });
    }

    function newUser(user,message){
        return `<div class='conversation-start'>
            <time>${user.name} ${message}</time>
        </div>`;
    }

    /***********************
    ***** Message functions
    ************************/
    form.addEventListener('submit', function(e){
        e.preventDefault();
        socket.emit('send message', chatInput.value);
        chatInput.value = '';
    });

    socket.on('new message', function(message, sender, id){
        var className;
        // src: Timo Verkroost
        socket.id === id ? className = 'you': className = 'them';
        appendMessage(message, sender, new Date(), className);
    });

    function appendMessage(message, sender, date, className){
        updateDate(date);
        container.innerHTML +=
        `<div>
            <li class='bubble ${className}'>
                <span>${sender.name} says: </span> ${message}
                <time>${date.getHours()+':'+date.getMinutes()}</time>
            </li>
        </div>`;
        // Auto scroll the chat
        container.scrollTop = container.scrollHeight;
    }

    /********************
    ***** Time functions
    *********************/
    function generateTime(date) {
        var now = {
            day : date.getDate(),
            month : (()=>{var month = date.getMonth(); return month++;})(),
            year : date.getUTCFullYear()
        };

        date = `<div class='conversation-start'>
            <time>${now.day+'/'+now.month+'/'+now.year}</time>
        </div>`;
        return date;
    }

    function updateDate(date){
        var time = document.querySelector('time').innerHTML;
        if (date.getDate() !== timeTracker.getDate()) {
            timeTracker = new Date();
            container.innerHTML += generateTime(timeTracker);
        }
    }
}());
