//
//// alert( "Testing" )
//console.log( "script ran" )
//
//var header = jQuery("h1")
//
//header
//    .click( function( event ) {
//        console.log( event )
//        header.remove()
//       })
//
//
//
//var tableRows = jQuery(".wbdv-tbody")
//tableRows.css( "background-color", "cyan" )
//
//
//var users = [
//    {
//        username: "callum",
//        firstname: "Callum",
//        lastname: "Grant",
//        role: "ADMIN",
//    },
//    {
//        username: "fiona",
//        firstname: "Fiona",
//        lastname: "Grant",
//        role: "ADMIN",
//    }
//]
//
//function renderUsers( users ) {
//
//    tableRows.empty()
//
//    for( var i=0; i<users.length; i++ ) {
//        var user = users[i]
//
//        tableRows.prepend(`
//        <tr class="wbdv-template wbdv-user wbdv-hidden">
//            <td class="wbdv-username">${user.username}</td>
//            <td>&nbsp;</td>
//            <td class="wbdv-first-name">${user.firstname}</td>
//            <td class="wbdv-last-name">${user.lastname}</td>
//            <td class="wbdv-role">${user.role}</td>
//            <td class="wbdv-actions">
//                <span class="pull-right">
//                    <i id=${i} class="fa-2x fa fa-times wbdv-remove"></i>
//                    <i class="fa-2x fa fa-pencil wbdv-edit"></i>
//                </span>
//            </td>
//        </tr>
//    `)
//    }
//
//    $(".wbdv-remove")
//        .click( function( event ) {
//            console.log( event.target );
//            var $deleteBtn = $( event.target );
//            var theClass = $deleteBtn.attr( "class" );
//            var theId = $deleteBtn.attr( "id" );
//            console.log( theClass );
//            console.log( theId );
//            users.splice( theId, 1 )
//            renderUsers( users )
//
////            var button = $( event.target )
////            var id = button.attr( "id" )
////            console.log( id )
////            console.log( event.target )
////            users.splice( id, 1 )
////            renderUsers( users )
//        })
//}
//
//function addCourse() {
//    tableRows.append(`
//        <tr class="wbdv-template wbdv-user wbdv-hidden">
//            <td class="wbdv-username">callum</td>
//            <td>&nbsp;</td>
//            <td class="wbdv-first-name">Riley</td>
//            <td class="wbdv-last-name">Grant</td>
//            <td class="wbdv-role">ADMIN</td>
//            <td class="wbdv-actions">
//                <span class="pull-right">
//                    <i class="fa-2x fa fa-times wbdv-remove"></i>
//                    <i class="fa-2x fa fa-pencil wbdv-edit"></i>
//                </span>
//            </td>
//        </tr>
//    `)
//}
//
//
//
//
////function createUser() {
////    $usernameFld = $( "#usernameFld" );
////    $passwordFld = $( "#passwordFld" );
////    $firstNameFld = $( "#firstNameFld" );
////    $lastNameFld = $( "#lastNameFld" );
////    $roleFld = $( "#roleFld" );
////
////    // handle click events
////    var $createBtn = $( ".wbdv-create" );
////
////    $createBtn.click( function() {
////        var newUser = {
////            username: usernameFld.val(),
////            firstname: firstNameFld.val(),
////            lastname: lastNameFld.val(),
////            role: roleFld.val()
////        }
////
////        // TODO instead of doing this, have a 'createUser' thing, and then this
////        //    on click, simply creates a course, then calls the helper
////        users.push( newUser );
////        renderUsers( users );
////    });
////
////}
//
//var $usernameFld, $passwordFld;
//var $firstNameFld, $lastNameFld, $roleFld;
//var $createBtn;
//
//$usernameFld = $( "#usernameFld" );
//$passwordFld = $( "#passwordFld" );
//$firstNameFld = $( "#firstNameFld" );
//$lastNameFld = $( "#lastNameFld" );
//$roleFld = $( "#roleFld" );
//
//$createBtn = $( ".wbdv-create" );
//
//// on click for the create button
//$createBtn.click( () => {
//
//    createUser( {
//        username: $usernameFld.val(),
//        password: $passwordFld.val(),
//        firstname: $firstNameFld.val(),
//        lastname: $lastNameFld.val(),
//        role: $roleFld.val()
//    });
//
//    emptyFields();
//
//});
//
//function emptyFields() {
//    $usernameFld.val( "" );
//    $passwordFld.val( "" );
//    $firstNameFld.val( "" );
//    $lastNameFld.val( "" );
//    $roleFld.val( "STUDENT" );
//}
//
//function createUser( newUser ) {
//
//    users.push( newUser );
//    renderUsers( users );
//}
//
//
//
////
////var $createBtn = $( ".wbdv-create")
////
////// create button thing
////$createBtn.click( function() {
////    // alert( "clicked!" )
////
////    // addCourse()
////
////    var newCourse = {
////        username: "callum",
////        firstname: "Callum",
////        lastname: "Grant",
////        role: "ADMIN"
////    }
////
////    users.push( newCourse )
////    renderUsers( users )
////})



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


        // call render users with the default from the server

        // TODO really this should be an API call
        users = [];

        // render users with the recieved list
        renderUsers( users );

        // add listener to create button
        $createBtn.click( () => {
            createUser();
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

        users.push( inputUser );
        renderUsers( users );

        clearFields();

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
        var theId = $deleteBtn.attr( "id" );
        users.splice( theId, 1 );
        renderUsers( users );
    }

    function selectUser() { }
    function updateUser() { }



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
                            <i class="fa-2x fa fa-pencil wbdv-edit"></i>
                        </span>
                    </td>
                </tr>
            `)
        }

        $(".wbdv-remove").click( deleteUser ); //{
//        // TODO lots of console logging here still
//            console.log( event.target );
//            var $deleteBtn = $( event.target );
//            var theClass = $deleteBtn.attr( "class" );
//            var theId = $deleteBtn.attr( "id" );
//            console.log( theClass );
//            console.log( theId );
//            users.splice( theId, 1 );
//            renderUsers( users );

//       });
    }



    function findAllUsers() { } // optional - might not need this …
    function findUserById() { } // optional - might not need this
})();
