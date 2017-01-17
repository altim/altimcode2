$(document).ready(function () {

    //Particles
    particlesJS.load('particles', 'js/particles.json', function () {
    });

    UIkit.offcanvas('#offcanvas');

    var contactMail = (function () {

        return {
            init: function () {
                var _self = this;
                $("#btn-send-mail").click(function(){
                    _self.send();
                });
            },
            send: function () {
                var name = $("#name").val(),
                    email = $("#email").val(),
                    message = $("#message").val(),
                    errors = 0,
                    _self = this;



                if(name === '') {
                    this.showError('Please fill in your name');
                    errors+=1;
                }

                if(email === ''){
                    this.showError('Please fill in your email');
                    errors+=1;
                }

                if(email !== '' && !this.validateEmail(email)){
                    this.showError('Email address not valid. Please check');
                    errors+=1;
                }

                if(message === ''){
                    this.showError('Please write some message');
                    errors+=1;
                }

                if(!errors) {
                    this.hideSubmitButton();
                    this.showSpinner();

                    $.post("sendmessage.php",
                        {name: name, email: email, message: message},
                        function (data) {

                            if (data == 'OK') {
                                _self.showSuccess('Your message was successfully sent. I\'ll get back to you as soon as possible');
                                _self.clearFields();
                            }

                            _self.hideSpinner();
                            _self.showSubmitButton();

                        });
                }

            },
            showError : function(errorMessage){
                $(".alert-box").append('<div class="uk-alert-warning" uk-alert><p>'+errorMessage+'</p></div>');
                $(".alert-box").find('.uk-alert-warning:last-child').fadeIn(400,'swing');
                var $currentAlert = $(".alert-box").find('.uk-alert-warning:last-child');

                setTimeout(function(){
                    $currentAlert.slideUp(400,'swing',function(){
                       $(this).remove();
                    });
                },3000);
            },
            showSuccess : function(successMessage){
                $(".alert-box").append('<div class="uk-alert-success" uk-alert><p>'+successMessage+'</p></div>');
                $(".alert-box").find('.uk-alert-success:last-child').fadeIn(400,'swing');
                var $currentAlert = $(".alert-box").find('.uk-alert-success:last-child');

                setTimeout(function(){
                    $currentAlert.slideUp(400,'swing',function(){
                        $(this).remove();
                    })
                },10000);
            },
            clearFields : function(){
                $("#name").val('');
                $("#email").val('');
                $("#message").val('');
            },
            showSpinner : function(){
                $("#spinner").show();
            },
            hideSpinner : function(){
                $("#spinner").hide();
            },
            showSubmitButton : function(){
                $("#btn-send-mail").show();
            },
            hideSubmitButton : function(){
                $("#btn-send-mail").hide();
            },
            validateEmail: function(email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }
    }
    })();

    contactMail.init();


});