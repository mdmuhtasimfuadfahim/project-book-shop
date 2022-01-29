

export function deleteUser(){
    if(window.location.pathname == "/admin/users-view"){
        window.$ondelete = $("#main .row .column .card a.delete");
        $ondelete.click(function(){
            var id = $(this).attr("data-id2")
    
            var request = {
                "url" : `http://localhost:4050/admin/delete-user/${id}`,
                "method" : "DELETE"
            }
    
            if(confirm("Do you want to delete this user?")){
                $.ajax(request).done(function(response){
                    alert("User info deleted successfully!");
                    location.reload();
                })
            }
    
        })
    }
}