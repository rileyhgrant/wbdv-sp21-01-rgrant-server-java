
// a function object for an AdminUserServiceClient
function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.updateUser = updateUser;
    this.deleteUser = deleteUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/001661897/users';
    var self = this;




    function createUser( user ) {
        return fetch( self.url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify( user )
        })
        .then( function( response ) {
            return response.json()
        });
    }


    // a function to grab the course list from the server, in JSON format
    function findAllUsers() {
        return fetch( self.url )
            .then( function( response ) {
                console.log( response );
                return response.json();
        })
    }


    function findUserById( userId ) { }


    function updateUser( userId, user ) {
        return fetch( `${self.url}/${userId}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify( user )
        }).then( response => response.json() );
    }



    // a function to delete the user from the server
    function deleteUser( userId ) {

        return fetch( `${self.url}/${userId}`,
            { method: 'DELETE'});

    }


}
