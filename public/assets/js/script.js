$(document).ready(function() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    var owl = $('.owl-carousel-movies');
    owl.owlCarousel({
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        center: true,
        loop: true,
        dotsEach: true,
        margin: 10,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            960: {
                items: 3
            },
            1200: {
                items: 5
            }
        }
    });

    var owlBig = $('.owl-carousel-big');
    owlBig.owlCarousel({
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        center: true,
        loop: true,
        dotsEach: true,
        margin: 20,
        autoHeight: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            960: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    });

    var genres = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction", "Thriller", "War", "Western"]

    for (i = 0; i < genres.length; i++) {
        $(".genre-choices").append(`<div class="form-check form-check-inline genres-form">
        <input class="form-check-input" type="checkbox" id="genre ${i + 1}" value="${genres[i]}">
        <label class="form-check-label" for="inlineCheckbox1">${genres[i]}</label>
    </div>`)
        $(".genre1-choices").append(`<div class="form-check form-check-inline genres-form">
            <input class="form1-check-input" type="checkbox" id="genre ${i + 1}" value="${genres[i]}">
            <label class="form-check-label" for="inlineCheckbox1">${genres[i]}</label>
        </div>`)
        $(".genre2-choices").append(`<div class="form-check form-check-inline genres-form">
        <input class="form2-check-input" type="checkbox" id="genre ${i + 1}" value="${genres[i]}">
        <label class="form-check-label" for="inlineCheckbox1">${genres[i]}</label>
    </div>`)
    $(".genre3-choices").append(`<div class="form-check form-check-inline genres-form">
        <input class="form3-check-input" type="checkbox" id="genre ${i + 1}" value="${genres[i]}">
        <label class="form-check-label" for="inlineCheckbox1">${genres[i]}</label>
    </div>`)
    }

    $("#submit").on("click", function(event) {
        event.preventDefault();
        var history = {
            name: $("#media-name").val().trim(),
            type: $("#media-type").val().trim()
        }
        var genreSelected = [];
        $(".form-check-input:checked").each(function() {
            genreSelected.push($(this).val())

        })

        $.post("/api/users/history", history, function(data) {
            //console.log(data);
        })
        // console.log(genreSelected);
        // console.log(history);
        for (i = 0; i < genreSelected.length; i++) {
            var genre = {
                genre: genreSelected[i]
            }
            $.ajax("/api/users/interests", {
                type: "PUT",
                data: genre
            }).then(function(res) {
                console.log(res);
            })
        }
        location.reload();

    });

    $("#newusersubmit").on("click", function(event) {
        event.preventDefault();
        var history = [];
        var genreSelected = [];

        history.push({
            name: $("#media1-name").val().trim(),
            type: $("#media1-type").val().trim()
        })
        $(".form1-check-input:checked").each(function() {
            genreSelected.push($(this).val())
        })

        history.push({
            name: $("#media2-name").val().trim(),
            type: $("#media2-type").val().trim()
        })
        $(".form2-check-input:checked").each(function() {
            genreSelected.push($(this).val())
        })

        history.push({
            name: $("#media3-name").val().trim(),
            type: $("#media3-type").val().trim()
        })
        $(".form3-check-input:checked").each(function() {
            genreSelected.push($(this).val())
        })
        for (var i = 0; i < history.length; i++){
            $.post("/api/users/history", history[i], function(data) {
            })
        }
        for (i = 0; i < genreSelected.length; i++) {
            var genre = {
                genre: genreSelected[i]
            }
            $.ajax("/api/users/interests", {
                type: "PUT",
                data: genre
            }).then(function(res) {
            })
        }
        window.location.replace("/recommendations");
        
    })

    $(document).on("click", ".recommended-media", function() {
        $("#select-rec").html(`
            <div class = "row no-gutters justify-content-center my-2">
                <div class="col-12 col-md-5 text-center">
                    <img class="poster" src="${$(this).data("img")}">
                </div>
                <div class="col-12 col-md-5">
                    <h1 class="text-left">${$(this).data("name")}</h1>
                    <h4 class="text-left">Date: ${$(this).data("date")}</h4>
                    <p><h4>Plot:</h4> ${$(this).data("plot")}</p>
                </div>
            </div>`)
    })
    $(document).on("click", "#login-btn", function(event){
        event.preventDefault();
        var userData = {
            name: $("#username").val().trim(),
            password: $("#password").val().trim()
        }
        if (!userData.name || !userData.password) {
            return;
        }
        $("#username").val("")
        $("#password").val("")
        $.post("/api/login", userData).then(function(data){
            window.location.replace(data);
        }).catch(function(err){
            console.log(err)
            $("#loginHelp").text("That username password combination does not exist. Please try again.")
        })
    })
    $(document).on("click", "#signup-btn", function(event){
        event.preventDefault();
        var userData = {
            name: $("#username").val().trim(),
            password: $("#password").val().trim()
        }
        if (!userData.name || !userData.password) {
            return;
        }
        $("#username").val("")
        $("#password").val("")
        $.post("/api/signup", userData).then(function(data){
            window.location.replace(data);
        }).catch(function(err){
            console.log(err)
            $("#loginHelp").text("That username is taken. Please choose a new username")
        })
    })
    

});