$(document).ready(function () {
  console.log("first code with jQuery");

  // jQuery Effects
  // hide, show
  $("#btn1").click(function () {
    console.log("click");
    // $('#container').hide();
    $("#container").fadeOut(2000, function () {
      alert("Container is hidden");
    });
  });

  $("#btn2").click(function () {
    // $('#container').show();
    $("#container").fadeIn(3000, function () {
      alert("Container is shown");
    });
  });

  $("#btn3").click(function () {
    $("#container").fadeToggle(1000, function () {
      alert("Container toggled");
    });
  });

  $("#btn4").click(function () {
    $("#container").fadeTo(250, 0.5, function () {
      alert("Container faded");
    });
  });

  // slideDown, slideUp, slideToggle
  $("#btn6").click(function () {
    $("#container").slideUp(3000, function () {
      alert("Container is slid up");
    });
  });

  $("#btn5").click(function () {
    $("#container").slideDown(2000, function () {
      alert("Container is slid down");
    });
  });

  $("#btn7").click(function () {
    $("#container").slideToggle(1000, function () {
      alert("Container toggled");
    });
  });

  // animate

  // animate({params}, speed, callback)
  $("#btn8").click(function () {
    $("#container").animate(
      { width: "400px", height: "400px", opacity: 0.5, left: "250px" },
      2000,
      function () {
        $("#container").animate(
          {
            left: "0px",
            height: "100px",
            width: "100px",
            borderRadius: "20px",
            opacity: 1,
          },
          2000,
          function () {
            alert("Container animation completed");
          }
        );
      }
    );
  });

  // 
  $('#btn9').click(function(){

    // val() function

    // let v = $('#f').val()
    // console.log("Value is " + v);
    // $("#f").val("this is done using val function")


    // text() function

    // let c = $('#content').text();
    // console.log(c);

    // $('#content').text('<b>This is done using text function</b>');
    // it doesn't consider HTML tags, it just displays the text

    // html() function
    $('#content').html('<b>This is done using text function</b>');
    // it considers HTML tags, it displays the text as HTML
  })
});
