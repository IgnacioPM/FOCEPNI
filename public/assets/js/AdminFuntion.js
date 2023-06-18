$(document).ready(function() {

    var CurrentUrl= document.URL;
    var CurrentUrlEnd = CurrentUrl.split('/').filter(Boolean).pop();
    console.log(CurrentUrlEnd);
    $( "#sidebar-menu li a" ).each(function() {
          var ThisUrl = $(this).attr('href');
          var ThisUrlEnd = ThisUrl.split('/').filter(Boolean).pop();

          if(ThisUrlEnd == CurrentUrlEnd){
          $(this).closest('li').addClass('active')
          }
    });

});
