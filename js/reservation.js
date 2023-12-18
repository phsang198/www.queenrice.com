$(function() {
    $("#reservationForm input,select").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {},
        submitSuccess: function($form, event) {
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();

            var name = $("input#name").val();
            var email = $("input#email").val();
            var prefix = $("select#prefix").val();
            var phone = $("input#phone").val();
            var date = $("input#date").val();
            var time = $("select#time").val();
            var people = $("select#people").val();

            var firstName = name;
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            $.ajax({
                url: "././mail/reservation.php",
                type: "POST",
                data: {
                    name: name,
                    prefix: prefix,
                    phone: phone,
                    email: email,
                    date: date,
                    time: time,
                    people,
                    people
                },
                cache: false,
                success: function() {
                    $("#btnSubmit").attr("disabled", false);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                    $('#success > .alert-success').append("<strong>Prenotazione inviata correttamente.<br />Daremo conferma nel pi&ugrave; tempo possibile.<br />Grazie per aver prenotato da Papa Rex!</strong>");
                    $('#success > .alert-success').append('</div>');
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                    $('#success > .alert-danger').append("<strong>Spiacenti " + firstName + ", il mail server non risponde. Per cortesia riprovi pi&ugrave; tardi!");
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset");
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

$('#name').focus(function() {
    $('#success').html('');
});