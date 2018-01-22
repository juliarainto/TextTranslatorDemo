// This needs jQuery library 3.2.1.js
$(document).ready(function () {
    $("#mybutton").click(function () {

        let selectedLanguage = document.getElementById("mySelect").options[document.getElementById("mySelect").selectedIndex].value;

        let textToTranslate = document.getElementById("myText").value;

        let data = {
            lang: selectedLanguage,
            text: textToTranslate
        }

        if (textToTranslate.trim().length > 0) {
            $.ajax({
                url: "http://localhost:3001/translate",
                data: data,
                type: "POST",
                success: function (response) {
                    console.log(response.text);
                    document.getElementById("translatedText").innerHTML = response.text;
                },
                error: function (err) {
                    console.log(err);
                }
            });
        } else {
            alert("Insert text to translate");
        }
    });
});