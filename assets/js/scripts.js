$(document).ready(function() {

    const toastLiveExample = document.getElementById('liveToast');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

    $(document).on("click","#delete-tasks", function(){
        var ids = [];
        $(".task-checkbox:checked").each(function(i, v){
            const id = $(v).data("id");
            ids.push(id);
        });
        if(ids.length > 0){
            $.ajax({
                // actions before sending request
                beforeSend: function(){
                    $(".loader").show();
    
                    // reset toaster
                    $(".response-title").html("");
                    $(".response-message").html("");
                    $(".toast-header").removeClass("text-bg-success");
                    $(".toast-body").removeClass("text-bg-success");
                    $(".toast-header").removeClass("text-bg-danger");
                    $(".toast-body").removeClass("text-bg-danger");
                },
                url: "/tasks/delete",
                type: "DELETE",
                data: {
                    ids
                },
                success: function(res){
                    if(res.status){
                        $(".response-title").html("Success");
                        $(".toast-header").addClass("text-bg-success");
                        $(".toast-body").addClass("text-bg-success");
                        // remove tasks if deleted successfully
                        ids.forEach(id => {
                            $(".card_task_"+id).remove();
                        });
                    }else{
                        $(".response-title").html("Error");
                        $(".toast-header").addClass("text-bg-danger");
                        $(".toast-body").addClass("text-bg-danger");
                    }
                    $('.response-message').html(res.message);
                    toastBootstrap.show();
                },
                error: function(error){
                    $(".response-title").html("Error");
                    $(".toast-header").addClass("text-bg-danger");
                    $(".toast-body").addClass("text-bg-danger");
                    $('.response-message').html(error.message);
                    toastBootstrap.show();
                },
                complete: function(){
                    $(".loader").hide();
                }
            });
        }
    });

    $(document).on("click", ".card_task", function(){
        let cb = $(this).find(".task-checkbox");
        if(cb.prop("checked")){
            cb.prop("checked", false);
        }else{
            cb.prop("checked", true);
        }
    });
});