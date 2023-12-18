$(function() {
    $("#newsletterForm input").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {},
        submitSuccess: function($form, event) {
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();
            var email = $("input#email").val();
            $.ajax({
                url: "././mail/newsletter.php",
                type: "POST",
                data: {
                    email: email
                },
                cache: false,
                success: function() {
                    $("#btnSubmit").attr("disabled", false);
                    $('#newsletter_success').html("<div class='alert alert-success'>");
                    $('#newsletter_success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                    $('#newsletter_success > .alert-success').append("<strong>Registrazione effettuata correttamente. </strong>");
                    $('#newsletter_success > .alert-success').append('</div>');
                    $('#newsletterForm').trigger("reset");
                },
                error: function() {
                    $('#newsletter_success').html("<div class='alert alert-danger'>");
                    $('#newsletter_success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                    $('#newsletter_success > .alert-danger').append("<strong>Spiacenti " + firstName + ", il mail server non risponde. Per cortesia riprovi pi&ugrave; tardi!");
                    $('#newsletter_success > .alert-danger').append('</div>');
                    $('#newsletterForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });
    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});
$('#email').focus(function() {
    $('#newsletter_success').html('');
});