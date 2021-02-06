


(function () {

    // establish variables to be used
    var $usernameFld, $passwordFld;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $createBtn, $editBtn // $removeBtn
    var $userRowTemplate, $tbody;
    var userService = new AdminUserServiceClient();

    var users;

    // call jQuery with main, to have main called after DOM loads
    $(main);



    // main function
    function main() {
        console.log( "DOM has loaded" );

        // bind variables here
        $usernameFld = $( "#usernameFld" );
        $passwordFld = $( "#passwordFld" );
        $firstNameFld = $( "#firstNameFld" );
        $lastNameFld = $( "#lastNameFld" );
        $roleFld = $( "#roleFld" );

        $createBtn = $( ".wbdv-create" );
        $editBtn = $( ".wbdv-update" );    // also 'update' button

        $tbody = $( "tbody" );


        // call to server to get list of users, save it into 'users' var
        userService.findAllUsers()
            .then( function( usersFromServer ) {
                users = usersFromServer;
                renderUsers( users );
            });

        // add listener to create button
        $createBtn.click( () => {
            createUser();
        });

        $editBtn.click( () => {
            updateUser();
        });
    }


    // a function to create a user based on the input fields
    // TODO an alternative is to have createUser take in a JSON object
    function createUser() {
        var inputUser = {
            username: $usernameFld.val(),
            password: $passwordFld.val(),
            firstname: $firstNameFld.val(),
            lastname: $lastNameFld.val(),
            role: $roleFld.val()
        }

        userService.createUser( inputUser )
            .then( function( returnedCourse ) {
                users.push( returnedCourse );
                renderUsers( users );
                clearFields();
            });

    }

    // a helper to clear the values of all the input fields
    function clearFields() {
        $usernameFld.val( "" );
        $passwordFld.val( "" );
        $firstNameFld.val( "" );
        $lastNameFld.val( "" );
        $roleFld.val( "STUDENT" );
    }



    function deleteUser( event ) {
        console.log( "called deleteUser" );

        var $deleteBtn = $( event.target );
        var theIndex = $deleteBtn.attr( "id" );
        var theId = users[theIndex]._id;

        // call user service to try and delete only actually delete if it succeeds
        userService.deleteUser( theId )
            .then( function ( status ) {
                users.splice( theIndex, 1 );
                renderUsers( users );
            });

    }


    var currSelectedUser = null;
    function selectUser( event ) {
        var $selectBtn = $( event.target );
        var theId = $selectBtn.attr("id");
        currSelectedUser = users.find( user => user._id === theId );

        $usernameFld.val( currSelectedUser.username );
        $passwordFld.val( "" );
        $firstNameFld.val( currSelectedUser.firstname );
        $lastNameFld.val( currSelectedUser.lastname );
        $roleFld.val( currSelectedUser.role );


    }



    // user the currently selected user and update the data
    function updateUser() {
        console.log( currSelectedUser );

        currSelectedUser.username = $usernameFld.val();
        currSelectedUser.password = $passwordFld.val();
        currSelectedUser.firstname = $firstNameFld.val();
        currSelectedUser.lastname = $lastNameFld.val();
        currSelectedUser.role = $roleFld.val();

        userService.updateUser( currSelectedUser._id, currSelectedUser )
            .then( function( status ) {
                var index = users.findIndex( user => user._id === currSelectedUser._id );
                users[index] = currSelectedUser;
                renderUsers( users );
            });
    }



    // renders all the users into the table given a list of users
    function renderUsers( users ) {
        $tbody.empty();
        for ( var i = 0; i < users.length; i++ ) {
            var user = users[i];
            $tbody.prepend(`
                <tr class="wbdv-template wbdv-user wbdv-hidden">
                    <td class="wbdv-username">${user.username}</td>
                    <td>&nbsp;</td>
                    <td class="wbdv-first-name">${user.firstname}</td>
                    <td class="wbdv-last-name">${user.lastname}</td>
                    <td class="wbdv-role">${user.role}</td>
                    <td class="wbdv-actions">
                        <span class="pull-right">
                            <i id=${i} class="fa-2x fa fa-times wbdv-remove"></i>
                            <i id=${user._id} class="fa-2x fa fa-pencil wbdv-edit"></i>
                        </span>
                    </td>
                </tr>
            `)
        }

        $(".wbdv-remove").click( deleteUser );
        $(".wbdv-edit").click( selectUser )
    }



    function findAllUsers() { } // optional - might not need this …
    function findUserById() { } // optional - might not need this
})();
