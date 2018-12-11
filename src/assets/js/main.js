$(document).ready(function () {

        //General rules for validation
        let $submitFormAll = $('form')
        let submitSuccessAll = $submitFormAll.find('.submit-trigger').data('success')
        let submitErrorAll = $submitFormAll.find('.submit-trigger').data('error')
        let $submitAlertAll = $submitFormAll.find('.submit-message')

        // Use HTML5 required attribute to validate
        // Add a div with class validation-error for displaying errors
        $submitFormAll.validate({
            debug: true,
            errorPlacement: function (error, element) {
                $submitAlertAll.removeClass('alert-success alert-danger').html('')
                element.siblings('.validation-error').remove();
                element.after('<span class="validation-error">' + error[0].innerText + '</span>')
                element.next('.validation-error').fadeIn()
                $submitAlertAll.removeClass('alert-success alert-danger').html('')
                $submitAlertAll.addClass('alert-danger').fadeIn()
                $submitAlertAll.append('<strong>Alert!</strong> Please fill the required fields');
                error = ''
            },
        })

        $(".submit-trigger").click(function (e) {
            //// Example submit button
            // <button type = "submit"
            // class = "submit-trigger btn btn-yellow"
            // data - error = "Name and Email fields are required"
            // data - success = "Form has been submitted successfully"
            // data - site_receiver_email = "umervservices@gmail.com"
            // data - mail_subject = "Contact Form"
            // data - email_noreply = "no-reply@vservices.com"
            // data - sender_subject = "Thank you!"
            // data - mail_heading = "Thanks for contacting us"
            // data - sender_email_body = "We will get back to you soon"
            // data - submitError = "Something went wrong"
            // data - submitSuccess = "Form has been submitted successfully" > Submit </button>
            e.preventDefault()
            $submitFormAll.valid();
            if ($submitFormAll.valid()) {
                var formData = $submitFormAll.serializeArray();

                //data attributes to be defind on submit buttons or can be defined manually
                //// webiste owner email address who will get the query

                var site_receiver_email = $(this).data('site_receiver_email')

                ////email subject which webiste owner receive
                var mail_subject = $(this).data('mail_subject')

                ////no-reply email address
                var email_noreply = $(this).data('email_noreply')

                ////user email subject
                var sender_subject = $(this).data('sender_subject')

                ////user email heading
                var mail_heading = $(this).data('mail_heading')

                ////any other content to be sent to user
                var sender_email_body = $(this).data('sender_email_body')

                //server side error text on submit
                var submitError = $(this).data('error')

                //server side success text on submit
                var submitSuccess = $(this).data('success')


                let setting = [{
                    name: 'site_receiver_email',
                    value: site_receiver_email
                }, {
                    name: 'mail_subject',
                    value: mail_subject
                }, {
                    name: 'email_noreply',
                    value: email_noreply
                }, {
                    name: 'sender_subject',
                    value: sender_subject
                }, {
                    name: 'mail_heading',
                    value: mail_heading
                }, {
                    name: 'sender_email_body',
                    value: sender_email_body
                }, {
                    name: 'submitError',
                    value: submitError
                }, {
                    name: 'submitSuccess',
                    value: submitSuccess
                }]

                // var armixed = formData.map(function (x, i) {
                //     return [x, setting[i]]
                // });
                setting.forEach((i, j) => {
                    formData.push(i)
                })

                //get form element
                var $submitForm = $(this).parents('form')

                //server side error element
                var $submitAlert = $submitForm.find('.submit-message')

                //emptying previous erros and remove classes
                $submitAlert.removeClass('alert-success alert-danger').html('')

                $.ajax({
                    //posting action
                    type: 'post',
                    //posting method
                    url: 'submit_form.php',
                    //form data to be submitted
                    data: formData,

                    //on ajax success method populating alert div
                    success: function (data) {
                        // console.log('ajax success : ', data)
                        $submitAlertAll.addClass('alert-success').fadeIn()
                        $submitAlertAll.append('<strong>Success!</strong> ' + submitSuccessAll);
                        $submitFormAll[0].reset()
                        submitSuccessAll = ''
                    },
                    //on ajax error method populating alert div
                    error: function (data) {
                        // console.log('ajax error : ', data)
                        $submitAlertAll.addClass('alert-danger').fadeIn()

                        if (data.status == 404) {
                            $submitAlertAll.append('<strong>Alert!</strong> Something went wrong please try after a few minutes');
                        } else {
                            $submitAlertAll.append('<strong>Alert!</strong> ' + submitErrorAll);
                        }
                        submitErrorAll = ''

                    },
                });
            }

        });

    })

    /**
     * jQuery-viewport-checker - v1.8.8 - 2017-09-25
     * https://github.com/dirkgroenen/jQuery-viewport-checker
     *
     * Copyright (c) 2017 Dirk Groenen
     * Licensed MIT <https://github.com/dirkgroenen/jQuery-viewport-checker/blob/master/LICENSE>
     */

    ! function (a) {
        a.fn.viewportChecker = function (b) {
            var c = {
                classToAdd: "visible",
                classToRemove: "invisible",
                classToAddForFullView: "full-visible",
                removeClassAfterAnimation: !1,
                offset: 100,
                repeat: !1,
                invertBottomOffset: !0,
                callbackFunction: function (a, b) {},
                scrollHorizontal: !1,
                scrollBox: window
            };
            a.extend(c, b);
            var d = this,
                e = {
                    height: a(c.scrollBox).height(),
                    width: a(c.scrollBox).width()
                };
            return this.checkElements = function () {
                var b, f;
                c.scrollHorizontal ? (b = Math.max(a("html").scrollLeft(), a("body").scrollLeft(), a(window).scrollLeft()), f = b + e.width) : (b = Math.max(a("html").scrollTop(), a("body").scrollTop(), a(window).scrollTop()), f = b + e.height), d.each(function () {
                    var d = a(this),
                        g = {},
                        h = {};
                    if (d.data("vp-add-class") && (h.classToAdd = d.data("vp-add-class")), d.data("vp-remove-class") && (h.classToRemove = d.data("vp-remove-class")), d.data("vp-add-class-full-view") && (h.classToAddForFullView = d.data("vp-add-class-full-view")), d.data("vp-keep-add-class") && (h.removeClassAfterAnimation = d.data("vp-remove-after-animation")), d.data("vp-offset") && (h.offset = d.data("vp-offset")), d.data("vp-repeat") && (h.repeat = d.data("vp-repeat")), d.data("vp-scrollHorizontal") && (h.scrollHorizontal = d.data("vp-scrollHorizontal")), d.data("vp-invertBottomOffset") && (h.scrollHorizontal = d.data("vp-invertBottomOffset")), a.extend(g, c), a.extend(g, h), !d.data("vp-animated") || g.repeat) {
                        String(g.offset).indexOf("%") > 0 && (g.offset = parseInt(g.offset) / 100 * e.height);
                        var i = g.scrollHorizontal ? d.offset().left : d.offset().top,
                            j = g.scrollHorizontal ? i + d.width() : i + d.height(),
                            k = Math.round(i) + g.offset,
                            l = g.scrollHorizontal ? k + d.width() : k + d.height();
                        g.invertBottomOffset && (l -= 2 * g.offset), k < f && l > b ? (d.removeClass(g.classToRemove), d.addClass(g.classToAdd), g.callbackFunction(d, "add"), j <= f && i >= b ? d.addClass(g.classToAddForFullView) : d.removeClass(g.classToAddForFullView), d.data("vp-animated", !0), g.removeClassAfterAnimation && d.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                            d.removeClass(g.classToAdd)
                        })) : d.hasClass(g.classToAdd) && g.repeat && (d.removeClass(g.classToAdd + " " + g.classToAddForFullView), g.callbackFunction(d, "remove"), d.data("vp-animated", !1))
                    }
                })
            }, ("ontouchstart" in window || "onmsgesturechange" in window) && a(document).bind("touchmove MSPointerMove pointermove", this.checkElements), a(c.scrollBox).bind("load scroll", this.checkElements), a(window).resize(function (b) {
                e = {
                    height: a(c.scrollBox).height(),
                    width: a(c.scrollBox).width()
                }, d.checkElements()
            }), this.checkElements(), this
        }
    }(jQuery);



$('.section').addClass('hidden').viewportChecker({
    classToAdd: 'visible animated fadeInDown', // Class to add to the elements when they are visible,
    classToAddForFullView: 'full-visible', // Class to add when an item is completely visible in the viewport
    classToRemove: 'hidden', // Class to remove before adding 'classToAdd' to the elements
    removeClassAfterAnimation: false, // Remove added classes after animation has finished
    offset: 100, // The offset of the elements (let them appear earlier or later). This can also be percentage based by adding a '%' at the end
    invertBottomOffset: true, // Add the offset as a negative number to the element's bottom
    repeat: false, // Add the possibility to remove the class if the elements are not visible
    callbackFunction: function (elem, action) {}, // Callback to do after a class was added to an element. Action will return "add" or "remove", depending if the class was added or removed
    scrollHorizontal: false // Set to true if your website scrolls horizontal instead of vertical.
});


$(window).on('load', function () {
    $('.loader').fadeOut()
})


$('.form-control').each(function () {
    $(this).keyup(function () {
        $(this).val() ? $(this).parents('label').addClass("focused") : $(this).parents('label').removeClass("focused")
    })
});